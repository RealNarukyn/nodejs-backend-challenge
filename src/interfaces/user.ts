import { Document } from "mongoose";

export interface IUser extends Document {
  id: string;
  user: string;
  password: string;
}
