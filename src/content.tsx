import {createContext, useContext, useEffect, useState, type ReactNode} from "react";
import type {PortableTextBlock} from "@portabletext/types";
export type Article = {_id:string; title:string; slug:{current:string}; publishedAt:string; excerpt:string; abstract:string; category:string; author:string; authors:string[]; pdfUrl?:string; body:PortableTextBlock[]};
export type Content = {posts:Article[]; papers:Article[]};
const Data = createContext<Content>({posts:[],papers:[]});
const Location = createContext({pathname:"/",search:""});
export function ContentProvider({content,pathname,children}:{content:Content;pathname:string;children:ReactNode}) {
 const [search,setSearch]=useState("");
 useEffect(()=>setSearch(window.location.search),[]);
 return <Data.Provider value={content}><Location.Provider value={{pathname,search}}>{children}</Location.Provider></Data.Provider>;
}
export const useContent=()=>useContext(Data);
export const usePageLocation=()=>useContext(Location);
