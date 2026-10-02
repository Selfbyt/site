import {build} from "vite";
import {mkdir,readFile,writeFile} from "node:fs/promises";
import {pathToFileURL} from "node:url";
import {resolve,dirname} from "node:path";
import {getContent} from "./content.mjs";
const content=await getContent();
await build();
await build({build:{ssr:"src/entry-server.tsx",outDir:".ssr",rollupOptions:{input:"src/entry-server.tsx",output:{entryFileNames:"entry-server.mjs"}}}});
const {render,staticRoutes}=await import(pathToFileURL(resolve(".ssr/entry-server.mjs")));
const template=await readFile("dist/index.html","utf8");
const escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const origin="https://selfbyt.com";
const routes=[...staticRoutes,...content.posts.map(p=>"/blog/"+encodeURIComponent(p.slug.current)),...content.papers.map(p=>"/research/"+encodeURIComponent(p.slug.current))];
for(const route of [...routes,"/404"]){
 const data={posts:content.posts.map(p=>({...p,body:route==="/blog/"+encodeURIComponent(p.slug.current)?p.body:[]})),papers:content.papers.map(p=>({...p,body:route==="/research/"+encodeURIComponent(p.slug.current)?p.body:[]}))};
 const {html,metadata:m,status}=render(route,data);
 const meta=(name,value,property=false)=>`<meta ${property?"property":"name"}="${name}" content="${escape(value)}"/>`;
 const head=`<title>${escape(m.title.absolute)}</title><link rel="canonical" href="${origin}${route==="/"?"/":escape(route)}"/><link rel="icon" href="/icon.svg" type="image/svg+xml"/><link rel="apple-touch-icon" href="/apple-touch-icon.png"/>`+meta("description",m.description)+meta("theme-color","#f4f2ec")+meta("og:title",m.openGraph.title,true)+meta("og:description",m.description,true)+meta("og:url",origin+route,true)+meta("og:type",m.openGraph.type,true)+meta("og:site_name","Selfbyt",true)+meta("og:image",origin+"/og/selfbyt.png",true)+meta("og:image:width","1200",true)+meta("og:image:height","630",true)+meta("og:image:alt",m.openGraph.images[0].alt,true)+meta("twitter:card","summary_large_image")+meta("twitter:title",m.twitter.title)+meta("twitter:description",m.description)+meta("twitter:image",origin+"/og/selfbyt.png")+(m.openGraph.publishedTime?meta("article:published_time",m.openGraph.publishedTime,true):"")+(status===404?meta("robots","noindex"):"");
 const output=template.replace("<!--head-->",head).replace("<!--app-->",html).replace("<!--data-->",`<script id="site-data" type="application/json">${JSON.stringify(data).replace(/</g,"\u003c")}</script>`);
 const file=route==="/404"?"dist/404.html":route==="/"?"dist/index.html":`dist${route}/index.html`;
 await mkdir(dirname(file),{recursive:true});await writeFile(file,output);
}
await writeFile("dist/sitemap.xml",`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes.map(r=>`<url><loc>${origin}${escape(r)}</loc></url>`).join("")}</urlset>`);
await writeFile("dist/robots.txt",`User-agent: *\nAllow: /\nDisallow: /studio\nDisallow: /api/\nSitemap: ${origin}/sitemap.xml\n`);
console.log(`Prerendered ${routes.length} pages, plus a 404 page.`);
