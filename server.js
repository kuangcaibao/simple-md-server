var express = require("express");
var marked = require("marked");
var fs = require("fs");
var path = require("path");

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

app.get("*", function(req, res) {

  res.send(marked(fs.readFileSync(path.resolve("./doc/mobile_bs_alert_1.md"), { encoding: "utf-8"})));
})

app.listen(config.listen_port, function() {
  console.log("app listen at port: " + config.listen_port);
});