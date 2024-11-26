import { getMessageDetail } from "@services/chatService";
import { Request, Response } from "express";

class chatController {
  static async getChatDetail(req: Request, res: Response) {
    try {
      const { senderId, receiverId } = req.query;
      const data = await getMessageDetail(senderId as string, receiverId as string);
      console.log(data);

      res.status(200).json({ message: "Get city list successfully!", data });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
}
export default chatController;
