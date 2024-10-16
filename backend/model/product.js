import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
  },
  caption: {
    type: String,
  },
  imageUrls: {
    type: Array,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shopkeeper",
    required: true,
  },
  price: {
    type: Number,
    min: [1, "wrong min price"],
    max: [1000000, "wrong max price"],
  },
  discount: {
    type: Number,
    min: [0, "wrong min discount"],
    max: [99, "wrong max discount"],
  },
  productCategory: { type: String , required: true },
  productSubcategory: { type: String , required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      rating: { type: Number, required: true },
    },
  ],
  overallRating: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
