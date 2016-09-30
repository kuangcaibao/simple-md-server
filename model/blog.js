require("./conn");
var mongoose = require("mongoose");

var blogSchema = mongoose.Schema({
  title: String,
  labels: Array,
  publishTime: Date,
  abstract: String,
  filePath: String
});

var Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;