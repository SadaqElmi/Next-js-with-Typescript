import mongoose, { Document, Schema } from "mongoose";

export interface AdminUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string; // Optional profile image URL
}

const adminuserSchema: Schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "admin",
  },
  profileImage: {
    type: String,
    default: "/profile.png",
  },
});

const AdminUser =
  mongoose.models.AdminUser ||
  mongoose.model<AdminUser>("AdminUser", adminuserSchema);

export default AdminUser;
