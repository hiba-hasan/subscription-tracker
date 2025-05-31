// import { workflowClient } from "./config/upstash.js";
import Subscription from "../models/subscription.models.js";
// import { SERVER_URL } from "./config/env.js";

export async function createSubscription(req, res, next) {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    console.log(subscription);
    // const { workflowRunId } = await workflowClient.trigger({
    //   url: `${SERVER_URL}/api/v1/workflows/subscription/remainder`,
    //   body: {
    //     subscriptionId: subscription.id,
    //   },
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   retries: 10,
    // });

    res.status(201).json({ success: true, data: { subscription } });
  } catch (error) {
    next(error);
  }
}

export async function getAllSubscriptions(req, res, next) {
  try {
    const subscriptions = await Subscription.find();

    // if (!subscriptions) {
    //   res.status(404).json({ success: false, error: "Not found" });
    // }
    res.status(200).json({ success: true, data: subscriptions });
    next();
  } catch (error) {
    next(error);
  }
}

export async function getSpecificUserSubscription(req, res, next) {
  try {
    if (req.user._id != req.params.id) {
      const error = new Error("UnAuthorized");
      error.statusCode(401);
      throw error;
    }
    const subscription = await Subscription.findOne({ user: req.params.id });
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
}

export async function deleteAllSubscriptions(req, res, next) {
  try {
    await Subscription.deleteMany({});
    res.status(200).send({ success: true });
  } catch (error) {
    next(error);
  }
}
