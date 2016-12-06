var express = require("express");
var router = express.Router();

var user = require("./controller/user");
var blog = require("./controller/blog");
var label = require("./controller/label");

router.get("/", blog.showHome);

router.get("/login", user.showLogin);

router.post("/login", user.login);

router.get("/blog/create", user.isLogin, blog.showBlogCreate);

router.post("/blog/create", user.isLogin, blog.blogCreate);

router.get("/:blogId", blog.blogShowDetail);

router.post("/api/blog/:blogFileName", blog.blogSendMdFile);

router.post("/api/blogPageQuery", blog.queryBlogListPage);

router.post("/api/labelQuery", label.findAll);

module.exports = router;