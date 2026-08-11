import { ZuploRequest } from "@zuplo/runtime";

export default async function (request: ZuploRequest): Promise<Response> {
  const url = new URL(request.url);
  const datesParam = url.searchParams.get("dates");

  let date: string;
  if (datesParam && /^\d{8}$/.test(datesParam)) {
    date = `${datesParam.slice(0, 4)}-${datesParam.slice(4, 6)}-${datesParam.slice(6, 8)}`;
  } else {
    date = new Date().toISOString().slice(0, 10);
  }

  const mlbUrl = `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${date}`;
  const resp = await fetch(mlbUrl);
  const data = await resp.json();

  if (!resp.ok) {
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { "content-type": "application/json" },
    });
  }

  const rawGames = data.dates?.[0]?.games ?? [];
  const games = rawGames.map((g) => ({
    away: g.teams?.away?.team?.name,
    home: g.teams?.home?.team?.name,
    awayScore: g.teams?.away?.score,
    homeScore: g.teams?.home?.score,
    status: g.status?.detailedState,
  }));

  return new Response(JSON.stringify({ date, games }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
