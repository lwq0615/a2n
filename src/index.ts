import start from "./core/start";
import { RequestMapping, Get, Post, Put, Delete } from "./decorators/RequestMethod";
import { Query, Body } from "./decorators/ParamType";
import Controll from "./decorators/Controll";

export {
    start,
    Controll,
    Query,
    Body,
    RequestMapping,
    Get,
    Post,
    Put,
    Delete
}

export default start