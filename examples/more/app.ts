import axios from '../../src/index'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { AxiosError } from '../../src/types'

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




// HTTP 授权    这个 功能实现了



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

axios.get('/more/304', {
  validateStatus(status) {
    return status >= 200 && status < 400    //   这里 因为你是  允许 200 到400 的  所以 304也有 返回 
  }
}).then(res => {
  console.log(res)
}).catch((e: AxiosError) => {
  console.log(e.message)
})

