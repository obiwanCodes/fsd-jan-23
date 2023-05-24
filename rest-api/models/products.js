import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a `name` for the product"],
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: [true, "Please provide a `price`"],
  },
  category: {
    type: String,
    required: [true, "Please provide a `category`"],
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
