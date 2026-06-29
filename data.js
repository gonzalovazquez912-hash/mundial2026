const KNOCKOUT_MATCHES = [
  {
    "id": "53452545",
    "date": "2026-06-28",
    "timeAR": "16:00",
    "round": "16avos",
    "home": "South Africa",
    "away": "Canada",
    "homeGoals": 0,
    "awayGoals": 1,
    "status": "FT",
    "winner": "Canada",
    "advancesTo": "53452511"
  },
  {
    "id": "53452557",
    "date": "2026-06-29",
    "timeAR": "14:00",
    "round": "16avos",
    "home": "Brazil",
    "away": "Japan",
    "status": "SCHEDULED",
    "advancesTo": "53452517"
  },
  {
    "id": "53452541",
    "date": "2026-06-29",
    "timeAR": "17:30",
    "round": "16avos",
    "home": "Germany",
    "away": "Paraguay",
    "status": "SCHEDULED",
    "advancesTo": "53452509"
  },
  {
    "id": "53452547",
    "date": "2026-06-29",
    "timeAR": "22:00",
    "round": "16avos",
    "home": "Netherlands",
    "away": "Morocco",
    "status": "SCHEDULED",
    "advancesTo": "53452511"
  },
  {
    "id": "53452561",
    "date": "2026-06-30",
    "timeAR": "14:00",
    "round": "16avos",
    "home": "Ivory Coast",
    "away": "Norway",
    "status": "SCHEDULED",
    "advancesTo": "53452517"
  },
  {
    "id": "53452543",
    "date": "2026-06-30",
    "timeAR": "18:00",
    "round": "16avos",
    "home": "France",
    "away": "Sweden",
    "status": "SCHEDULED",
    "advancesTo": "53452509"
  },
  {
    "id": "53452563",
    "date": "2026-06-30",
    "timeAR": "22:00",
    "round": "16avos",
    "home": "Mexico",
    "away": "Ecuador",
    "status": "SCHEDULED",
    "advancesTo": "53452519"
  },
  {
    "id": "53452565",
    "date": "2026-07-01",
    "timeAR": "13:00",
    "round": "16avos",
    "home": "England",
    "away": "DR Congo",
    "status": "SCHEDULED",
    "advancesTo": "53452519"
  },
  {
    "id": "53452555",
    "date": "2026-07-01",
    "timeAR": "17:00",
    "round": "16avos",
    "home": "Belgium",
    "away": "Senegal",
    "status": "SCHEDULED",
    "advancesTo": "53452515"
  },
  {
    "id": "53452553",
    "date": "2026-07-01",
    "timeAR": "21:00",
    "round": "16avos",
    "home": "USA",
    "away": "Bosnia and Herzegovina",
    "status": "SCHEDULED",
    "advancesTo": "53452515"
  },
  {
    "id": "53452551",
    "date": "2026-07-02",
    "timeAR": "16:00",
    "round": "16avos",
    "home": "Spain",
    "away": "Austria",
    "status": "SCHEDULED",
    "advancesTo": "53452513"
  },
  {
    "id": "53452549",
    "date": "2026-07-02",
    "timeAR": "20:00",
    "round": "16avos",
    "home": "Portugal",
    "away": "Croatia",
    "status": "SCHEDULED",
    "advancesTo": "53452513"
  },
  {
    "id": "53452505",
    "date": "2026-07-03",
    "timeAR": "00:00",
    "round": "16avos",
    "home": "Switzerland",
    "away": "Algeria",
    "status": "SCHEDULED",
    "advancesTo": "53452523"
  },
  {
    "id": "53452503",
    "date": "2026-07-03",
    "timeAR": "15:00",
    "round": "16avos",
    "home": "Australia",
    "away": "Egypt",
    "status": "SCHEDULED",
    "advancesTo": "53452521"
  },
  {
    "id": "53452569",
    "date": "2026-07-03",
    "timeAR": "19:00",
    "round": "16avos",
    "home": "Argentina",
    "away": "Cabo Verde",
    "status": "SCHEDULED",
    "advancesTo": "53452521"
  },
  {
    "id": "53452507",
    "date": "2026-07-03",
    "timeAR": "22:30",
    "round": "16avos",
    "home": "Colombia",
    "away": "Ghana",
    "status": "SCHEDULED",
    "advancesTo": "53452523"
  }
];
const TEAM_MODEL = {
  "Canada": {
    "fifaRank": 31,
    "elo": 1715,
    "wcPts": 4,
    "wcGF": 8,
    "wcGA": 3,
    "wcForm": [
      "D",
      "W",
      "L",
      "W"
    ],
    "recentGF": 1.75,
    "recentGA": 1.15,
    "shotsOnTarget": 4.4,
    "corners": 4.8,
    "injuriesImpact": 0.02
  },
  "South Africa": {
    "fifaRank": 61,
    "elo": 1620,
    "wcPts": 4,
    "wcGF": 2,
    "wcGA": 3,
    "wcForm": [
      "L",
      "D",
      "W",
      "L"
    ],
    "recentGF": 1.05,
    "recentGA": 1.3,
    "shotsOnTarget": 3.0,
    "corners": 3.5,
    "injuriesImpact": 0.02
  },
  "Brazil": {
    "fifaRank": 2,
    "elo": 2015,
    "wcPts": 7,
    "wcGF": 7,
    "wcGA": 1,
    "wcForm": [
      "D",
      "W",
      "W"
    ],
    "recentGF": 2.05,
    "recentGA": 0.8,
    "shotsOnTarget": 6.1,
    "corners": 6.2,
    "injuriesImpact": 0.04
  },
  "Japan": {
    "fifaRank": 18,
    "elo": 1810,
    "wcPts": 5,
    "wcGF": 7,
    "wcGA": 3,
    "wcForm": [
      "D",
      "W",
      "D"
    ],
    "recentGF": 1.85,
    "recentGA": 1.0,
    "shotsOnTarget": 4.9,
    "corners": 5.1,
    "injuriesImpact": 0.02
  },
  "Germany": {
    "fifaRank": 9,
    "elo": 1905,
    "wcPts": 6,
    "wcGF": 10,
    "wcGA": 4,
    "wcForm": [
      "W",
      "W",
      "L"
    ],
    "recentGF": 2.2,
    "recentGA": 0.95,
    "shotsOnTarget": 5.8,
    "corners": 6.0,
    "injuriesImpact": 0.03
  },
  "Paraguay": {
    "fifaRank": 48,
    "elo": 1665,
    "wcPts": 4,
    "wcGF": 2,
    "wcGA": 4,
    "wcForm": [
      "L",
      "W",
      "D"
    ],
    "recentGF": 1.1,
    "recentGA": 1.15,
    "shotsOnTarget": 3.4,
    "corners": 4.0,
    "injuriesImpact": 0.03
  },
  "Netherlands": {
    "fifaRank": 7,
    "elo": 1925,
    "wcPts": 7,
    "wcGF": 10,
    "wcGA": 4,
    "wcForm": [
      "D",
      "W",
      "W"
    ],
    "recentGF": 2.1,
    "recentGA": 1.05,
    "shotsOnTarget": 5.7,
    "corners": 6.1,
    "injuriesImpact": 0.03
  },
  "Morocco": {
    "fifaRank": 14,
    "elo": 1835,
    "wcPts": 7,
    "wcGF": 6,
    "wcGA": 3,
    "wcForm": [
      "D",
      "W",
      "W"
    ],
    "recentGF": 1.65,
    "recentGA": 0.8,
    "shotsOnTarget": 4.8,
    "corners": 5.1,
    "injuriesImpact": 0.02
  },
  "Ivory Coast": {
    "fifaRank": 39,
    "elo": 1695,
    "wcPts": 6,
    "wcGF": 4,
    "wcGA": 2,
    "wcForm": [
      "W",
      "L",
      "W"
    ],
    "recentGF": 1.45,
    "recentGA": 1.05,
    "shotsOnTarget": 4.2,
    "corners": 4.7,
    "injuriesImpact": 0.03
  },
  "Norway": {
    "fifaRank": 34,
    "elo": 1760,
    "wcPts": 6,
    "wcGF": 8,
    "wcGA": 7,
    "wcForm": [
      "W",
      "W",
      "L"
    ],
    "recentGF": 1.85,
    "recentGA": 1.3,
    "shotsOnTarget": 4.8,
    "corners": 4.6,
    "injuriesImpact": 0.03
  },
  "France": {
    "fifaRank": 3,
    "elo": 2020,
    "wcPts": 9,
    "wcGF": 10,
    "wcGA": 2,
    "wcForm": [
      "W",
      "W",
      "W"
    ],
    "recentGF": 2.25,
    "recentGA": 0.8,
    "shotsOnTarget": 6.3,
    "corners": 6.3,
    "injuriesImpact": 0.03
  },
  "Sweden": {
    "fifaRank": 29,
    "elo": 1740,
    "wcPts": 4,
    "wcGF": 7,
    "wcGA": 7,
    "wcForm": [
      "W",
      "L",
      "D"
    ],
    "recentGF": 1.75,
    "recentGA": 1.35,
    "shotsOnTarget": 4.4,
    "corners": 5.0,
    "injuriesImpact": 0.03
  },
  "Mexico": {
    "fifaRank": 15,
    "elo": 1810,
    "wcPts": 9,
    "wcGF": 6,
    "wcGA": 0,
    "wcForm": [
      "W",
      "W",
      "W"
    ],
    "recentGF": 1.55,
    "recentGA": 0.8,
    "shotsOnTarget": 4.9,
    "corners": 5.4,
    "injuriesImpact": 0.02
  },
  "Ecuador": {
    "fifaRank": 27,
    "elo": 1750,
    "wcPts": 4,
    "wcGF": 2,
    "wcGA": 2,
    "wcForm": [
      "L",
      "D",
      "W"
    ],
    "recentGF": 1.25,
    "recentGA": 0.95,
    "shotsOnTarget": 3.8,
    "corners": 4.2,
    "injuriesImpact": 0.03
  },
  "England": {
    "fifaRank": 4,
    "elo": 1985,
    "wcPts": 7,
    "wcGF": 6,
    "wcGA": 2,
    "wcForm": [
      "W",
      "D",
      "W"
    ],
    "recentGF": 2.15,
    "recentGA": 0.95,
    "shotsOnTarget": 6.2,
    "corners": 6.4,
    "injuriesImpact": 0.03
  },
  "DR Congo": {
    "fifaRank": 61,
    "elo": 1665,
    "wcPts": 4,
    "wcGF": 4,
    "wcGA": 3,
    "wcForm": [
      "D",
      "L",
      "W"
    ],
    "recentGF": 1.2,
    "recentGA": 1.05,
    "shotsOnTarget": 3.6,
    "corners": 4.1,
    "injuriesImpact": 0.02
  },
  "Belgium": {
    "fifaRank": 8,
    "elo": 1875,
    "wcPts": 5,
    "wcGF": 6,
    "wcGA": 2,
    "wcForm": [
      "D",
      "D",
      "W"
    ],
    "recentGF": 1.75,
    "recentGA": 0.95,
    "shotsOnTarget": 5.0,
    "corners": 5.4,
    "injuriesImpact": 0.04
  },
  "Senegal": {
    "fifaRank": 20,
    "elo": 1785,
    "wcPts": 3,
    "wcGF": 8,
    "wcGA": 6,
    "wcForm": [
      "L",
      "L",
      "W"
    ],
    "recentGF": 1.55,
    "recentGA": 1.1,
    "shotsOnTarget": 4.3,
    "corners": 4.7,
    "injuriesImpact": 0.03
  },
  "USA": {
    "fifaRank": 16,
    "elo": 1805,
    "wcPts": 6,
    "wcGF": 8,
    "wcGA": 4,
    "wcForm": [
      "W",
      "W",
      "L"
    ],
    "recentGF": 2.05,
    "recentGA": 0.85,
    "shotsOnTarget": 5.2,
    "corners": 5.6,
    "injuriesImpact": 0.02
  },
  "Bosnia and Herzegovina": {
    "fifaRank": 63,
    "elo": 1625,
    "wcPts": 4,
    "wcGF": 5,
    "wcGA": 6,
    "wcForm": [
      "D",
      "L",
      "W"
    ],
    "recentGF": 1.05,
    "recentGA": 1.65,
    "shotsOnTarget": 3.2,
    "corners": 3.6,
    "injuriesImpact": 0.04
  },
  "Spain": {
    "fifaRank": 6,
    "elo": 1960,
    "wcPts": 7,
    "wcGF": 5,
    "wcGA": 0,
    "wcForm": [
      "D",
      "W",
      "W"
    ],
    "recentGF": 2.0,
    "recentGA": 0.75,
    "shotsOnTarget": 5.8,
    "corners": 6.0,
    "injuriesImpact": 0.03
  },
  "Austria": {
    "fifaRank": 25,
    "elo": 1775,
    "wcPts": 4,
    "wcGF": 6,
    "wcGA": 6,
    "wcForm": [
      "W",
      "L",
      "D"
    ],
    "recentGF": 1.55,
    "recentGA": 1.2,
    "shotsOnTarget": 4.2,
    "corners": 4.8,
    "injuriesImpact": 0.03
  },
  "Portugal": {
    "fifaRank": 5,
    "elo": 1965,
    "wcPts": 5,
    "wcGF": 6,
    "wcGA": 1,
    "wcForm": [
      "D",
      "W",
      "D"
    ],
    "recentGF": 2.05,
    "recentGA": 0.85,
    "shotsOnTarget": 5.6,
    "corners": 6.1,
    "injuriesImpact": 0.04
  },
  "Croatia": {
    "fifaRank": 10,
    "elo": 1875,
    "wcPts": 6,
    "wcGF": 5,
    "wcGA": 5,
    "wcForm": [
      "L",
      "W",
      "W"
    ],
    "recentGF": 1.55,
    "recentGA": 1.1,
    "shotsOnTarget": 4.6,
    "corners": 5.2,
    "injuriesImpact": 0.05
  },
  "Switzerland": {
    "fifaRank": 19,
    "elo": 1795,
    "wcPts": 7,
    "wcGF": 7,
    "wcGA": 3,
    "wcForm": [
      "D",
      "W",
      "W"
    ],
    "recentGF": 1.65,
    "recentGA": 1.0,
    "shotsOnTarget": 4.6,
    "corners": 5.0,
    "injuriesImpact": 0.03
  },
  "Algeria": {
    "fifaRank": 43,
    "elo": 1700,
    "wcPts": 4,
    "wcGF": 5,
    "wcGA": 7,
    "wcForm": [
      "L",
      "W",
      "D"
    ],
    "recentGF": 1.4,
    "recentGA": 1.2,
    "shotsOnTarget": 3.9,
    "corners": 4.3,
    "injuriesImpact": 0.03
  },
  "Australia": {
    "fifaRank": 24,
    "elo": 1745,
    "wcPts": 4,
    "wcGF": 2,
    "wcGA": 2,
    "wcForm": [
      "W",
      "L",
      "D"
    ],
    "recentGF": 1.35,
    "recentGA": 1.1,
    "shotsOnTarget": 3.9,
    "corners": 4.5,
    "injuriesImpact": 0.03
  },
  "Egypt": {
    "fifaRank": 32,
    "elo": 1725,
    "wcPts": 5,
    "wcGF": 5,
    "wcGA": 3,
    "wcForm": [
      "D",
      "W",
      "D"
    ],
    "recentGF": 1.45,
    "recentGA": 0.95,
    "shotsOnTarget": 4.1,
    "corners": 4.6,
    "injuriesImpact": 0.03
  },
  "Argentina": {
    "fifaRank": 1,
    "elo": 2070,
    "wcPts": 9,
    "wcGF": 8,
    "wcGA": 1,
    "wcForm": [
      "W",
      "W",
      "W"
    ],
    "recentGF": 2.2,
    "recentGA": 0.7,
    "shotsOnTarget": 6.2,
    "corners": 6.0,
    "injuriesImpact": 0.02
  },
  "Cabo Verde": {
    "fifaRank": 65,
    "elo": 1600,
    "wcPts": 3,
    "wcGF": 2,
    "wcGA": 2,
    "wcForm": [
      "D",
      "D",
      "D"
    ],
    "recentGF": 1.05,
    "recentGA": 1.1,
    "shotsOnTarget": 3.1,
    "corners": 3.7,
    "injuriesImpact": 0.03
  },
  "Colombia": {
    "fifaRank": 12,
    "elo": 1845,
    "wcPts": 7,
    "wcGF": 4,
    "wcGA": 1,
    "wcForm": [
      "W",
      "W",
      "D"
    ],
    "recentGF": 1.85,
    "recentGA": 0.95,
    "shotsOnTarget": 5.1,
    "corners": 5.5,
    "injuriesImpact": 0.03
  },
  "Ghana": {
    "fifaRank": 67,
    "elo": 1645,
    "wcPts": 4,
    "wcGF": 2,
    "wcGA": 2,
    "wcForm": [
      "W",
      "D",
      "L"
    ],
    "recentGF": 1.1,
    "recentGA": 1.2,
    "shotsOnTarget": 3.3,
    "corners": 3.7,
    "injuriesImpact": 0.02
  }
};
