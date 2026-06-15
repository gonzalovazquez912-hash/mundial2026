export default async function handler(req, res) {
  try {
    const key = process.env.API_FUTBOL_KEY;

    if (!key) {
      return res.status(500).json({
        error: "No se encontró API_FUTBOL_KEY"
      });
    }

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": key
        }
      }
    );

    const data = await response.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
