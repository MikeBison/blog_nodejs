(function ($) {
  var Register = function () {

  }

  Register.prototype = {
    init: function () {
      var scope = this
      $('#register').click(function () {
        scope.sendUser()
      })
    },
    sendUser: function () {
      var username = $('#username').val()
      var pwd = $('#password').val()
      var phone = $('#phonenum').val()
      var email = $('#email').val()

      $.post('/register', {
        username: username,
        pwd: pwd,
        phone: phone,
        email: email
      }, function (data) {
        console.log(data)
      }, 'JSON')
    }
  }

  var en = new Register()
  en.init()
})($)
