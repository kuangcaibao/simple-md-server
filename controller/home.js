var marked = require("marked");
var fs = require("fs");
var path = require("path");

var mdStr = fs.readFileSync(path.resolve("./doc/index.md"), { encoding: "utf-8"});

exports.show = function(req, res, next) {

  var mdFileName = req.params.md;

  if(typeof mdFileName === "undefined" || mdFileName === "") {
    mdFileName = "index";
  }

  var mdStr = fs.readFileSync(path.resolve(__dirname, "../doc/" + mdFileName + ".md"), { encoding: "utf-8" });

  if(mdFileName == "index") {
    res.render("home", { body: marked(mdStr) });
  } else {
    res.render("item", { body: marked(mdStr) });
  }
}