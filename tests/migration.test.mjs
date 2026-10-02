import test from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
import {startApi} from "../server/api.mjs";
import {render} from "../.ssr/entry-server.mjs";
test("prerender preserves metadata and content",async()=>{
 const html=await readFile("dist/index.html","utf8");
 assert.match(html,/<title>Selfbyt \| Foundations for intelligent systems<\/title>/);
 assert.match(html,/property="og:image" content="https:\/\/selfbyt.com\/og\/selfbyt.png"/);
 assert.match(html,/Built from/);assert.ok(!html.includes("/_next/"));
 const sitemap=await readFile("dist/sitemap.xml","utf8");assert.ok(!sitemap.includes("/studio"));
});
test("article HTML and metadata are available without client fetching",()=>{
 const post={_id:"test",slug:{current:"test-post"},title:"Testing systems",excerpt:"A systems note",publishedAt:"2026-01-01",body:[{_type:"block",_key:"a",style:"normal",markDefs:[],children:[{_type:"span",_key:"b",text:"Article body preserved.",marks:[]}]}]};
 const page=render("/blog/test-post",{posts:[post],papers:[]});
 assert.equal(page.status,200);assert.match(page.html,/Article body preserved/);assert.equal(page.metadata.openGraph.type,"article");assert.equal(page.metadata.title.absolute,"Testing systems | Selfbyt");
 assert.equal(render("/blog/missing",{posts:[],papers:[]}).status,404);
});
test("API rejects invalid requests before contacting providers",async()=>{
 const server=startApi(0);await new Promise(r=>server.on("listening",r));
 const base=`http://127.0.0.1:${server.address().port}`;
 try{
  assert.equal((await fetch(base+"/api/contact")).status,405);
  for(const [body,status] of [["not-json",400],["null",400],[JSON.stringify({email:"invalid"}),400],[JSON.stringify({email:"test@example.com",name:"A",subject:"B",message:""}),400],[JSON.stringify({email:"test@example.com",name:"A",subject:"B",message:"x".repeat(17000)}),413]]){
   assert.equal((await fetch(base+"/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body})).status,status);
  }
  assert.equal((await fetch(base+"/api/newsletter",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:"bad"})})).status,400);
  assert.equal((await fetch(base+"/api/revalidate",{method:"POST"})).status,503);
 }finally{await new Promise(r=>server.close(r))}
});
