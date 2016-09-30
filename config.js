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
      maxAge: 5 * 60 * 1000
    }
  },

  // mongodb配置
  mongodb: {
    ip: "127.0.0.1",
    port: 27017,
    db: "blog"
  }
}