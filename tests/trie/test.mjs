import assert from 'node:assert/strict';
import fs from 'node:fs';
import {SCENARIOS,ipv4,route,build,compress,lookup,nodeCount,reference,report} from '../../public/trie/core.mjs';
let checks=0;
function check(routes,ip){const raw=build(routes),packed=compress(raw),expected=reference(routes,ip)?.cidr??null;assert.equal(lookup(raw,ip).route?.cidr??null,expected);assert.equal(lookup(packed,ip).route?.cidr??null,expected);checks++;}
let seed=2303;
function random(){seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed;}
function address(n){return [Math.floor(n/2**24),Math.floor(n/2**16)%256,Math.floor(n/256)%256,n%256].join('.');}
for(const s of SCENARIOS){for(let i=0;i<256;i++)check(s.routes,'192.168.10.'+i);for(let i=0;i<400;i++)check(s.routes,address(random()));}
for(let i=0;i<35;i++){
  const routes=new Map();
  for(let j=0;j<24;j++){const length=random()%33,n=random(),net=Math.floor(n/2**(32-length))*2**(32-length);const r=route(address(net)+'/'+length,'test','test');routes.set(r.cidr,r);}
  for(let j=0;j<150;j++)check([...routes.values()],address(random()));
}
for(const ip of ['','abc','192.168.10.256','01.2.3.4','::1','192.168.10.2/27','1.2.3.4.5','1.2.3']){assert.throws(()=>ipv4(ip));checks++;}
check([],'192.168.10.2');
for(const r of report().scenarios){for(const c of r.cases){assert.equal(c.same_result,true);checks++;}}
const fixture=JSON.parse(fs.readFileSync(new URL('./python-results.json',import.meta.url),'utf8'));
const web=report();
for(let i=0;i<3;i++){
  const a=fixture.scenarios[i],b=web.scenarios[i];assert.equal(a.raw_nodes,b.raw_nodes);assert.equal(a.compressed_nodes,b.compressed_nodes);
  for(let j=0;j<a.cases.length;j++)for(const key of ['destination','selected','raw_visits','compressed_visits','raw_bit_comparisons','compressed_bit_comparisons','same_result']){assert.equal(a.cases[j][key],b.cases[j][key],`${i}/${j}/${key}`);checks++;}
}
assert.equal(nodeCount(compress(build(SCENARIOS[0].routes))),8);
console.log(JSON.stringify({passed:checks,failed:0,python_parity:true}));
