import request from "./request";
import macros from "./macros";

const _request = Object.assign(request, macros) as typeof request & typeof macros;
export default _request;
