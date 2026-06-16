// api/live.js
// Versión estable gratis:
// - Manual = resultados finalizados
// - API-Football = solo partidos en vivo mientras haya cuota
// - TheSportsDB / manualStats = estadísticas post partido agregadas a mano

const NOMBRE_MAP = {
  "Côte d'Ivoire": "Ivory Coast",
  "Cote d'Ivoire": "Ivory Coast",
  "Ivory Coast": "Ivory Coast",
  "Czech Republic": "Czechia",
  "Czechia": "Czechia",
  "United States": "USA",
  "USA": "USA",
  "Korea Republic": "South Korea",
  "South Korea": "South Korea",
  "Bosnia & Herzegovina": "Bosnia",
  "Bosnia and Herzegovina": "Bosnia",
  "Bosnia": "Bosnia",
  "Congo DR": "DR Congo",
  "DR Congo": "DR Congo",
  "Curaçao": "Curacao",
  "Curacao": "Curacao",
};

function normalizarNombre(nombre) {
  return NOMBRE_MAP[nombre] || nombre;
}

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
  ["Sweden", "Tunisia", 5, 1],
];

const manualStats = {
  "Mexico-South Africa": {
    home: "Mexico",
    away: "South Africa",
    stats: {
      "Shots on Goal": [4, 2],
      "Shots off Goal": [7, 1],
      "Total Shots": [16, 3],
      "Blocked Shots": [5, 0],
      "Shots insidebox": [9, 1],
      "Shots outsidebox": [7, 2],
      "Fouls": [12, 11],
      "Corner Kicks": [3, 1],
      "Offsides": [1, 1],
      "Ball Possession": ["61%", "39%"],
      "Yellow Cards": [1, 2],
      "Red Cards": [1, 2],
      "Goalkeeper Saves": [2, 2],
      "Total passes": [520, 335],
      "Passes accurate": [467, 272],
      "Passes %": ["90%", "81%"],
      "expected_goals": ["1.41", "0.07"]
    }
  }
};

function convertirStats(key) {
  const data = manualStats[key];

  if (!data) return [];

  return [
    {
      team: {
        name: data.home
      },
      statistics: Object.entries(data.stats).map(([type, values]) => ({
        type,
        value: values[0]
      }))
    },
    {
      team: {
        name: data.away
      },
      statistics: Object.entries(data.stats).map(([type, values]) => ({
        type,
        value: values[1]
      }))
    }
  ];
}

function crearPartidoManual([home, away, gh, ga], index) {
  const key = `${home}-${away}`;

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
    statistics: convertirStats(key)
  };
}

function normalizarFixtureAPI(m) {
  return {
    ...m,
    league: {
      ...m.league,
      season: Number(m.league?.season)
    },
    teams: {
      home: {
        ...m.teams.home,
        name: normalizarNombre(m.teams.home.name)
      },
      away: {
        ...m.teams.away,
        name: normalizarNombre(m.teams.away.name)
      }
    }
  };
}

let cache = {
  data: null,
  timestamp: 0
};

const CACHE_TTL_MS = 5 * 60 * 1000;

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const key = process.env.API_FUTBOL_KEY;
    const manual = manualResults.map(crearPartidoManual);

    const ahora = Date.now();

    if (cache.data && ahora - cache.timestamp < CACHE_TTL_MS) {
      return res.status(200).json({
        ...cache.data,
        fuente: cache.data.fuente + " cache"
      });
    }

    let live = [];
    let liveError = null;

    if (key) {
      try {
        const resp = await fetch(
          "https://v3.football.api-sports.io/fixtures?live=all",
          {
            headers: {
              "x-apisports-key": key
            }
          }
        );

        const data = await resp.json();

        if (data.errors?.requests || data.message === "Too many requests") {
          liveError = "Rate limit alcanzado en API-Football";
        } else {
          live = (data.response || [])
            .map(normalizarFixtureAPI)
            .filter(
              m => m.league?.id === 1 && m.league?.season === 2026
            );
        }

      } catch (e) {
        liveError = e.message;
      }
    }

    const mapa = new Map();

    manual.forEach(m => {
      mapa.set(`${m.teams.home.name}-${m.teams.away.name}`, m);
    });

    live.forEach(m => {
      mapa.set(`${m.teams.home.name}-${m.teams.away.name}`, m);
    });

    const response = Array.from(mapa.values());

    const payload = {
      errors: liveError ? [liveError] : [],
      results: response.length,
      response,
      fuente: live.length ? "manual + live" : "manual"
    };

    if (!liveError) {
      cache = {
        data: payload,
        timestamp: ahora
      };
    }

    return res.status(200).json(payload);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
