const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const machineSchema = new Schema({
  name: String,
});

module.exports = mongoose.model("Machine", machineSchema);
