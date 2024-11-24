import { fetchUserByEmail, fetchUserInfo } from "@services/userService";
import { Request, Response } from "express";
interface CustomRequest extends Request {
  userId?: string;
}

class userController {
  static async getUser(req: Request, res: Response) {
    try {
      const { email } = req.query;
      if (email) {
        const user = await fetchUserByEmail(email as string);
        if (user) {
          res.status(200).json({ message: "Get user successfully!", data: user });
        } else {
          res.status(404).json({ message: "Get user successfully!" });
        }
      }
    } catch (error) {}
  }
  static async getUserInfo(req: CustomRequest, res: Response) {
    try {
      const user = await fetchUserInfo(req.userId as string);
      res.status(200).json({ message: "Get userInfo successfully!", data: user });
    } catch (error) {}
  }
}
export default userController;
