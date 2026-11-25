import {SCENARIOS,ipv4,build,compress,lookup,nodeCount,reference,report} from './core.mjs';

const $=id=>document.getElementById(id);
let mode=0,view='packed',step=0,state;
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function search(){
  const input=$('destination'),destination=input.value.trim();
  try{ipv4(destination);}catch(error){
    $('input-error').textContent=error.message;$('input-error').hidden=false;input.setAttribute('aria-invalid','true');input.focus();return false;
  }
  input.removeAttribute('aria-invalid');$('input-error').hidden=true;
  const scenario=SCENARIOS[mode],raw=build(scenario.routes),packed=compress(raw);
  const a=lookup(raw,destination),b=lookup(packed,destination);
  state={scenario,raw,packed,a,b,destination};
  step=(view==='packed'?b:a).trace.length-1;
  $('scenario-detail').textContent=scenario.detail;
  const r=a.route;
  $('selected-prefix').textContent=r?r.cidr:'일치 경로 없음';
  $('selected-action').textContent=r?`${r.name} · ${r.action}`:'저장된 접두사 중 목적지와 일치하는 경로가 없습니다.';
  const same=(a.route?.cidr??null)===(b.route?.cidr??null)&&(a.route?.cidr??null)===(reference(scenario.routes,destination)?.cidr??null);
  $('verdict').textContent=same?'압축 전후 결과 일치':'결과 불일치';
  $('verdict').classList.toggle('no-match',!r);
  for(const [id,value] of Object.entries({'raw-nodes':nodeCount(raw),'packed-nodes':nodeCount(packed),'raw-visits':a.visited_nodes,'packed-visits':b.visited_nodes,'raw-bits':a.compared_bits,'packed-bits':b.compared_bits}))$(id).textContent=value;
  $('reduction').textContent=`노드 수 ${(100*(1-nodeCount(packed)/nodeCount(raw))).toFixed(1)}% 감소`;
  $('routes').innerHTML=scenario.routes.map(route=>`<tr class="${route.cidr===r?.cidr?'is-selected':''}"><td>${escape(route.cidr)}<small>${escape(route.name)}</small></td><td>${escape(route.action)}</td></tr>`).join('');
  renderTrace();renderGraph();return true;
}

function currentResult(){return view==='packed'?state.b:state.a;}
function renderTrace(){
  const result=currentResult(),trace=result.trace;
  step=Math.max(0,Math.min(step,trace.length-1));
  $('trace-caption').textContent=view==='packed'?'압축 간선 전체를 비교합니다.':'한 비트씩 이동합니다.';
  $('step-count').textContent=`${step+1} / ${trace.length}`;
  $('trace').innerHTML=trace.slice(0,step+1).map((t,i)=>`<div class="trace-item ${t.status} ${i===step?'current':''}"><span>${String(i+1).padStart(2,'0')}</span><div>${escape(t.message)}</div></div>`).join('');
  $('trace').scrollTop=$('trace').scrollHeight;
  const candidate=trace[step].candidate;
  $('candidate').textContent=candidate?`현재 후보: ${candidate.cidr} · ${candidate.name}`:'현재 후보: 없음';
  $('previous').disabled=step===0;$('next').disabled=step===trace.length-1;$('all-steps').disabled=step===trace.length-1;
}

