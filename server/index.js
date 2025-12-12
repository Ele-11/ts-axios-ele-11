const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// 简单内存用户存储（示例，生产请用数据库）
const users = []

// 秘钥（示例，生产请用环境变量）
const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret'

// 注册
app.post('/register', async (req, res) => {
  const { username, password } = req.body
  if (!username || !password) return res.status(400).json({ message: '用户名和密码必填' })

  const existing = users.find(u => u.username === username)
  if (existing) return res.status(409).json({ message: '用户已存在' })

  const hashed = await bcrypt.hash(password, 10)
  const user = { id: Date.now().toString(), username, password: hashed }
  users.push(user)
  res.status(201).json({ id: user.id, username: user.username })
})

// 登录 -> 返回 JWT
app.post('/login', async (req, res) => {
  const { username, password } = req.body
  const user = users.find(u => u.username === username)
  if (!user) return res.status(401).json({ message: '用户名或密码错误' })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(401).json({ message: '用户名或密码错误' })

  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '1h' })
  res.json({ token })
})

// JWT 验证中间件
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: '缺少 token' })

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: '无效或过期的 token' })
    req.user = decoded
    next()
  })
}

// 受保护路由示例
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: '这是受保护的数据', user: req.user })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))