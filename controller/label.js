var {
  labelFindAll,
} = require("../proxy/label");

exports.findAll = function(req, res) {
  labelFindAll().then(function(labels) {
    res.json({ErrorCode: 0, labels: labels});
  }).catch(function(e) {
    res.json({ErrorCode: -1, ErrorInfo: e.toString()});
  })
}

exports.findBlogsByLabel = function(req, res) {
  
}