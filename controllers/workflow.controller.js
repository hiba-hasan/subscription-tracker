import dayjs from "dayjs";
import Subscription from "../models/subscription.models.js";
import { sendRemainderEmail } from "../utils/send-email.js";

import { sendExpirationRemainderEmail } from "../utils/send-expire-email.js";

export const sendRemainders = async () => {
  const today = dayjs();
  const sevenDaysFromToday = today.add(7, "day");
  const subscriptions = await fetchSubscriptions(sevenDaysFromToday);
  console.log(typeof subscriptions);
  console.log(subscriptions);
  for (const subscription of subscriptions) {
    console.log(subscription);
    console.log(subscription.user);
    console.log("email:", subscription.user.email);

    const renewalDate = dayjs(subscription.renewalDate);

    const noOfDays = renewalDate.diff(today, "day");
    console.log(noOfDays);
    await sendRemainderEmail({
      to: subscription.user.email,
      type: `${noOfDays} days before reminder`,
      subscription,
    });
  }
};

async function fetchSubscriptions(sevenDaysFromToday) {
  return await Subscription.find({
    status: "Active",
    renewalDate: { $lt: sevenDaysFromToday },
  }).populate("user", "name email");
}

export async function sendExpireRemainder() {
  console.log("Hello");
  const subscriptions = await fetchExpiredSubscriptions();
  for (const subscription of subscriptions) {
    await sendExpirationRemainderEmail({
      to: subscription.user.email,
      subscription,
    });
  }
}

async function fetchExpiredSubscriptions() {
  return await Subscription.find({ status: "Expired" }).populate(
    "user",
    "name email"
  );
}
