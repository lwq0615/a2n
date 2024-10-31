import { getBeans } from '@core/ioc'
import { AppLifecycle } from '@core/types'



export function invokeAppLifecycleAfter() {
  getBeans<AppLifecycle>(AppLifecycle).then(appLifecycleList => {
    appLifecycleList.forEach(appLifecycle => {
      appLifecycle.afterAppStart?.()
    })
  })
}