(function () {
  var HomePage = function () {

  }
  HomePage.prototype = {
    init : function () {
      var scope = this
      scope.logout()
      scope.publicBlog()
    },
    logout: function () {
      var logoutBtn = $('#logout')
      if (logoutBtn.length === 0) {
        return
      }
      logoutBtn.click(function () {
        $.post('/logout', 
        function (res) {
          if (res.result) {
            console.log("登出::" + new Date())
            location.href = '/'
          }
        }, 'JSON')
      })
    },
    publicBlog: function () {
      var publicBtn = $('#publicBlog')
      var blog = $('#blog')
      if (publicBtn.length === 0) {
        return
      }
      publicBtn.click(function () {
        var content = blog.val()
        $.post('/publicBlog', {
          content: content
        },function (res) {
          if (res.result) {
            console.log("发布成功::" + new Date())
          } else {
            console.log('error::' + res.msg)
          }
        }, 'JSON')
      })
    }
  }
  var en = new HomePage()
  en.init()
})()