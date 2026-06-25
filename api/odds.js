export default async function handler(req, res) {
  const odds = {
    "Ecuador-Germany": {
      home: 0.16,
      draw: 0.24,
      away: 0.60
    },

    "Curacao-Ivory Coast": {
      home: 0.16,
      draw: 0.27,
      away: 0.57
    },

    "Tunisia-Netherlands": {
      home: 0.09,
      draw: 0.19,
      away: 0.72
    },

    "Japan-Sweden": {
      home: 0.43,
      draw: 0.28,
      away: 0.29
    },

    "Turkiye-USA": {
      home: 0.14,
      draw: 0.23,
      away: 0.63
    },

    "Paraguay-Australia": {
      home: 0.33,
      draw: 0.31,
      away: 0.36
    }
  };

  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");
  return res.status(200).json(odds);
}
