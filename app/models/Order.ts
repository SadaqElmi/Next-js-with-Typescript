import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Order interface
interface CartItem {
  productId: mongoose.Schema.Types.ObjectId;
  title: string;
  image?: string;
  price: number;
  quantity: number;
}

interface Order extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  cartItems: CartItem[];
  orderStatus: "pending" | "shipped" | "delivered" | "cancelled";
  paymentMethod: "card" | "paypal" | "cod";
  paymentStatus: "pending" | "completed" | "failed";
  totalAmount: number;
  orderDate: Date;
  orderUpdateDate?: Date;
  paymentId?: string;
  payerId?: string;
}

// Define the Order schema
const OrderSchema: Schema = new mongoose.Schema<Order>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cartItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      title: { type: String, required: true },
      image: { type: String },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  orderStatus: {
    type: String,
    enum: ["pending", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["card", "paypal", "cod"],
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed"],
    default: "pending",
  },
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  orderUpdateDate: { type: Date },
  paymentId: { type: String },
  payerId: { type: String },
});

// Create or export the Order model
const Order: Model<Order> =
  mongoose.models.Order || mongoose.model<Order>("Order", OrderSchema);

export default Order;
