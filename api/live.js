// api/live.js
// Versión segura:
// - TheSportsDB: resultados reales finalizados.
// - API-Football: solo partidos en vivo si hay cuota.
// - Estadísticas: SOLO si vienen desde API estructurada.
// - No scrapea estadísticas desde HTML para evitar datos falsos.

const SPORTSDB_SEASON_URL =
  "https://www.thesportsdb.com/season/4429-fifa-world-cup/2026";

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

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutos

function extraerEventIds(html) {
  const ids = new Set();

  const regex = /\/event\/(\d+)-/g;
  let match;

  while ((match = regex.exec(html)) !== null) {
    ids.add(match[1]);
  }

  return Array.from(ids);
}

async function obtenerStatsPorAPI(id, home, away) {
  try {
    const statsResp = await fetch(
      `https://www.thesportsdb.com/api/v2/json/lookup/event_stats/${id}`
    );

    const statsData = await statsResp.json();

    const posibles =
      statsData?.eventstats ||
      statsData?.event_stats ||
      statsData?.stats ||
      statsData?.statistics ||
      [];

    if (!Array.isArray(posibles) || posibles.length === 0) {
      return [];
    }

    const homeStats = [];
    const awayStats = [];

    const tiposPermitidos = {
      "SHOTS ON GOAL": "Shots on Goal",
      "SHOTS OFF GOAL": "Shots off Goal",
      "TOTAL SHOTS": "Total Shots",
      "BLOCKED SHOTS": "Blocked Shots",
      "SHOTS INSIDEBOX": "Shots insidebox",
      "SHOTS OUTSIDEBOX": "Shots outsidebox",
      "FOULS": "Fouls",
      "CORNER KICKS": "Corner Kicks",
      "OFFSIDES": "Offsides",
      "OFF SIDES": "Offsides",
      "BALL POSSESSION": "Ball Possession",
      "YELLOW CARDS": "Yellow Cards",
      "RED CARDS": "Red Cards",
      "GOALKEEPER SAVES": "Goalkeeper Saves",
      "TOTAL PASSES": "Total passes",
      "PASSES ACCURATE": "Passes accurate",
      "PASSES %": "Passes %",
      "EXPECTED_GOALS": "expected_goals",
      "EXPECTED GOALS": "expected_goals",
      "GOALS_PREVENTED": "goals_prevented"
    };

    posibles.forEach(s => {
      const tipoRaw =
        s.strStat ||
        s.strStatistic ||
        s.strMeasure ||
        s.type ||
        s.name;

      if (!tipoRaw) return;

      const tipoKey = String(tipoRaw)
        .toUpperCase()
        .trim();

      const tipoFinal = tiposPermitidos[tipoKey];

      if (!tipoFinal) return;

      const homeVal =
        s.intHome ??
        s.strHome ??
        s.home ??
        s.homeValue ??
        s.valueHome ??
        null;

      const awayVal =
        s.intAway ??
        s.strAway ??
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

    if (!homeStats.length) {
      return [];
    }

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

async function obtenerStatsEvento(id, home, away) {
  // IMPORTANTE:
  // No scrapeamos estadísticas desde HTML porque puede tomar números incorrectos.
  // Solo aceptamos datos si vienen desde API estructurada.
  const statistics = await obtenerStatsPorAPI(id, home, away);

  if (!statistics.length) {
    return [];
  }

  return statistics;
}

async function obtenerEventoSportsDB(id) {
  try {
    const eventResp = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/lookupevent.php?id=${id}`
    );

    const eventData = await eventResp.json();

    const evento = eventData?.events?.[0];

    if (!evento) return null;

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

    // CLAVE:
    // Si no tiene resultado, no lo devolvemos.
    // Así los partidos futuros no aparecen como "en vivo".
    if (homeScore === null || awayScore === null) {
      return null;
    }

    const statistics = await obtenerStatsEvento(
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

  } catch {
    return null;
  }
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
        m => m.league?.id === 1 && m.league?.season === 2026
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

    const seasonResp = await fetch(SPORTSDB_SEASON_URL);
    const html = await seasonResp.text();

    const ids = extraerEventIds(html);

    const eventos = await Promise.all(
      ids.map(id => obtenerEventoSportsDB(id))
    );

    const sportsDB = eventos.filter(Boolean);

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
