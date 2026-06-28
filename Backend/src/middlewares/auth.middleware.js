import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

const getBearerToken = (authorizationHeader = "") => {
  const [scheme, token] = authorizationHeader.split(" ");
  if (scheme !== "Bearer" || !token) return null;
  return token;
};

export const requireAuth = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || getBearerToken(req.headers.authorization);

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is missing." });
    }

    const jwtSecret = process.env.JWT_SECRET || "dev_secret_change_me";
    const payload = jwt.verify(token, jwtSecret);

    const user = await userModel.findById(payload.userId);
    if (!user) {
      return res.status(401).json({ message: "Invalid authentication token." });
    }

    req.user = userModel.toPublicUser(user);
    return next();
  } catch (_error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired authentication token." });
  }
};
