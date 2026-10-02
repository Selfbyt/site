import {mkdir,writeFile} from "node:fs/promises";
import {createServer} from "vite";
import {getContent} from "./content.mjs";
import {startApi} from "../server/api.mjs";
await mkdir(".generated",{recursive:true});
await writeFile(".generated/content.json",JSON.stringify(await getContent()));
startApi(3002);
const server=await createServer();await server.listen();server.printUrls();
