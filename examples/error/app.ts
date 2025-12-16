// import axios from '../../src/index'
import axios, { AxiosError } from '../../src/index'


axios({
  method: 'get',
  url: '/error/get1'
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})

axios({
  method: 'get',
  url: '/error/get'
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err)
})

setTimeout(() => {
  axios({
    method: 'get',
    url: '/error/get'
  }).then((res) => {
    console.log(res)
  }).catch((err) => {
    console.log(err)
  })
}, 5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((err) => {
  console.log(err.message)
})





//  最后的这个  是为了有 更丰富的 error信息   自定义了 一个  AxiosError类型

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 2000
}).then((res) => {
  console.log(res)
}).catch((err: AxiosError) => {
  console.log(err.message)
  console.log(err.code)
})