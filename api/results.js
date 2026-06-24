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

    if (!upstream.ok) {
      return res.status(upstream.status).json({
        error: "No se pudo consultar la API de resultados",
        status: upstream.status
      });
    }

    const data = await upstream.json();

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({
      error: "Error interno consultando resultados",
      message: error.message
    });
  }
}
