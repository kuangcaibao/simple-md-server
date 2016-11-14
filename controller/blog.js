var path = require("path");
var {
  blogSave,
  blogFindById,
  blogFind
} = require("../proxy/blog");

// 显示首页
exports.showHome = function(req, res) {

  blogFind({}).then(function(docs) {
    res.render("home/home", { docs: docs });
  }).catch(function(err) {
    res.render("home/home", { docs: []});
  })
}

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
    filePath: blogMdFile
  }).then(function() {
    res.json({ErrorCode: 0, Info: "发布成功"});
  }).catch(function() {
    res.json({ErrorCode: -1, Info: "发布失败"});
  })
}

// 显示Blog文章详情
exports.blogShowDetail = function(req, res, next) {

  var blogId = req.params.blogId;
  blogFindById(blogId).then(function(doc) {
    res.render("blog/detail", {doc: doc});
  }).catch(function(err) {
    res.render("blog/detail");
  })
}

// 根据md文件地址返回对应的md文件内容
exports.blogSendMdFile = function(req, res) {
  // console.log(__dirname);
  res.sendFile(path.resolve(__dirname, "../doc/index.md"));
}