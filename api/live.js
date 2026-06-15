export default async function handler(req, res) {
  try {
    const key = process.env.API_FUBOL_KEY || process.env.API_FOOTBALL_KEY;

    const liveResponse = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": key
        }
      }
    );

    const liveData = await liveResponse.json();

    const mundial = (liveData.response || []).filter(
      m => m.league?.name === "World Cup" && m.league?.season === 2026
    );

    const enriquecido = await Promise.all(
      mundial.map(async (m) => {
        const statsResponse = await fetch(
          `https://v3.football.api-sports.io/fixtures/statistics?fixture=${m.fixture.id}`,
          {
            headers: {
              "x-apisports-key": key
            }
          }
        );

        const statsData = await statsResponse.json();

        return {
          ...m,
          statistics: statsData.response || []
        };
      })
    );

    return res.status(200).json({
      errors: [],
      results: enriquecido.length,
      response: enriquecido
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
