import { getState, setBean } from "@/ioc"
import { getConfig } from "@/ioc/Config"
import { getControlBean } from "./Control"
import { Method, Route } from "./types"


export const ApiExport: ClassDecorator = (Cons: any) => {
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
    state.controlMethods[methodName].handler = async (...params: any) => (await getControlBean(Cons))?.[methodName](...params)
    state.controlMethods[methodName].path = () => Cons.filepath + "/" + methodName
    state.controlMethods[methodName].type = Method.ALL
  })
}

export default ApiExport