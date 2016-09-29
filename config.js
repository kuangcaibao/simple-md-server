module.exports = {

  listen_port: 10234,

  // 管理用户配置
  admin: {
    username: "admin",
    password: "helloworld"
  },

  // session配置
  session: {
    secret: "hello world",
    cookie: {
      maxAge: 60 * 1000
    }
  }
}