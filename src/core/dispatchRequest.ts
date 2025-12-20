import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from '../types'
import xhr from './xhr'
import { buildURL, isAbsoluteURL, combineURL } from '../helpers/url'
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

export function transformURL(config: AxiosRequestConfig): string {
  // const { url , params, paramsSerializer,baseURL } = config
  let { url, params, paramsSerializer, baseURL } = config // 因为这里不是单纯的读取  url 而是需要赋值 结合得到新的url, 所以需要用 let 来声明
  if (baseURL && !isAbsoluteURL(url!)) {
    url = combineURL(baseURL, url)
  }
  return buildURL(url!, params, paramsSerializer)
}

// function transformRequestData(config: AxiosRequestConfig): any {
//   return transformRequest(config.data)
// }

// function transformHeaders(config: AxiosRequestConfig) {
//   const { headers = {}, data } = config
//   return processHeaders(headers, data)
// }
