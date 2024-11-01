


export interface StartParam {
  callback?: () => void
}

export type Close = (callback?: (err?: Error) => void) => void

export interface Control {
  (path: string): ClassDecorator
  <TFunction extends Function>(target: TFunction): TFunction | void
}

export interface RequestMapping {
  (path: string): MethodDecorator
  <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>): TypedPropertyDescriptor<T> | void
}

export interface RequestParamDecorator {
  (name: string): ParameterDecorator
  (target: Object, propertyKey: string | symbol | undefined, parameterIndex: number): void
}