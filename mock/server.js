/**
 * Mock服务，依赖Koa
 * Mock手动填写
 * Created by liuning
 */
const path = require('path') // 文件路径
const fs = require('fs') // 文件目录结构

const Koa = require('koa') // 后端服务
const bodyParser = require('koa-bodyparser')
const Router = require('koa-router')
let jsonfile = require('jsonfile')

const app = new Koa() // 实例化koa对象
const router = new Router()

// 路由跳转前
router.use(function (ctx, next) {
  ctx.set('Cache-Control', 'no-cache') // 强制要求缓存把请求提交给原始服务器进行验证
  ctx.set('Access-Control-Allow-Origin', '*') // 设置被允许跨域的请求有哪些：*代表全部允许
  ctx.set('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')// 允许请求类型
  next()
})

app.use(bodyParser()) // 调用中间件之前加上此行代码，中间件可通过ctx.request.body获取到，否则就是undefined。

// 调用中间件函数，每次请求后都会走这里（这里就相当于模拟后端处理的代码）
app.use(async (ctx, next) => {
  // 中间件中接受两个参数 ctx（封装了请求与响应） next（与express中一样，用来调用下一个可执行的中间件）

  // console.log('ctx======', ctx)
  // console.log('__dirname=====', __dirname)
  // console.log('ctx.request.body=======', ctx.request.body)
  // console.log('ctx.request.path=====', ctx.request.path)
  let filePath = path.join(__dirname, ctx.request.path.replace('/', '') + '.json') // __dirname 为绝对路径，查找当前文件
  // console.log('filePath=====', filePath)
  let data = jsonfile.readFileSync(filePath)
  // console.log('jsonfile=====', jsonfile)
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

  ctx.set('Content-Type', 'application/json') // set 格式类型
  ctx.body = data
  await next()
})

const port = 18080
app.listen(port)
console.log(`'localhost:${port} listen!!!`)
