import { Schema, model, Document } from "mongoose";
import type { Roles } from "../utils/enum";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: Roles;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
