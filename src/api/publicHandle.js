const actUser = require('../activeUser').user
// const saveblog = require('../')

function publicBlog_s (req, res) {
  if (actUser[req.signedCookies['__user_u']] && actUser[req.signedCookies['__user_u']].expire > new Date().getTime()) {
    let content = req.body.content
  } else {
    res.json({
      result: false,
      msg: {
        username: '请先登陆'
      }
    })
  }
}

module.exports = {
  publicBlog_s
}