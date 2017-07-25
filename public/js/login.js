(function ($) {
  var Login = function () {}

  Login.prototype = {
    init: function () {
      var scope = this
      scope.login()
    },
    login: function () {
      var $login = $('#login')
      $login.click(function () {
        var uname = $('#uname').val()
        var pwd = $('#pwd').val()
        $.post('/login', {
          uname: uname,
          pwd: pwd
        }, function (res) {
          if (res.result) {
            history.go(-1)
          }
        }, 'JSON')
      })
    }
  }

  var en = new Login()
  en.init()
})($)