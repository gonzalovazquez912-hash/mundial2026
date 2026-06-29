
const TODAY = "2026-06-29";
const RUNS = 10000;
let filter = "all";

function parseTime(d,t){ return new Date(`${d}T${t}:00-03:00`); }
function fmt(d){ const [y,m,dd]=d.split("-"); return `${dd}/${m}/${y}`; }
function statusOf(m){
  if(m.status==="FT") return {code:"FT",label:"Finalizado"};
  const diff=Math.floor((new Date()-parseTime(m.date,m.timeAR))/60000);
  if(diff<0) return {code:"SCHEDULED",label:`${fmt(m.date)} ${m.timeAR}`};
  if(diff<=130) return {code:"LIVE",label:"En juego / revisar"};
  return {code:"PENDING",label:"Actualizar resultado"};
}
function badge(code){ if(code==="FT") return "badge ft"; if(code==="SCHEDULED") return "badge today"; return "badge pending"; }

function renderKpis(){
  const fin=KNOCKOUT_MATCHES.filter(m=>m.status==="FT");
  const today=KNOCKOUT_MATCHES.filter(m=>m.date===TODAY);
  const goals=fin.reduce((a,m)=>a+(m.homeGoals||0)+(m.awayGoals||0),0);
  kpiFinished.textContent=fin.length; kpiRemaining.textContent=KNOCKOUT_MATCHES.length-fin.length; kpiToday.textContent=today.length; kpiGoals.textContent=goals;
}
function renderSummary(){
  const today=KNOCKOUT_MATCHES.filter(m=>m.date===TODAY&&m.status!=="FT");
  summaryBox.innerHTML=`• <strong>Canadá</strong> ya avanzó a octavos tras ganar 1-0 a Sudáfrica.<br>• Hoy: <strong>${today.map(m=>m.home+" vs "+m.away).join(", ")}</strong>.<br>• La simulación ahora pesa más lo que pasó en este Mundial: puntos, goles a favor/en contra y forma en fase de grupos.`;
}
function renderMatches(){
  matchesGrid.innerHTML="";
  KNOCKOUT_MATCHES.filter(m=>{
    const s=statusOf(m);
    if(filter==="today") return m.date===TODAY;
    if(filter==="finished") return s.code==="FT";
    if(filter==="scheduled") return s.code!=="FT";
    return true;
  }).forEach(m=>{
    const s=statusOf(m); const has=m.homeGoals!==undefined;
    const div=document.createElement("div"); div.className="card";
    div.innerHTML=`<div class="top"><span class="badge">${m.round}</span><span class="${badge(s.code)}">${s.label}</span></div><div class="teams"><div class="team">${m.home}</div><div class="score">${has?m.homeGoals+" - "+m.awayGoals:"vs"}</div><div class="team right">${m.away}</div></div><div class="meta"><span>${fmt(m.date)} · ${m.timeAR} ARG</span><span>${m.winner?"Avanza: "+m.winner:"Ganador avanza"}</span></div>`;
    matchesGrid.appendChild(div);
  });
}
function setFilter(f,btn){ filter=f; document.querySelectorAll(".filters button").forEach(b=>b.classList.remove("active")); btn.classList.add("active"); renderMatches(); }

function strength(t){
  const fifa=clamp((120-t.fifaRank)/120,0,1), elo=clamp((t.elo-1450)/650,0,1), pts=clamp(t.wcPts/9,0,1);
  const att=clamp(t.wcGF/10,0,1), def=clamp(1-t.wcGA/8,0,1);
  const rec=clamp(t.recentGF/2.5,0,1)*.55+clamp(1-t.recentGA/2.3,0,1)*.45;
  const stat=clamp((t.shotsOnTarget/7+t.corners/7)/2,0,1), form=formScore(t.wcForm);
  return fifa*.16+elo*.20+pts*.18+att*.13+def*.13+rec*.10+stat*.05+form*.08-t.injuriesImpact;
}
function formScore(a){return a.reduce((p,r)=>p+(r==="W"?3:r==="D"?1:0),0)/(a.length*3)}
function xg(t,o,diff){ return clamp(t.recentGF*.22+o.recentGA*.16+(t.wcGF/3)*.22+(o.wcGA/3)*.14+t.shotsOnTarget*.055+t.corners*.025+diff*1.10-t.injuriesImpact*.35,.25,3.6); }
function seedRandom(txt){let s=0; for(let i=0;i<txt.length;i++)s=(s*31+txt.charCodeAt(i))>>>0; return ()=>{s=(s*1664525+1013904223)>>>0; return s/4294967296;};}
function pois(l,r){const L=Math.exp(-l); let k=0,p=1; do{k++; p*=r();}while(p>L); return k-1;}
function clamp(v,min,max){return Math.max(min,Math.min(max,v))}
function penEdge(h,a){return clamp(.5+(strength(h)-strength(a))*.22,.42,.58)}

