var Label = require("../model/label");

// 查询所有的标签
exports.labelFindAll = function() {

  return Label.find();
}

// 根据label名称，查询该名称是否被录入
exports.labelFindByName = function(labelName) {

  return Label.find({label: labelName});
}

exports.labelSave = function(labelName) {

  var label = new Label();
  Object.assign(label, { label: labelName });

  return label.save();
}