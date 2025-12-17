

import axios from '../../src/index'
import qs from 'qs'
import { AxiosTransformer } from '../../src/types'


// 11111111111111111111111111111111111

// axios.defaults.headers.common['test2'] = 1233333333333

// axios({
//   url: '/config/post',
//   method: 'post',
//   data: qs.stringify({
//     a: 1
//   }),
//   headers: {
//     test1: '3211111111111111'
//   }
// }).then(res => {
//   console.log(res.data)
// })


// 22222222222222222222222222222222222


// axios({
//   transformRequest: [(function(data) {
//     return qs.stringify(data)
//   }), ...(axios.defaults.transformRequest as AxiosTransformer[])],

//   transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
//     if (typeof data === 'object') {
//       data.b = 2
//     }
//     return data
//   }],
//   url: '/config/post',
//   method: 'post',
//   data: {
//     a: 11
//   }
// }).then((res) => {
//   console.log(res.data)
// })


const instance = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = "11-bbb"
    }
    return data
  }]
})


instance({
  url: '/config/post',
  method: 'post',
  data: {
    name: 11
  }
}).then((res) => {
  console.log(res.data)
})



const instance2 = axios.create({
  transformRequest: [(function(data) {
    return qs.stringify(data)
  }), ...(axios.defaults.transformRequest as AxiosTransformer[])],
  transformResponse: [...(axios.defaults.transformResponse as AxiosTransformer[]), function(data) {
    if (typeof data === 'object') {
      data.b = "22-bbb"
    }
    return data
  }]
})





instance2({
  url: '/config/post',
  method: 'post',
  data: {
    name: 22
  }
}).then((res) => {
  console.log(res.data)
})


