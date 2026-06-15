export default async function handler(req, res) {
  try {
    const key =
      process.env.API_FUBOL_KEY ||
      process.env.API_FOOTBALL_KEY;

    const response = await fetch(
      "https://v3.football.api-sports.io/fixtures?live=all",
      {
        headers: {
          "x-apisports-key": key
        }
      }
    );

    const data = await response.json();

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
