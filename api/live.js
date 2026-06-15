export default async function handler(req, res) {
  try {
    const key = process.env.API_FUTBOL_KEY;

    if (!key) {
      return res.status(500).json({
        error: "No se encontró API_FUTBOL_KEY"
      });
    }

    const headers = { "x-apisports-key": key };

    const liveResp = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      { headers }
    );

    const todayResp = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&season=2026&date=2026-06-14",
      { headers }
    );

    const liveData = await liveResp.json();
    const todayData = await todayResp.json();

    const unidos = [
      ...(liveData.response || []),
      ...(todayData.response || [])
    ];

    const mapa = new Map();

    unidos.forEach(m => {
      if (m.league?.name === "World Cup" && m.league?.season === 2026) {
        mapa.set(m.fixture.id, m);
      }
    });

    const partidos = Array.from(mapa.values());

    return res.status(200).json({
      errors: [],
      results: partidos.length,
      response: partidos
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
