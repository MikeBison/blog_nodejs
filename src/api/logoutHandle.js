const activeUser = require('../activeUser')
const config = require('../../config')
function logout (req, res) {
  if (!req.signedCookies['__user_u']) {
    res.json({
      result: true,
      code: '00001',
      msg: '登陆信息已失效'
    })
    return
  }
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
