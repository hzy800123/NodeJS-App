const express = require('express')
const path = require('path')
const app = express()

const bodyParser = require('body-parser')
// 特定路由下的中间件用法：这种用法是针对特定路由下的特定请求的，
// 只有请求该路由时，中间件才会拦截和解析该请求；
// 也即这种用法是 局部的；也是最常用的一个方式。(推荐用法)
const jsonParser = bodyParser.json()

// 处理静态文件
app.use('/nodejsapi', express.static('client/dist'))

// 设置路由，发送前端的静态文件
app.get('/nodejsapi', (req, res) => {
  console.log(path.resolve(__dirname, 'client', 'dist', 'index.html'))
  res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'))
})

// 连接数据库 MongoDB
const userModel = require('./mongoDBConnect')


// 返回 数据
app.post('/nodejsapi/user', jsonParser, (req, res) => {
// app.get('/nodejsapi/user', (req, res) => {
  // 操作数据库
  // 查询
  userModel.find({})
  .then((data) => {
    console.log('data: ', data)
    res.send(data)
  })
  .catch((err) => {
    console.log('--- 查询失败 ---')
  })  

  // res.json([
  //   {
  //     userName: 'Jack',
  //     age: 18  
  //   },
  //   {
  //     userName: 'Tom',
  //     age: 21
  //   }
  // ])
})

const port = 3000
app.listen(port, () => {
  console.log('Server is running at port 3000')
})

