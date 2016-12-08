var Label = require("../model/label");
var Q = require("q");

// 查询所有的标签
exports.labelFindAll = function() {

  return Label.find();
}

// 根据label名称，查询该名称是否被录入
exports.labelFindByName = function(labelName) {

  return Label.find({label: labelName});
}

// 存储labels列表
exports.labelsSave = function(labels) {

  return Q.all(labels.map(function(name) {
    var label = new Label();
    Object.assign(label, {label: name});
    return label.save();
  }))
}