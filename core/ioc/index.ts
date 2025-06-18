import { getConfig } from '@core/config'
import { BeanClass, BeanInstance, BeanScope } from '@core/types'
import Autowired from './autowired'
import Config from './config'
import { PostConstruct } from './post-construct'
import Service from './service'
export { getBean, getBeans, initBeanFinish, setBean } from './beans'
export { getBeanStateList, getState, registerCustomDecorator } from './bean-state'
export { Scope } from './scope'

export { Autowired, Service as Bean, BeanClass, BeanInstance, BeanScope, Config, getConfig, PostConstruct, Service }
