import { Router } from "express";
import { getSpecificUser, getUsers } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getSpecificUser);

userRouter.post("/", (req, res) => {
  res.send({ title: "CREATE new user" });
});

userRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE user" });
});

userRouter.delete("/:id", (req, res) => {
  res.send({ title: "Delete specific user " });
});

export default userRouter;
