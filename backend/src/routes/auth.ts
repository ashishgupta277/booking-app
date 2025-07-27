
import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import verifyToken from "../middleware/auth";

const router = express.Router();

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({
      message: errors.array()[0].msg
    });
    return;
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid Credentials" });
      return;
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY || "fallback-secret",
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 86400000,
    });

    res.status(200).json({
      userId: user.id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong"
    });
  }
};

router.post("/login", [
  check("email", "Email is required").isEmail(),
  check("password", "Password with 6 or more characters is required").isLength({
    min: 6,
  }),
], loginUser);

router.get("/validate-token", verifyToken, (req: Request, res: Response): void => {
  res.status(200).send({
    userId: req.userId
  });
});
router.post("/logout", (req: Request, res: Response)=>{
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});
export default router;