var config = require("../config");

// 显示首页
exports.showHome = function(req, res) {
  res.render("home");
}


// 显示登录界面
exports.showLogin = function(req, res) {
  res.render("login");
}

// 处理登录请求
exports.login = function(req, res) {

  var name = req.body.username.trim().toLowerCase();
  var password = req.body.password;

  // console.log(name + "|" + password);

  if(name == config.admin.username && password == config.admin.password) {

    req.session.isLogin = true;
    res.redirect("/");
  } else {

    res.render("login", {msg: "用户名或者密码错误！"});
  }

}

// 判断是否登录
exports.isLogin = function(req, res, next) {
  if(req.session.isLogin) {
    next();
  } else {
    res.redirect("/");
  }
}