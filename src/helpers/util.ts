const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

// export function isObject (val: any): val is Object {
//   return val !== null && typeof val === 'object'
// }

/**
 * 判断一个值是否为普通对象（plain object）
 * 普通对象是指通过字面量 {} 或 new Object() 创建的对象，不包括数组、日期等其他对象类型
 * @param val 要检查的值
 * @returns 如果是普通对象则返回 true，否则返回 false
 */
export function isPlainObject(val: any): val is Object {
  return toString.call(val) === '[object Object]'
}

// export function isFormData(val: any): val is FormData {
//   return typeof val !== 'undefined' && val instanceof FormData
// }

// export function isURLSearchParams(val: any): val is URLSearchParams {
//   return typeof val !== 'undefined' && val instanceof URLSearchParams
// }

// extend 方法的实现用到了交叉类型，并且用到了类型断言。
// extend 的最终目的是把 from 里的属性都扩展到 to 中，包括原型上的属性。
export function extend<T, U>(to: T, from: U): T & U {
  for (const key in from) {
    ;(to as T & U)[key] = from[key] as any
  }
  return to as T & U
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)

  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObject(val)) {
          if (isPlainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })

  return result
}

//如果请求的数据是 FormData 类型，我们应该主动删除请求 headers 中的 Content-Type 字段，
// 让浏览器自动根据请求数据设置 Content-Type。
//比如当我们通过 FormData 上传文件的时候，浏览器会把请求 headers 中的 Content-Type 设置为 multipart/form-data。
export function isFormData(val: any): boolean {
  return typeof val !== 'undefined' && val instanceof FormData
}
