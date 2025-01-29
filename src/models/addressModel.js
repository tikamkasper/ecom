const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  full_name: {
    type: String,
    trim: true,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  addresses: [
    {
      street_house_no: {
        type: String,
        required: true,
      },
      locality_area: {
        type: String,
        required: true,
      },
    },
  ],
  address_type: {
    type: String,
    default: "home", // work
  },
  city_district: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
});

const Address = mongoose.model("Address", addressSchema);
module.exports = { Address };
