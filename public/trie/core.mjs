export function ipv4(value) {
  const text = String(value).trim();
  if (!/^(0|[1-9]\d{0,2})(\.(0|[1-9]\d{0,2})){3}$/.test(text)) throw new Error('올바른 IPv4 주소를 입력하세요. 예: 192.168.10.42');
  const octets = text.split('.').map(Number);
  if (octets.some(x => x > 255)) throw new Error('IPv4의 각 숫자는 0부터 255까지 입력하세요.');
  return octets.reduce((n,x) => n*256+x,0);
}
export function route(cidr, action, name) {
  const parts = cidr.split('/');
  if(parts.length !== 2 || !/^(0|[1-9]\d?)$/.test(parts[1])) throw new Error('접두사 길이를 확인하세요.');
  const length=Number(parts[1]);
  if(length>32) throw new Error('접두사 길이는 0~32입니다.');
  const address=ipv4(parts[0]);
  if(address % 2**(32-length)) throw new Error('네트워크 주소에 호스트 비트가 있습니다.');
  return {cidr, action, name, address, length, bits: address.toString(2).padStart(32,'0').slice(0,length)};
}
export const ACTUAL=[
  route('192.168.10.0/27','Fa0/0.20','학생망'),
  route('192.168.10.32/29','Fa0/0.10','교사망'),
  route('192.168.10.40/30','다음 홉 192.168.10.46 · Serial0/0/0','서버망'),
  route('192.168.10.44/30','Serial0/0/0','시리얼망'),
];
export const SCENARIOS=[
  {id:'A',name:'기본 설계',detail:'네 경로만 사용합니다. 기본 경로는 없습니다.',routes:ACTUAL},
  {id:'B',name:'겹치는 /24 경로',detail:'검증용 192.168.10.0/24 → Null0를 추가합니다. 실제 R0 설정에는 포함하지 않습니다.',routes:[...ACTUAL,route('192.168.10.0/24','Null0 · 검증용 폐기','검증용 /24')]},
  {id:'C',name:'기본 경로 /0',detail:'검증용 0.0.0.0/0 → Null0를 추가합니다. 더 구체적인 경로가 없을 때 선택합니다.',routes:[...ACTUAL,route('0.0.0.0/0','Null0 · 검증용 폐기','검증용 기본 경로')]},
];
const node = (prefix='') => ({prefix, route:null, children:new Map()});
export function build(routes) {
  const root=node(),seen=new Set();
  for(const r of routes){
    if(seen.has(r.cidr))throw new Error('중복 접두사: '+r.cidr);
    seen.add(r.cidr);
    let n=root;
    for(const bit of r.bits){if(!n.children.has(bit))n.children.set(bit,node(n.prefix+bit));n=n.children.get(bit);}
    n.route=r;
  }
  return root;
}
export function compress(root){
  function copy(source,keepRoot=false){
    let n=source;
    while(!keepRoot&&!n.route&&n.children.size===1)n=n.children.values().next().value;
    return {prefix:n.prefix,route:n.route,children:new Map([...n.children].map(([bit,child])=>[bit,copy(child)]))};
  }
  return copy(root,true);
}
export function lookup(root,destination){
  const bits=ipv4(destination).toString(2).padStart(32,'0');
  let n=root,best=root.route,visits=1,comparisons=0;
  const trace=[{prefix:'',status:'start',candidate:best,message:best?'루트의 기본 경로를 후보로 저장합니다.':'루트에서 시작합니다. 선택 후보는 없습니다.'}];
  while(n.prefix.length<32){
    const offset=n.prefix.length,child=n.children.get(bits[offset]);
    if(!child){trace.push({prefix:n.prefix,status:'missing',candidate:best,message:`${offset+1}번째 비트 ${bits[offset]}에 해당하는 자식이 없어 멈춥니다.`});break;}
    visits++;
    const label=child.prefix.slice(offset);let matched=0;
    for(let i=0;i<label.length;i++){comparisons++;if(label[i]!==bits[offset+i])break;matched++;}
    if(matched!==label.length){trace.push({prefix:child.prefix,status:'mismatch',label,candidate:best,message:`간선 ${label}의 ${offset+matched+1}번째 비트에서 불일치합니다. 이전 후보를 유지합니다.`});break;}
    n=child;if(n.route)best=n.route;
    trace.push({prefix:n.prefix,status:'match',label,candidate:best,message:`간선 ${label} 전체 일치 · /${n.prefix.length}${n.route?' · 후보 '+n.route.cidr:' · 분기 노드'}`});
  }
  trace.push({prefix:n.prefix,status:'selected',candidate:best,message:best?`${best.cidr} 선택 · ${best.action}`:'일치 경로가 없습니다.'});
  return {route:best,visited_nodes:visits,compared_bits:comparisons,trace};
}
export const nodeCount = n => 1+[...n.children.values()].reduce((sum,c)=>sum+nodeCount(c),0);
export function reference(routes,destination){
  const address=ipv4(destination);
  return routes.filter(r=>Math.floor(address/2**(32-r.length))*2**(32-r.length)===r.address).sort((a,b)=>b.length-a.length)[0]??null;
}
export function report(){
  const ips=['192.168.10.2','192.168.10.34','192.168.10.42','192.168.10.46','192.168.10.50','192.168.10.128','203.0.113.7'];
  return {scope:'IPv4 destination lookup teaching model; synthetic routes are not deployed',scenarios:SCENARIOS.map(s=>{
    const raw=build(s.routes),packed=compress(raw);
    return {scenario:s.id,name:s.name,raw_nodes:nodeCount(raw),compressed_nodes:nodeCount(packed),cases:ips.map(ip=>{
      const a=lookup(raw,ip),b=lookup(packed,ip);
      return {destination:ip,selected:a.route?.cidr??null,raw_visits:a.visited_nodes,compressed_visits:b.visited_nodes,raw_bit_comparisons:a.compared_bits,compressed_bit_comparisons:b.compared_bits,same_result:(a.route?.cidr??null)===(b.route?.cidr??null)};
    })};
  })};
}
