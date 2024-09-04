const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const supplierSchema = new Schema({
  name: String,
  adress: String,
  iban: String,
  bank: String,
  swiftCodeBenif: String,
  benifBank: String,
  interBank: String,
  swiftCodeInterBank: String,
});

module.exports = mongoose.model("Supplier", supplierSchema);
