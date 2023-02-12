import Controll from "./decorators/Controll";
import { start, app } from "./core/express";
import Module from "./decorators/Module";

export * from './decorators/ParamType';
export * from './decorators/RequestMethod';

export {
    app,
    start,
    Module,
    Controll
}

export default start