function simulate(m){
  const h=TEAM_MODEL[m.home], a=TEAM_MODEL[m.away], diff=strength(h)-strength(a), hx=xg(h,a,diff), ax=xg(a,h,-diff), rng=seedRandom(m.id+m.home+m.away);
  let hw=0,d=0,aw=0, scores={};
  for(let i=0;i<RUNS;i++){const hg=pois(hx,rng), ag=pois(ax,rng), key=hg+"-"+ag; scores[key]=(scores[key]||0)+1; if(hg>ag)hw++;else if(hg<ag)aw++;else d++;}
  const likely=Object.entries(scores).sort((x,y)=>y[1]-x[1])[0][0];
  const hp=Math.round(hw/RUNS*100), dp=Math.round(d/RUNS*100), ap=Math.round(aw/RUNS*100);
  const advH=Math.round(hp+dp*penEdge(h,a)), advA=100-advH;
  return {m,h,a,hx,ax,likely,hp,dp,ap,advH,advA,winner:advH>=advA?m.home:m.away,confidence:Math.max(advH,advA)>=70?"Alta":Math.max(advH,advA)>=58?"Media-alta":"Media"};
}
function prob(label,v){return `<div class="prob-row"><div class="prob-label"><span>${label}</span><strong>${v}%</strong></div><div class="bar"><div class="bar-fill" style="width:${v}%"></div></div></div>`}

function renderSim(){
  simulationGrid.innerHTML="";
  KNOCKOUT_MATCHES.filter(m=>m.status!=="FT").map(simulate).forEach(s=>{
    const div=document.createElement("div"); div.className="card sim-card";
    div.innerHTML=`<div class="top"><div><span class="badge">${fmt(s.m.date)} · ${s.m.timeAR}</span><div class="sim-title">${s.m.home} vs ${s.m.away}</div></div><span class="confidence">${s.confidence}</span></div><div class="sim-score">${s.likely.replace("-"," - ")}</div><div class="meta"><span>Avanza probable: <strong>${s.winner}</strong></span><span>${RUNS.toLocaleString("es-AR")} simulaciones</span></div>${prob(s.m.home+" avanza",s.advH)}${prob(s.m.away+" avanza",s.advA)}<div class="stats"><div class="stat"><b>${s.hx.toFixed(2)}</b><span>xG ${s.m.home}</span></div><div class="stat"><b>${s.ax.toFixed(2)}</b><span>xG ${s.m.away}</span></div><div class="stat"><b>${(s.hx+s.ax).toFixed(2)}</b><span>Goles esperados</span></div></div><div class="note">Mundial actual: ${s.m.home} (${s.h.wcPts} pts, GF ${s.h.wcGF}, GC ${s.h.wcGA}) vs ${s.m.away} (${s.a.wcPts} pts, GF ${s.a.wcGF}, GC ${s.a.wcGA}). Ranking/Elo: #${s.h.fifaRank}/${s.h.elo} vs #${s.a.fifaRank}/${s.a.elo}.</div>`;
    simulationGrid.appendChild(div);
  });
}
function winnerOf(sims,a,b){const s=sims.find(x=>x.m.home===a&&x.m.away===b); return s?s.winner:"TBD";}
function renderRoad(){
  const sims=KNOCKOUT_MATCHES.filter(m=>m.status!=="FT").map(simulate);
  const road=[["Canada",winnerOf(sims,"Netherlands","Morocco")],[winnerOf(sims,"Germany","Paraguay"),winnerOf(sims,"France","Sweden")],[winnerOf(sims,"Brazil","Japan"),winnerOf(sims,"Ivory Coast","Norway")],[winnerOf(sims,"Mexico","Ecuador"),winnerOf(sims,"England","DR Congo")],[winnerOf(sims,"USA","Bosnia and Herzegovina"),winnerOf(sims,"Belgium","Senegal")],[winnerOf(sims,"Portugal","Croatia"),winnerOf(sims,"Spain","Austria")],[winnerOf(sims,"Argentina","Cabo Verde"),winnerOf(sims,"Australia","Egypt")],[winnerOf(sims,"Switzerland","Algeria"),winnerOf(sims,"Colombia","Ghana")]];
  roadGrid.innerHTML="";
  road.forEach((r,i)=>{const div=document.createElement("div");div.className="card";div.innerHTML=`<div class="top"><span class="badge">Octavos proyectado</span><span class="badge today">${i+1}</span></div><div class="teams"><div class="team">${r[0]}</div><div class="score">vs</div><div class="team right">${r[1]}</div></div>`;roadGrid.appendChild(div);});
}
function renderAll(){renderKpis();renderSummary();renderMatches();renderSim();renderRoad();}
renderAll();
