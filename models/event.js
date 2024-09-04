const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
  name: String,
  date_debut: Date,
  date_fin: Date,
  machine: String,
  color: String,
  stock: Number,
  product: { type: Schema.Types.ObjectId, ref: "Product" },
});

module.exports = mongoose.model("Event", eventSchema);
