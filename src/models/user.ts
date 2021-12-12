import { Schema, model } from "mongoose";

import { IUser } from "../interfaces/user";

const UserSchema = new Schema<IUser>({
  userID: { type: Number, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = model<IUser>("User", UserSchema);
