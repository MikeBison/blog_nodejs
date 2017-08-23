const activeUser = require('../activeUser')
const config = require('../../config')
function logout (req, res) {
  if (delete activeUser[req.signedCookies['__user_u'].session]) {
    res.cookie('__user_u', {
      'username': '',
      'session': ''
    }, {maxAge: -1, domain: config.host, signed: true})
    res.json({
      result: true,
      msg: '成功登出'
    })
  }
}

module.exports = {
  logout
}
