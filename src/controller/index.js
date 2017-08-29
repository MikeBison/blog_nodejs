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
    let result = []
    data.forEach((item,index) => {
      result.push({
        id: item.dataValues.id,
        username: item.dataValues.username,
        hot: item.dataValues.hot,
        imgs: item.dataValues.imgs,
        content: item.dataValues.content,
        date: moment(item.dataValues.date).format('YYYY-MM-DD hh:mm:ss')
      })
    })
    if (user) {
      res.render('index', {
        username: user.username,
        blogs: result
      })
    } else {
      res.render('index', {
        username: undefined,
        blogs: result
      })
    }
  })
}

module.exports = {
  getIndex
}
