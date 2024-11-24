const express = require("express");
import userController from "@controllers/userController";
import { authenticateToken } from "middleware/Authentication";
const router = express.Router();

router.get("/", userController.getUser);
router.get("/user-info", authenticateToken, userController.getUserInfo);

export default router;
