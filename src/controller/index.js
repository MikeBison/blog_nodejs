const getHotBlog_s = require('../db/db')
const moment = require('moment')
function getIndex (req, res) {
  let user = req.cookies['__user_u']
  if (!user) {
    user = req.signedCookies['__user_u']
  }
  getHotBlog_s.getHotBlog_s({
    limit: 20,
    order: [['hot', 'DESC']]
  }).then(data => {
    if (user) {
      res.render('index', {
        username: user.username,
        blogs: data
      })
    } else {
      res.render('index', {
        username: undefined,
        blogs: data
      })
    }
  })
}

module.exports = {
  getIndex
}
