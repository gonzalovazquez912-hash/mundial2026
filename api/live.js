const manualResults = [
  ["Mexico", "South Africa", 2, 0],
  ["South Korea", "Czechia", 2, 1],
  ["Canada", "Bosnia", 1, 1],
  ["USA", "Paraguay", 4, 1],
  ["Qatar", "Switzerland", 1, 1],
  ["Brazil", "Morocco", 1, 1],
  ["Haiti", "Scotland", 0, 1],
  ["Australia", "Turkey", 2, 0],
  ["Germany", "Curacao", 7, 1],
  ["Netherlands", "Japan", 2, 2],
  ["Ivory Coast", "Ecuador", 1, 0],
  ["Sweden", "Tunisia", 5, 1]
];

function crearPartidoManual([home, away, gh, ga], index) {
  return {
    fixture: {
      id: 900000 + index,
      status: {
        long: "Match Finished",
        short: "FT",
        elapsed: 90,
        extra: null
      }
    },
    league: {
      id: 1,
      name: "World Cup",
      country: "World",
      season: 2026,
      round: "Group Stage"
    },
    teams: {
      home: {
        id: 100000 + index,
        name: home,
        winner: gh > ga
      },
      away: {
        id: 200000 + index,
        name: away,
        winner: ga > gh
      }
    },
    goals: {
      home: gh,
      away: ga
    },
    score: {
      halftime: {
        home: null,
        away: null
      },
      fulltime: {
        home: gh,
        away: ga
      },
      extratime: {
        home: null,
        away: null
      },
      penalty: {
        home: null,
        away: null
      }
    },
    events: [],
    statistics: []
  };
}

export default async function handler(req, res) {
  try {
    const key = process.env.API_FUTBOL_KEY;

    const manual = manualResults.map(crearPartidoManual);

    if (!key) {
      return res.status(200).json({
        errors: [],
        results: manual.length,
        response: manual,
        fuente: "manual"
      });
    }

    let live = [];

    try {
      const liveResp = await fetch(
        "https://v3.football.api-sports.io/fixtures?live=all",
        {
          headers: {
            "x-apisports-key": key
          }
        }
      );

      const liveData = await liveResp.json();

      if (
        !liveData.errors?.requests &&
        liveData.message !== "Too many requests"
      ) {
        live = (liveData.response || []).filter(
          m => m.league?.id === 1 && m.league?.season === 2026
        );
      }

    } catch (e) {
      live = [];
    }

    const mapa = new Map();

    manual.forEach(m => {
      mapa.set(`${m.teams.home.name}-${m.teams.away.name}`, m);
    });

    live.forEach(m => {
      mapa.set(`${m.teams.home.name}-${m.teams.away.name}`, m);
    });

    const response = Array.from(mapa.values());

    return res.status(200).json({
      errors: [],
      results: response.length,
      response,
      fuente: live.length ? "manual + live" : "manual"
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
