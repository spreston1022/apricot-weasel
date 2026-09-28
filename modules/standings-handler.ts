// Live standings from MLB's Stats API (same upstream scoreboard-handler uses).
// Replaces the mock snapshot served while ESPN was blocking us.
export default async function (): Promise<Response> {
  const mlbUrl =
    "https://statsapi.mlb.com/api/v1/standings?leagueId=103,104&standingsTypes=regularSeason&hydrate=team,division,league";
  const resp = await fetch(mlbUrl);
  const data = await resp.json();

  if (!resp.ok) {
    return new Response(JSON.stringify(data), {
      status: resp.status,
      headers: { "content-type": "application/json" },
    });
  }

  const leagues = new Map<string, { league: string; divisions: any[] }>();
  for (const record of data.records ?? []) {
    const leagueName = record.league?.name;
    if (!leagues.has(leagueName)) {
      leagues.set(leagueName, { league: leagueName, divisions: [] });
    }
    leagues.get(leagueName)!.divisions.push({
      division: record.division?.name,
      teams: (record.teamRecords ?? []).map((t) => ({
        team: t.team?.name,
        abbreviation: t.team?.abbreviation,
        wins: t.wins,
        losses: t.losses,
        winPercent: t.winningPercentage,
        gamesBehind: t.divisionGamesBack,
        wildCardGamesBehind: t.wildCardGamesBack,
        streak: t.streak?.streakCode,
        clinched: t.clinchIndicator,
      })),
    });
  }

  return new Response(
    JSON.stringify({ season: data.records?.[0]?.teamRecords?.[0]?.season, leagues: [...leagues.values()] }),
    {
      status: 200,
      headers: { "content-type": "application/json" },
    }
  );
}
