import Controll from "./decorators/Controll";
import { start, app } from "./core/express";

export * from './decorators/ParamType';
export * from './decorators/RequestMethod';

export {
    app,
    start,
    Controll
}

export default start