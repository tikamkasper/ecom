const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  user: {
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
  gender: {
    type: String,
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
