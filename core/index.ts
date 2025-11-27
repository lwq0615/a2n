import 'Reflect-metadata'

export {
  Autowired,
  Bean,
  BeanClass,
  BeanInstance,
  BeanScope,
  Config,
  getBean,
  getBeans,
  getState as getBeanState,
  PostConstruct,
  registerCustomDecorator,
  Scope,
  Service,
} from '@core/ioc'

export {
  After,
  AppLifecycle,
  Around,
  AroundInterceptor,
  Aspect,
  Before,
  ErrHandler,
  Interceptor,
  NextFunction,
} from '@core/aop'

export { getConfig, setConfig } from '@core/config'
export {
  ApiExport,
  ApiExportRequest,
  app,
  Body,
  close,
  Context,
  Control,
  Delete,
  Get,
  getContext,
  Param,
  Post,
  Put,
  Query,
  Req,
  RequestMapping,
  Res,
  start,
} from '@core/control'

export { Request, Response } from 'express'
