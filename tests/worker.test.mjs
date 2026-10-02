import test from "node:test";
import assert from "node:assert/strict";
import {createHandler} from "../worker/handler.mjs";
const form={name:"Test",email:"test@example.com",subject:"Question",message:"Hello"};
const env={SITE_URL:"https://selfbyt.com",FORM_RATE_LIMITER:{limit:async()=>({success:true})},GMAIL_USER:"test",GMAIL_APP_PASSWORD:"secret",MAILCHIMP_API_KEY:"secret",MAILCHIMP_SERVER_PREFIX:"us1",MAILCHIMP_LIST_ID:"list",SANITY_WEBHOOK_SECRET:"webhook-secret",CLOUDFLARE_DEPLOY_HOOK:"https://api.cloudflare.com/client/v4/workers/builds/deploy_hooks/test"};
const req=(path,data=form,headers={})=>new Request("https://selfbyt.com"+path,{method:"POST",headers:{"Content-Type":"application/json",...headers},body:JSON.stringify(data)});
const fail=()=>{throw Error("Unexpected provider call")};
test("contact validates and sends only to configured transport",async()=>{
 let received;const handle=createHandler({sendContact:async(_,data)=>{received=data},fetchUpstream:fail});
 assert.equal((await handle(req("/api/contact"),env)).status,200);assert.equal(received.message,"Hello");
 for(const data of [null,[],{...form,email:"bad"},{...form,subject:"Injected\r\nHeader"},{...form,message:""}])assert.equal((await handle(req("/api/contact",data),env)).status,400);
 assert.equal((await handle(req("/api/contact",{...form,message:"x".repeat(17000)}),env)).status,413);
 assert.equal((await handle(req("/api/contact"),{...env,GMAIL_USER:""})).status,503);
});
test("origin, method and rate limits block upstream work",async()=>{
 const handle=createHandler({sendContact:fail,fetchUpstream:fail});
 assert.equal((await handle(req("/api/contact",form,{Origin:"https://evil.example"}),env)).status,403);
 assert.equal((await handle(new Request("https://selfbyt.com/api/contact"),env)).status,405);
 const response=await handle(req("/api/contact"),{...env,FORM_RATE_LIMITER:{limit:async()=>({success:false})}});
 assert.equal(response.status,429);assert.equal(response.headers.get("Retry-After"),"60");
 assert.equal((await handle(req("/api/contact"),{...env,FORM_RATE_LIMITER:null})).status,503);
 assert.equal((await handle(req("/api/missing"),env)).status,404);
});
test("newsletter handles subscriptions, duplicates and provider failure",async()=>{
 let sent;const handle=createHandler({sendContact:fail,fetchUpstream:async(url,init)=>{sent={url,init};return Response.json({id:"member"})}});
 assert.equal((await handle(req("/api/newsletter"),env)).status,200);
 assert.match(sent.url,/us1.api.mailchimp.com/);assert.equal(JSON.parse(sent.init.body).email_address,form.email);
 const duplicate=createHandler({sendContact:fail,fetchUpstream:async()=>Response.json({title:"Member Exists"},{status:400})});
 assert.match((await (await duplicate(req("/api/newsletter"),env)).json()).message,/already subscribed/);
 const bad=createHandler({sendContact:fail,fetchUpstream:async()=>{throw Error("private provider error")}});
 const response=await bad(req("/api/newsletter"),env);assert.equal(response.status,502);assert.ok(!(await response.text()).includes("private"));
});
test("webhook authenticates, filters drafts and schedules rebuilds",async()=>{
 let calls=0;const handle=createHandler({sendContact:fail,fetchUpstream:async()=>{calls++;return Response.json({success:true})}});
 const headers={"x-webhook-secret":"webhook-secret"};
 assert.equal((await handle(req("/api/revalidate",{_type:"post"}),env)).status,401);
 assert.equal((await handle(req("/api/revalidate",{_type:"post",_id:"drafts.a"},headers),env)).status,200);assert.equal(calls,0);
 assert.equal((await handle(req("/api/revalidate",{_type:"product"},headers),env)).status,200);assert.equal(calls,0);
 assert.equal((await handle(req("/api/revalidate",{_type:"post"},headers),env)).status,202);assert.equal(calls,1);
 assert.equal((await handle(req("/api/revalidate",{_type:"post"},headers),{...env,CLOUDFLARE_DEPLOY_HOOK:"https://evil.example"})).status,503);
 const bad=createHandler({sendContact:fail,fetchUpstream:async()=>Response.json({success:false})});
 assert.equal((await bad(req("/api/revalidate",{_type:"post"},headers),env)).status,502);
});
test("static requests use the asset binding",async()=>{
 const handle=createHandler({sendContact:fail,fetchUpstream:fail});
 const response=await handle(new Request("https://selfbyt.com/about"),{ASSETS:{fetch:async()=>new Response("static page")}});
 assert.equal(await response.text(),"static page");
});
