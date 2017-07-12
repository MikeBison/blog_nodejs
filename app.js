const express = require('express')
const config = require('./config.js')
const path = require('path')
const log4js = require('log4js')
const bodyParser = require('body-parser')
const webRouter = require('./src/route/webRoute.js')
const app = express()

log4js.configure(config.errlog)

app.use(log4js.connectLogger(log4js.getLogger('cheese'), {level: log4js.levels.INFO}))

app.set('views', path.join(__dirname, './src/views'))
app.set('view engine', 'ejs')

app.use(bodyParser.json())

app.use(express.static(config.static))

app.use('/', webRouter)

app.listen(config.port, function () {
  console.log('服务器开始运行')
  console.log('端口号:%s', config.port)
  console.log('静态资源目录:%s', path.join(__dirname, config.static))
})
