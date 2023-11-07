import Autowired from './Autowired'
import Service from './Service'
import Config from './Config'
import { PostConstruct } from './PostConstruct'
import { BeanScope, BeanClass, BeanInstance } from './types'
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
  Config,
  PostConstruct,
  BeanScope,
  BeanClass,
  BeanInstance
}