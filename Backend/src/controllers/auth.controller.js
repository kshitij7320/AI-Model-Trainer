import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const cookieConfig = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const signToken = (userId) => {
  const jwtSecret = process.env.JWT_SECRET || "dev_secret_change_me";
  return jwt.sign({ userId }, jwtSecret, { expiresIn: "7d" });
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "name, email, and password are required." });
    }

    const existingUser = await userModel.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email is already registered." });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const createdUser = await userModel.create({ name, email, passwordHash });

    const token = signToken(createdUser.id);
    res.cookie("token", token, cookieConfig);

    return res.status(201).json({
      message: "Registration successful.",
      user: userModel.toPublicUser(createdUser),
    });
  } catch (_error) {
    return res.status(500).json({ message: "Registration failed." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required." });
    }

    const user = await userModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const validPassword = await bcrypt.compare(password, user.passwordHash);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const token = signToken(user.id);
    res.cookie("token", token, cookieConfig);

    return res.status(200).json({
      message: "Login successful.",
      user: userModel.toPublicUser(user),
    });
  } catch (_error) {
    return res.status(500).json({ message: "Login failed." });
  }
};

export const logout = async (_req, res) => {
  res.clearCookie("token", cookieConfig);
  return res.status(200).json({ message: "Logout successful." });
};

export const me = async (req, res) => {
  return res.status(200).json({ user: req.user });
};
