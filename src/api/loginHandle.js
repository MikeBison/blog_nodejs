const db = require('../db/db.js')
const config = require('../../config')
const uuidV4 = require('uuid/v4')
function loginHandle (req, res) {
  let user = req.body
  db.validateUser(user.uname, user.pwd)
  .then(function (result) {
    if (result) {
      if (result.dataValues.password !== user.pwd) {
        res.json({
          result: false,
          msg: {
            username: '密码错误'
          }
        })
      } else {
        let uid = uuidV4()
        res.cookie('__user_u', {
          'username': user.uname,
          'session': uid
        }, {maxAge: config.cookie.age, domain: 'localhost', signed: true})
        res.json({
          result: true,
          msg: '登陆成功'
        })
      }
    } else {
      res.json({
        result: false,
        msg: {
          username: '此用户未被注册'
        }
      })
    }
  })
  .catch(function () {
    console.log()
  })
}

module.exports = {
  loginHandle
}
