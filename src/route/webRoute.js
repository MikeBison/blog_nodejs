const express = require('express')
const index = require('../controller/index.js')
const register = require('../controller/register')
const registerHandle = require('../api/registerHandle')
const login = require('../controller/login')
const loginHandle = require('../api/loginHandle')
const router = express.Router()

/* 首页路由 */
router.get('/', index.getIndex)

/* 注册页面 */
router.get('/register', register.getPage)
router.post('/register', registerHandle.registerHandle)

/* 登陆页面 */
router.get('/login', login.getPage)
router.post('/login', loginHandle.loginHandle)

module.exports = router
