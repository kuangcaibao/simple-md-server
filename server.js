var express = require("express");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var ejsMate = require("ejs-mate");
var session = require("express-session");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

var app = new express();
var config = require("./config");
var { blogrootdir } = config;

app.use("/imgs", express.static(blogrootdir + "/imgs"));
app.use("/public", express.static("public"));

app.get("/favicon.ico", function(req, res) {
  res.send("");
})

// 模板引擎
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", ejsMate);
app.locals._layoutFile = "layout.html";
_.extend(app.locals, {
  config: config,
});

// session，reqeuest参数处理
app.use(session(config.session));
app.use(function(req, res, next) {
  res.locals = req.session;
  next();
});
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));

// 路由处理
var router = require("./route");
app.use("/", router);
app.get("*", function(req, res) {
  res.render("_404");
});

app.listen(config.listenport, function() {
  console.log("app listen at port: " + config.listenport);
});