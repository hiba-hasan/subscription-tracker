import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },

    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Price must be greater than 0"],
    },

    currency: {
      type: String,
      enum: ["USD", "EUR", "INR", "GBP"],
      default: "INR",
    },

    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
    },

    category: {
      type: "String",
      required: true,
      enum: [
        "sports",
        "entertainmemt",
        "technology",
        "lifestyle",
        "finance",
        "polotics",
        "food",
        "others",
      ],
    },
    paymentMethod: {
      type: String,
      trim: true,
      required: true,
    },

    status: {
      type: String,
      enum: ["Active", "Cancelled", "Expired"],
      default: "Active",
    },

    startDate: {
      type: Date,
      required: true,
      validate: [
        function (value) {
          return value <= new Date();
        },
        "Start Date must be less than or equal to the current Date",
      ],

      //THE BELOW OBJECT STYLE IS WHAT HE USED
      //   {
      //     validator: (value) => value <= new Date(),
      //     message: "Start Date must be less than or equal to the current Date",
      //   },
    },
    renewalDate: {
      type: Date,

      validate: [
        function (value) {
          return value > this.startDate;
        },
        "Renewal Date must be greater than the start date",
      ],
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

subscriptionSchema.pre("save", function (next) {
  const renewalPeriods = {
    daily: 1,
    weekly: 7,
    monthly: 30,
    yearly: 365,
  };
  if (!this.renewalDate) {
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  if (this.renewalDate < new Date()) {
    this.status = "Expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
