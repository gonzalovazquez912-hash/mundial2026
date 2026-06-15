[index_completo_api_live.html](https://github.com/user-attachments/files/28936950/index_completo_api_live.html)
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Mundial 2026 — Pronósticos en vivo</title>
<style>
:root {
  --verde:#00C853;--verde-dim:#00C85320;--rojo:#FF3B3B;--rojo-dim:#FF3B3B20;
  --amarillo:#FFD600;--am-dim:#FFD60020;--bg:#0D0D0D;--card:#161616;
  --border:#2A2A2A;--muted:#666;--text:#F0F0F0;--azul:#4A9EFF;--azul-dim:#4A9EFF18;
}
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;700&display=swap');
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
body{background:var(--bg);color:var(--text);font-family:'Inter',system-ui,sans-serif;font-size:14px;min-height:100vh}

/* HEADER */
.header{padding:1.5rem 1.5rem 1rem;border-bottom:1px solid var(--border);display:flex;align-items:flex-end;justify-content:space-between;flex-wrap:wrap;gap:1rem;position:sticky;top:0;background:var(--bg);z-index:100}
.logo{font-family:'Space Grotesk',sans-serif;font-size:clamp(1.3rem,3.5vw,2rem);font-weight:700;letter-spacing:-.03em;line-height:1}
.logo span{color:var(--verde)}
.logo-sub{font-size:11px;color:var(--muted);margin-top:3px;text-transform:uppercase;letter-spacing:.05em}
.header-right{display:flex;align-items:center;gap:10px;flex-wrap:wrap}
.search-box{display:flex;align-items:center;gap:8px;background:var(--card);border:1px solid var(--border);border-radius:10px;padding:7px 13px;width:230px;transition:border-color .2s}
.search-box:focus-within{border-color:var(--verde)}
.search-box svg{color:var(--muted);flex-shrink:0}
.search-box input{background:none;border:none;outline:none;color:var(--text);font-size:13px;width:100%;font-family:'Inter',sans-serif}
.search-box input::placeholder{color:var(--muted)}
.sync-btn{display:flex;align-items:center;gap:7px;padding:7px 14px;background:var(--verde-dim);border:1px solid var(--verde);border-radius:10px;color:var(--verde);font-size:12px;font-weight:600;cursor:pointer;font-family:'Inter',sans-serif;transition:all .2s;white-space:nowrap}
.sync-btn:hover{background:var(--verde);color:#000}
.sync-btn.loading{opacity:.6;pointer-events:none}
.sync-btn svg{transition:transform .4s}
.sync-btn.loading svg{animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}

/* BANNER */
.sync-banner{margin:12px 1.5rem;padding:10px 14px;border-radius:10px;font-size:12px;display:none;align-items:center;gap:8px}
.sync-banner.ok{background:var(--verde-dim);border:1px solid var(--verde);color:var(--verde);display:flex}
.sync-banner.err{background:var(--rojo-dim);border:1px solid var(--rojo);color:var(--rojo);display:flex}
.sync-banner.loading{background:var(--azul-dim);border:1px solid var(--azul);color:var(--azul);display:flex}

/* FILTERS */
.filters{display:flex;gap:7px;padding:.9rem 1.5rem;border-bottom:1px solid var(--border);overflow-x:auto;scrollbar-width:none}
.filters::-webkit-scrollbar{display:none}
.pill{padding:5px 13px;border-radius:99px;border:1px solid var(--border);background:none;color:var(--muted);cursor:pointer;font-size:12px;font-family:'Inter',sans-serif;white-space:nowrap;transition:all .15s}
.pill:hover{border-color:#555;color:var(--text)}
.pill.active{background:var(--verde);border-color:var(--verde);color:#000;font-weight:600}
.sep{width:1px;background:var(--border);margin:0 3px;flex-shrink:0}

/* MAIN */
.main{padding:1rem 1.5rem}
.meta-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:.9rem;flex-wrap:wrap;gap:6px}
.count{font-size:12px;color:var(--muted)}
.count strong{color:var(--verde)}
.last-sync{font-size:11px;color:var(--muted)}


/* DASHBOARD */
.dashboard-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:12px}
.kpi-card{background:var(--card);border:1px solid var(--border);border-radius:13px;padding:12px}
.kpi-label{font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.07em;margin-bottom:6px}
.kpi-value{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700}
.kpi-value.green{color:var(--verde)}.kpi-value.blue{color:var(--azul)}.kpi-value.yellow{color:var(--amarillo)}
.panel{background:var(--card);border:1px solid var(--border);border-radius:13px;padding:12px;margin-bottom:12px}
.panel-title{font-size:12px;font-weight:700;color:var(--text);margin-bottom:10px;text-transform:uppercase;letter-spacing:.05em}
.standings-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:10px}
.standing-table{width:100%;border-collapse:collapse;font-size:11px}
.standing-table th{color:var(--muted);font-weight:600;text-align:right;padding:5px;border-bottom:1px solid var(--border)}
.standing-table th:first-child,.standing-table td:first-child{text-align:left}
.standing-table td{padding:5px;text-align:right;border-bottom:1px solid #ffffff08}
.standing-table tr:nth-child(1) td,.standing-table tr:nth-child(2) td{color:var(--verde);font-weight:700}
.status-note{font-size:11px;color:var(--muted);margin-bottom:10px}
@media(max-width:760px){.dashboard-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}

/* MATCH CARD */
.match-card{background:var(--card);border:1px solid var(--border);border-radius:13px;overflow:hidden;transition:border-color .2s,transform .12s;cursor:pointer;margin-bottom:9px}
.match-card:hover{border-color:#3A3A3A;transform:translateY(-1px)}
.match-card.expanded{border-color:var(--verde)}
.match-card.has-real{border-left:3px solid var(--azul)}
.match-card.has-real.expanded{border-color:var(--azul);border-left-width:3px}

.match-top{display:grid;grid-template-columns:72px 1fr auto 1fr auto;align-items:center;gap:10px;padding:13px 15px}
.meta{display:flex;flex-direction:column;gap:2px}
.grupo-tag{font-size:10px;font-weight:700;color:var(--verde);letter-spacing:.07em;text-transform:uppercase}
.jornada-tag{font-size:10px;color:var(--muted)}
.live-dot{display:inline-block;width:6px;height:6px;border-radius:50%;background:var(--rojo);margin-right:4px;animation:pulse 1.2s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:.3}}

.team{display:flex;flex-direction:column;gap:2px}
.team.right{text-align:right;align-items:flex-end}
.tname{font-size:14px;font-weight:600;letter-spacing:-.01em}
.trank{font-size:10px;color:var(--muted)}

.score-col{text-align:center;min-width:80px}
.score-pred{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--text);line-height:1}
.score-real{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--azul);line-height:1;margin-top:2px}
.score-label{font-size:9px;color:var(--muted);letter-spacing:.05em;text-transform:uppercase;margin-top:1px}
.winner-tag{font-size:10px;padding:2px 8px;border-radius:99px;display:inline-block;font-weight:600;margin-top:3px}
.wa{background:var(--verde-dim);color:var(--verde)}
.wb{background:var(--rojo-dim);color:var(--rojo)}
.wd{background:#ffffff12;color:#888}
.wreal{background:var(--azul-dim);color:var(--azul)}

/* PROB BAR */
.prob-wrap{padding:0 15px 10px;display:flex;flex-direction:column;gap:4px}
.prob-track{display:flex;height:4px;border-radius:2px;overflow:hidden;gap:1px}
.pa{background:var(--verde);border-radius:2px;transition:flex .4s}
.pd{background:#3A3A3A;border-radius:2px;transition:flex .4s}
.pb{background:var(--rojo);border-radius:2px;transition:flex .4s}
.prob-nums{display:flex;justify-content:space-between;font-size:11px;color:var(--muted)}
.prob-nums .pna{color:var(--verde)}
.prob-nums .pnb{color:var(--rojo)}

/* DETAIL */
.detail{display:none;border-top:1px solid var(--border);padding:14px 15px;grid-template-columns:1fr 1fr;gap:16px}
.match-card.expanded .detail{display:grid}
.detail h4{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:10px;font-weight:600}

.stat-row{display:flex;align-items:center;gap:8px;margin-bottom:7px;font-size:12px}
.slabel{color:var(--muted);width:80px;flex-shrink:0}
.sbars{flex:1;display:flex;gap:2px}
.sba{background:var(--verde);height:5px;border-radius:3px;transition:width .3s}
.sbb{background:var(--rojo);height:5px;border-radius:3px;transition:width .3s}
.svals{min-width:74px;display:flex;justify-content:space-between;font-size:11px}
.svals .va{color:var(--verde);font-weight:500}
.svals .vb{color:var(--rojo);font-weight:500}

.badges{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}
.badge{font-size:11px;padding:3px 10px;border-radius:99px;border:1px solid;font-weight:500}
.bg{background:var(--verde-dim);border-color:var(--verde);color:var(--verde)}
.by{background:var(--am-dim);border-color:var(--amarillo);color:var(--amarillo)}
.br{background:var(--rojo-dim);border-color:var(--rojo);color:var(--rojo)}
.bm{background:#ffffff08;border-color:var(--border);color:var(--muted)}
.bb{background:var(--azul-dim);border-color:var(--azul);color:var(--azul)}

.bignum{font-family:'Space Grotesk',sans-serif;font-size:26px;font-weight:700;line-height:1}
.bignum-label{font-size:10px;color:var(--muted);margin-top:2px}

.real-result-box{background:#4A9EFF12;border:1px solid var(--azul);border-radius:8px;padding:10px 12px;margin-top:10px}
.real-result-box .rr-title{font-size:10px;color:var(--azul);font-weight:600;text-transform:uppercase;letter-spacing:.06em;margin-bottom:6px}
.real-score{font-family:'Space Grotesk',sans-serif;font-size:20px;font-weight:700;color:var(--azul)}
.diff-ok{color:var(--verde);font-size:11px;margin-top:4px}
.diff-no{color:var(--amarillo);font-size:11px;margin-top:4px}

/* EMPTY */
.empty{text-align:center;padding:3rem;color:var(--muted)}
.empty svg{margin-bottom:10px;opacity:.4}
.empty h3{font-size:15px;color:var(--text);margin-bottom:4px}

@media(max-width:600px){
  .match-top{grid-template-columns:60px 1fr auto 1fr auto;gap:7px;padding:11px 12px}
  .tname{font-size:13px}
  .detail{grid-template-columns:1fr}
  .header-right{width:100%}
  .search-box{width:100%;flex:1}
}

.time-box{display:flex;flex-direction:column;gap:2px;font-size:10px;color:var(--muted);align-items:flex-start;min-width:84px}
.time-date{color:var(--text);font-weight:600;font-size:11px}
.time-status{font-size:10px;padding:2px 7px;border-radius:999px;background:#ffffff10;color:var(--muted);display:inline-flex;align-items:center;gap:4px;width:max-content}
.time-status.live{background:var(--rojo-dim);color:var(--rojo)}
.time-status.final{background:var(--azul-dim);color:var(--azul)}
.time-status.pending{background:var(--am-dim);color:var(--amarillo)}
.summary-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;margin-bottom:14px}
.summary-card{background:var(--card);border:1px solid var(--border);border-radius:12px;padding:12px}
.summary-card .num{font-family:'Space Grotesk',sans-serif;font-size:24px;font-weight:700;color:var(--verde)}
.summary-card .lab{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
@media(max-width:700px){.summary-grid{grid-template-columns:repeat(2,1fr)}.time-box{min-width:64px}.time-date{font-size:10px}.time-status{font-size:9px}}

.score-options{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}
.score-option{font-size:11px;padding:4px 8px;border-radius:8px;background:#ffffff08;border:1px solid var(--border);color:var(--text)}
.score-option strong{color:var(--verde)}

</style>
</head>
<body>

<div class="header">
  <div>
    <div class="logo">Mundial <span>2026</span></div>
    <div class="logo-sub">Pronósticos + resultados reales · fase de grupos</div>
  </div>
  <div class="header-right">
    <div class="search-box">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input type="text" placeholder="Buscar equipo..." id="searchInput" oninput="renderAll()" autocomplete="off">
    </div>
    <button class="sync-btn" id="syncBtn" onclick="syncResultados()">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>
      Actualizar resultados
    </button>
  </div>
</div>

<div class="sync-banner" id="syncBanner"></div>

<div class="filters" id="filtersBar">
  <button class="pill active" onclick="setFilter('all',this)">Todos</button>
  <button class="pill" onclick="setFilter('real',this)">Con resultado real</button>
  <button class="pill" onclick="setFilter('pending',this)">Pendientes</button>
  <div class="sep"></div>
  <button class="pill" onclick="setFilter('j1',this)">Jornada 1</button>
  <button class="pill" onclick="setFilter('j2',this)">Jornada 2</button>
  <button class="pill" onclick="setFilter('j3',this)">Jornada 3</button>
  <div class="sep"></div>
</div>

<div class="main">
  <div class="meta-row">
    <div class="count">Mostrando <strong id="countShown">70</strong> partidos</div>
    <div class="last-sync" id="lastSync"></div>
  </div>
  <div id="dashboardSummary"></div>
  <div id="standingsBox"></div>
  <div id="matchesList"></div>
</div>


<script>
const equipos = {
  "Mexico":       {gf:1.6,gc:0.8,r:15,forma:0.75,g:"A",corners:5.2,remates:12,atajadas:3.1,tarjetas:1.8},
  "South Africa": {gf:1.1,gc:1.0,r:55,forma:0.55,g:"A",corners:4.1,remates:9, atajadas:3.8,tarjetas:2.2},
  "South Korea":  {gf:1.5,gc:0.9,r:23,forma:0.70,g:"A",corners:5.0,remates:11,atajadas:3.2,tarjetas:1.9},
  "Czechia":      {gf:1.4,gc:1.0,r:36,forma:0.65,g:"A",corners:5.5,remates:11,atajadas:3.5,tarjetas:2.0},
  "Canada":       {gf:1.3,gc:1.1,r:48,forma:0.60,g:"B",corners:9.6,remates:10,atajadas:3.6,tarjetas:1.7},
  "Bosnia":       {gf:1.2,gc:1.3,r:70,forma:0.50,g:"B",corners:5.0,remates:9, atajadas:4.0,tarjetas:2.4},
  "Qatar":        {gf:1.1,gc:1.2,r:53,forma:0.55,g:"B",corners:4.5,remates:9, atajadas:3.9,tarjetas:2.1},
  "Switzerland":  {gf:1.5,gc:0.9,r:19,forma:0.72,g:"B",corners:5.8,remates:12,atajadas:2.8,tarjetas:1.6},
  "Brazil":       {gf:2.0,gc:0.8,r:5, forma:0.82,g:"C",corners:5.6,remates:15,atajadas:2.5,tarjetas:1.8},
  "Morocco":      {gf:1.5,gc:0.7,r:12,forma:0.78,g:"C",corners:5.3,remates:12,atajadas:2.6,tarjetas:1.9},
  "Haiti":        {gf:0.8,gc:1.6,r:86,forma:0.40,g:"C",corners:3.5,remates:7, atajadas:5.2,tarjetas:2.8},
  "Scotland":     {gf:1.2,gc:1.1,r:39,forma:0.58,g:"C",corners:5.1,remates:10,atajadas:3.4,tarjetas:2.0},
  "USA":          {gf:1.7,gc:0.9,r:16,forma:0.74,g:"D",corners:5.4,remates:13,atajadas:3.0,tarjetas:1.7},
  "Paraguay":     {gf:0.9,gc:0.8,r:43,forma:0.58,g:"D",corners:4.4,remates:9, atajadas:3.3,tarjetas:2.3},
  "Australia":    {gf:1.4,gc:0.8,r:24,forma:0.68,g:"D",corners:5.0,remates:11,atajadas:2.9,tarjetas:1.8},
  "Turkey":       {gf:1.5,gc:1.2,r:27,forma:0.66,g:"D",corners:5.3,remates:12,atajadas:3.5,tarjetas:2.5},
  "Germany":      {gf:2.2,gc:0.9,r:10,forma:0.84,g:"E",corners:6.2,remates:15,atajadas:2.4,tarjetas:1.6},
  "Curacao":      {gf:0.8,gc:2.1,r:90,forma:0.35,g:"E",corners:3.2,remates:7, atajadas:5.8,tarjetas:2.9},
  "Ivory Coast":  {gf:1.6,gc:0.8,r:38,forma:0.72,g:"E",corners:4.8,remates:12,atajadas:2.8,tarjetas:2.1},
  "Ecuador":      {gf:0.9,gc:0.4,r:25,forma:0.74,g:"E",corners:4.6,remates:10,atajadas:2.2,tarjetas:1.9},
  "Netherlands":  {gf:1.8,gc:0.9,r:7, forma:0.80,g:"F",corners:5.9,remates:14,atajadas:2.6,tarjetas:1.7},
  "Japan":        {gf:1.7,gc:0.8,r:18,forma:0.76,g:"F",corners:5.2,remates:13,atajadas:2.7,tarjetas:1.5},
  "Sweden":       {gf:1.4,gc:1.0,r:30,forma:0.62,g:"F",corners:5.1,remates:11,atajadas:3.3,tarjetas:1.8},
  "Tunisia":      {gf:1.0,gc:0.7,r:41,forma:0.57,g:"F",corners:4.3,remates:9, atajadas:3.1,tarjetas:2.0},
  "Spain":        {gf:2.0,gc:0.7,r:3, forma:0.88,g:"G",corners:6.8,remates:16,atajadas:2.0,tarjetas:1.5},
  "Cape Verde":   {gf:1.2,gc:0.9,r:65,forma:0.58,g:"G",corners:4.0,remates:9, atajadas:3.6,tarjetas:2.2},
  "Saudi Arabia": {gf:1.1,gc:1.1,r:60,forma:0.52,g:"G",corners:4.2,remates:9, atajadas:3.9,tarjetas:2.0},
  "Uruguay":      {gf:1.7,gc:0.7,r:11,forma:0.80,g:"G",corners:5.0,remates:13,atajadas:2.4,tarjetas:2.3},
  "Belgium":      {gf:1.8,gc:0.9,r:8, forma:0.78,g:"H",corners:6.3,remates:14,atajadas:2.7,tarjetas:1.9},
  "Egypt":        {gf:1.5,gc:0.8,r:34,forma:0.68,g:"H",corners:4.7,remates:11,atajadas:3.0,tarjetas:2.1},
  "Iran":         {gf:1.5,gc:0.8,r:20,forma:0.70,g:"H",corners:4.8,remates:11,atajadas:3.0,tarjetas:2.2},
  "New Zealand":  {gf:1.0,gc:1.3,r:80,forma:0.45,g:"H",corners:3.8,remates:8, atajadas:4.5,tarjetas:2.0},
  "France":       {gf:2.1,gc:0.7,r:2, forma:0.88,g:"I",corners:5.5,remates:15,atajadas:2.1,tarjetas:1.6},
  "Senegal":      {gf:1.5,gc:0.6,r:17,forma:0.76,g:"I",corners:5.1,remates:12,atajadas:2.3,tarjetas:2.0},
  "Iraq":         {gf:1.2,gc:1.0,r:58,forma:0.55,g:"I",corners:4.2,remates:9, atajadas:3.7,tarjetas:2.3},
  "Norway":       {gf:1.7,gc:1.1,r:33,forma:0.65,g:"I",corners:5.3,remates:13,atajadas:3.2,tarjetas:1.9},
  "Argentina":    {gf:2.0,gc:0.5,r:1, forma:0.90,g:"J",corners:4.7,remates:15,atajadas:1.7,tarjetas:1.8},
  "Algeria":      {gf:1.5,gc:0.8,r:32,forma:0.68,g:"J",corners:4.5,remates:11,atajadas:3.2,tarjetas:2.1},
  "Austria":      {gf:1.6,gc:0.9,r:22,forma:0.70,g:"J",corners:5.6,remates:12,atajadas:3.1,tarjetas:2.0},
  "Jordan":       {gf:1.1,gc:1.2,r:68,forma:0.50,g:"J",corners:4.0,remates:9, atajadas:4.0,tarjetas:2.2},
  "Portugal":     {gf:2.1,gc:0.8,r:6, forma:0.84,g:"K",corners:6.0,remates:15,atajadas:2.3,tarjetas:1.7},
  "DR Congo":     {gf:1.2,gc:0.9,r:61,forma:0.55,g:"K",corners:4.1,remates:9, atajadas:3.5,tarjetas:2.3},
  "Uzbekistan":   {gf:1.3,gc:0.9,r:52,forma:0.58,g:"K",corners:4.3,remates:10,atajadas:3.4,tarjetas:2.0},
  "Colombia":     {gf:1.6,gc:0.7,r:13,forma:0.79,g:"K",corners:5.0,remates:13,atajadas:2.5,tarjetas:2.1},
  "England":      {gf:2.0,gc:0.8,r:4, forma:0.84,g:"L",corners:6.5,remates:15,atajadas:2.2,tarjetas:1.6},
  "Croatia":      {gf:1.4,gc:0.9,r:14,forma:0.72,g:"L",corners:5.2,remates:11,atajadas:3.0,tarjetas:1.8},
  "Ghana":        {gf:1.2,gc:1.1,r:46,forma:0.55,g:"L",corners:4.3,remates:9, atajadas:3.6,tarjetas:2.2},
  "Panama":       {gf:1.1,gc:1.4,r:74,forma:0.45,g:"L",corners:3.8,remates:8, atajadas:4.8,tarjetas:2.1},
};

const partidos = [
  {a:"Mexico",b:"South Africa",j:1,kickoff:"2026-06-11T19:00:00Z"},
  {a:"South Korea",b:"Czechia",j:1,kickoff:"2026-06-12T02:00:00Z"},
  {a:"Canada",b:"Bosnia",j:1,kickoff:"2026-06-12T19:00:00Z"},
  {a:"USA",b:"Paraguay",j:1,kickoff:"2026-06-13T01:00:00Z"},
  {a:"Qatar",b:"Switzerland",j:1,kickoff:"2026-06-13T19:00:00Z"},
  {a:"Brazil",b:"Morocco",j:1,kickoff:"2026-06-13T22:00:00Z"},
  {a:"Haiti",b:"Scotland",j:1,kickoff:"2026-06-14T01:00:00Z"},
  {a:"Australia",b:"Turkey",j:1,kickoff:"2026-06-14T04:00:00Z"},
  {a:"Germany",b:"Curacao",j:1,kickoff:"2026-06-14T17:00:00Z"},
  {a:"Netherlands",b:"Japan",j:1,kickoff:"2026-06-14T20:00:00Z"},
  {a:"Ivory Coast",b:"Ecuador",j:1,kickoff:"2026-06-14T23:00:00Z"},
  {a:"Sweden",b:"Tunisia",j:1,kickoff:"2026-06-15T02:00:00Z"},
  {a:"Spain",b:"Cape Verde",j:1,kickoff:"2026-06-15T16:00:00Z"},
  {a:"Belgium",b:"Egypt",j:1,kickoff:"2026-06-15T19:00:00Z"},
  {a:"Saudi Arabia",b:"Uruguay",j:1,kickoff:"2026-06-15T22:00:00Z"},
  {a:"Iran",b:"New Zealand",j:1,kickoff:"2026-06-16T01:00:00Z"},
  {a:"France",b:"Senegal",j:1,kickoff:"2026-06-16T19:00:00Z"},
  {a:"Iraq",b:"Norway",j:1,kickoff:"2026-06-16T22:00:00Z"},
  {a:"Argentina",b:"Algeria",j:1,kickoff:"2026-06-17T01:00:00Z"},
  {a:"Austria",b:"Jordan",j:1,kickoff:"2026-06-17T04:00:00Z"},
  {a:"Portugal",b:"DR Congo",j:1,kickoff:"2026-06-17T17:00:00Z"},
  {a:"England",b:"Croatia",j:1,kickoff:"2026-06-17T20:00:00Z"},
  {a:"Ghana",b:"Panama",j:1,kickoff:"2026-06-17T23:00:00Z"},
  {a:"Uzbekistan",b:"Colombia",j:1,kickoff:"2026-06-18T02:00:00Z"},
  {a:"Czechia",b:"South Africa",j:2,kickoff:"2026-06-18T16:00:00Z"},
  {a:"Switzerland",b:"Bosnia",j:2,kickoff:"2026-06-18T19:00:00Z"},
  {a:"Canada",b:"Qatar",j:2,kickoff:"2026-06-18T22:00:00Z"},
  {a:"Mexico",b:"South Korea",j:2,kickoff:"2026-06-19T01:00:00Z"},
  {a:"USA",b:"Australia",j:2,kickoff:"2026-06-19T19:00:00Z"},
  {a:"Scotland",b:"Morocco",j:2,kickoff:"2026-06-19T22:00:00Z"},
  {a:"Brazil",b:"Haiti",j:2,kickoff:"2026-06-20T00:30:00Z"},
  {a:"Turkey",b:"Paraguay",j:2,kickoff:"2026-06-20T03:00:00Z"},
  {a:"Netherlands",b:"Sweden",j:2,kickoff:"2026-06-20T17:00:00Z"},
  {a:"Germany",b:"Ivory Coast",j:2,kickoff:"2026-06-20T20:00:00Z"},
  {a:"Ecuador",b:"Curacao",j:2,kickoff:"2026-06-21T00:00:00Z"},
  {a:"Tunisia",b:"Japan",j:2,kickoff:"2026-06-21T04:00:00Z"},
  {a:"Spain",b:"Saudi Arabia",j:2,kickoff:"2026-06-21T16:00:00Z"},
  {a:"Belgium",b:"Iran",j:2,kickoff:"2026-06-21T19:00:00Z"},
  {a:"Uruguay",b:"Cape Verde",j:2,kickoff:"2026-06-21T22:00:00Z"},
  {a:"New Zealand",b:"Egypt",j:2,kickoff:"2026-06-22T01:00:00Z"},
  {a:"Argentina",b:"Austria",j:2,kickoff:"2026-06-22T17:00:00Z"},
  {a:"France",b:"Iraq",j:2,kickoff:"2026-06-22T21:00:00Z"},
  {a:"Norway",b:"Senegal",j:2,kickoff:"2026-06-23T00:00:00Z"},
  {a:"Jordan",b:"Algeria",j:2,kickoff:"2026-06-23T03:00:00Z"},
  {a:"Portugal",b:"Uzbekistan",j:2,kickoff:"2026-06-23T17:00:00Z"},
  {a:"England",b:"Ghana",j:2,kickoff:"2026-06-23T20:00:00Z"},
  {a:"Panama",b:"Croatia",j:2,kickoff:"2026-06-23T23:00:00Z"},
  {a:"Colombia",b:"DR Congo",j:2,kickoff:"2026-06-24T02:00:00Z"},
  {a:"Switzerland",b:"Canada",j:3,kickoff:"2026-06-24T19:00:00Z"},
  {a:"Bosnia",b:"Qatar",j:3,kickoff:"2026-06-24T19:00:00Z"},
  {a:"Scotland",b:"Brazil",j:3,kickoff:"2026-06-24T22:00:00Z"},
  {a:"Morocco",b:"Haiti",j:3,kickoff:"2026-06-24T22:00:00Z"},
  {a:"Czechia",b:"Mexico",j:3,kickoff:"2026-06-25T01:00:00Z"},
  {a:"South Africa",b:"South Korea",j:3,kickoff:"2026-06-25T01:00:00Z"},
  {a:"Ecuador",b:"Germany",j:3,kickoff:"2026-06-25T20:00:00Z"},
  {a:"Curacao",b:"Ivory Coast",j:3,kickoff:"2026-06-25T20:00:00Z"},
  {a:"Tunisia",b:"Netherlands",j:3,kickoff:"2026-06-25T23:00:00Z"},
  {a:"Japan",b:"Sweden",j:3,kickoff:"2026-06-25T23:00:00Z"},
  {a:"Turkey",b:"USA",j:3,kickoff:"2026-06-26T02:00:00Z"},
  {a:"Paraguay",b:"Australia",j:3,kickoff:"2026-06-26T02:00:00Z"},
  {a:"Norway",b:"France",j:3,kickoff:"2026-06-26T19:00:00Z"},
  {a:"Senegal",b:"Iraq",j:3,kickoff:"2026-06-26T19:00:00Z"},
  {a:"Uruguay",b:"Spain",j:3,kickoff:"2026-06-27T00:00:00Z"},
  {a:"Cape Verde",b:"Saudi Arabia",j:3,kickoff:"2026-06-27T00:00:00Z"},
  {a:"New Zealand",b:"Belgium",j:3,kickoff:"2026-06-27T03:00:00Z"},
  {a:"Egypt",b:"Iran",j:3,kickoff:"2026-06-27T03:00:00Z"},
  {a:"Panama",b:"England",j:3,kickoff:"2026-06-27T21:00:00Z"},
  {a:"Croatia",b:"Ghana",j:3,kickoff:"2026-06-27T21:00:00Z"},
  {a:"Colombia",b:"Portugal",j:3,kickoff:"2026-06-27T23:30:00Z"},
  {a:"DR Congo",b:"Uzbekistan",j:3,kickoff:"2026-06-27T23:30:00Z"},
  {a:"Jordan",b:"Argentina",j:3,kickoff:"2026-06-28T02:00:00Z"},
  {a:"Algeria",b:"Austria",j:3,kickoff:"2026-06-28T02:00:00Z"}
];

let resultadosReales = {};
let lastSyncTime = null;

function cargarResultadoLocal(equipoA, equipoB, golesA, golesB, fuente = "Manual") {
  resultadosReales[`${equipoA}-${equipoB}`] = { ra: golesA, rb: golesB, fuente };
}

async function syncResultados() {
  const btn = document.getElementById("syncBtn");
  const banner = document.getElementById("syncBanner");

  btn.classList.add("loading");
  banner.className = "sync-banner loading";
  banner.innerHTML = "Actualizando datos reales desde API-Football...";

  try {
    const resp = await fetch("https://project-yzdfb.vercel.app/api/live?nocache=" + Date.now());

    if (!resp.ok) {
      throw new Error("No se pudo leer la API en vivo");
    }

    const data = await resp.json();
    resultadosReales = {};

    const partidosLive = data.response || [];

    partidosLive.forEach(m => {
      const liga = m.league?.name || "";
      const season = m.league?.season;

      if (liga !== "World Cup" || season !== 2026) return;

      const equipoA = normalizarNombreAPI(m.teams.home.name);
      const equipoB = normalizarNombreAPI(m.teams.away.name);

      resultadosReales[`${equipoA}-${equipoB}`] = {
        ra: m.goals.home ?? 0,
        rb: m.goals.away ?? 0,
        fuente: "API-Football",
        minuto: m.fixture?.status?.elapsed ?? null,
        extra: m.fixture?.status?.extra ?? null,
        estado: m.fixture?.status?.short ?? "",
        estadoLargo: m.fixture?.status?.long ?? "",
        fixtureId: m.fixture?.id,
        eventos: m.events || [],
        stats: normalizarStats(m.statistics || [], equipoA, equipoB)
      };
    });

    lastSyncTime = new Date().toLocaleTimeString("es-AR", {
      hour: "2-digit",
      minute: "2-digit"
    });

    document.getElementById("lastSync").textContent =
      `Última actualización: ${lastSyncTime}`;

    banner.className = "sync-banner ok";
    banner.innerHTML = `✓ Partidos del Mundial en vivo: ${Object.keys(resultadosReales).length}`;

    renderAll();

  } catch (e) {
    console.error(e);
    banner.className = "sync-banner err";
    banner.innerHTML = "✗ No se pudo cargar la API en vivo";
  } finally {
    btn.classList.remove("loading");
    setTimeout(() => { banner.className = "sync-banner"; }, 6000);
  }
}

function normalizarNombreAPI(nombre) {
  const map = {
    "Côte d'Ivoire": "Ivory Coast",
    "Cote DIvoire": "Ivory Coast",
    "Cote d'Ivoire": "Ivory Coast",
    "Czech Republic": "Czechia",
    "United States": "USA",
    "Korea Republic": "South Korea",
    "Bosnia & Herzegovina": "Bosnia",
    "Bosnia and Herzegovina": "Bosnia",
    "Congo DR": "DR Congo",
    "Curaçao": "Curacao"
  };
  return map[nombre] || nombre;
}

function statValor(stats, equipo, tipo) {
  const bloque = stats.find(s => normalizarNombreAPI(s.team?.name) === equipo);
  if (!bloque) return null;

  const item = (bloque.statistics || []).find(x => x.type === tipo);
  if (!item) return null;

  return item.value ?? null;
}

function normalizarStats(stats, equipoA, equipoB) {
  return {
    rematesA: statValor(stats, equipoA, "Total Shots"),
    rematesB: statValor(stats, equipoB, "Total Shots"),
    alArcoA: statValor(stats, equipoA, "Shots on Goal"),
    alArcoB: statValor(stats, equipoB, "Shots on Goal"),
    cornersA: statValor(stats, equipoA, "Corner Kicks"),
    cornersB: statValor(stats, equipoB, "Corner Kicks"),
    amarillasA: statValor(stats, equipoA, "Yellow Cards"),
    amarillasB: statValor(stats, equipoB, "Yellow Cards"),
    rojasA: statValor(stats, equipoA, "Red Cards"),
    rojasB: statValor(stats, equipoB, "Red Cards"),
    posesionA: statValor(stats, equipoA, "Ball Possession"),
    posesionB: statValor(stats, equipoB, "Ball Possession"),
    faltasA: statValor(stats, equipoA, "Fouls"),
    faltasB: statValor(stats, equipoB, "Fouls"),
    pasesA: statValor(stats, equipoA, "Total passes"),
    pasesB: statValor(stats, equipoB, "Total passes")
  };
}

function contarEventos(real, equipo, tipo, detalleIncluye = "") {
  if (!real || !real.eventos) return 0;

  return real.eventos.filter(ev => {
    const mismoEquipo = normalizarNombreAPI(ev.team?.name) === equipo;
    const mismoTipo = ev.type === tipo;
    const detalleOk = !detalleIncluye || String(ev.detail || "").includes(detalleIncluye);
    return mismoEquipo && mismoTipo && detalleOk;
  }).length;
}

function getKey(a,b){ return `${a}-${b}`; }
function getRealResult(a,b){ return resultadosReales[getKey(a,b)] || null; }

function factorial(n) {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

function poisson(k, lambda) {
  return (Math.exp(-lambda) * Math.pow(lambda, k)) / factorial(k);
}

function matrizMarcadores(golesA, golesB, maxGoles = 6) {
  const opciones = [];

  for (let ga = 0; ga <= maxGoles; ga++) {
    for (let gb = 0; gb <= maxGoles; gb++) {
      const prob = poisson(ga, golesA) * poisson(gb, golesB);
      opciones.push({
        ga,
        gb,
        prob,
        resultado: ga > gb ? "A" : gb > ga ? "B" : "E"
      });
    }
  }

  opciones.sort((x, y) => y.prob - x.prob);
  return opciones;
}

function calcular(a, b) {
  const ea = equipos[a], eb = equipos[b];

  const keyA = Object.keys(resultadosReales).find(k => k.startsWith(a+'-') || k.endsWith('-'+a));
  const realA = resultadosReales[keyA];

  let formaA = ea.forma, formaB = eb.forma;

  if (realA) {
    const isHome = keyA.startsWith(a+'-');
    const golesA = isHome ? realA.ra : realA.rb;
    const golesB = isHome ? realA.rb : realA.ra;

    formaA = golesA > golesB ? Math.min(formaA * 1.07, 0.98) : (golesA < golesB ? formaA * 0.93 : formaA);
    formaB = golesB > golesA ? Math.min(formaB * 1.07, 0.98) : (golesB < golesA ? formaB * 0.93 : formaB);
  }

  const rankA = (101 - ea.r) / 100;
  const rankB = (101 - eb.r) / 100;

  const fuerzaA =
    (ea.gf * 0.34) +
    ((2 - ea.gc) * 0.28) +
    (formaA * 0.24) +
    (rankA * 0.14);

  const fuerzaB =
    (eb.gf * 0.34) +
    ((2 - eb.gc) * 0.28) +
    (formaB * 0.24) +
    (rankB * 0.14);

  // Goles esperados con ajuste ofensivo/defensivo más sensible.
  let ga =
    ((ea.gf * 0.58) + (eb.gc * 0.42)) *
    (0.82 + formaA * 0.26) *
    (0.93 + rankA * 0.12);

  let gb =
    ((eb.gf * 0.58) + (ea.gc * 0.42)) *
    (0.82 + formaB * 0.26) *
    (0.93 + rankB * 0.12);

  // Ajuste por diferencia de fuerzas: evita que todos caigan en 1-1, 2-1 o 1-2.
  const d = fuerzaA - fuerzaB;
  ga *= 1 + Math.max(-0.18, Math.min(0.22, d * 0.30));
  gb *= 1 - Math.max(-0.18, Math.min(0.22, d * 0.30));

  // Mantener rangos realistas.
  ga = Math.max(0.15, Math.min(4.20, ga));
  gb = Math.max(0.15, Math.min(4.20, gb));

  const scores = matrizMarcadores(ga, gb, 6);

  let pa = scores.filter(s => s.resultado === "A").reduce((acc, s) => acc + s.prob, 0);
  let pe = scores.filter(s => s.resultado === "E").reduce((acc, s) => acc + s.prob, 0);
  let pb = scores.filter(s => s.resultado === "B").reduce((acc, s) => acc + s.prob, 0);

  const total = pa + pe + pb;
  pa /= total;
  pe /= total;
  pb /= total;

  const ganador =
    pa > pe && pa > pb ? a :
    pb > pa && pb > pe ? b :
    "Empate";

  const resultadoObjetivo = ganador === a ? "A" : ganador === b ? "B" : "E";

  // Marcador principal: el más probable dentro del resultado más probable.
  // Esto mantiene coherencia: si el favorito gana, evita mostrar empate como marcador principal.
  const principal = scores.find(s => s.resultado === resultadoObjetivo) || scores[0];

  const ma = principal.ga;
  const mb = principal.gb;

  const topScores = scores.slice(0, 6).map(s => ({
    marcador: `${s.ga}-${s.gb}`,
    prob: s.prob / total
  }));

  const topScoresResultado = scores
    .filter(s => s.resultado === resultadoObjetivo)
    .slice(0, 3)
    .map(s => ({
      marcador: `${s.ga}-${s.gb}`,
      prob: s.prob / total
    }));

  const totalG = ga + gb;
  const tend =
    totalG < 2.15 ? "Cerrado · Under 2.5" :
    totalG > 3.05 ? "Abierto · Over 2.5" :
    "Equilibrado";

  const cA = ((ea.corners * .6) + (eb.corners * .4) + ga * 0.20).toFixed(1);
  const cB = ((eb.corners * .6) + (ea.corners * .4) + gb * 0.20).toFixed(1);

  const rA = ((ea.remates * .58) + (eb.gc * 3.2) + ga * 1.4).toFixed(1);
  const rB = ((eb.remates * .58) + (ea.gc * 3.2) + gb * 1.4).toFixed(1);

  const atA = (eb.atajadas * .65 + parseFloat(rB) * .11).toFixed(1);
  const atB = (ea.atajadas * .65 + parseFloat(rA) * .11).toFixed(1);

  const tA = ((ea.tarjetas * .55) + (eb.tarjetas * .45)).toFixed(1);
  const tB = ((eb.tarjetas * .55) + (ea.tarjetas * .45)).toFixed(1);

  const totalC = parseFloat(cA) + parseFloat(cB);
  const cLabel =
    totalC > 9.5 ? "Over 9.5 corners" :
    totalC > 8 ? "Over 8 corners" :
    "Under 8.5 corners";

  const totalT = parseFloat(tA) + parseFloat(tB);
  const tLabel =
    totalT > 3.5 ? "Over 3.5 amarillas" :
    totalT > 2.5 ? "Over 2.5 amarillas" :
    "Under 2.5 amarillas";

  return {pa, pe, pb, ga, gb, ma, mb, ganador, tend, cLabel, tLabel, cA, cB, rA, rB, atA, atB, tA, tB, topScores, topScoresResultado};
}

function formatKickoff(iso) {
  const d = new Date(iso);
  return d.toLocaleString("es-AR", {
    weekday:"short", day:"2-digit", month:"2-digit", hour:"2-digit", minute:"2-digit"
  }).replace(",", "");
}

function getMatchClock(p, real) {
  if (real) {
    if (["FT", "AET", "PEN"].includes(real.estado)) return {label:"Finalizado", cls:"final"};
    if (real.estado === "HT") return {label:"Entretiempo", cls:"live"};

    const extra = real.extra ? `+${real.extra}` : "";
    const minuto = real.minuto ? `${real.minuto}${extra}'` : "En vivo";

    return {label:`En vivo · ${minuto}`, cls:"live"};
  }

  const now = Date.now();
  const start = new Date(p.kickoff).getTime();
  const diffMin = Math.floor((now - start) / 60000);

  if (diffMin < 0) {
    const mins = Math.abs(diffMin);
    if (mins < 60) return {label:`Empieza en ${mins} min`, cls:"pending"};
    if (mins < 1440) return {label:`Empieza en ${Math.floor(mins/60)} h`, cls:"pending"};
    return {label:"Programado", cls:""};
  }

  return {label:"Pendiente API", cls:"pending"};
}

let filtro = 'all';
function setFilter(f, btn) {
  filtro = f;
  document.querySelectorAll('.pill').forEach(p=>p.classList.remove('active'));
  btn.classList.add('active');
  renderAll();
}

function getFiltered() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  return partidos.filter(p => {
    const a=p.a, b=p.b, j=p.j;
    if(filtro==='j1'&&j!==1) return false;
    if(filtro==='j2'&&j!==2) return false;
    if(filtro==='j3'&&j!==3) return false;
    if(filtro==='real'&&!getRealResult(a,b)) return false;
    if(filtro==='pending'&&getRealResult(a,b)) return false;
    if(filtro.startsWith('G')&&equipos[a].g!==filtro.slice(1)) return false;
    if(q&&!a.toLowerCase().includes(q)&&!b.toLowerCase().includes(q)) return false;
    return true;
  });
}

function renderSummary(filtered) {
  let live=0, final=0, pending=0, aciertos=0, conPron=0;
  filtered.forEach(p => {
    const real = getRealResult(p.a,p.b);
    const clock = getMatchClock(p, real);
    if(real) {
      final++;
      const r = calcular(p.a,p.b);
      const ganReal = real.ra>real.rb?p.a:(real.rb>real.ra?p.b:"Empate");
      if(ganReal===r.ganador) aciertos++;
      conPron++;
    } else if(clock.cls==="live") live++;
    else pending++;
  });
  const pct = conPron ? ((aciertos/conPron)*100).toFixed(1)+"%" : "—";
  return `<div class="summary-grid">
    <div class="summary-card"><div class="num">${filtered.length}</div><div class="lab">Partidos</div></div>
    <div class="summary-card"><div class="num">${live}</div><div class="lab">En vivo</div></div>
    <div class="summary-card"><div class="num">${final}</div><div class="lab">Finalizados</div></div>
    <div class="summary-card"><div class="num">${pct}</div><div class="lab">Aciertos modelo</div></div>
  </div>`;
}


function valorRealOEstimado(real, statKey, estimado) {
  if (!real || !real.stats) return estimado;
  const val = real.stats[statKey];
  if (val === null || val === undefined) return estimado;
  return val;
}

function statNumber(v) {
  if (v === "—" || v === null || v === undefined) return 0;
  if (typeof v === "string") return parseFloat(v.replace("%","")) || 0;
  return Number(v) || 0;
}

function renderLiveStats(real, a, b, r) {
  const amarillasA = real ? (real.stats?.amarillasA ?? contarEventos(real, a, "Card", "Yellow")) : r.tA;
  const amarillasB = real ? (real.stats?.amarillasB ?? contarEventos(real, b, "Card", "Yellow")) : r.tB;
  const rojasA = real ? (real.stats?.rojasA ?? contarEventos(real, a, "Card", "Red")) : 0;
  const rojasB = real ? (real.stats?.rojasB ?? contarEventos(real, b, "Card", "Red")) : 0;

  return {
    rematesA: valorRealOEstimado(real, "rematesA", r.rA),
    rematesB: valorRealOEstimado(real, "rematesB", r.rB),
    alArcoA: valorRealOEstimado(real, "alArcoA", "—"),
    alArcoB: valorRealOEstimado(real, "alArcoB", "—"),
    cornersA: valorRealOEstimado(real, "cornersA", r.cA),
    cornersB: valorRealOEstimado(real, "cornersB", r.cB),
    amarillasA,
    amarillasB,
    rojasA,
    rojasB,
    posesionA: valorRealOEstimado(real, "posesionA", "—"),
    posesionB: valorRealOEstimado(real, "posesionB", "—"),
    faltasA: valorRealOEstimado(real, "faltasA", "—"),
    faltasB: valorRealOEstimado(real, "faltasB", "—"),
    pasesA: valorRealOEstimado(real, "pasesA", "—"),
    pasesB: valorRealOEstimado(real, "pasesB", "—")
  };
}

function statBarWidth(v, max) {
  const n = statNumber(v);
  const m = Math.max(statNumber(max), 1);
  return `${Math.round((n / m) * 100)}%`;
}

function renderAll() {
  const list = document.getElementById('matchesList');
  const filtered = getFiltered();
  document.getElementById('countShown').textContent = filtered.length;

  if(!filtered.length){
    list.innerHTML=`<div class="empty"><h3>Sin resultados</h3><p>Probá con otro filtro o equipo.</p></div>`;
    return;
  }

  list.innerHTML = renderSummary(filtered) + filtered.map((p,i)=>{
    const a=p.a, b=p.b, j=p.j;
    const r = calcular(a,b);
    const real = getRealResult(a,b);
    const clock = getMatchClock(p, real);
    const hasReal = !!real;
    const wClass = r.ganador===a?'wa':(r.ganador===b?'wb':'wd');
    const wLabel = r.ganador==="Empate"?"Empate":r.ganador;
    const id = `c${i}${a.replace(/\s/g,'')}${b.replace(/\s/g,'')}`;

    const maxR=Math.max(parseFloat(r.rA),parseFloat(r.rB));
    const maxC=Math.max(parseFloat(r.cA),parseFloat(r.cB));
    const maxAt=Math.max(parseFloat(r.atA),parseFloat(r.atB));
    const maxT=Math.max(parseFloat(r.tA),parseFloat(r.tB));
    const pct=(v,m)=>`${Math.round((v/m)*100)}%`;
    const ls = renderLiveStats(real, a, b, r);

    let realBlock='';
    if(hasReal){
      const ganReal = real.ra>real.rb?a:(real.rb>real.ra?b:"Empate");
      const acierto = ganReal===r.ganador;
      realBlock=`<div class="real-result-box">
        <div class="rr-title">Resultado real · ${real.fuente||''}</div>
        <div class="real-score">${real.ra} – ${real.rb}</div>
        <div class="${acierto?'diff-ok':'diff-no'}">${acierto?'✓ Pronóstico acertado':'⚠ Pronóstico diferente'} · Pronóstico fue ${r.ma}-${r.mb}</div>
      </div>`;
    }

    return `<div class="match-card${hasReal?' has-real':''}" id="${id}" onclick="toggle('${id}')">
      <div class="match-top">
        <div class="meta">
          <span class="grupo-tag">Grupo ${equipos[a].g}</span>
          <span class="jornada-tag">J${j}${hasReal?'&nbsp;·&nbsp;<span style="color:var(--azul)">✓</span>':''}</span>
        </div>

        <div class="time-box">
          <span class="time-date">${formatKickoff(p.kickoff)}</span>
          <span class="time-status ${clock.cls}">${clock.cls==='live'?'<span class="live-dot"></span>':''}${clock.label}</span>
        </div>

        <div class="team">
          <span class="tname">${a}</span>
          <span class="trank">FIFA #${equipos[a].r}</span>
        </div>

        <div class="score-col">
          <div class="score-pred">${r.ma} – ${r.mb}</div>
          <div class="score-label">pronóstico</div>
          ${hasReal?`<div class="score-real">${real.ra} – ${real.rb}</div><div class="score-label" style="color:var(--azul)">real</div>`:''}
          <span class="winner-tag ${wClass}">${wLabel}</span>
        </div>

        <div class="team right">
          <span class="tname">${b}</span>
          <span class="trank">FIFA #${equipos[b].r}</span>
        </div>
      </div>

      <div class="prob-wrap">
        <div class="prob-track">
          <div class="pa" style="flex:${r.pa}"></div>
          <div class="pd" style="flex:${r.pe}"></div>
          <div class="pb" style="flex:${r.pb}"></div>
        </div>
        <div class="prob-nums">
          <span class="pna">${(r.pa*100).toFixed(1)}% ${a}</span>
          <span>${(r.pe*100).toFixed(1)}% empate</span>
          <span class="pnb">${(r.pb*100).toFixed(1)}% ${b}</span>
        </div>
      </div>

      <div class="detail">
        <div>
          <h4>Estadísticas en vivo / estimadas</h4>
          <div class="stat-row"><span class="slabel">Remates</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.rematesA, Math.max(statNumber(ls.rematesA), statNumber(ls.rematesB), 1))}"></div><div class="sbb" style="width:${statBarWidth(ls.rematesB, Math.max(statNumber(ls.rematesA), statNumber(ls.rematesB), 1))}"></div></div><div class="svals"><span class="va">${ls.rematesA}</span><span class="vb">${ls.rematesB}</span></div></div>
          <div class="stat-row"><span class="slabel">Al arco</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.alArcoA, Math.max(statNumber(ls.alArcoA), statNumber(ls.alArcoB), 1))}"></div><div class="sbb" style="width:${statBarWidth(ls.alArcoB, Math.max(statNumber(ls.alArcoA), statNumber(ls.alArcoB), 1))}"></div></div><div class="svals"><span class="va">${ls.alArcoA}</span><span class="vb">${ls.alArcoB}</span></div></div>
          <div class="stat-row"><span class="slabel">Corners</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.cornersA, Math.max(statNumber(ls.cornersA), statNumber(ls.cornersB), 1))}"></div><div class="sbb" style="width:${statBarWidth(ls.cornersB, Math.max(statNumber(ls.cornersA), statNumber(ls.cornersB), 1))}"></div></div><div class="svals"><span class="va">${ls.cornersA}</span><span class="vb">${ls.cornersB}</span></div></div>
          <div class="stat-row"><span class="slabel">Posesión</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.posesionA, 100)}"></div><div class="sbb" style="width:${statBarWidth(ls.posesionB, 100)}"></div></div><div class="svals"><span class="va">${ls.posesionA}</span><span class="vb">${ls.posesionB}</span></div></div>
          <div class="stat-row"><span class="slabel">Faltas</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.faltasA, Math.max(statNumber(ls.faltasA), statNumber(ls.faltasB), 1))}"></div><div class="sbb" style="width:${statBarWidth(ls.faltasB, Math.max(statNumber(ls.faltasA), statNumber(ls.faltasB), 1))}"></div></div><div class="svals"><span class="va">${ls.faltasA}</span><span class="vb">${ls.faltasB}</span></div></div>
          <div class="stat-row"><span class="slabel">Amarillas</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.amarillasA, Math.max(statNumber(ls.amarillasA), statNumber(ls.amarillasB), 1))}"></div><div class="sbb" style="width:${statBarWidth(ls.amarillasB, Math.max(statNumber(ls.amarillasA), statNumber(ls.amarillasB), 1))}"></div></div><div class="svals"><span class="va">${ls.amarillasA}</span><span class="vb">${ls.amarillasB}</span></div></div>
          <div class="stat-row"><span class="slabel">Rojas</span><div class="sbars"><div class="sba" style="width:${statBarWidth(ls.rojasA, Math.max(statNumber(ls.rojasA), statNumber(ls.rojasB), 1))}"></div><div class="sbb" style="width:${statBarWidth(ls.rojasB, Math.max(statNumber(ls.rojasA), statNumber(ls.rojasB), 1))}"></div></div><div class="svals"><span class="va">${ls.rojasA}</span><span class="vb">${ls.rojasB}</span></div></div>
          ${realBlock}
          <div class="score-options">
            ${r.topScoresResultado.map(s => `<span class="score-option"><strong>${s.marcador}</strong> ${(s.prob*100).toFixed(1)}%</span>`).join("")}
          </div>
        </div>

        <div>
          <h4>Tendencias</h4>
          <div class="badges">
            <span class="badge bg">${r.tend}</span>
            <span class="badge by">${r.cLabel}</span>
            <span class="badge br">${r.tLabel}</span>
            <span class="badge bm">Horario: ${formatKickoff(p.kickoff)}</span>
          </div>
          <div style="margin-bottom:14px">
            <div class="bignum" style="color:var(--verde)">${(r.ga+r.gb).toFixed(2)}</div>
            <div class="bignum-label">goles esperados totales</div>
          </div>
          <div>
            <div class="bignum" style="color:var(--amarillo)">${(parseFloat(r.cA)+parseFloat(r.cB)).toFixed(1)}</div>
            <div class="bignum-label">corners esperados totales</div>
          </div>
        </div>
      </div>
    </div>`;
  }).join('');

  buildGroupPills();
}

function toggle(id) {
  document.getElementById(id).classList.toggle('expanded');
}

let groupsBuilt=false;
function buildGroupPills(){
  if(groupsBuilt) return; groupsBuilt=true;
  const bar=document.getElementById('filtersBar');
  [...new Set(Object.values(equipos).map(e=>e.g))].sort().forEach(g=>{
    const b=document.createElement('button');
    b.className='pill'; b.textContent=`Grupo ${g}`;
    b.onclick=()=>setFilter('G'+g,b);
    bar.appendChild(b);
  });
}

renderAll();
syncResultados();
setInterval(syncResultados, 60000);
setInterval(renderAll, 15000);
</script>
</body>
</html>
