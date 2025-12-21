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
  //发送请求前检查一下配置的 cancelToken 是否已经使用过了，
  // 如果已经被用过则不用法请求，直接抛异常。
  throwIfCancellationRequested(config)

  processConfig(config)
  // return xhr(config).then(res => {
  //   return transformResponseData(res)
  // })

  return xhr(config).then(
    // 为了通过单测 写的
    res => {
      return transformResponseData(res)
    },
    e => {
      if (e && e.response) {
        e.response = transformResponseData(e.response)
      }
      return Promise.reject(e)
    }
  )
}

function throwIfCancellationRequested(config: AxiosRequestConfig): void {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested()
  }
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
