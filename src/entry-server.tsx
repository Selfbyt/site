import {renderToString} from "react-dom/server";
import {App,resolvePage,staticRoutes} from "./App";
import type {Content} from "./content";
export {staticRoutes};
export function render(pathname:string,content:Content){return {...resolvePage(pathname,content),html:renderToString(<App pathname={pathname} content={content}/>)};}
