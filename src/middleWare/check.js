function checkLogin (req, res, next) {
  if (!req.signedCookies['__user_u'].session) {
    req.flash('error', '未登陆')
    res.redirect('/login')
  }
  next()
}

function checkNotLogin (req, res, next) {
  if (req.signedCookies['__user_u'].session) {
    req.flash('error', '已登录')
    return res.redirect('back')
  }
  next()
}

module.exports = {
  checkLogin,
  checkNotLogin
}
