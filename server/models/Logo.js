const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  images: {
    url: String,
    public_id: String,
  },
  name: { type: String, required: true },
  address: { type: String, required: true },
});

module.exports = mongoose.model("Post", postSchema);
