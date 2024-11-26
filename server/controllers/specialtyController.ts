import { createSpecialty, deleteSpecialty, fetchSpecialty, updateSpecialty } from "@services/specialtyService";
import { fetchUserByEmail, fetchUserInfo } from "@services/userService";
import { Request, Response } from "express";
import { z } from "zod";

const specialtyIdSchema = z.object({
  id: z.string().regex(/^\d+$/),
});
const specialtyDataSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  logo: z.string().url(),
});
class specialtyController {
  static async create(req: Request, res: Response) {
    try {
      const { name, description, logo } = req.body;
      await createSpecialty(name, description, logo);
      specialtyDataSchema.parse({ name, description, logo });
      res.status(201).json({ message: "Create specialty successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid input data!",
        });
      }
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
  static async index(req: Request, res: Response) {
    try {
      const data = await fetchSpecialty();
      res.status(200).json({ message: "Create specialty successfully!", data });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, description, logo } = req.body;
      specialtyIdSchema.parse({ id });
      specialtyDataSchema.parse({ name, description, logo });
      await updateSpecialty(Number(id), name, description, logo);
      res.status(200).json({ message: "Update specialty successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid input data!",
        });
      }
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      specialtyIdSchema.parse({ id });
      await deleteSpecialty(Number(id));
      res.status(200).json({ message: "Delete specialty successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: "Invalid input data!",
        });
      }
      res.status(500).json({ message: "Internal Server Error. Please try again later." });
    }
  }
}
export default specialtyController;
