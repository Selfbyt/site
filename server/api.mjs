import {createServer} from "node:http";
import nodemailer from "nodemailer";
import {loadEnv} from "vite";
const env={...loadEnv("production",process.cwd(),""),...process.env};
const emailPattern=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export async function handleApi(req,res){
 const reply=(status,message,success=false)=>{res.writeHead(status,{"Content-Type":"application/json","Cache-Control":"no-store"});res.end(JSON.stringify({success,message}))};
 const path=new URL(req.url,"http://localhost").pathname;
 if(!["/api/contact","/api/newsletter","/api/revalidate"].includes(path))return reply(404,"Not found");
 if(req.method!=="POST"){res.setHeader("Allow","POST");return reply(405,"Method not allowed")}
 if(path==="/api/revalidate")return reply(503,"Static content requires a new build. Deployment integration is pending.");
 if(!(req.headers["content-type"]||"").includes("application/json"))return reply(415,"JSON is required");
 let raw="";
 try{for await(const chunk of req){raw+=chunk;if(Buffer.byteLength(raw)>16384)return reply(413,"Message is too large")}}catch{return reply(400,"Invalid request")}
 let data;try{data=JSON.parse(raw)}catch{return reply(400,"Invalid JSON")}
 if(!data||typeof data!=="object"||typeof data.email!=="string"||data.email.length>254||!emailPattern.test(data.email))return reply(400,"Please enter a valid email address");
 try{
 if(path==="/api/contact"){
  for(const [key,max] of [["name",200],["subject",200],["message",10000]])if(typeof data[key]!=="string"||!data[key].trim()||data[key].length>max)return reply(400,"Please complete all fields within the allowed length");
  if(/[\r\n]/.test(data.subject+data.name))return reply(400,"Invalid name or subject");
  if(!env.GMAIL_USER||!env.GMAIL_APP_PASSWORD)return reply(503,"Contact email is not configured");
  const transport=nodemailer.createTransport({service:"gmail",auth:{user:env.GMAIL_USER,pass:env.GMAIL_APP_PASSWORD}});
  try{await transport.sendMail({from:env.GMAIL_USER,to:"hello@selfbyt.com",replyTo:data.email,subject:`Contact Form: ${data.subject}`,text:`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`})}finally{transport.close()}
  return reply(200,"Message sent successfully! We'll get back to you soon.",true);
 }
 if(!env.MAILCHIMP_API_KEY||!/^us\d+$/.test(env.MAILCHIMP_SERVER_PREFIX||"")||!env.MAILCHIMP_LIST_ID)return reply(503,"Newsletter is not configured");
 const result=await fetch(`https://${env.MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${encodeURIComponent(env.MAILCHIMP_LIST_ID)}/members`,{method:"POST",headers:{Authorization:`Basic ${Buffer.from("selfbyt:"+env.MAILCHIMP_API_KEY).toString("base64")}`,"Content-Type":"application/json"},body:JSON.stringify({email_address:data.email,status:"subscribed"}),signal:AbortSignal.timeout(15000)});
 const resultData=await result.json();
 if(result.ok)return reply(200,"Successfully subscribed to the newsletter!",true);
 if(resultData.title==="Member Exists")return reply(200,"This email is already subscribed to our newsletter");
 return reply(502,"Unable to subscribe. Please try again later.");
 }catch{return reply(502,"Unable to send your request. Please try again later.")}
}
export function startApi(port=3002){const server=createServer((req,res)=>{handleApi(req,res).catch(()=>{res.statusCode=500;res.end()})});server.listen(port,"127.0.0.1");return server}
