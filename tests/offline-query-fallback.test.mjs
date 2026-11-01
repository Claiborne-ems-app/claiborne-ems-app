import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import vm from "node:vm";
const source=readFileSync(new URL("../public/sw.js",import.meta.url),"utf8");
const origin="https://claiborne.example";
const page=`${origin}/medications`;
const state={activeVersion:"test"};
function request(url,{mode="navigate",headers={}}={}){return {url,mode,headers:new Headers(headers)};}
function harness(entries=new Map()){
 const calls=[];const context={URL,module:{exports:{}},caches:{open:async()=>({match:async(req)=>{const u=typeof req==="string"?req:req.url;calls.push(u);return entries.get(u);}})}};
 vm.runInNewContext(source,context);return {match:context.module.exports.activeCacheMatch,calls};
}
test("awaits exact miss before normalized navigation fallback",async()=>{const expected={};const {match,calls}=harness(new Map([[page,expected]]));assert.equal(await match(request(`${page}?protocol=up-04`),state),expected);assert.deepEqual(calls,[`${page}?protocol=up-04`,page]);});
test("exact query hit takes precedence",async()=>{const expected={};const {match,calls}=harness(new Map([[`${page}?protocol=up-04`,expected],[page,{}]]));assert.equal(await match(request(`${page}?protocol=up-04`),state),expected);assert.equal(calls.length,1);});
test("Flight never receives cached HTML",async()=>{for(const v of [{url:page,headers:{RSC:"1"}},{url:`${page}?_rsc=abc`,headers:{}},{url:page,headers:{Accept:"text/x-component"}}]){const {match,calls}=harness(new Map([[v.url,{}],[page,{}]]));assert.equal(await match(request(v.url,{mode:"cors",headers:v.headers}),state),null);assert.deepEqual(calls,[]);}});
test("subresource queries never normalize",async()=>{const {match,calls}=harness(new Map([[page,{}]]));assert.equal(await match(request(`${page}?q=other`,{mode:"cors"}),state),null);assert.deepEqual(calls,[`${page}?q=other`]);});
test("no active version has no response",async()=>{const {match,calls}=harness();assert.equal(await match(request(page),{}),null);assert.deepEqual(calls,[]);});
test("UP19 viewer redirects to UP18",()=>{const viewer=readFileSync(new URL("../app/protocols/[category]/[protocol]/viewer/page.tsx",import.meta.url),"utf8");assert.match(viewer,/categoryId === "up" && protocolId === "up-19"/);assert.match(viewer,/redirect\("\/protocols\/up\/up-18\/viewer"\)/);});
function serviceWorkerHarness(){
 const stores=new Map(),handlers=new Map();let version="old",online=true,block=false,wake;
 const blocked=new Promise(r=>{wake=r;});
 const resources=[{url:"/medications",kind:"route"},{url:"/offline",kind:"route"},{url:"/up19.pdf",kind:"document"}];
 const caches={open:async(name)=>{if(!stores.has(name))stores.set(name,new Map());const store=stores.get(name);return{put:async(k,r)=>store.set(typeof k==="string"?k:k.url,r.clone()),match:async(k)=>store.get(typeof k==="string"?k:k.url)?.clone()};},keys:async()=>[...stores.keys()],delete:async(k)=>stores.delete(k)};
 const context={URL,Request,Response,Headers,AbortController,DOMException,setTimeout,caches,self:{location:{origin},clients:{matchAll:async()=>[]},addEventListener:(t,h)=>handlers.set(t,h)},fetch:async(input,options={})=>{
 if(!online)throw new TypeError("offline");const url=new URL(typeof input==="string"?input:input.url,origin);
 if(url.pathname==="/offline-resources.json")return Response.json({version,resources,knownBytes:100});
 if(url.pathname==="/up19.pdf"){if(block){wake();await new Promise((resolve,reject)=>options.signal.addEventListener("abort",()=>reject(new DOMException("cancelled","AbortError")),{once:true}));}return new Response(version==="old"?"legacy algorithm":"RETIRED / MERGED INTO UP-18",{headers:{"Content-Type":"application/pdf"}});}
 return new Response("saved HTML",{headers:{"Content-Type":"text/html"}});
 }};vm.runInNewContext(source,context);
 return{stores,blocked,setVersion:v=>{version=v;},setOnline:v=>{online=v;},blockDocument:v=>{block=v;},message:async(type)=>{let task;const messages=[];handlers.get("message")({data:{type},ports:[{postMessage:m=>messages.push(m)}],waitUntil:p=>{task=p;}});await task;return messages;},fetch:async(req)=>{let response;handlers.get("fetch")({request:{method:"GET",...req},respondWith:p=>{response=p;}});return response;}};
}
test("fetch event resolves offline query navigation but rejects RSC",async()=>{const w=serviceWorkerHarness();assert.equal((await w.message("DOWNLOAD_OFFLINE_CONTENT")).at(-1).type,"OFFLINE_COMPLETE");w.setOnline(false);assert.equal(await(await w.fetch(request(`${page}?protocol=up-04`))).text(),"saved HTML");await assert.rejects(w.fetch(request(`${page}?_rsc=abc`,{mode:"cors",headers:{RSC:"1"}})),/Offline resource unavailable/);});
test("interrupted upgrade preserves old package; retry replaces retired PDF",async()=>{const w=serviceWorkerHarness();await w.message("DOWNLOAD_OFFLINE_CONTENT");w.setVersion("new");w.blockDocument(true);const pending=w.message("DOWNLOAD_OFFLINE_CONTENT");await w.blocked;await w.message("CANCEL_OFFLINE_DOWNLOAD");const failure=(await pending).at(-1);assert.equal(failure.type,"OFFLINE_ERROR");assert.equal(failure.state.activeVersion,"old");w.setOnline(false);assert.equal(await(await w.fetch(request(`${origin}/up19.pdf`))).text(),"legacy algorithm");w.setOnline(true);w.blockDocument(false);const success=(await w.message("DOWNLOAD_OFFLINE_CONTENT")).at(-1);assert.equal(success.type,"OFFLINE_COMPLETE");assert.equal(success.state.activeVersion,"new");w.setOnline(false);assert.equal(await(await w.fetch(request(`${origin}/up19.pdf`))).text(),"RETIRED / MERGED INTO UP-18");assert.equal([...w.stores.keys()].some(k=>k.endsWith("-old")),false);});
