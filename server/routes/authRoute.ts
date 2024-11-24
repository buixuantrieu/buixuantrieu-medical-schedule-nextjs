const express = require("express");
import authController from "@controllers/authController";
const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/verify", authController.verify);
router.post("/refresh-token", authController.refreshToken);

export default router;
