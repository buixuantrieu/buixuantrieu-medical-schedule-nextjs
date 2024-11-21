import { registerAccount } from "@services/authService";
import { Request, Response } from "express";
import { z } from "zod";

class authController {
  static async register(req: Request, res: Response) {
    try {
      const schema = z.object({
        email: z.string().max(50).email(),
        fullName: z.string().trim().min(1).max(255),
        cityId: z.number(),
        address: z.string().trim().min(1),
        districtId: z.number(),
        phone: z
          .string()
          .trim()
          .min(1)
          .regex(/^(0[3-9])(\d{8})$|^(0[1-9]{1}[0-9]{1,2})(\d{7})$/, "Không đúng định dạng!"),
        wardId: z.number(),
        password: z
          .string()
          .trim()
          .min(8)
          .max(255)
          .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/),
        genre: z.number(),
      });
      const { email, password, fullName, cityId, address, districtId, phone, wardId, genre, birthday } = req.body;
      await schema.parseAsync({
        email,
        password,
        fullName,
        cityId,
        address,
        districtId,
        phone,
        wardId,
        genre,
      });
      await registerAccount({ email, password, phone, districtId, wardId, cityId, genre, birthday, fullName, address });

      res.status(201).json({ message: "Register successfully!" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Dữ liệu không hợp lệ",
          errors: error.errors,
        });
      } else {
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
      }
    }
  }
  static async login(req: Request, res: Response) {
    console.log(req.body);
  }
}
export default authController;
