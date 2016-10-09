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