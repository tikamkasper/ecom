const mongoose = require("mongoose");

//Defining Schema
const orderSchema = new mongoose.Schema(
  {
    shippingInfo: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pinCode: { type: Number, required: true },
      phoneNo: { type: String, required: true },
    },
    orderItems: [
      {
        productId: {
          type: mongoose.Schema.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
      },
    ],

    user: { type: mongoose.Schema.ObjectId, ref: "User", required: true },

    paymentInfo: {
      paymentId: { type: String, required: true },
      paymentStatus: { type: String, required: true },
    },

    paidAt: { type: String, required: true },

    itemsPrice: { type: Number, default: 0, required: true },

    taxPrice: { type: Number, default: 0, required: true },

    shippingPrice: { type: Number, default: 0, required: true },

    totalPrice: { type: Number, default: 0, required: true },

    orderStatus: { type: String, required: true, default: "Processing" },

    deliveredAt: { type: String },

    createdAt: { type: String, default: new Date() },
    updatedAt: { type: String, default: new Date() },
  },
  { timestamps: true },
);

//Creating model
module.exports = mongoose.model("Order", orderSchema);
