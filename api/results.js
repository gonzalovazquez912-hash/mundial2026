// api/results.js
// Endpoint proxy para Vercel.
// La página llama /api/results para no depender de CORS desde el navegador.

export default async function handler(req, res) {
  try {
    const upstream = await fetch("https://worldcup26.ir/get/games", {
      headers: {
        "accept": "application/json"
      }
    });

    if (upstream.ok) {
      const data = await upstream.json();
      res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
      return res.status(200).json(data);
    }

    return res.status(200).json({
      fallback: true,
      games: []
    });
  } catch (error) {
    return res.status(200).json({
      fallback: true,
      games: []
    });
  }
}
