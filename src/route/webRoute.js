const express = require('express')
const index = require('../controller/index.js')
const register = require('../controller/register')
const registerHandle = require('../api/registerHandle')
const login = require('../controller/login')
const loginHandle = require('../api/loginHandle')
const logoutHandle = require('../api/logoutHandle')
const blogHandle = require('../api/blogHandle')
const fileUpload = require('../api/fileUpload')
const router = express.Router()

/* 首页路由 */
router.get('/', index.getIndex)

/* 注册页面 */
router.get('/register', register.getPage)
router.post('/register', registerHandle.registerHandle)

/* 登陆页面 */
router.get('/login', login.getPage)
router.post('/login', loginHandle.loginHandle)

/* 登出api */
router.post('/logout', logoutHandle.logout)

/* 发布短博客 */
router.post('/publicBlog', blogHandle.publicBlog_s)
router.post('/getHotBlog', blogHandle.getHotBlog_s)

/* 上传图片文件 */
router.post('/imgUpload', fileUpload.imgUpload)
module.exports = router
