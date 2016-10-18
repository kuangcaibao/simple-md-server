var express = require("express");
var router = express.Router();

var home = require("./controller/home");
var user = require("./controller/user");
var blog = require("./controller/blog");

router.get("/", user.showHome);

router.get("/login", user.showLogin);

router.post("/login", user.login);

router.get("/blog/create", user.isLogin, blog.showBlogCreate);

router.post("/blog/create", user.isLogin, blog.blogCreate);

router.get("/:blogId", blog.blogShowDetail);

router.post("/api/blog/:blogFileName", blog.blogSendMdFile);

module.exports = router;