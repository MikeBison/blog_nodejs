const config = {
  host:'localhost',
  port: 8555,
  static: './public',
  errlog: {
    appenders: { cheese: { type: 'file', filename: 'cheese.log' } },
    categories: { default: { appenders: ['cheese'], level: 'error' } }
  },
  db: {
    dbname: 'victoryOrDie',
    uname: 'admin',
    pwd: '1234',
    opt: {
      host: '127.0.0.1',
      port: '8089',
      dialect: 'mysql',
      dialectOptions: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        supportBigNumbers: true,
        bigNumberStrings: true
      },
      define: {
        'underscored': true,
        'charset': 'utf8mb4'
      },
      pool: {
        max: 50,
        min: 0,
        idle: 300000
      }
    }
  },
  cookie: {
    cookieSecret: 'mikebison',
    age: 900000
  },
  pwdSecret: ''
}
module.exports = config
