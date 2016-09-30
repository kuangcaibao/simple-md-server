var {
  blogSave
} = require("../proxy/blog");

// 显示创建Blog界面
exports.showBlogCreate = function(req, res) {
  res.render("blog/create");
}

// Blog创建请求
exports.blogCreate = function(req, res) {

  var blogTitle = req.body.blogTitle;
  var blogLabel = req.body.blogLabel.toLowerCase().split(";");
  var blogAbstract = req.body.blogAbstract;
  var blogMdFile = req.body.blogMdFile;

  // res.send("EOF");
  blogSave({
    title: blogTitle, 
    labels: blogLabel, 
    publishTime: new Date(), 
    abstract: blogAbstract,
    mdFile: blogMdFile
  }).then(function() {
    res.json({ErrorCode: 0, Info: "发布成功"});
  }).catch(function() {
    res.json({ErrorCode: -1, Info: "发布失败"});
  })
}