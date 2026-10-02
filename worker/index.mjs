import {createHandler} from "./handler.mjs";
import {sendContact} from "./mail.mjs";
export default {fetch: createHandler({sendContact})};
