export default async function handler(req, res) {
  try {
    const key = process.env.API_FUTBOL_KEY;

    if (!key) {
      return res.status(500).json({
        error: "No se encontró API_FUTBOL_KEY"
      });
    }

    const headers = { "x-apisports-key": key };

    const fechas = [
      "2026-06-11","2026-06-12","2026-06-13","2026-06-14","2026-06-15",
      "2026-06-16","2026-06-17","2026-06-18","2026-06-19","2026-06-20",
      "2026-06-21","2026-06-22","2026-06-23","2026-06-24","2026-06-25",
      "2026-06-26","2026-06-27","2026-06-28"
    ];

    const responses = await Promise.all([
      fetch("https://v3.football.api-sports.io/fixtures?live=all", { headers }),
      ...fechas.map(fecha =>
        fetch(`https://v3.football.api-sports.io/fixtures?league=1&season=2026&date=${fecha}`, { headers })
      )
    ]);

    const jsons = await Promise.all(responses.map(r => r.json()));

    const mapa = new Map();

    jsons.forEach(data => {
      (data.response || []).forEach(m => {
        if (m.league?.id === 1 && m.league?.season === 2026) {
          mapa.set(m.fixture.id, m);
        }
      });
    });

    const partidos = Array.from(mapa.values());

    const enriquecidos = await Promise.all(
      partidos.map(async m => {
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
