import { isPlainObject, deepMerge } from './util'
import { Method } from '../types'

function normalizeHeaderName(headers: any, normalizedName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (
      name !== normalizedName &&
      name.toUpperCase() === normalizedName.toUpperCase()
    ) {
      headers[normalizedName] = headers[name]
      delete headers[name]
    }
  })
}

export function processHeaders(headers: any, data: any): any {
  normalizeHeaderName(headers, 'Content-Type')

  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}

// 这个函数的主要作用  就是  把  字符串类型的 headers  解析成  对象类型

// 这个 单元测试没通过  因为只考虑了  只有一个 引号的情况
// export function parseHeaders(headers: string): any {
//   let parsed = Object.create(null)
//   if (!headers) {
//     return parsed
//   }

//   headers.split('\r\n').forEach(line => {
//     let [key, val] = line.split(':')
//     key = key.trim().toLowerCase()
//     if (!key) {
//       return
//     }
//     if (val) {
//       val = val.trim()
//     }
//     parsed[key] = val
//   })

//   return parsed
// }

// 这个 单元测试 就能通过   考虑了  有多个 引号的情况
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, ...vals] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    let val = vals.join(':').trim()
    parsed[key] = val
  })

  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }

  // 我们可以通过 deepMerge 的方式把 common、post 的属性拷贝到 headers 这一级，
  // 然后再把 common、post 这些属性删掉。

  headers = deepMerge(headers.common || {}, headers[method] || {}, headers)

  const methodsToDelete = [
    'delete',
    'get',
    'head',
    'options',
    'post',
    'put',
    'patch',
    'common'
  ]

  methodsToDelete.forEach(method => {
    delete headers[method]
  })

  // console.log('[flattenHeaders] final headers =', headers)

  return headers
}
