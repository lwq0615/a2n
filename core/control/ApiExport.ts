import { getConfig } from "@core/config"
import { getState, setBean } from "@core/ioc"
import { getControlBean } from "./Control"
import { Method, Route } from "./types"

const apiExportList: Function[] = []

export const invokeApiExport = () => {
  apiExportList.forEach(fn => fn())
}

export const ApiExport: ClassDecorator = (Cons: any) => {
  apiExportList.push(() => {
    const state = getState(Cons)
    state.isApiExport = true
    state.controlMapping = getConfig().apiExport.baseUrl
    if (!state.setBeanTask) {
      state.setBeanTask = () => setBean(Cons)
    }
    Reflect.ownKeys(Cons.prototype).forEach((methodName: string) => {
      if (Cons.prototype[methodName] === Cons) {
        return
      }
      if (!state.controlMethods[methodName]) {
        state.controlMethods[methodName] = new Route()
      }
      state.controlMethods[methodName].handler = async (params: any) => {
        const bean = await getControlBean(Cons)
        return await bean?.[methodName](params)
      }
      state.controlMethods[methodName].path = getState(Cons).filePath + "/" + methodName
      state.controlMethods[methodName].type = Method.ALL
    })
  })
}

export default ApiExport