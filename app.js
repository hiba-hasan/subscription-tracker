import express from "express";
import { PORT } from "./controllers/config/env.js";

import userRouter from "./routes/user.routes.js";
import authRoute from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import workFlowRouter from "./routes/workflow.routes.js";

import connectToDatabase from "./database/mongodb.js";
import cookieParser from "cookie-parser";

import errorMiddleWare from "./middlewares/error.middleware.js";
import limiter from "./middlewares/expressRateLimit.middleware.js";
// import arcjetMiddleWare from "./middlewares/arcjet.middleware.js";

import {
  sendExpireRemainder,
  sendRemainders,
} from "./controllers/workflow.controller.js";

import cron from "node-cron";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(arcjetMiddleWare);
app.use(limiter);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workFlowRouter);

app.use(errorMiddleWare);

app.get("/", (req, res) => {
  console.log("Hello");
  res.send("Welcome to subscription-tracking API:)");
});

app.listen(PORT, async () => {
  console.log(`Server runniing on http://localhost:${PORT}`);
  await connectToDatabase();
});

cron.schedule("0 0 * * *", async () => {
  await sendRemainders();
});

cron.schedule("0 0 1 * *", async () => {
  await sendExpireRemainder();
});

export default app;
