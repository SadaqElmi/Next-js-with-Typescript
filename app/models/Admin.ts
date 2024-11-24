import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Admin interface
interface Admin extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Define the Admin schema
const AdminSchema: Schema = new mongoose.Schema<Admin>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  permissions: {
    type: [String],
    required: true,
    default: ["manage_products", "manage_orders", "view_reports"],
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Middleware to automatically update `updatedAt` on document modification
AdminSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create or export the Admin model
const Admin: Model<Admin> =
  mongoose.models.Admin || mongoose.model<Admin>("Admin", AdminSchema);

export default Admin;
