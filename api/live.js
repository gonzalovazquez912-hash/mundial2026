export default async function handler(req, res) {
  try {
    const key = process.env.HIGHLIGHTLY_KEY;

    if (!key) {
      return res.status(500).json({
        error: "No se encontró HIGHLIGHTLY_KEY"
      });
    }

    const response = await fetch(
      "https://football-highlights-api.p.rapidapi.com/matches",
      {
        headers: {
          "x-rapidapi-key": key,
          "x-rapidapi-host": "football-highlights-api.p.rapidapi.com"
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
