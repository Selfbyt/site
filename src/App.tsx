import {useEffect} from "react";
import {ContentProvider,type Content} from "./content";
import {SiteHeader} from "@/components/site-header";
import {SiteFooter} from "@/components/site-footer";
import {Toaster} from "@/components/ui/toaster";
import {NotFound} from "./not-found";
import {pageMetadata} from "@/lib/metadata";
import * as Home from "./pages/Home";
import * as About from "./pages/About";
import * as Writing from "./pages/Writing";
import * as Research from "./pages/Research";
import * as Team from "./pages/Team";
import * as Privacy from "./pages/Privacy";
import * as Terms from "./pages/Terms";
import Contact from "./pages/Contact";
import Post from "./pages/Post";
import Paper from "./pages/Paper";
const pages={"/":Home,"/about":About,"/blog":Writing,"/research":Research,"/team":Team,"/privacy":Privacy,"/terms":Terms,"/contact":{default:Contact,metadata:pageMetadata({title:"Contact",path:"/contact"})}};
export const staticRoutes=Object.keys(pages);
export function resolvePage(pathname:string,content:Content){
 const page=pages[pathname as keyof typeof pages];
 if(page)return {Component:page.default,metadata:page.metadata,status:200};
 const match=pathname.match(/^\/(blog|research)\/([^/]+)$/);
 const item=match && content[match[1]==="blog"?"posts":"papers"].find(p=>encodeURIComponent(p.slug.current)===match[2]);
 if(item)return {Component:match![1]==="blog"?Post:Paper,metadata:pageMetadata({title:item.title,description:item.excerpt||item.abstract,path:pathname,article:true,publishedTime:item.publishedAt}),status:200};
 return {Component:NotFound,metadata:pageMetadata({title:"Page not found",path:pathname}),status:404};
}
export function App({pathname,content}:{pathname:string;content:Content}){const {Component,metadata}=resolvePage(pathname,content);useEffect(()=>{document.title=metadata.title.absolute},[metadata.title.absolute]);return <ContentProvider pathname={pathname} content={content}><div className="flex min-h-screen flex-col"><SiteHeader/><main id="main-content" className="flex-1"><Component/></main><SiteFooter/><Toaster/></div></ContentProvider>}
