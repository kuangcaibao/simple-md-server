var express = require("express");
var marked = require("marked");
var fs = require("fs");
var path = require("path");
var _ = require("lodash");
var ejsMate = require("ejs-mate");

// 路由
var router = require("./route");

var app = new express();
var config = require("./config");

marked.setOptions(Object.assign({
  render: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false
}, config.marked));

app.use("/imgs", express.static("doc/imgs"));
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
  // Loader: Loader
});

app.use("/", router);

app.get("*", function(req, res) {

  res.redirect("/");
})

app.listen(config.listen_port, function() {
  console.log("app listen at port: " + config.listen_port);
});