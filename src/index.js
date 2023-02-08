import start from "./core/start";
import * as requestMethod from "./decorators/RequestMethod";
import * as paramType from './decorators/ParamType'
import Controll from "./decorators/Controll";


module.exports = {
    start,
    ...requestMethod,
    ...paramType,
    Controll
}