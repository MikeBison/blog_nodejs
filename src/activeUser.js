let Users = function () {

}

Users.prototype = {
    setUser: function (uid, userInfo) {
        let scope = this
        scope[uid] = {username: userInfo.username, expire: new Date().getTime() + userInfo.expire}
        setTimeout(() => {
          delete scope[uid]
          console.log(`用户:${userInfo.username}过期,删除记录时间${new Date()}`)
        }, userInfo.expire)
    }
}

module.exports = new Users()
