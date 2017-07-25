const Sequelize = require('sequelize')
const config = require('../../config.js').db

const dataDb = new Sequelize(
  config.dbname,
  config.uname,
  config.pwd,
  config.opt
)
// 用户数据模型部分
const user = dataDb.define(
  'users',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: Sequelize.STRING,
      unique: true
    },
    password: {
      type: Sequelize.STRING
    },
    phoneNum: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    nikeName: {
      type: Sequelize.STRING
    }
  },
  {
    timestamps: false,
    freezeTableName: true
  }
)

user.sync()
//用户数据模型操作
function saveUser(item) {
  return user.create(item)
}

function validateUser(username) {
  return user.findOne({ where: { username: username } })
}

function checkUser(name, pwd, phone, email, nikeName) {
  if (!name || !pwd || !phone || !email || !nikeName) {
    return {
      result: false,
      msg: { err: '用户名,密码,电话,邮箱,用户昵称为必填项' }
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
}

// 心情数据
let blog = dataDb.define(
  'blogs',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
  }
)

module.exports = {
  saveUser,
  checkUser,
  validateUser
}
