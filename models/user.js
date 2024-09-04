const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  image: { type: String, required: true },

  role: {
    type: String,
    enum: ["user", "admin", "magasinier"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
