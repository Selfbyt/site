import {createServer} from "node:http";
import {readFile,stat} from "node:fs/promises";
import {resolve,extname,sep} from "node:path";
import {handleApi} from "../server/api.mjs";
const root=resolve("dist");
const types={".html":"text/html; charset=utf-8",".js":"application/javascript",".css":"text/css",".json":"application/json",".svg":"image/svg+xml",".png":"image/png",".ico":"image/x-icon",".woff2":"font/woff2",".xml":"application/xml",".txt":"text/plain"};
createServer(async(req,res)=>{try{
 const pathname=new URL(req.url,"http://localhost").pathname;
 if(pathname.startsWith("/api/"))return await handleApi(req,res);
 let file=resolve(root,"."+decodeURIComponent(pathname));
 if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);return res.end()}
 if(pathname.startsWith("/studio"))file=resolve(root,"studio/index.html");
 try{if((await stat(file)).isDirectory())file=resolve(file,"index.html");await stat(file)}catch{file=resolve(root,"404.html");res.statusCode=404}
 res.setHeader("Content-Type",types[extname(file)]||"application/octet-stream");res.end(await readFile(file));
 }catch{res.statusCode=500;res.end("Unable to serve page")}}).listen(Number(process.env.PORT||3001),"127.0.0.1",()=>console.log("Vite production preview: http://localhost:"+(process.env.PORT||3001)));
