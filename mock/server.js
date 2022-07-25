/**
 * Mock服务，依赖Koa
 * Mock手动填写
 * Created by liuning
 */
const path = require('path')
const fs = require('fs')
const http = require('http')

const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
let jsonfile = require('jsonfile')

const app = new Koa()
const router = new Router()

router.use(function (ctx, next) {
  ctx.set('Cache-Control', 'no-cache')
  ctx.set('Access-Control-Allow-Origin', '*')
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

app.use(bodyParser())

// 调用中间件
app.use((ctx) => {
  console.log('__dirname=====', __dirname)
  console.log('ctx.request.path=====', ctx.request.path)
  let filePath = path.join(__dirname, ctx.request.path.replace('/', '') + '.json')

  console.log('filePath=====', filePath)

  let data = jsonfile.readFileSync(filePath)

  // fs.existsSync(filePath) 检测目录是否存在，如果存在返回true，如果不存在返回false
  if (fs.existsSync(filePath)) {
    try {
      data = jsonfile.readFileSync(filePath)
    } catch (err) {
      console.error('request: ' + ctx.request.url + ' fail!!!')
    }
  } else {
    console.warn('request: ' + ctx.request.url + ' not exist!!!!')
  }

  ctx.set('Content-Type', 'application/json')
  ctx.body = data
})

const port = 18080
const server = http.createServer(app.callback())
server.listen(port)
console.log(`'localhost:${port} listen!!!`)
