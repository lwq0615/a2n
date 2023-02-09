import Controll from "./decorators/Controll";
import { start } from "./core/express";

export * from './decorators/ParamType';
export * from './decorators/RequestMethod';

export {
    start,
    Controll
}

export default start