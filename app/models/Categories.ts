import mongoose, { Document, Schema, Model } from "mongoose";

// Define the Category interface
interface Category extends Document {
  name: string; // Name of the category
  description?: string; // Optional description for the category
  parentCategoryId?: mongoose.Schema.Types.ObjectId; // Optional parent category for subcategories
  createdAt: Date;
  updatedAt: Date;
}

// Define the Category schema
const CategorySchema: Schema = new mongoose.Schema<Category>(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    parentCategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
  },
  {
    timestamps: true,
  }
);

// Middleware to automatically update `updatedAt` on document modification
CategorySchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

// Create or export the Category model
const Category: Model<Category> =
  mongoose.models.Category ||
  mongoose.model<Category>("Category", CategorySchema);

export default Category;
