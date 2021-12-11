import mongoose, { Schema } from "mongoose";

import { IUser } from "../interfaces/user";

const UserSchema: Schema = new Schema(
  {
    id: { type: String, required: true },
    user: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", UserSchema);
