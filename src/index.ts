import start from "./core/start";
import { RequestMapping, Get, Post, Put, Delete } from "./decorators/RequestMethod";
import { Query, Body, Request, Response, Req, Res } from "./decorators/ParamType";
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
    Delete,
    Request, 
    Response, 
    Req, 
    Res
}

export default start