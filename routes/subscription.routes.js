import { Router } from "express";
import {
  createSubscription,
  deleteAllSubscriptions,
  getAllSubscriptions,
  getSpecificUserSubscription,
} from "../controllers/subscription.controller.js";
import authorize from "../middlewares/auth.middleware.js";
const subscriptionRouter = Router();

subscriptionRouter.get("/", getAllSubscriptions);

subscriptionRouter.get("/:id", authorize, getSpecificUserSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ title: "UPDATE subscription" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ title: "DELETE specific subscription " });
});
subscriptionRouter.get("/user/:id", (req, res) => {
  res.send({ title: "GET user  subscription " });
});
subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ title: "Cancel subscription " });
});
subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ title: "GET all upcoming renewals " });
});

subscriptionRouter.delete("/", deleteAllSubscriptions);

export default subscriptionRouter;
