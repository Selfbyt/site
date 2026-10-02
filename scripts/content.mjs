import {createClient} from "@sanity/client";
import {loadEnv} from "vite";
export const env={...loadEnv("production",process.cwd(),""),...process.env};
export async function getContent(){const client=createClient({projectId:env.VITE_SANITY_PROJECT_ID||env.NEXT_PUBLIC_SANITY_PROJECT_ID,dataset:env.VITE_SANITY_DATASET||env.NEXT_PUBLIC_SANITY_DATASET||"production",apiVersion:"2025-05-08",useCdn:false,perspective:"published"});
const docs=await client.fetch(`*[_type in ["post","researchPaper"] && defined(slug.current)] | order(publishedAt desc) {_id,_type,_updatedAt,title,slug,publishedAt,excerpt,abstract,body,pdfUrl,"category":category->title,"author":author->name,"authors":authors[]->name}`);
for(const doc of docs){if(!/^[a-zA-Z0-9][a-zA-Z0-9_-]*$/.test(doc.slug.current))throw Error("Unsupported content slug: "+doc.slug.current)}
return {posts:docs.filter(d=>d._type==="post"),papers:docs.filter(d=>d._type==="researchPaper")};}
