import {createRoot,hydrateRoot} from "react-dom/client";
import {App} from "./App";
import "../styles/globals.css";
const node=document.getElementById("root")!;
const saved=document.getElementById("site-data");
const pathname=window.location.pathname.replace(/\/$/,"")||"/";
if(saved){hydrateRoot(node,<App pathname={pathname} content={JSON.parse(saved.textContent!)}/>)}
else{fetch("/__content.json").then(r=>{if(!r.ok)throw Error("Content unavailable");return r.json()}).then(content=>createRoot(node).render(<App pathname={pathname} content={content}/>)).catch(()=>{node.textContent="Unable to load content. Please refresh."})}
