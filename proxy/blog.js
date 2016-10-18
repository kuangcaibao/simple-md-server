var Blog = require("../model/blog");

// save
exports.blogSave = function(blogToSave, callback) {
  var blog = new Blog();
  Object.assign(blog, blogToSave);
  return blog.save(callback); 
}

// serach
exports.blogFind = function(queryParam, callback) {
  
  return Blog.find(queryParam, callback);

}

// 通过id查找
exports.blogFindById = function(id, callback) {
  return Blog.findById(id, callback);
}