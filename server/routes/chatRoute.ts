const express = require("express");
import chatController from "@controllers/chatController";
const router = express.Router();

router.get("/detail", chatController.getChatDetail);

export default router;
