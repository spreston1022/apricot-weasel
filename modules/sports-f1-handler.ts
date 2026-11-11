import { ZuploRequest } from "@zuplo/runtime";

// Formula 1 tools for the sports MCP server, backed by Jolpica
// (api.jolpi.ca), the free keyless successor to the Ergast API.

const BASE = "https://api.jolpi.ca/ergast/f1";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

// Returns the validated path segment, or a 400 Response.
function segment(request: ZuploRequest, name: string, fallback: string): string | Response {
  const value = new URL(request.url).searchParams.get(name);
  if (!value) return fallback;
  return /^\d{1,4}$/.test(value) ? value : json({ error: `${name} must be a number` }, 400);
}

async function jolpica(path: string): Promise<any | Response> {
  const resp = await fetch(`${BASE}/${path}`);
  if (!resp.ok) {
    return json({ error: `Jolpica returned ${resp.status}`, detail: (await resp.text()).slice(0, 300) }, 502);
  }
  return (await resp.json()).MRData;
}

export async function standings(request: ZuploRequest): Promise<Response> {
  const season = segment(request, "season", "current");
  if (season instanceof Response) return season;

  const constructors = new URL(request.url).searchParams.get("type") === "constructors";
  const data = await jolpica(`${season}/${constructors ? "constructorstandings" : "driverstandings"}.json`);
  if (data instanceof Response) return data;

  const list = data.StandingsTable?.StandingsLists?.[0];
  const rows = constructors
    ? (list?.ConstructorStandings ?? []).map((s) => ({
        position: s.position,
        constructor: s.Constructor?.name,
        points: s.points,
        wins: s.wins,
      }))
    : (list?.DriverStandings ?? []).map((s) => ({
        position: s.position,
        driver: `${s.Driver?.givenName} ${s.Driver?.familyName}`,
        constructor: s.Constructors?.[0]?.name,
        points: s.points,
        wins: s.wins,
      }));

  return json({
    season: list?.season,
    afterRound: list?.round,
    type: constructors ? "constructors" : "drivers",
    standings: rows,
  });
}

export async function raceResults(request: ZuploRequest): Promise<Response> {
  const season = segment(request, "season", "current");
  if (season instanceof Response) return season;
  const round = segment(request, "round", "last");
  if (round instanceof Response) return round;

  const data = await jolpica(`${season}/${round}/results.json`);
  if (data instanceof Response) return data;

  const race = data.RaceTable?.Races?.[0];
  if (!race) return json({ error: "No results found for that season/round (the race may not have run yet)" }, 404);

  return json({
    season: race.season,
    round: race.round,
    race: race.raceName,
    circuit: race.Circuit?.circuitName,
    date: race.date,
    results: (race.Results ?? []).map((r) => ({
      position: r.positionText,
      driver: `${r.Driver?.givenName} ${r.Driver?.familyName}`,
      constructor: r.Constructor?.name,
      grid: r.grid,
      status: r.status,
      time: r.Time?.time,
      points: r.points,
    })),
  });
}

export async function schedule(request: ZuploRequest): Promise<Response> {
  const season = segment(request, "season", "current");
  if (season instanceof Response) return season;

  const data = await jolpica(`${season}.json`);
  if (data instanceof Response) return data;

  return json({
    season: data.RaceTable?.season,
    races: (data.RaceTable?.Races ?? []).map((r) => ({
      round: r.round,
      race: r.raceName,
      circuit: r.Circuit?.circuitName,
      location: [r.Circuit?.Location?.locality, r.Circuit?.Location?.country].filter(Boolean).join(", "),
      date: r.date,
      timeUtc: r.time,
    })),
  });
}
