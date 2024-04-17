import Autowired from './Autowired'
import Service from './Service'
import Config, { setConfig, getConfig } from './Config'
import { PostConstruct } from './PostConstruct'
import { BeanScope, BeanClass, BeanInstance } from '@/types'
export { getState } from './beanState'
export { Scope } from './Scope'
export {
  setBean,
  getBean,
  getBeans,
  initBeanFinish
} from './beans'

export {
  Autowired,
  Service,
  Service as Bean,
  setConfig,
  getConfig,
  Config,
  PostConstruct,
  BeanScope,
  BeanClass,
  BeanInstance
}