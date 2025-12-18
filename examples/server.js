const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

// 关键：这两句必须出现在所有路由挂载之前
app.use(express.json());          // 解析 application/json
app.use(express.urlencoded({ extended: true })); // 解析表单格式，可选




app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))




const router = express.Router()

// Demo1: simple
router.get('/simple/get', function(req, res) {
  res.json({
    msg: `hello world -2025/12/13-20:23 十一你好! /simple/get`
  })
})


// Demo2: base/get

router.get('/base/get', function(req, res) {
  res.json([req.query, {msg: `2025/12/13-23:30 十一你好! /base/get`}]
    )
})



// Demo3: base/post  base/buffer


router.post('/base/post', function(req, res) {
  res.json(req.body)
})

router.post('/base/buffer', function(req, res) {
  let msg = []
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk)
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg)
    res.json(buf.toJSON())
  })
})







router.get('/error/get', function(req, res) {
  if (Math.random() > 0.5) {
    res.json({
      msg: `hello world 2025/12/14-16:35 十一你好 50%的概率显示! /error/get`
    })
  } else {
    res.status(500)
    res.end()
  }  // 设置随机值 来 模拟网络是否发生错误 
})

router.get('/error/timeout', function(req, res) {
  setTimeout(() => {
    res.json({
      msg: `hello world 2025/12/14-20:47 十一你好! /error/timeout`
    })
  }, 3000)// 设置延迟 3秒
})








router.get('/extend/get', function(req, res) {
    res.json({
      msg: 'hello world'
    })
  })

  router.options('/extend/options', function(req, res) {
    res.end()
  })

  router.delete('/extend/delete', function(req, res) {
    res.end()
  })

  router.head('/extend/head', function(req, res) {
    res.end()
  })

  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })

  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })

  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })

  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'Ele',
        age: 11
      }
    })
  })




//  拦截器相关的实现

  router.get('/interceptor/get', function(req, res) {
    res.end('hello-------ELe---')
  })



  //配置项相关的实现


  router.post('/config/post', function(req, res) {
    res.json(req.body)
    // console.log('Content-Type:', req.get('content-type'));
    // console.log('req.body:', req.body);   // 这里应该不再是 {}
    // res.json({
    //   code: 0,
    //   message: 'ok',
    //   result: {
    //     name: 'Ele',
    //     age: 11,
    //     res:req.body
    //   }
    // })
  })

  //取消相关的实现路由
  router.get('/cancel/get', function(req, res) {
    setTimeout(() => {
      res.json('hello')
    }, 1000)
  })

  router.post('/cancel/post', function(req, res) {
    setTimeout(() => {
      res.json(req.body)
    }, 1000)
  })



  // 更多相关功能的路由

  
  // withCredentials  跨域携带 cookie

  router.get('/more/get', function(req, res) {
    // res.json(req.body+'hello---cookies----Ele---')
    res.json(req.cookies)
  })
  

app.use(router)



const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop-11`)
})



