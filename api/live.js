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

    const fixturesResp = await fetch(
      "https://v3.football.api-sports.io/fixtures?league=1&season=2026",
      { headers }
    );

    const fixturesData = await fixturesResp.json();

    if (fixturesData.errors && Object.keys(fixturesData.errors).length > 0) {
      return res.status(200).json(fixturesData);
    }

    const mundial = (fixturesData.response || []).filter(
      m => m.league?.id === 1 && m.league?.season === 2026
    );

    const partidosConStats = await Promise.all(
      mundial.map(async (m) => {
        const estado = m.fixture?.status?.short;

        const yaEmpezo = [
          "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "FT", "AET", "PEN"
        ].includes(estado);

        if (!yaEmpezo) {
          return {
            ...m,
            statistics: []
          };
        }

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

        } catch (e) {
          return {
            ...m,
            statistics: []
          };
        }
      })
    );

    return res.status(200).json({
      errors: [],
      results: partidosConStats.length,
      response: partidosConStats
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
