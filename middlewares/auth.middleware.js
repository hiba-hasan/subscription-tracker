import User from "../models/user.models.js";
import { JWT_SECRET } from "../controllers/config/env.js";
import jwt from "jsonwebtoken";

export default async function authorize(req, res, next) {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      res.status(404).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded) {
      const user = await User.findById(decoded.userId);
      if (!user) {
        res.status(404).json({ message: "UnAuthorized" });
      }
      req.user = user;
    }

    next();
  } catch (error) {
    res.status(404).json({ message: "Unauthorized", error: error.message });
  }
}
