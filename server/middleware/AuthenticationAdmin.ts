import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { fetchUserInfo } from "@services/userService";
import { ROLE } from "type/interface";

export const authenticateTokenAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const user = jwt.verify(token, process.env.PRIMARY_KEY_ACCESS_TOKEN as string);
    if (typeof user !== "string" && user.id) {
      const userInfo = await fetchUserInfo(user.id);

      if (userInfo?.roleId === ROLE.ADMIN) {
        return next();
      } else {
        return res.status(409).json({ message: "You do not have permission to perform this action" });
      }
    }
    return res.status(409).json({ message: "You do not have permission to perform this action" });
  } catch (error) {
    return res.status(403).json({ message: "Access token is invalid or expired" });
  }
};
