const mongoose = require("mongoose");

const Photos = mongoose.model(
  "Photos",
  new mongoose.Schema({
    s3_key: String,
    url: String,
    name: String,
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);

module.exports = Photos;