function renderGraph(){
  const root=view==='packed'?state.packed:state.raw,result=currentResult();
  const visited=new Set(result.trace.slice(0,step+1).filter(t=>t.status==='match'||t.status==='start').map(t=>t.prefix));
  const bad=result.trace.slice(0,step+1).find(t=>t.status==='mismatch')?.prefix;
  const nodes=[],edges=[];let leaf=0;
  function layout(n,depth=0){
    const info={n,depth,x:0,y:0};nodes.push(info);
    const children=[...n.children].sort(([a],[b])=>a.localeCompare(b));
    if(!children.length)info.y=57+leaf++*100;
    else{
      const positioned=children.map(([,child])=>{const c=layout(child,depth+1);edges.push([info,c]);return c;});
      info.y=positioned.reduce((s,c)=>s+c.y,0)/positioned.length;
    }
    info.x=view==='packed'?45+depth*125:35+n.prefix.length*30;
    return info;
  }
  layout(root);
  const width=Math.max(view==='packed'?720:1150,Math.max(...nodes.map(n=>n.x))+175),height=Math.max(360,leaf*100+15);
  let svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${view==='packed'?'압축':'일반'} 트라이, ${nodes.length}개 노드"><title>${view==='packed'?'압축':'일반'} 트라이</title>`;
  for(const [from,to] of edges){
    const active=visited.has(to.n.prefix),mismatch=bad===to.n.prefix;
    const color=mismatch?'#c38030':active?'#169a83':'#c3d3d9';
    const elbow=(from.x+to.x)/2;
    svg+=`<path d="M ${from.x+9} ${from.y} H ${elbow} V ${to.y} H ${to.x-9}" stroke="${color}" stroke-width="${active?2.5:1.4}" fill="none"${mismatch?' stroke-dasharray="4 4"':''}/>`;
    const label=to.n.prefix.slice(from.n.prefix.length);
    if(view==='packed'){
      const display=label.length>12?label.slice(0,8)+'… /'+to.n.prefix.length:label;
      svg+=`<text x="${to.x-15}" y="${to.y-11}" text-anchor="end" font-size="12" fill="${color}"><title>${label}</title>${display}</text>`;
    }
  }
  for(const info of nodes){
    const {n,x,y}=info,isVisited=visited.has(n.prefix),isBad=bad===n.prefix;
    const fill=isBad?'#f8ead8':isVisited?'#12937e':n.route?'#e4f4ee':'#fff';
    const stroke=isBad?'#b8772d':n.route?'#12937e':isVisited?'#12937e':'#9fb5bf';
    svg+=`<g><title>${n.prefix||'root'} /${n.prefix.length}${n.route?' '+escape(n.route.cidr):''}</title><circle cx="${x}" cy="${y}" r="${n.route?9:6}" fill="${fill}" stroke="${stroke}" stroke-width="1.6"/>`;
    if(view==='packed'||n.route||n.prefix.length%8===0||n.prefix.length===0)svg+=`<text x="${x}" y="${y+25}" text-anchor="middle" font-size="12" fill="#607b87">/${n.prefix.length}</text>`;
    if(n.route)svg+=`<text x="${x+17}" y="${y-5}" font-size="13" font-weight="600" fill="#123b36">${escape(n.route.cidr)}</text><text x="${x+17}" y="${y+13}" font-size="12" fill="#607b87">${escape(n.route.name)}</text>`;
    svg+='</g>';
  }
  $('graph').innerHTML=svg+'</svg>';
  $('graph-note').textContent=view==='packed'?'간선 위의 숫자는 합쳐진 비트열입니다. 긴 표지는 앞 8비트와 도착 깊이를 표시하며 전체 비트열은 단계별 탐색에서 확인할 수 있습니다.':'일반 트라이는 한 비트마다 노드를 만듭니다. 가로로 이동하면 오른쪽의 /27~ /30 경로 노드를 확인할 수 있습니다.';
}

function setView(next){
  view=next;
  for(const kind of ['packed','raw']){$('view-'+kind).classList.toggle('active',view===kind);$('view-'+kind).setAttribute('aria-pressed',String(view===kind));}
  step=currentResult().trace.length-1;renderTrace();renderGraph();$('graph').scrollLeft=0;
}
$('lookup-form').addEventListener('submit',event=>{event.preventDefault();search();});
document.querySelectorAll('[data-mode]').forEach(button=>button.addEventListener('click',()=>{
  // Invalid input keeps the previously displayed scenario and results intact.
  try{ipv4($('destination').value);}catch{search();return;}
  mode=Number(button.dataset.mode);
  document.querySelectorAll('[data-mode]').forEach(b=>{b.classList.toggle('active',Number(b.dataset.mode)===mode);b.setAttribute('aria-pressed',String(Number(b.dataset.mode)===mode));});
  search();
}));
document.querySelectorAll('[data-ip]').forEach(button=>button.addEventListener('click',()=>{$('destination').value=button.dataset.ip;search();}));
$('view-packed').addEventListener('click',()=>setView('packed'));
$('view-raw').addEventListener('click',()=>setView('raw'));
$('previous').addEventListener('click',()=>{step--;renderTrace();renderGraph();});
$('next').addEventListener('click',()=>{step++;renderTrace();renderGraph();});
$('all-steps').addEventListener('click',()=>{step=currentResult().trace.length-1;renderTrace();renderGraph();});
$('export').addEventListener('click',()=>{
  const data={...report(),current_lookup:{scenario:state.scenario.id,destination:state.destination,selected:state.a.route?.cidr??null}};
  const url=URL.createObjectURL(new Blob([JSON.stringify(data,null,2)],{type:'application/json'}));
  const a=document.createElement('a');a.href=url;a.download='trie-results.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
});
search();
