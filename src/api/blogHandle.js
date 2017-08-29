const actUser = require('../activeUser')
const db = require('../db/db')
const config = require('../../config')

function publicBlog_s (req, res) {
  if (!req.signedCookies['__user_u']) {
    res.json({
      result: true,
      code: '00001',
      msg: '登陆信息已失效'
    })
    return
  }
  if (actUser[req.signedCookies['__user_u'].session] && actUser[req.signedCookies['__user_u'].session].expire > new Date().getTime()) {
    let content = req.body.content
    let blog_s = {
      username: actUser[req.signedCookies['__user_u'].session].username,
      content: content
    }
    db.saveBlog_s(blog_s).then(result => {
      res.json({
        result: true,
        msg: '发布成功'
      })
    }).catch(e => {
      console.log(e)
    })
  } else {
    res.cookie('__user_u', {
      'username': '',
      'session': ''
    }, {maxAge: -1, domain: config.host, signed: true})
    res.json({
      result: false,
      msg: {
        username: '请先登陆'
      }
    })
  }
}

function getHotBlog_s (req, res) {
  if (!req.signedCookies['__user_u']) {
    res.json({
      result: true,
      code: '00001',
      msg: '登陆信息已失效'
    })
    return
  }
  let cond = req.body
  db.getHotBlog_s({
    order: [['hot', 'DESC']],
    offset: (cond.page - 1) * cond.pageSize,
    limit: parseInt(cond.pageSize)
  }).then(data => {
    res.json({
      result: true,
      msg: "成功",
      data: data
    })
  }).catch(e => {
    console.error(e)
  })
}

module.exports = {
  publicBlog_s,
  getHotBlog_s
}