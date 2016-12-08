var Blog = require("../model/blog");

// save
exports.blogSave = function(blogToSave) {
  var blog = new Blog();
  Object.assign(blog, blogToSave);
  return blog.save(); 
}

// 分页查询blog
exports.blogPageQuery = function(q) {

  var pageSize = q.pageSize;
  var skipNum = q.curPage * q.pageSize;

  return Blog.find().sort({"publishTime": -1}).skip(skipNum).limit(pageSize);
}

// 根据label名称，分页查询blog
exports.blogPageQueryByLabel = function(q) {
  var pageSize = q.pageSize;
  var skipNum = q.curPage * q.pageSize;
  var labelName = q.labelName;

  return Blog.find({labels: {$all: [labelName]}}).sort({"publishTime": -1}).skip(skipNum).limit(pageSize);
}

// serach
exports.blogFind = function(q) {
  
  return Blog.find(q).sort({"publishTime": -1});

}

// 通过id查找
exports.blogFindById = function(id) {
  return Blog.findById(id);
}