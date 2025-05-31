import dayjs from "dayjs";
import { emailTemplate } from "./expire-email-template.js";
import { accountEmail, transporter } from "../controllers/config/nodemailer.js";

export const sendExpirationRemainderEmail = async ({ to, subscription }) => {
  if (!to) {
    throw new Error("Missing required parameters");
  }

  const template = emailTemplate;

  const mailInfo = {
    userName: subscription.user.name,
    subscriptionName: subscription.name,
    renewalDate: dayjs(subscription.renewalDate).format("MMM D, YYYY"),
    planName: subscription.name,
    price: `${subscription.currency} ${subscription.price} (${subscription.frequency})`,
    PaymentMethod: subscription.PaymentMethod,
  };

  const message = template.generateBody(mailInfo);
  const subject = template.generateSubject(mailInfo);

  const mailOptions = {
    from: accountEmail,
    to: to,
    subject: subject,
    html: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error, "Error sending email");
    }
    console.log("Email sent: " + info.response);
  });
};
