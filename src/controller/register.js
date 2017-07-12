const db = require('../db/db.js')

function getPage (req, res, next) {
  res.render('register')
}

function postHandle (req, res, next) {
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
    db.saveUser(user).then(function (result) {
      res.json({
        status: result.status,
        msg: result.statusText
      })
    })
  } else {
    res.json({
      status: 500,
      msg: validate.msg
    })
  }
}

module.exports = {
  getPage,
  postHandle
}
