import { fetchCity, fetchDistrictByCityId, fetchWardByDistrictId } from "@services/locationService";
import { Request, Response } from "express";

class locationController {
  static async getCity(req: Request, res: Response) {
    try {
      const data = await fetchCity();
      res.status(200).json({ message: "Get city list successfully!", data });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
  static async getDistrict(req: Request, res: Response) {
    try {
      const { cityId } = req.query;

      const data = await fetchDistrictByCityId(Number(cityId));
      res.status(200).json({ message: "Get district list successfully!", data });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
  static async getWard(req: Request, res: Response) {
    try {
      const { districtId } = req.query;

      const data = await fetchWardByDistrictId(Number(districtId));

      res.status(200).json({ message: "Get district list successfully!", data });
    } catch (e) {
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
}
export default locationController;
