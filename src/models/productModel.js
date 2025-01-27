const mongoose = require("mongoose");

//Defining Schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxLength: [8, "Price Can't Exceed 8 Digits"],
    },
    // images: [
    //   {
    //     public_id: { type: String, required: true },
    //     url: { type: String, required: true },
    //     // _id: false
    //   },
    // ],
    description: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    category: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    stock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxLength: [4, "Stock Can't Exceed 4 Digits"],
      default: 1,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: { type: Number, default: 0 },
    reviews: [
      {
        userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],

    createrUserId: { type: mongoose.Schema.ObjectId, ref: "User" },
    updaterUserId: { type: mongoose.Schema.ObjectId, ref: "User" },

    createdAt: { type: String, default: new Date() },
    updatedAt: { type: String, default: new Date() },
  },
  { timestamps: true },
);

//Creating model
module.exports = mongoose.model("Product", productSchema, "products");
