var express = require("express");
var router = express.Router();

var home = require("./controller/home");
var user = require("./controller/user");

router.get("/", user.showHome);

router.get("/login", user.showLogin);

router.post("/login", user.login);

// router.get("/:md", home.show);

module.exports = router;