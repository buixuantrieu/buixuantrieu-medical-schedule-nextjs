import { Request, Response } from "express";

class authController {
  static async register(req: Request, res: Response) {
    console.log(req.body);
  }
  static async login(req: Request, res: Response) {
    console.log(req.body);
  }
}
export default authController;
