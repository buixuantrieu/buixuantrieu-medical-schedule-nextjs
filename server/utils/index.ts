import prisma from "@lib/prisma";
import nodemailer from "nodemailer";
import { STATUS_USER } from "type/interface";
const randomCodeVerify = () => {
  return Math.floor(Math.random() * 899999) + 100000;
};

const sendMail = async (email: string, htmlContent: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "mingsuhomestay@gmail.com",
        pass: process.env.PASSWORD_APP,
      },
    });

    const mailOptions = {
      from: "mingsuhomestay@gmail.com",
      to: email,
      subject: "Medical Schedule",
      html: htmlContent,
    };
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export { sendMail, randomCodeVerify };
