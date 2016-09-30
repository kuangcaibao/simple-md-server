var mongoose = require("mongoose");
var mongodb = require("../config").mongodb;

mongoose.connect(`mongodb://${mongodb.ip}:${mongodb.port}/${mongodb.db}`);
var db = mongoose.connection;

db.on("error", function() {
  console.log("connect mongodb error");
});

db.on("success", function() {
  console.log("connect mongodb success");
});

module.exports = db;