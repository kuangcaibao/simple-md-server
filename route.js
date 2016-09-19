var express = require("express");
var router = express.Router();

var home = require("./controller/home");
var item = require("./controller/item");

router.get("/", home.show);

router.get("/:md", home.show);

router.get("/items/:item", item.show);

module.exports = router;