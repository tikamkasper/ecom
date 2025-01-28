const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  first_name: {
    type: String,
    trim: true,
  },
  last_name: {
    type: String,
    trim: true,
  },
  avatar: {
    public_id: { type: String },
    url: { type: String },
  },
  mobile: {
    type: String,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address };
