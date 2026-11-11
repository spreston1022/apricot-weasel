// MCP resource: final results of the 2026 MLB postseason. The postseason is
// over, so this is a static snapshot (built from the MLB Stats API
// /schedule/postseason/series endpoint) rather than a live upstream call.

const RESULTS = {
  "season": 2026,
  "champion": "Milwaukee Brewers",
  "worldSeries": "Milwaukee Brewers defeated Tampa Bay Rays 4-1",
  "source": "MLB Stats API (statsapi.mlb.com), snapshot taken 2026-11-11 after the postseason ended",
  "series": [
    {
      "round": "Wild Card Series",
      "series": "AL Wild Card Series",
      "bestOf": 3,
      "winner": "Chicago White Sox",
      "loser": "Houston Astros",
      "result": "Chicago White Sox defeated Houston Astros 2-0",
      "games": [
        {
          "game": 1,
          "date": "2026-09-29",
          "away": "Chicago White Sox",
          "awayScore": 6,
          "home": "Houston Astros",
          "homeScore": 3,
          "winner": "Chicago White Sox",
          "venue": "Daikin Park"
        },
        {
          "game": 2,
          "date": "2026-09-30",
          "away": "Chicago White Sox",
          "awayScore": 7,
          "home": "Houston Astros",
          "homeScore": 3,
          "winner": "Chicago White Sox",
          "venue": "Daikin Park"
        }
      ]
    },
    {
      "round": "Wild Card Series",
      "series": "AL Wild Card Series",
      "bestOf": 3,
      "winner": "New York Yankees",
      "loser": "Boston Red Sox",
      "result": "New York Yankees defeated Boston Red Sox 2-0",
      "games": [
        {
          "game": 1,
          "date": "2026-09-29",
          "away": "Boston Red Sox",
          "awayScore": 0,
          "home": "New York Yankees",
          "homeScore": 9,
          "winner": "New York Yankees",
          "venue": "Yankee Stadium"
        },
        {
          "game": 2,
          "date": "2026-09-30",
          "away": "Boston Red Sox",
          "awayScore": 2,
          "home": "New York Yankees",
          "homeScore": 9,
          "winner": "New York Yankees",
          "venue": "Yankee Stadium"
        }
      ]
    },
    {
      "round": "Wild Card Series",
      "series": "NL Wild Card Series",
      "bestOf": 3,
      "winner": "Atlanta Braves",
      "loser": "Philadelphia Phillies",
      "result": "Atlanta Braves defeated Philadelphia Phillies 2-1",
      "games": [
        {
          "game": 1,
          "date": "2026-09-29",
          "away": "Philadelphia Phillies",
          "awayScore": 3,
          "home": "Atlanta Braves",
          "homeScore": 5,
          "winner": "Atlanta Braves",
          "venue": "Truist Park"
        },
        {
          "game": 2,
          "date": "2026-09-30",
          "away": "Philadelphia Phillies",
          "awayScore": 4,
          "home": "Atlanta Braves",
          "homeScore": 3,
          "winner": "Philadelphia Phillies",
          "venue": "Truist Park"
        },
        {
          "game": 3,
          "date": "2026-10-01",
          "away": "Philadelphia Phillies",
          "awayScore": 2,
          "home": "Atlanta Braves",
          "homeScore": 6,
          "winner": "Atlanta Braves",
          "venue": "Truist Park"
        }
      ]
    },
    {
      "round": "Wild Card Series",
      "series": "NL Wild Card Series",
      "bestOf": 3,
      "winner": "San Diego Padres",
      "loser": "Chicago Cubs",
      "result": "San Diego Padres defeated Chicago Cubs 2-0",
      "games": [
        {
          "game": 1,
          "date": "2026-09-29",
          "away": "Chicago Cubs",
          "awayScore": 0,
          "home": "San Diego Padres",
          "homeScore": 8,
          "winner": "San Diego Padres",
          "venue": "Petco Park"
        },
        {
          "game": 2,
          "date": "2026-09-30",
          "away": "Chicago Cubs",
          "awayScore": 1,
          "home": "San Diego Padres",
          "homeScore": 4,
          "winner": "San Diego Padres",
          "venue": "Petco Park"
        }
      ]
    },
    {
      "round": "Division Series",
      "series": "AL Division Series",
      "bestOf": 5,
      "winner": "Tampa Bay Rays",
      "loser": "New York Yankees",
      "result": "Tampa Bay Rays defeated New York Yankees 3-0",
      "games": [
        {
          "game": 1,
          "date": "2026-10-03",
          "away": "New York Yankees",
          "awayScore": 0,
          "home": "Tampa Bay Rays",
          "homeScore": 1,
          "winner": "Tampa Bay Rays",
          "venue": "Tropicana Field"
        },
        {
          "game": 2,
          "date": "2026-10-05",
          "away": "New York Yankees",
          "awayScore": 2,
          "home": "Tampa Bay Rays",
          "homeScore": 5,
          "winner": "Tampa Bay Rays",
          "venue": "Tropicana Field"
        },
        {
          "game": 3,
          "date": "2026-10-07",
          "away": "Tampa Bay Rays",
          "awayScore": 4,
          "home": "New York Yankees",
          "homeScore": 3,
          "winner": "Tampa Bay Rays",
          "venue": "Yankee Stadium"
        }
      ]
    },
    {
      "round": "Division Series",
      "series": "AL Division Series",
      "bestOf": 5,
      "winner": "Cleveland Guardians",
      "loser": "Chicago White Sox",
      "result": "Cleveland Guardians defeated Chicago White Sox 3-2",
      "games": [
        {
          "game": 1,
          "date": "2026-10-03",
          "away": "Chicago White Sox",
          "awayScore": 3,
          "home": "Cleveland Guardians",
          "homeScore": 0,
          "winner": "Chicago White Sox",
          "venue": "Progressive Field"
        },
        {
          "game": 2,
          "date": "2026-10-05",
          "away": "Chicago White Sox",
          "awayScore": 4,
          "home": "Cleveland Guardians",
          "homeScore": 3,
          "winner": "Chicago White Sox",
          "venue": "Progressive Field"
        },
        {
          "game": 3,
          "date": "2026-10-07",
          "away": "Cleveland Guardians",
          "awayScore": 9,
          "home": "Chicago White Sox",
          "homeScore": 3,
          "winner": "Cleveland Guardians",
          "venue": "Rate Field"
        },
        {
          "game": 4,
          "date": "2026-10-08",
          "away": "Cleveland Guardians",
          "awayScore": 9,
          "home": "Chicago White Sox",
          "homeScore": 5,
          "winner": "Cleveland Guardians",
          "venue": "Rate Field"
        },
        {
          "game": 5,
          "date": "2026-10-10",
          "away": "Chicago White Sox",
          "awayScore": 0,
          "home": "Cleveland Guardians",
          "homeScore": 2,
          "winner": "Cleveland Guardians",
          "venue": "Progressive Field"
        }
      ]
    },
    {
      "round": "Division Series",
      "series": "NL Division Series",
      "bestOf": 5,
      "winner": "Milwaukee Brewers",
      "loser": "San Diego Padres",
      "result": "Milwaukee Brewers defeated San Diego Padres 3-1",
      "games": [
        {
          "game": 1,
          "date": "2026-10-03",
          "away": "San Diego Padres",
          "awayScore": 2,
          "home": "Milwaukee Brewers",
          "homeScore": 3,
          "winner": "Milwaukee Brewers",
          "venue": "American Family Field"
        },
        {
          "game": 2,
          "date": "2026-10-04",
          "away": "San Diego Padres",
          "awayScore": 3,
          "home": "Milwaukee Brewers",
          "homeScore": 4,
          "winner": "Milwaukee Brewers",
          "venue": "American Family Field"
        },
        {
          "game": 3,
          "date": "2026-10-06",
          "away": "Milwaukee Brewers",
          "awayScore": 3,
          "home": "San Diego Padres",
          "homeScore": 4,
          "winner": "San Diego Padres",
          "venue": "Petco Park"
        },
        {
          "game": 4,
          "date": "2026-10-07",
          "away": "Milwaukee Brewers",
          "awayScore": 3,
          "home": "San Diego Padres",
          "homeScore": 1,
          "winner": "Milwaukee Brewers",
          "venue": "Petco Park"
        }
      ]
    },
    {
      "round": "Division Series",
      "series": "NL Division Series",
      "bestOf": 5,
      "winner": "Los Angeles Dodgers",
      "loser": "Atlanta Braves",
      "result": "Los Angeles Dodgers defeated Atlanta Braves 3-1",
      "games": [
        {
          "game": 1,
          "date": "2026-10-03",
          "away": "Atlanta Braves",
          "awayScore": 3,
          "home": "Los Angeles Dodgers",
          "homeScore": 5,
          "winner": "Los Angeles Dodgers",
          "venue": "UNIQLO Field at Dodger Stadium"
        },
        {
          "game": 2,
          "date": "2026-10-04",
          "away": "Atlanta Braves",
          "awayScore": 3,
          "home": "Los Angeles Dodgers",
          "homeScore": 2,
          "winner": "Atlanta Braves",
          "venue": "UNIQLO Field at Dodger Stadium"
        },
        {
          "game": 3,
          "date": "2026-10-06",
          "away": "Los Angeles Dodgers",
          "awayScore": 3,
          "home": "Atlanta Braves",
          "homeScore": 1,
          "winner": "Los Angeles Dodgers",
          "venue": "Truist Park"
        },
        {
          "game": 4,
          "date": "2026-10-07",
          "away": "Los Angeles Dodgers",
          "awayScore": 4,
          "home": "Atlanta Braves",
          "homeScore": 1,
          "winner": "Los Angeles Dodgers",
          "venue": "Truist Park"
        }
      ]
    },
    {
      "round": "League Championship Series",
      "series": "AL Championship Series",
      "bestOf": 7,
      "winner": "Tampa Bay Rays",
      "loser": "Cleveland Guardians",
      "result": "Tampa Bay Rays defeated Cleveland Guardians 4-2",
      "games": [
        {
          "game": 1,
          "date": "2026-10-12",
          "away": "Cleveland Guardians",
          "awayScore": 7,
          "home": "Tampa Bay Rays",
          "homeScore": 3,
          "winner": "Cleveland Guardians",
          "venue": "Tropicana Field"
        },
        {
          "game": 2,
          "date": "2026-10-13",
          "away": "Cleveland Guardians",
          "awayScore": 1,
          "home": "Tampa Bay Rays",
          "homeScore": 3,
          "winner": "Tampa Bay Rays",
          "venue": "Tropicana Field"
        },
        {
          "game": 3,
          "date": "2026-10-15",
          "away": "Tampa Bay Rays",
          "awayScore": 2,
          "home": "Cleveland Guardians",
          "homeScore": 3,
          "winner": "Cleveland Guardians",
          "venue": "Progressive Field"
        },
        {
          "game": 4,
          "date": "2026-10-17",
          "away": "Tampa Bay Rays",
          "awayScore": 7,
          "home": "Cleveland Guardians",
          "homeScore": 3,
          "winner": "Tampa Bay Rays",
          "venue": "Progressive Field"
        },
        {
          "game": 5,
          "date": "2026-10-18",
          "away": "Tampa Bay Rays",
          "awayScore": 3,
          "home": "Cleveland Guardians",
          "homeScore": 1,
          "winner": "Tampa Bay Rays",
          "venue": "Progressive Field"
        },
        {
          "game": 6,
          "date": "2026-10-19",
          "away": "Cleveland Guardians",
          "awayScore": 3,
          "home": "Tampa Bay Rays",
          "homeScore": 7,
          "winner": "Tampa Bay Rays",
          "venue": "Tropicana Field"
        }
      ]
    },
    {
      "round": "League Championship Series",
      "series": "NL Championship Series",
      "bestOf": 7,
      "winner": "Milwaukee Brewers",
      "loser": "Los Angeles Dodgers",
      "result": "Milwaukee Brewers defeated Los Angeles Dodgers 4-0",
      "games": [
        {
          "game": 1,
          "date": "2026-10-11",
          "away": "Los Angeles Dodgers",
          "awayScore": 1,
          "home": "Milwaukee Brewers",
          "homeScore": 2,
          "winner": "Milwaukee Brewers",
          "venue": "American Family Field"
        },
        {
          "game": 2,
          "date": "2026-10-12",
          "away": "Los Angeles Dodgers",
          "awayScore": 4,
          "home": "Milwaukee Brewers",
          "homeScore": 7,
          "winner": "Milwaukee Brewers",
          "venue": "American Family Field"
        },
        {
          "game": 3,
          "date": "2026-10-14",
          "away": "Milwaukee Brewers",
          "awayScore": 6,
          "home": "Los Angeles Dodgers",
          "homeScore": 2,
          "winner": "Milwaukee Brewers",
          "venue": "UNIQLO Field at Dodger Stadium"
        },
        {
          "game": 4,
          "date": "2026-10-15",
          "away": "Milwaukee Brewers",
          "awayScore": 6,
          "home": "Los Angeles Dodgers",
          "homeScore": 4,
          "winner": "Milwaukee Brewers",
          "venue": "UNIQLO Field at Dodger Stadium"
        }
      ]
    },
    {
      "round": "World Series",
      "series": "World Series",
      "bestOf": 7,
      "winner": "Milwaukee Brewers",
      "loser": "Tampa Bay Rays",
      "result": "Milwaukee Brewers defeated Tampa Bay Rays 4-1",
      "games": [
        {
          "game": 1,
          "date": "2026-10-23",
          "away": "Tampa Bay Rays",
          "awayScore": 2,
          "home": "Milwaukee Brewers",
          "homeScore": 3,
          "winner": "Milwaukee Brewers",
          "venue": "American Family Field"
        },
        {
          "game": 2,
          "date": "2026-10-24",
          "away": "Tampa Bay Rays",
          "awayScore": 4,
          "home": "Milwaukee Brewers",
          "homeScore": 5,
          "winner": "Milwaukee Brewers",
          "venue": "American Family Field"
        },
        {
          "game": 3,
          "date": "2026-10-26",
          "away": "Milwaukee Brewers",
          "awayScore": 10,
          "home": "Tampa Bay Rays",
          "homeScore": 1,
          "winner": "Milwaukee Brewers",
          "venue": "Tropicana Field"
        },
        {
          "game": 4,
          "date": "2026-10-27",
          "away": "Milwaukee Brewers",
          "awayScore": 3,
          "home": "Tampa Bay Rays",
          "homeScore": 4,
          "winner": "Tampa Bay Rays",
          "venue": "Tropicana Field"
        },
        {
          "game": 5,
          "date": "2026-10-28",
          "away": "Milwaukee Brewers",
          "awayScore": 4,
          "home": "Tampa Bay Rays",
          "homeScore": 1,
          "winner": "Milwaukee Brewers",
          "venue": "Tropicana Field"
        }
      ]
    }
  ]
};

export default async function (): Promise<Response> {
  return new Response(JSON.stringify(RESULTS), {
    headers: { "content-type": "application/json" },
  });
}
