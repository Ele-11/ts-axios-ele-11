//有些场景下，我们希望能主动取消请求，比如常见的搜索框案例，在用户输入过程中，搜索框的内容也在不断变化，
// 正常情况每次变化我们都应该向服务端发送一次请求。但是当用户输入过快的时候，我们不希望每次变化请求都发出去，
// 通常一个解决方案是前端用 debounce 的方案，比如延时 200ms 发送请求。这样当用户连续输入的字符，
// 只要输入间隔小于 200ms，前面输入的字符都不会发请求。

//但是还有一种极端情况是后端接口很慢，比如超过 1s 才能响应，这个时候即使做了 200ms 的 debounce，
// 但是在我慢慢输入（每个输入间隔超过 200ms）的情况下，在前面的请求没有响应前，
// 也有可能发出去多个请求。因为接口的响应时长是不定的，
// 如果先发出去的请求响应时长比后发出去的请求要久一些，后请求的响应先回来，
// 先请求的响应后回来，就会出现前面请求响应结果覆盖后面请求响应结果的情况，那么就乱了。
// 因此在这个场景下，我们除了做 debounce，还希望后面的请求发出去的时候，如果前面的请求还没有响应，
// 我们可以把前面的请求取消




import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled', e.message)
  }
})

setTimeout(() => {
  source.cancel('Operation canceled by the user.')

  axios.post('/cancel/post', { a: 1 }, { cancelToken: source.token }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log(e.message)
    }
  })
}, 100)

let cancel: Canceler

axios.get('/cancel/get', {
  cancelToken: new CancelToken(c => {
    cancel = c
  })
}).catch(function(e) {
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(() => {
  cancel()
}, 200)
