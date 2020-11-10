const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String },
  read: { type: Boolean, default: false },
});
module.exports = mongoose.model("Message", messageSchema);
