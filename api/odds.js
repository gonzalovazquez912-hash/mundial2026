// api/odds.js
// Plantilla para odds.
// No pongas API keys dentro del index.html porque quedan públicas.
// Si contratás una API de odds, guardá la key en Vercel como variable de entorno.

export default async function handler(req, res) {
  try {
    // Ejemplo futuro:
    // const apiKey = process.env.ODDS_API_KEY;
    // const upstream = await fetch(`https://api.the-odds-api.com/v4/sports/soccer/odds/?apiKey=${apiKey}&regions=us,eu&markets=h2h`);
    // const data = await upstream.json();
    // Normalizarías a este formato:

    const odds = {
      "Switzerland-Canada": { "home": 0.36, "draw": 0.29, "away": 0.35 },
      "Bosnia and Herzegovina-Qatar": { "home": 0.43, "draw": 0.28, "away": 0.29 },
      "Scotland-Brazil": { "home": 0.13, "draw": 0.22, "away": 0.65 },
      "Morocco-Haiti": { "home": 0.67, "draw": 0.21, "away": 0.12 },
      "Czechia-Mexico": { "home": 0.22, "draw": 0.28, "away": 0.50 },
      "South Africa-Korea Republic": { "home": 0.24, "draw": 0.28, "away": 0.48 }
    };

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
    return res.status(200).json(odds);
  } catch (error) {
    return res.status(500).json({
      error: "Error obteniendo odds",
      message: error.message
    });
  }
}
