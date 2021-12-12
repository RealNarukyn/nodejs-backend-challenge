import { Request, Response } from "express";
import { HydratedDocument } from "mongoose";

import { IUser } from "src/interfaces/user";
import { UserModel } from "../models/user";

import { hashPassword } from "../utils/utils";

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
    if (user.password !== password) {
      return response.json({ statusCode: 503, msg: "Incorrect Password" });
    }

    return response.json({ statusCode: 200, data: user });
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

    // -- Hash the password
    const h_password = await hashPassword(password.trim());

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
