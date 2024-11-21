import express from "express";
import locationController from "@controllers/location";
const router = express.Router();

router.get("/cities", locationController.getCity);
router.get("/districts", locationController.getDistrict);
router.get("/wards", locationController.getWard);

export default router;
