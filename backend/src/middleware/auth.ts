import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.cookies["auth_token"];

  if (!token) {
      res.status(401).json({
      message: "Unauthorized"
    });
    return
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "fallback-secret");
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    res.status(401).json({
      message: "Unauthorized"
    });
  }
};

export default verifyToken;