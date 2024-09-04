const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const societeSchema = new Schema({
  name: String,
  adress: String,
  fax: String,
  phone: String,
  passport: String,
  iban: String,
});

module.exports = mongoose.model("Societe", societeSchema);
