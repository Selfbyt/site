import {useMemo} from "react";
import {usePageLocation} from "./content";
export const usePathname=()=>usePageLocation().pathname;
export function useSearchParams(){const {search}=usePageLocation();return useMemo(()=>new URLSearchParams(search),[search]);}
