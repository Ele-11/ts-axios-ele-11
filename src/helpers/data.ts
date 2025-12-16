import { CLIENT_RENEG_WINDOW } from 'tls'
import { isPlainObject } from './util'
import { log } from 'console'

export function transformRequest(data: any): any {
  if (isPlainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (err) {
      // do nothing
      console.log(err)
    }
  }
  return data
}
