const express = require('express')
const index = require('../controller/index.js')
const register = require('../controller/register')
const router = express.Router()

/* 首页路由 */
router.get('/', index.getIndex)

/* 注册页面 */
router.get('/register', register.getPage)
router.post('/register', register.postHandle)

module.exports = router
