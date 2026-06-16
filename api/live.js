// api/live.js
// TheSportsDB + API-Football
// - Trae temporada completa.
// - Refuerza con partidos de ayer, hoy y mañana.
// - API-Football queda para vivo si hay cuota.
// - Cache corto para que actualice más rápido.

const LEAGUE_ID = 4429;
const SEASON = "2026";

const SPORTSDB_BASE = "https://www.thesportsdb.com/api/v1/json/123";

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

  "Bosnia-Herzegovina": "Bosnia",
  "Bosnia & Herzegovina": "Bosnia",
  "Bosnia and Herzegovina": "Bosnia",
  "Bosnia": "Bosnia",

  "Congo DR": "DR Congo",
  "DR Congo": "DR Congo",

  "Curaçao": "Curacao",
  "Curacao": "Curacao"
};

function normalizarNombre(nombre) {
  return NOMBRE_MAP[nombre] || nombre;
}

let cache = {
  data: null,
  timestamp: 0
};

// 2 minutos: actualiza más rápido, sin quemar tanto límite
const CACHE_TTL_MS = 2 * 60 * 1000;

function fechaUTC(offsetDias = 0) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + offsetDias);
  return d.toISOString().slice(0, 10);
}

async function fetchJSON(url) {
  const resp = await fetch(url);

  if (!resp.ok) {
    throw new Error(`Error ${resp.status} en ${url}`);
  }

  return await resp.json();
}

function normalizarTipoStat(tipoRaw) {
  if (!tipoRaw) return null;

  const k = String(tipoRaw)
    .toUpperCase()
    .replace(/_/g, " ")
    .trim();

  const map = {
    "SHOTS ON GOAL": "Shots on Goal",
    "SHOTS OFF GOAL": "Shots off Goal",
    "TOTAL SHOTS": "Total Shots",
    "BLOCKED SHOTS": "Blocked Shots",
    "SHOTS INSIDEBOX": "Shots insidebox",
    "SHOTS OUTSIDEBOX": "Shots outsidebox",
    "FOULS": "Fouls",
    "CORNER KICKS": "Corner Kicks",
    "CORNERS": "Corner Kicks",
    "OFFSIDES": "Offsides",
    "OFF SIDES": "Offsides",
    "BALL POSSESSION": "Ball Possession",
    "POSSESSION": "Ball Possession",
    "YELLOW CARDS": "Yellow Cards",
    "RED CARDS": "Red Cards",
    "GOALKEEPER SAVES": "Goalkeeper Saves",
    "TOTAL PASSES": "Total passes",
    "PASSES ACCURATE": "Passes accurate",
    "PASSES %": "Passes %",
    "EXPECTED GOALS": "expected_goals",
    "EXPECTED GOALS XG": "expected_goals",
    "GOALS PREVENTED": "goals_prevented"
  };

  return map[k] || null;
}

async function obtenerStatsPorAPI(id, home, away) {
  try {
    const statsData = await fetchJSON(
      `${SPORTSDB_BASE}/lookupeventstats.php?id=${id}`
    );

    const posibles =
      statsData?.eventstats ||
      statsData?.eventStats ||
      statsData?.results ||
      [];

    if (!Array.isArray(posibles) || !posibles.length) {
      return [];
    }

    const homeStats = [];
    const awayStats = [];

    posibles.forEach(s => {
      const tipoRaw =
        s.strStat ||
        s.strStatistic ||
        s.strMeasure ||
        s.strEventStat ||
        s.strType ||
        s.type ||
        s.name;

      const tipoFinal = normalizarTipoStat(tipoRaw);

      if (!tipoFinal) return;

      const homeVal =
        s.intHome ??
        s.strHome ??
        s.intHomeValue ??
        s.strHomeValue ??
        s.home ??
        s.homeValue ??
        s.valueHome ??
        null;

      const awayVal =
        s.intAway ??
        s.strAway ??
        s.intAwayValue ??
        s.strAwayValue ??
        s.away ??
        s.awayValue ??
        s.valueAway ??
        null;

      if (homeVal === null || awayVal === null) return;

      homeStats.push({
        type: tipoFinal,
        value: homeVal
      });

      awayStats.push({
        type: tipoFinal,
        value: awayVal
      });
    });

    if (!homeStats.length) return [];

    return [
      {
        team: {
          name: home
        },
        statistics: homeStats
      },
      {
        team: {
          name: away
        },
        statistics: awayStats
      }
    ];

  } catch {
    return [];
  }
}

