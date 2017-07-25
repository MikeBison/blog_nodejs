(function ($) {
  var Register = function () {

  }

  Register.prototype = {
    init: function () {
      var scope = this
      $('#register').click(function () {
        scope.sendUser()
      })
      $('#password,#pwdAgain').bind('blur', function () {
        scope.pwdRepeat()
      })
    },
    sendUser: function () {
      var scope = this
      var username = $('#username').val()
      var pwd = $('#password').val()
      var phone = $('#phonenum').val()
      var email = $('#email').val()
      var nikename = $('#nike').val()

      var validate = scope.checkUser(username, pwd, phone, email, nikename)

      if (!validate.result) {
        console.log(validate.msg)
      }

      $.post('/register', {
        username: username,
        pwd: pwd,
        phone: phone,
        email: email,
        nikename: nikename
      }, function (data) {
        if (data.result) {
          location.href = '/'
        }
      }, 'JSON')
    },
    checkUser: function (name, pwd, phone, email, nikeName) {
      if (!name || !pwd || !phone || !email || !nikeName) {
        return {
          result: false,
          msg: {err: '用户名,密码,电话,邮箱,用户昵称为必填项'}
        }
      }
      let result = {
        result: true,
        msg: {}
      }
      let nameReg = /([a-zA-Z0-9]).{5,20}/
      let pwdReg = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{7,30}/
      let phoneReg = /^1\d{10}$/
      let emailReg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
      if (!nameReg.test(name)) {
        result.result = false
        result.msg.username = '用户名应为字母或数字,长度为6-20位'
      }
      if (!pwdReg.test(pwd)) {
        result.result = false
        result.msg.pwd = '密码中必须包含字母、数字、特称字符，至少8个字符，最多30个字符'
      }
      if (!phoneReg.test(phone)) {
        result.result = false
        result.msg.phone = '手机号码不正确'
      }
      if (!emailReg.test(email)) {
        result.result = false
        result.msg.email = '邮箱不正确'
      }
      if (nikeName.length >= 16 || nikeName.length <= 4) {
        result.result = false
        result.msg.email = '昵称长度为4-16位字母或者2-8个汉字'
      }
      return result
    },
    pwdRepeat: function () {
      var pwd = $('#password').val()
      var again = $('#pwdAgain').val()
      if (pwd && again && again !== pwd) {
        console.log('俩次密码输入不一致')
      }
    }
  }

  var en = new Register()
  en.init()
})($)
