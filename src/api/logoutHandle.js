const activeUser = require('../activeUser')
function logout (req, res) {
  if (delete activeUser[req.signedCookies['__user_u']]) {
    res.json({
      result: true,
      msg: '成功登出'
    })
  }
}

module.exports = {
  logout
}
