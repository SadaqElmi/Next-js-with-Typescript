import mongoose, { Document, Schema } from "mongoose";

export interface User extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string; // Optional profile image URL
}

const userSchema: Schema = new mongoose.Schema({
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
    default: "user",
  },
  profileImage: {
    type: String,
    default: "/profile.png",
  },
});

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
