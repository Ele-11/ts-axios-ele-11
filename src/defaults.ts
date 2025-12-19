import { AxiosRequestConfig } from './types'
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/headers'

const defaults: AxiosRequestConfig = {
  method: 'get',

  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN-111111',

  xsrfHeaderName: 'X-XSRF-TOKEN-222222',

  headers: {
    common: {
      Accept: 'application/json, text/plain, */*'
    }
  },
  validateStatus(status: number): boolean {
    // 默认配置  网络状态码在 200到3000之间的 才算是合理的  当然你可以自定义的时候传入一个函数 来判断是否合理
    return status >= 200 && status < 300
  },

  transformRequest: [
    function(data: any, headers: any): any {
      processHeaders(headers, data)
      return transformRequest(data)
    }
  ],

  transformResponse: [
    function(data: any): any {
      return transformResponse(data)
    }
  ]
}

const methodsNoData = ['delete', 'get', 'head', 'options']

methodsNoData.forEach(method => {
  defaults.headers[method] = {}
})

const methodsWithData = ['post', 'put', 'patch']

methodsWithData.forEach(method => {
  defaults.headers[method] = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

export default defaults
