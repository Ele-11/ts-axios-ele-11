import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AxiosError } from '../../src/types'
import qs from 'qs'


// document.cookie = 'a=b'

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

// axios.get('/more/get').then(res => {
//   console.log(res)
// })



// axios.post('http://127.0.0.1:8088/more/server2',{}, {
//   withCredentials: true
// }).then(res => {
//   console.log(res)
// })







//   XSRF


// axios.get('/more/get',{
//   xsrfCookieName: 'XSRF-TOKEN', // default   // 我们提供 xsrfCookieName 和 xsrfHeaderName 的默认值，
//   xsrfHeaderName: 'X-XSRF-TOKEN' // default   // 当然用户也可以根据自己的需求在请求中去配置 xsrfCookieName 和 xsrfHeaderName
// }).then(res => {
//   console.log(res)
// })

//  实现 XSRF 的自动防御的能力

// const instance = axios.create({
//   xsrfCookieName: 'XSRF-TOKEN-Ele',
//   xsrfHeaderName: 'X-XSRF-TOKEN-Ele2'
// })

// instance.get('/more/get').then(res => {
//   console.log(res)
// })













// const instance = axios.create()
// // 实现上传 和 下载的  进度条 

// function calculatePercentage(loaded: number, total: number) {
//   return Math.floor(loaded * 1.0) / total
// }

// function loadProgressBar() {
//   const setupStartProgress = () => {
//     instance.interceptors.request.use(config => {
//       NProgress.start()
//       return config
//     })
//   }

//   const setupUpdateProgress = () => {
//     const update = (e: ProgressEvent) => {
//       console.log(e)
//       NProgress.set(calculatePercentage(e.loaded, e.total))
//     }
//     instance.defaults.onDownloadProgress = update
//     instance.defaults.onUploadProgress = update
//   }

//   const setupStopProgress = () => {
//     instance.interceptors.response.use(response => {
//       NProgress.done()
//       return response
//     }, error => {
//       NProgress.done()
//       return Promise.reject(error)
//     })
//   }

//   setupStartProgress()
//   setupUpdateProgress()
//   setupStopProgress()
// }

// loadProgressBar()

// const downloadEl = document.getElementById('download')

// downloadEl!.addEventListener('click', e => { 
//   // instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
//   instance.get('https://gips1.baidu.com/it/u=1746086795,2510875842&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024')
// })

// const uploadEl = document.getElementById('upload')

// uploadEl!.addEventListener('click', e => {
//   const data = new FormData()
//   const fileEl = document.getElementById('file') as HTMLInputElement
//   if (fileEl.files) {
//     data.append('file', fileEl.files[0])

//     instance.post('/more/upload', data)
//   }
// })




//  HTTP 授权  这个 功能实现了



// axios.post('/more/post', {
//   msg: "十一是个大帅逼~"
// }, {
//   auth: {
//     // username: 'ele',  // 这样就会显示  UnAuthorization
//     username: 'Ele',
//     password: '123456'
//   }
// }).then(res => {
//   console.log(res)
// })




//  自定义合法状态码



// axios.get('/more/304').then(res => {
//   console.log(res)      //   这里会返回 Request failed with status code 304    -11
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })

// axios.get('/more/304', {
//   name:"11",
//   validateStatus(status) {
//     return status >= 200 && status < 400    //   这里 因为你是  允许 200 到400 的  所以 304也有 返回 
//   }
// }).then(res => {
//   console.log(res)
// }).catch((e: AxiosError) => {
//   console.log(e.message)
// })





//自定义参数序列化

//我们编写了 3 种情况的请求，第一种满足请求的 params 参数是 URLSearchParams 对象类型的。

// axios.get('/more/get', {
//   params: new URLSearchParams('a=b&name=ShiYi乙乙')
// }).then(res => {
//   console.log(res)
// })


// // 后两种请求的结果主要区别在于前者并没有对 [] 转义，而后者会转义。
// axios.get('/more/get', {
//   params: {
//     a: 1,
//     b: 2,
//     c: ['a', 'b', 'c']
//   }
// }).then(res => {
//   console.log(res)
// })

// const instance = axios.create({
//   paramsSerializer(params) {
//     return qs.stringify(params, { arrayFormat: 'brackets' })   //返回的 /%5B/gi 对应 '[' . /%5D/gi 对应 ']' 
//     // return qs.stringify(params, { arrayFormat: 'indices' })
//   }
// })

// instance.get('/more/get', {
//   params: {
//     a: 11,
//     b: 222,
//     c: ['aa', 'bb', 'cc']
//   }
// }).then(res => {
//   console.log(res)
// })






// baseURL  实现了 baseURL 的配置功能   请求了某个公开网站的 一张 随机的图片
 
// const instance = axios.create({
//   baseURL: 'https://picsum.photos/800/600?random='
// })

// instance.get('11')

// instance.get('https://picsum.photos/800/600?random=11')





//  静态方法拓展


//这里我们通过 axios.all 同时发出了 2 个请求，返回了 Promise 数组，
// 我们可以在 axios.spread 的参数函数中拿到结果，也可以直接在 then 函数的参数函数中拿到结果。
// 另外，我们可以根据 axios.getUri 方法在不发送请求的情况下根据配置得到最终请求的 url 结果。

function getA() {
  return axios.get('/more/A')
}

function getB() {
  return axios.get('/more/B')
}

// axios.all([getA(), getB()])
//   .then(axios.spread(function(resA, resB) {  //  这个和下面这个是一样的效果  axios还是实现了我们这里实现 也是为了和官方统一一下
//     console.log(resA.data)
//     console.log(resB.data)
//   }))


// axios.all([getA(), getB()])   //  这个和上面这个是一样的效果  其实axios没必要实现的  用 本来的promise就可以解决的
//   .then(([resA, resB]) => {
//     console.log(resA.data)
//     console.log(resB.data)
//   })

const fakeConfig = {
  baseURL: 'https://www.baidu.com/',
  url: '/user/12345',
  params: {
    idClient: 1,
    idTest: 2,
    testString: 'thisIsATest'
  }
}
console.log(axios.getUri(fakeConfig))




