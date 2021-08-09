const mongoose = require("mongoose");

const Todos = mongoose.model(
  "Todos",
  new mongoose.Schema({
    title: String,
    is_completed: Boolean,
    owner_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  })
);

module.exports = Todos;