async function convertirEventoSportsDB(evento) {
  const home = normalizarNombre(evento.strHomeTeam);
  const away = normalizarNombre(evento.strAwayTeam);

  const homeScore =
    evento.intHomeScore !== null &&
    evento.intHomeScore !== undefined &&
    evento.intHomeScore !== ""
      ? Number(evento.intHomeScore)
      : null;

  const awayScore =
    evento.intAwayScore !== null &&
    evento.intAwayScore !== undefined &&
    evento.intAwayScore !== ""
      ? Number(evento.intAwayScore)
      : null;

  // Solo convertimos a resultado real si ya tiene marcador.
  if (homeScore === null || awayScore === null) {
    return null;
  }

  const id = evento.idEvent;

  const statistics = await obtenerStatsPorAPI(
    id,
    home,
    away
  );

  return {
    fixture: {
      id: Number(id),
      date: evento.dateEvent,
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
      round: evento.intRound
        ? `Round ${evento.intRound}`
        : "Group Stage"
    },
    teams: {
      home: {
        id: evento.idHomeTeam
          ? Number(evento.idHomeTeam)
          : null,
        name: home,
        winner: homeScore > awayScore
      },
      away: {
        id: evento.idAwayTeam
          ? Number(evento.idAwayTeam)
          : null,
        name: away,
        winner: awayScore > homeScore
      }
    },
    goals: {
      home: homeScore,
      away: awayScore
    },
    score: {
      halftime: {
        home: null,
        away: null
      },
      fulltime: {
        home: homeScore,
        away: awayScore
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
    statistics,
    source: "TheSportsDB"
  };
}

async function obtenerEventosSportsDB() {
  const urls = [
    `${SPORTSDB_BASE}/eventsseason.php?id=${LEAGUE_ID}&s=${SEASON}`,
    `${SPORTSDB_BASE}/eventsday.php?d=${fechaUTC(-1)}&l=${LEAGUE_ID}`,
    `${SPORTSDB_BASE}/eventsday.php?d=${fechaUTC(0)}&l=${LEAGUE_ID}`,
    `${SPORTSDB_BASE}/eventsday.php?d=${fechaUTC(1)}&l=${LEAGUE_ID}`
  ];

  const respuestas = await Promise.allSettled(
    urls.map(url => fetchJSON(url))
  );

  const mapa = new Map();

  respuestas.forEach(r => {
    if (r.status !== "fulfilled") return;

    const eventos =
      r.value?.events ||
      r.value?.event ||
      [];

    if (!Array.isArray(eventos)) return;

    eventos.forEach(e => {
      if (!e?.idEvent) return;
      mapa.set(e.idEvent, e);
    });
  });

  const eventos = Array.from(mapa.values());

  const convertidos = await Promise.all(
    eventos.map(e => convertirEventoSportsDB(e))
  );

  return convertidos.filter(Boolean);
}

function normalizarFixtureAPIFootball(m) {
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
    },
    source: "API-Football"
  };
}

async function obtenerLiveAPIFootball() {
  const key = process.env.API_FUTBOL_KEY;

  if (!key) return [];

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

    if (
      data.errors?.requests ||
      data.message === "Too many requests"
    ) {
      return [];
    }

    return (data.response || [])
      .map(normalizarFixtureAPIFootball)
      .filter(
        m =>
          m.league?.id === 1 &&
          Number(m.league?.season) === 2026
      );

  } catch {
    return [];
  }
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const ahora = Date.now();

    if (cache.data && ahora - cache.timestamp < CACHE_TTL_MS) {
      return res.status(200).json({
        ...cache.data,
        cache: true
      });
    }

    const sportsDB = await obtenerEventosSportsDB();

    const liveAPI = await obtenerLiveAPIFootball();

    const mapa = new Map();

    sportsDB.forEach(m => {
      mapa.set(
        `${m.teams.home.name}-${m.teams.away.name}`,
        m
      );
    });

    liveAPI.forEach(m => {
      mapa.set(
        `${m.teams.home.name}-${m.teams.away.name}`,
        m
      );
    });

    const response = Array.from(mapa.values());

    const payload = {
      errors: [],
      results: response.length,
      response,
      fuente: liveAPI.length
        ? "TheSportsDB + API-Football"
        : "TheSportsDB"
    };

    cache = {
      data: payload,
      timestamp: ahora
    };

    return res.status(200).json(payload);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
