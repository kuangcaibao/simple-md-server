var marked = require("marked");
var fs = require("fs");
var path = require("path");
var cheerio = require("cheerio");

// var mdStr = fs.readFileSync(path.resolve("./doc/index.md"), { encoding: "utf-8"});

exports.show = function(req, res, next) {

  var mdFileName = req.params.md;

  if(typeof mdFileName === "undefined" || mdFileName === "") {
    mdFileName = "index";
  }

  var mdStr = fs.readFileSync(path.resolve(__dirname, "../doc/" + mdFileName + ".md"), { encoding: "utf-8" });
  var mdHtmlStr = marked(mdStr);

  var $ = cheerio.load(mdHtmlStr);
  var h3s = $("h3");
  var h3Content = [];

  h3s.map(function(index, hh) {
    h3Content.push({ tt: $(hh).text(), id: $(hh).attr("id") });
  });

  console.log(h3Content);

  res.render("item", { h3Content: h3Content, detail: marked(mdStr) });
  
}