

interface A2nModule {
  controllers?: {
    [controllerName: string]: object
  },
  services?: {
    [serviceName: string]: object
  },
  mappers?: {
    [mapperName: string]: object
  }
}

/**
 * 存放最终的模块
 */
export const a2nModules: { [moduleName: string]: A2nModule } = {}


/**
 * 用户传入的模块类型
 */
interface Modules {
  controllers?: any[],
  services?: any[],
  mappers?: any[]
}


export default function Module(modules: Modules): ClassDecorator {
  return function (module: any) {
    // 判断模块是否重复
    if (a2nModules[module.name]) {
      throw new Error("重复的Module名称'" + module.name + "'")
    }
    // 初始化模块
    a2nModules[module.name] = {
      controllers: {},
      services: {},
      mappers: {}
    }
    const controllerMap: any = {}
    const serviceMap: any = {}
    const mapperMap: any = {}
    // 注册控制器到模块容器
    if (modules.controllers) {
      for (const Controller of modules.controllers) {
        if (controllerMap[Controller.name]) {
          throw new Error("Controller: '" + Controller.name + "' 在Module: '" + module.name +"'中重复注册")
        }
        controllerMap[Controller.name] = new Controller()
      }
    }
    a2nModules[module.name].controllers = controllerMap
    // 注册服务层到模块容器
    if (modules.services) {
      for (const Service of modules.services) {
        if (serviceMap[Service.name]) {
          throw new Error("Service: '" + Service.name + "' 在Module: '" + module.name +"'中重复注册")
        }
        serviceMap[Service.name] = new Service()
      }
    }
    a2nModules[module.name].services = serviceMap
    // 注册持久层到模块容器
    if (modules.mappers) {
      for (const Mapper of modules.mappers) {
        if (mapperMap[Mapper.name]) {
          throw new Error("Mapper: '" + Mapper.name + "' 在Module: '" + module.name +"'中重复注册")
        }
        mapperMap[Mapper.name] = new Mapper()
      }
    }
    a2nModules[module.name].mappers = mapperMap
  }
}