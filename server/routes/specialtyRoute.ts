const express = require("express");
import specialtyController from "@controllers/specialtyController";
import { authenticateTokenAdmin } from "middleware/AuthenticationAdmin";

const router = express.Router();

router.post("/", authenticateTokenAdmin, specialtyController.create);
router.put("/:id", authenticateTokenAdmin, specialtyController.update);
router.delete("/:id", authenticateTokenAdmin, specialtyController.delete);
router.get("/", specialtyController.index);

export default router;
