
function getIndex (req, res) {
  let user = req.cookies['__user_u']
  if (!user) {
    user = req.signedCookies['__user_u']
  }
  if (user) {
    res.render('index', {
      username: user.username
    })
  } else {
    res.render('index', {
      username: undefined
    })
  }
}

module.exports = {
  getIndex
}
