// export interface Axios {
//   request<T = any>(config: AxiosRequestConfig): AxiosPromise

//   get(url: string, config?: AxiosRequestConfig): AxiosPromise

//   delete(url: string, config?: AxiosRequestConfig): AxiosPromise

//   head(url: string, config?: AxiosRequestConfig): AxiosPromise

//   options(url: string, config?: AxiosRequestConfig): AxiosPromise

//   post(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

//   put(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise

//   patch(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise
// }

export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance
}

export interface AxiosInterceptorManager<T> {
  //use 方法支持 2 个参数，第一个是 resolve 函数，第二个是 reject 函数，
  // 对于 resolve 函数的参数，请求拦截器是 AxiosRequestConfig 类型的，
  // 而响应拦截器是 AxiosResponse 类型的；
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  //而对于 reject 函数的参数类型则是 any 类型的。
  eject(id: number): void
}

export interface ResolvedFn<T = any> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}

export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  headers: any
  config: AxiosRequestConfig
  request: any
}

// export interface AxiosResponse {
//   data: any
//   headers: any   // 第一个问题 是 返回的headers 属性是一个字符串，我们需要把它解析成对象类型；
//   config: AxiosRequestConfig
//   request: any

//   status: number
//   statusText: string
// }

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface Axios {
  defaults: AxiosRequestConfig

  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }

  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>

  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>

  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>

  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>
}

export interface AxiosInstance extends Axios {
  // 一个 AxiosInstance 除了拥有 Axios 接口里定义的所有成员以外，
  // 本身还可以像函数一样被直接调用
  // 这是一个“调用签名”——说明 AxiosInstance 本身可以作为函数使用
  // 既能当对象用   也能直接当函数用

  //可以一个参数  config
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>

  //也可以两个参数  url, config  其中 url 是必选参数，config 是可选参数
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

export interface AxiosRequestConfig {
  // url: string
  url?: string // 这里 我们通过 修改axios类 让cofig里面的url变成可选的
  method?: Method
  data?: any
  params?: any
  headers?: any
  timeout?: number
  responseType?: XMLHttpRequestResponseType

  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]

  [propName: string]: any //我们会通过 config2[key] 这种索引的方式访问，
  //所以需要给 AxiosRequestConfig 的接口定义添加一个字符串索引签名。
}

export interface AxiosTransformer {
  (data: any, headers?: any): any
}

export interface AxiosError extends Error {
  config: AxiosRequestConfig
  code?: string
  request?: any
  response?: AxiosResponse
  isAxiosError: boolean
}

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

// export interface AxiosPromise extends Promise<AxiosResponse> {
// }
