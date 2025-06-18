import { getBeans } from '@core/ioc'
import { AppLifecycle } from '@core/types'

export function invokeAppLifecycleAfter() {
  getBeans(AppLifecycle).then((appLifecycleList) => {
    appLifecycleList.forEach((appLifecycle) => {
      appLifecycle.afterAppStart()
    })
  })
}

export function invokeAppLifecycleClose() {
  getBeans(AppLifecycle).then((appLifecycleList) => {
    appLifecycleList.forEach((appLifecycle) => {
      appLifecycle.afterAppClose()
    })
  })
}
