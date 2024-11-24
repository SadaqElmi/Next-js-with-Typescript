import mongoose, { Document, Schema } from "mongoose";
interface Product extends Document {
  name: string;
  description: string;
  price: number;
  salePrice: number;
  category: string;
  image: string;
}
const productSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    salePrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  mongoose.models.Product || mongoose.model<Product>("Product", productSchema);

export default Product;
