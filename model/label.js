require("./conn");
var mongoose = require("mongoose");

var labelSchema = mongoose.Schema({
  label: String
});

var Label = mongoose.model("Label", labelSchema);

module.exports = Label;