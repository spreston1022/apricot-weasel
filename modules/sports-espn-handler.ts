import { ZuploRequest } from "@zuplo/runtime";

// Multi-sport tools for the sports MCP server (/sports/mcp), backed by ESPN's
// public site API. Raw ESPN payloads run 100-200KB, so every handler trims to
// the handful of fields a model needs.

const LEAGUES: Record<string, string> = {
  nfl: "football/nfl",
  nba: "basketball/nba",
  wnba: "basketball/wnba",
  nhl: "hockey/nhl",
  mls: "soccer/usa.1",
  epl: "soccer/eng.1",
  ncaaf: "football/college-football",
  ncaab: "basketball/mens-college-basketball",
};

const STANDINGS_STATS = [
  "overall",
  "wins",
  "losses",
  "ties",
  "otLosses",
  "winPercent",
  "points",
  "gamesPlayed",
  "gamesBehind",
  "streak",
  "pointDifferential",
  "playoffSeed",
  "rank",
];

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function leaguePath(request: ZuploRequest): string | Response {
  const league = new URL(request.url).searchParams.get("league")?.toLowerCase() ?? "";
  return (
    LEAGUES[league] ??
    json({ error: `Unknown league '${league}'. Use one of: ${Object.keys(LEAGUES).join(", ")}` }, 400)
  );
}

async function espn(url: string): Promise<any | Response> {
  const resp = await fetch(url, { headers: { "user-agent": "Zuplo-Sports-Gateway/1.0" } });
  if (!resp.ok) {
    return json({ error: `ESPN returned ${resp.status}`, detail: (await resp.text()).slice(0, 300) }, 502);
  }
  return resp.json();
}

export async function scoreboard(request: ZuploRequest): Promise<Response> {
  const path = leaguePath(request);
  if (path instanceof Response) return path;

  const date = new URL(request.url).searchParams.get("date");
  if (date && !/^\d{8}$/.test(date)) {
    return json({ error: "date must be YYYYMMDD, e.g. 20261109" }, 400);
  }

  const data = await espn(
    `https://site.api.espn.com/apis/site/v2/sports/${path}/scoreboard${date ? `?dates=${date}` : ""}`,
  );
  if (data instanceof Response) return data;

  const games = (data.events ?? []).map((e) => {
    const comp = e.competitions?.[0] ?? {};
    const side = (homeAway: string) => {
      const c = (comp.competitors ?? []).find((x) => x.homeAway === homeAway);
      return {
        team: c?.team?.displayName,
        abbreviation: c?.team?.abbreviation,
        score: c?.score,
        record: c?.records?.[0]?.summary,
        winner: c?.winner,
      };
    };
    return {
      matchup: e.shortName,
      startTime: e.date,
      status: e.status?.type?.shortDetail,
      state: e.status?.type?.state,
      away: side("away"),
      home: side("home"),
      venue: comp.venue?.fullName,
      city: [comp.venue?.address?.city, comp.venue?.address?.state].filter(Boolean).join(", ") || undefined,
      indoor: comp.venue?.indoor,
      broadcasts: (comp.broadcasts ?? []).flatMap((b) => b.names ?? []),
    };
  });

  return json({ league: data.leagues?.[0]?.abbreviation, date: date ?? "today", games });
}

export async function standings(request: ZuploRequest): Promise<Response> {
  const path = leaguePath(request);
  if (path instanceof Response) return path;

  const data = await espn(`https://site.api.espn.com/apis/v2/sports/${path}/standings`);
  if (data instanceof Response) return data;

  // ESPN nests groups (conference -> division) to a league-dependent depth;
  // collect every node that carries its own standings table.
  const groups: { group: string; teams: Record<string, string>[] }[] = [];
  const walk = (node) => {
    if (node.standings?.entries?.length) {
      groups.push({
        group: node.name,
        teams: node.standings.entries.map((entry) => {
          const row: Record<string, string> = { team: entry.team?.displayName };
          for (const stat of entry.stats ?? []) {
            if (STANDINGS_STATS.includes(stat.name) && stat.displayValue !== undefined) {
              row[stat.name] = stat.displayValue;
            }
          }
          return row;
        }),
      });
    }
    (node.children ?? []).forEach(walk);
  };
  walk(data);

  return json({ league: data.abbreviation, season: data.season?.displayName ?? data.seasons?.[0]?.displayName, groups });
}

export async function news(request: ZuploRequest): Promise<Response> {
  const path = leaguePath(request);
  if (path instanceof Response) return path;

  const data = await espn(`https://site.api.espn.com/apis/site/v2/sports/${path}/news?limit=8`);
  if (data instanceof Response) return data;

  const articles = (data.articles ?? []).map((a) => ({
    headline: a.headline,
    description: a.description,
    published: a.published,
    url: a.links?.web?.href,
  }));

  return json({ articles });
}
