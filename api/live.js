// api/live.js
// Devuelve resultados del Mundial 2026: combina resultados manuales (respaldo)
// con datos en vivo de API-Football cuando hay API key configurada.
//
// OPTIMIZADO PARA EL PLAN FREE (100 req/día, 10 req/min):
// - Una sola llamada a la API por sync (antes eran 2: live + today).
//   "fixtures?date=hoy" ya incluye partidos en vivo Y finalizados de hoy,
//   así que no hace falta pedir "live=all" por separado.
// - Caché en memoria de 5 minutos: si varias personas visitan la página
//   casi al mismo tiempo, o si Vercel arranca varias instancias de la
//   función, no se gasta una request de la API por cada una.

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

function crearPartidoManual([home, away, gh, ga], index) {
  return {
    fixture: {
      id: 900000 + index,
      status: { long: "Match Finished", short: "FT", elapsed: 90, extra: null },
    },
    league: { id: 1, name: "World Cup", country: "World", season: 2026, round: "Group Stage" },
    teams: {
      home: { id: 100000 + index, name: home, winner: gh > ga },
      away: { id: 200000 + index, name: away, winner: ga > gh },
    },
    goals: { home: gh, away: ga },
    score: {
      halftime: { home: null, away: null },
      fulltime: { home: gh, away: ga },
      extratime: { home: null, away: null },
      penalty: { home: null, away: null },
    },
    events: [],
    statistics: [],
  };
}

// Normaliza un fixture de API-Football: nombres de equipo consistentes,
// y season como número (algunas respuestas la traen como string).
function normalizarFixtureAPI(m) {
  return {
    ...m,
    league: { ...m.league, season: Number(m.league?.season) },
    teams: {
      home: { ...m.teams.home, name: normalizarNombre(m.teams.home.name) },
      away: { ...m.teams.away, name: normalizarNombre(m.teams.away.name) },
    },
  };
}

// Caché en memoria del proceso. Vercel reutiliza la misma instancia de
// función entre invocaciones cercanas en el tiempo (mientras no esté "fría"),
// así que esto evita pegarle a la API de nuevo si alguien refrescó la
// página hace 30 segundos. No es un caché persistente entre cold starts,
// pero ayuda mucho a no quemar cuota en ráfagas de tráfico.
let cache = { data: null, timestamp: 0 };
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutos

export default async function handler(req, res) {
  // CORS: el frontend vive en GitHub Pages (otro dominio), así que sin estos
  // headers el navegador bloquea la respuesta antes de que el JS la vea.
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  try {
    const key = process.env.API_FUTBOL_KEY;
    const manual = manualResults.map(crearPartidoManual);

    if (!key) {
      return res.status(200).json({
        errors: [],
        results: manual.length,
        response: manual,
        fuente: "manual",
      });
    }

    const ahora = Date.now();
    if (cache.data && ahora - cache.timestamp < CACHE_TTL_MS) {
      return res.status(200).json({ ...cache.data, fuente: cache.data.fuente + " (cache)" });
    }

    let live = [];
    let liveError = null;

    try {
      // Una sola llamada: fixtures del día de hoy ya trae partidos en vivo
      // Y finalizados, con sus estadísticas completas una vez que terminan.
      const hoy = new Date().toISOString().slice(0, 10);

      const resp = await fetch(
        `https://v3.football.api-sports.io/fixtures?league=1&season=2026&date=${hoy}`,
        { headers: { "x-apisports-key": key } }
      );

      if (!resp.ok) {
        throw new Error(`API-Football respondió ${resp.status}`);
      }

      const data = await resp.json();

      if (data.errors?.requests || data.message === "Too many requests") {
        liveError = "Rate limit alcanzado en API-Football";
      } else {
        live = (data.response || [])
          .map(normalizarFixtureAPI)
          .filter((m) => m.league?.id === 1 && m.league?.season === 2026);
      }
    } catch (e) {
      liveError = e.message;
      live = [];
    }

    // Live pisa a manual cuando hay coincidencia de equipos ya normalizados.
    const mapa = new Map();
    manual.forEach((m) => mapa.set(`${m.teams.home.name}-${m.teams.away.name}`, m));
    live.forEach((m) => mapa.set(`${m.teams.home.name}-${m.teams.away.name}`, m));

    const response = Array.from(mapa.values());

    const payload = {
      errors: liveError ? [liveError] : [],
      results: response.length,
      response,
      fuente: live.length ? "manual + live" : "manual",
    };

    // Solo cacheamos si NO hubo rate limit, para no quedarnos pegados
    // mostrando el error durante 5 minutos si la API se recupera antes.
    if (!liveError) {
      cache = { data: payload, timestamp: ahora };
    }

    return res.status(200).json(payload);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
