let cache = {
  timestamp: 0,
  data: null
};

export default async function handler(req, res) {
  try {
    const ahora = Date.now();

    // Cache de 90 segundos
    if (cache.data && ahora - cache.timestamp < 90000) {
      return res.status(200).json({
        ...cache.data,
        cache: true,
        cache_seconds: Math.round((ahora - cache.timestamp) / 1000)
      });
    }

    const key = process.env.API_FUTBOL_KEY;

    if (!key) {
      return res.status(500).json({
        error: "No se encontró API_FUTBOL_KEY"
      });
    }

    const headers = {
      "x-apisports-key": key
    };

    const liveResp = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      { headers }
    );

    const liveData = await liveResp.json();

    if (liveData.message === "Too many requests") {
      if (cache.data) {
        return res.status(200).json({
          ...cache.data,
          cache: true,
          warning: "Too many requests. Mostrando último cache disponible."
        });
      }

      return res.status(429).json({
        error: "Too many requests y no hay cache disponible"
      });
    }

    if (liveData.errors && Object.keys(liveData.errors).length > 0) {
      return res.status(200).json(liveData);
    }

    const mundial = (liveData.response || []).filter(
      m => m.league?.id === 1 && m.league?.season === 2026
    );

    const enriquecidos = await Promise.all(
      mundial.map(async (m) => {
        try {
          const statsResp = await fetch(
            `https://v3.football.api-sports.io/fixtures/statistics?fixture=${m.fixture.id}`,
            { headers }
          );

          const statsData = await statsResp.json();

          return {
            ...m,
            statistics: statsData.response || []
          };

        } catch {
          return {
            ...m,
            statistics: []
          };
        }
      })
    );

    const respuesta = {
      errors: [],
      results: enriquecidos.length,
      response: enriquecidos,
      cache: false
    };

    cache = {
      timestamp: ahora,
      data: respuesta
    };

    return res.status(200).json(respuesta);

  } catch (error) {
    if (cache.data) {
      return res.status(200).json({
        ...cache.data,
        cache: true,
        warning: "Error de API. Mostrando cache."
      });
    }

    return res.status(500).json({
      error: error.message
    });
  }
}
