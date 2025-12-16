import axios from '../../src/index'



interface ResponseData<T = any> {
  code: number
  result: T
  message: string
}

interface User {
  name: string
  age: number
}

function getUser<T>() {
  return axios<ResponseData<T>>('/extend/user')
    .then(res => res.data)
    .catch(err => console.error(err))
}


async function test() {
  const user = await getUser<User>()
  if (user) {
    console.log("user.result.name:", user.result.name)
    console.log("user.result.age:", user.result.age)
  }
}

test()




// //作为 axios函数 调用  一个对象参数
// axios({ 
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hi -11'
//   }
// })


// axios('/extend/post', {  // 一个url字符串参数   一个对象参数
//   method: 'post',
//   data: {
//     msg: 'hello  --11'
//   }
// })


//作为 axios对象属性 里面的 方法调用

// axios.request({ 
//   url: '/extend/post',
//   method: 'post',
//   data: {
//     msg: 'hello'
//   }
// })

// axios.get('/extend/get')

// axios.options('/extend/options')

// axios.delete('/extend/delete')

// axios.head('/extend/head')

// axios.post('/extend/post', { msg: 'post' })

// axios.put('/extend/put', { msg: 'put' })

// axios.patch('/extend/patch', { msg: 'patch' })
