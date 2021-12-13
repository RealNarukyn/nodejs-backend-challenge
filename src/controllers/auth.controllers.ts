import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";
import * as bcryptjs from "bcryptjs";

import { IUser } from "src/interfaces/user";
import { UserModel } from "../models/user";

export class AuthController {
  static login = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    if (!username.trim()) {
      return response.json({
        statusCode: 500,
        msg: "You need to specify an username...",
      });
    }
    if (!password.trim()) {
      return response.json({
        statusCode: 500,
        msg: "You need to specify a password...",
      });
    }

    const user: IUser = await UserModel.findOne({ username });
    if (!user) {
      return response.json({ statusCode: 404, msg: "User Not Found..." });
    }

    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return response.json({ statusCode: 503, msg: "Incorrect Password" });
    }

    return response.json({
      statusCode: 200,
      data: { userID: user.userID, username: user.username },
    });
  };

  static register = async (request: Request, response: Response) => {
    const { username, password } = request.body;
    if (!username.trim()) {
      return response.json({
        statusCode: 500,
        msg: "You need to specify an username...",
      });
    }
    if (!password.trim()) {
      return response.json({
        statusCode: 500,
        msg: "You need to specify a password...",
      });
    }

    const user: IUser = await UserModel.findOne({ username });
    if (user) {
      return response.json({ statusCode: 404, msg: "User already exists..." });
    }

    // -- Hash the password
    const h_password = await bcryptjs.hash(password, 10);

    // -- Get the las userID stored to make it "auto-incremental"
    const lastUser: IUser = await UserModel.findOne(
      {},
      {},
      { sort: { userID: -1 } }
    );
    const lastID: number = lastUser ? lastUser.userID + 1 : 1;

    const doc: HydratedDocument<IUser> = new UserModel({
      userID: lastID,
      username,
      password: h_password,
    });
    await doc.save();

    return response.json({
      statusCode: 200,
      data: doc,
    });
  };
}
