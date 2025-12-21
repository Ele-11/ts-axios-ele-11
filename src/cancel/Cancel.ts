//Cancel 类非常简单，拥有一个 message 的公共属性。isCancel 方法也非常简单，
// 通过 instanceof 来判断传入的值是不是一个 Cancel 对象。

//接着我们对 CancelToken 类中的 reason 类型做修改，把它变成一个 Cancel 类型的实例。
export default class Cancel {
  message?: string

  constructor(message?: string) {
    this.message = message
  }
}

export function isCancel(value: any): boolean {
  return value instanceof Cancel
}
