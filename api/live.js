export default async function handler(req, res) {
  try {
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

    return res.status(200).json({
      errors: [],
      results: enriquecidos.length,
      response: enriquecidos
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
