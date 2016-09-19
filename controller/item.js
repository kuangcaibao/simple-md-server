var marked = require("marked");
var fs = require("fs");
var path = require("path");

exports.show = function(req, res, next) {

  console.log(req.params);
  var mdFileName = req.params.item;
  var mdStr = fs.readFileSync(path.resolve(__dirname, "../doc/" + mdFileName + ".md"), { encoding: "utf-8" });

  res.render("item", { body: marked(mdStr) });
  // res.send("Hello world");
}