import axios from '../../src/index'
import qs from 'qs'  // 它是一个查询字符串解析和字符串化的库  比如{a:1} 经过 qs.stringify 变成 a=1。

axios.defaults.headers.common['test2'] = 123

axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: '321'
  }
}).then((res) => {
  console.log(res.data)
})
