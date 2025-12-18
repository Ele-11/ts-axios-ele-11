import axios from '../../src/index'

document.cookie = 'a=b'

// axios.get('/more/get',{
//   method: 'get',
//   responseType: 'json',
//   data: {
//     a: 3,
//     b: 4
//   }
// }).then(res => {
//   console.log(res)
// })


//这些功能暂时未测试成功过   withCredentials

axios.get('/more/get').then(res => {
  console.log(res)
})



axios.post('http://127.0.0.1:8088/more/server2', { }, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
