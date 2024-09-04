const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  type: { type: String, enum: ["plastique", "aerosol"] },
  forme: { type: String },
  volume: { type: String },
  name: { type: String, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Product", productSchema);
