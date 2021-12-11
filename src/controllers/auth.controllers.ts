import { Request, Response } from "express";

export class AuthController {
  static login = (request: Request, response: Response) => {
    console.log(request.body);
  };

  static register = (request: Request, response: Response) => {
    console.log(request.body);
  };
}
