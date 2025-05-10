const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, default: null },
  confirmPassword: { type: String, default: null },
  authType: { type: String, enum: ["local", "google"], default: "local" },
});

module.exports = mongoose.model("User", userSchema);