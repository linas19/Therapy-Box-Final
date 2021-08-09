const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    winning_team: String,
    profile_photo_id: { type: mongoose.Schema.Types.ObjectId, ref: "Photo" },
    todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Todos"}],
    photos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Photos"}]
  })
);

module.exports = User;