import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL } from '../helpers/url'
import { transformRequest, transformResponse } from '../helpers/data'
import transform from './transform'
import { processHeaders, flattenHeaders } from '../helpers/headers'
// import { processHeaders } from '../helpers/headers'

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config)
  return xhr(config).then(res => {
    return transformResponseData(res)
  })
}
function transformResponseData(res: AxiosResponse): AxiosResponse {
  // res.data = transformResponse(res.data)
  res.data = transform(res.data, res.headers, res.config.transformResponse)
  return res
}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)

  // config.data = transformRequestData(config)
  config.data = transform(config.data, config.headers, config.transformRequest)

  // config.headers = transformHeaders(config)
  config.headers = flattenHeaders(config.headers, config.method!) //确保我们了配置中的 headers 是可以正确添加到请求 header 中的
}

function transformURL(config: AxiosRequestConfig): string {
  const { url = '', params } = config
  return buildURL(url, params)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }
