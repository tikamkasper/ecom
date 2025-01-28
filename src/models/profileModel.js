const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
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

const Profile = mongoose.model("Profile", profileSchema);
module.exports = { Profile };
