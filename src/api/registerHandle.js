const db = require('../db/db.js')
function registerHandle (req, res, next) {
  let data = req.body
  console.log(data)
  let validate = db.checkUser(data.username, data.pwd, data.phone, data.email)
  if (validate.result) {
    let user = {
      username: data.username,
      password: data.pwd,
      phoneNum: data.phone,
      email: data.email
    }
    db.saveUser(user)
    .then(function (result) {
      res.json({
        result: true,
        msg: result.statusText
      })
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
