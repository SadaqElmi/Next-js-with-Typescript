import mongoose, { Schema, Document } from "mongoose";
import { hash, compare, genSalt } from "bcrypt-ts";

export interface AdminUser extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  profileImage?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
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
  token: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "/profile.png",
  },
});

// Hash password before saving the user
adminuserSchema.pre<AdminUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
  next();
});

// Compare candidate password with stored hashed password
adminuserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return compare(candidatePassword, this.password);
};

const AdminUser =
  mongoose.models.AdminUser ||
  mongoose.model<AdminUser>("AdminUser", adminuserSchema);

export default AdminUser;
