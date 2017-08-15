(function () {
  var HomePage = function () {

  }
  HomePage.prototype = {
    init : function () {
      var scope = this
      scope.logout()
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
    }
  }
  var en = new HomePage()
  en.init()
})()