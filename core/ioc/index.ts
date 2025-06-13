import { getConfig } from '@core/config'
import { BeanClass, BeanInstance, BeanScope } from '@core/types'
import Autowired from './Autowired'
import Config from './Config'
import { PostConstruct } from './PostConstruct'
import Service from './Service'
export { getBean, getBeans, initBeanFinish, setBean } from './beans'
export { getBeanStateList, getState, registerCustomDecorator } from './beanState'
export { Scope } from './Scope'

export { Autowired, Service as Bean, BeanClass, BeanInstance, BeanScope, Config, getConfig, PostConstruct, Service }
