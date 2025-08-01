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
  console.log("=== AUTH MIDDLEWARE DEBUG ===");
  console.log("Cookies:", req.cookies);
  console.log("Headers:", req.headers);
  
  const token = req.cookies["auth_token"];
  console.log("Token found:", !!token);
  console.log("Token value:", token ? token.substring(0, 20) + "..." : "No token");

  if (!token) {
    console.log("No token found, returning 401");
    res.status(401).json({
      message: "Unauthorized"
    });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "fallback-secret");
    console.log("Decoded token:", decoded);
    console.log("Token type:", typeof decoded);
    console.log("Decoded token keys:", Object.keys(decoded as object));
    
    req.userId = (decoded as JwtPayload).userId;
    console.log("Set userId to:", req.userId);
    console.log("userId type:", typeof req.userId);
    
    if (!req.userId) {
      console.log("ERROR: userId is still undefined after setting!");
      res.status(401).json({
        message: "Invalid token structure"
      });
      return;
    }
    
    console.log("Auth middleware successful, calling next()");
    next();
  } catch (error) {
    console.log("Token verification error:", error);
    res.status(401).json({
      message: "Unauthorized"
    });
  }
};

export default verifyToken;