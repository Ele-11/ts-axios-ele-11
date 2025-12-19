import { AxiosRequestConfig } from '../types'
import { AxiosResponse, AxiosPromise } from '../types'
import { parseHeaders } from '../helpers/headers'
import { createError } from '../helpers/error'
import cookie from '../helpers/cookies'
import { isURLSameOrigin } from '../helpers/url'
import { isFormData } from '../helpers/util'

// 我们把整个流程分为 7 步：

// 创建一个 request 实例。
// 执行 request.open 方法初始化。

// 执行 configureRequest 配置 request 对象。
// 执行 addEvents 给 request 添加事件处理函数。
// 执行 processHeaders 处理请求 headers。
// 执行 processCancel 处理请求取消逻辑。

// 执行 request.send 方法发送请求。

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 直接返回一个 promise
    const {
      data = null,
      url = '',
      method = 'get',
      headers,
      responseType,
      timeout,
      withCredentials,

      xsrfCookieName,
      xsrfHeaderName,

      onDownloadProgress,
      onUploadProgress,

      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest()
    request.open(method.toUpperCase(), url, true)

    if (auth) {
      headers['Authorization'] =
        'Basic ' + btoa(auth.username + ':' + auth.password)
    }

    configureRequest()

    addEvents()

    processHeaders()

    // processCancel()

    // function processCancel(): void {
    //   if (cancelToken) {
    //     cancelToken.promise.then(reason => {
    //       request.abort()
    //       reject(reason)
    //     })
    //   }
    // }

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }

      if (timeout) {
        request.timeout = timeout
      }

      if (withCredentials) {
        request.withCredentials = withCredentials
      }
    }

    function addEvents(): void {
      // 处理非 200 状态码 的响应

      //  用来 作为一个  处理 成功 或 失败  的响应data  的函数
      // 如果是 2xx 的状态码，则认为是一个正常的请求，否则抛错。
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

      // 网络异常 处理
      request.onerror = function handleError() {
        // reject(new Error('Network Error   -11'))

        reject(createError('Network Error   -11', config, null, request))
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

      // 下载进度 处理
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }
      // 上传进度 处理
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue) {
          headers[xsrfHeaderName!] = xsrfValue
        }
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function handleResponse(response: AxiosResponse) {
      // if (response.status >= 200 && response.status < 300) {

      if (!validateStatus || validateStatus(response.status)) {
        resolve(response) //如果没有配置 validateStatus 以及 validateStatus 函数返回的值为 true 的时候，
        // 都认为是合法的，正常 resolve(response)，否则都创建一个错误。
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
  })
}
