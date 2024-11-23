import { checkExitEmail, registerAccount, verifyAccount } from "@services/authService";
import { sendMail } from "@utils/index";
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
      const emailExists = await checkExitEmail(email);
      if (emailExists) {
        res.status(409).json({ message: "Email đã đăng kí!" });
      } else {
        const codeVerify = await registerAccount({
          email,
          password,
          phone,
          districtId,
          wardId,
          cityId,
          genre,
          birthday,
          fullName,
          address,
        });

        const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Xác Nhận Tạo Tài Khoản - Medical Schedule</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f7fc;
            color: #333;
            line-height: 1.5;
            font-size: 14px;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #1a73e8;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
        }
        .content {
            margin-top: 20px;
        }
        .content h2 {
            color: #333;
            font-size: 18px;
            margin-bottom: 15px;
        }
        .content p {
            font-size: 14px;
            color: #555;
            margin-bottom: 15px;
        }
        .otp {
            background-color: #1a73e8;
            color: white;
            padding: 12px;
            font-size: 22px;
            border-radius: 5px;
            text-align: center;
            width:max-content;
            margin: 20px auto;
        }
        .otp strong {
            font-size: 24px;
            width:max-content;
        }
        .footer {
            margin-top: 40px;
            font-size: 12px;
            color: #888;
            text-align: center;
        }
        .footer a {
            color: #1a73e8;
            text-decoration: none;
        }
        .footer p {
            margin-bottom: 5px;
        }
        a {
            color: #1a73e8;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="container">
    <div class="header">
        <h1>Medical Schedule</h1>
    </div>

    <div class="content">
        <h2>Xác nhận tài khoản của bạn</h2>
        <p>Xin chào <strong>${fullName}</strong>,</p>
        <p>Chúng tôi đã nhận được yêu cầu đăng ký tài khoản của bạn tại Medical Schedule. Để xác nhận tài khoản của bạn, vui lòng nhập mã OTP dưới đây:</p>
        <div class="otp">
            <strong>${codeVerify}</strong>
        </div>
        <p style="text-align: center; margin-top: 15px;">
            <a href="http://localhost:3000/auth/verify-account" style="background-color: #1a73e8; color: white; padding: 10px 20px; border-radius: 5px; text-decoration: none;">Xác nhận tài khoản</a>
        </p>
        <p>Mã OTP sẽ hết hạn trong 5 phút. Nếu bạn không yêu cầu tạo tài khoản, vui lòng bỏ qua email này.</p>
        <p>Chúc bạn một ngày tốt lành!</p>
        <p>Trân trọng,<br>Team Medical Schedule</p>
    </div>

    <div class="footer">
        <p>Bạn nhận được email này vì đã đăng ký tài khoản tại Medical Schedule. Nếu không phải bạn, vui lòng bỏ qua.</p>
        <p>Hỗ trợ: <a href="mailto:support@medschedule.com">support@medschedule.com</a></p>
    </div>
</div>

</body>
</html>
`;
        await sendMail(email, htmlContent);

        res.status(201).json({ message: "Register successfully!" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Dữ liệu không hợp lệ!",
        });
      } else {
        res.status(500).json({ message: "Internal Server Error. Please try again later." });
      }
    }
  }
  static async verify(req: Request, res: Response) {
    const { email } = req.body;
    console.log(req.body);

    if (email) {
      verifyAccount(email as string);
      res.status(201).json({ message: "Verify account successfully!" });
    }
  }
  static async login(req: Request, res: Response) {
    console.log(req.body);
  }
}
export default authController;
