const db = require('../db/db.js')
const config = require('../../config')
const uuidV4 = require('uuid/v4')
const activeUser = require('../activeUser')
function registerHandle (req, res, next) {
  let data = req.body
  console.log(data)
  let validate = db.checkUser(data.username, data.pwd, data.phone, data.email, data.nikename)
  if (validate.result) {
    let user = {
      username: data.username,
      password: data.pwd,
      phoneNum: data.phone,
      email: data.email,
      nikeName: data.nikename
    }
    db.saveUser(user)
    .then(function (result) {
      let uid = uuidV4()
      res.cookie('__user_u', {
        'username': user.username,
        'session': uid
      }, {maxAge: config.cookie.age, domain: config.host, signed: true})
      res.json({
        result: true,
        msg: '注册成功'
      })
      activeUser.uid = user.username
    }).catch(function (err) {
      if (err.original.errno === 1062) {
        res.json({
          result: false,
          msg: {username: '用户名已被注册'}
        })
      }
    })
  } else {
    res.json({
      result: false,
      msg: validate.msg
    })
  }
}

module.exports = {
  registerHandle
}
