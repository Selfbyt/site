import {defineConfig,loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import {fileURLToPath} from "node:url";
import {readFile} from "node:fs/promises";
export default defineConfig(({mode})=>{const env=loadEnv(mode,process.cwd(),"");return {
 plugins:[react(),{name:"local-content",configureServer(server){server.middlewares.use(async(req,res,next)=>{if(req.url==="/__content.json"){try{res.setHeader("Content-Type","application/json");res.end(await readFile(".generated/content.json"))}catch{res.statusCode=503;res.end("{}")}return}if(req.url?.startsWith("/studio"))req.url="/studio/index.html";next()})}}],
 resolve:{alias:{"@":fileURLToPath(new URL(".",import.meta.url))}},
 define:Object.fromEntries(["PROJECT_ID","DATASET","API_VERSION"].map(key=>[`import.meta.env.VITE_SANITY_${key}`,JSON.stringify(env[`VITE_SANITY_${key}`]||env[`NEXT_PUBLIC_SANITY_${key}`]||(key==="DATASET"?"production":key==="API_VERSION"?"2025-05-08":""))])),
 server:{port:3001,proxy:{"/api":"http://127.0.0.1:3002"}},
 build:{rollupOptions:{input:{main:"index.html",studio:"studio/index.html"}}}
}});
