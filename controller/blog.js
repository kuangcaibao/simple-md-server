var path = require("path");
var Q = require("q");

var {
  blogSave,
  blogFindById,
  blogFind,
  blogPageQuery,
  blogPageQueryByLabel
} = require("../proxy/blog");

var {
  labelsSave
} = require("../proxy/label");

// 显示首页
exports.showHome = function(req, res) {

  res.render("home/home");

  // blogFind({}).then(function(docs) {
  //   res.render("home/home", { docs: docs });
  // }).catch(function(err) {
  //   res.render("home/home", { docs: []});
  // })
}

// blog分页查询
exports.queryBlogListPage = function(req, res) {

  var curPage = req.body.curPage;
  var pageSize = req.body.pageSize;

  blogPageQuery({"curPage": curPage, "pageSize": pageSize}).then(function(blogs) {
    res.json({ErrorCode: 0, blogs: blogs});
  }).catch(function(err) {
    res.json({ErrorCode: -1, ErrorInfo: err.toString()});
  })
}

exports.showBlogByLabel = function(req, res) {
  res.render("label/label");
}

// blog 分页查询，使用label区分
exports.queryBlogListPageByLabel = function(req, res) {
  var curPage = req.body.curPage;
  var pageSize = req.body.pageSzie;
  var labelName = req.body.labelName;

  blogPageQueryByLabel({"curPage": curPage, "pageSize": pageSize, "labelName": labelName}).then(function(blogs) {
    res.json({ErrorCode: 0, blogs: blogs});
  }).catch(function(err) {
    res.json({ErrorCode: -1, ErrorInfo: err.toString()});
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

  labelsSave(blogLabel).then(blogSave({
    title: blogTitle, 
    labels: blogLabel, 
    publishTime: new Date(), 
    abstract: blogAbstract,
    filePath: blogMdFile
  })).then(function() {
    res.json({ErrorCode: 0, Info: "发布成功"});
  }).catch(function() {
    res.json({ErrorCode: -1, Info: "发布失败"});
  });

  // blogSave({
  //   title: blogTitle, 
  //   labels: blogLabel, 
  //   publishTime: new Date(), 
  //   abstract: blogAbstract,
  //   filePath: blogMdFile
  // }).then(function() {
  //   res.json({ErrorCode: 0, Info: "发布成功"});
  // }).catch(function() {
  //   res.json({ErrorCode: -1, Info: "发布失败"});
  // })
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
  // console.log(req.params.blogFileName);
  res.sendFile(path.resolve(__dirname, "../doc/" + req.params.blogFileName));
}