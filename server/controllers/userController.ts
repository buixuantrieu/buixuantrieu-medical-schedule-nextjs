import { fetchUserByEmail } from "@services/userService";
import { Request, Response } from "express";

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
}
export default userController;
