(function ($, axios) {
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

      axios.post('http://dev.eastday.com:8555/register', {
        username: username,
        pwd: pwd,
        phone: phone,
        email: email
      }).then(function (res) {
        console.log(res)
      })
    }
  }

  var en = new Register()
  en.init()
})($, axios)
