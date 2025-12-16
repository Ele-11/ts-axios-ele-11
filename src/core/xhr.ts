import { AxiosRequestConfig } from '../types'
import { AxiosResponse, AxiosPromise } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'

// export default function xhr(config: AxiosRequestConfig) {

//     const { url, method = 'get', data = null , headers} = config;

//     const request = new XMLHttpRequest();

//     request.open(method.toUpperCase(), url, true);

//     //这里要额外判断一个逻辑，当我们传入的 data 为空的时候，
//     // 请求 header 配置 Content-Type 是没有意义的，于是我们把它删除。
//     Object.keys(headers).forEach((name) => {
//     if (data === null && name.toLowerCase() === 'content-type') {
//       delete headers[name]
//     } else {
//         // 就是把你自定义 的headers 里面的所有属性加进来
//       request.setRequestHeader(name, headers[name])
//     }
//   })

//     request.send(data);

// }

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 直接返回一个 promise
    const {
      data = null,
      url = '',
      method = 'get',
      headers,
      responseType,
      timeout
    } = config

    const request = new XMLHttpRequest()

    // 网络异常 处理
    request.onerror = function handleError() {
      // reject(new Error('Network Error   -11'))

      reject(createError('Network Error   -11', config, null, request))
    }

    if (timeout) {
      request.timeout = timeout
    }
    // 网络超时 处理
    request.ontimeout = function handleTimeout() {
      // reject(new Error(`Timeout of ${timeout} ms exceeded-11`))

      reject(
        createError(
          `Timeout of ${config.timeout} ms exceeded   -11`,
          config,
          'ECONNABORTED', // 打印了一下  这个是  code
          request
        )
      )
    }

    if (responseType) {
      request.responseType = responseType
    }

    request.open(method.toUpperCase(), url, true)

    // request.onreadystatechange = function handleLoad() {
    //   if (request.readyState !== 4) {
    //     return
    //   }

    //   // const responseHeaders = request.getAllResponseHeaders()

    //   const responseHeaders = parseHeaders(request.getAllResponseHeaders())

    //   const responseData = responseType && responseType !== 'text' ? request.response : request.responseText
    //   const response: AxiosResponse = {
    //     data: responseData,
    //     status: request.status,
    //     statusText: request.statusText,
    //     headers: responseHeaders,
    //     config,
    //     request
    //   }
    //   resolve(response)  //  处理成功的返回结果  返回response响应数据
    // }

    // 处理非 200 状态码 的响应
    request.onreadystatechange = function handleLoad() {
      if (request.readyState !== 4) {
        return
      }

      if (request.status === 0) {
        return
      }

      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData =
        responseType && responseType !== 'text'
          ? request.response
          : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      handleResponse(response)
    }

    //  用来 作为一个  处理 成功 或 失败  的响应data  的函数
    // 如果是 2xx 的状态码，则认为是一个正常的请求，否则抛错。
    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        // reject(new Error(`Request failed with status code ${response.status}      -11`))

        reject(
          createError(
            `Request failed with status code ${response.status}    -11`,
            config,
            null,
            request,
            response
          )
        )
      }
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })
}
