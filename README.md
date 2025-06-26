# 📅 Subscription Tracker & Reminder App

This is a Node.js-based backend application that helps users track their subscriptions and receive timely email reminders before renewal. It uses MongoDB for data storage and Node Cron for scheduling reminders.

## Features

- Add and manage subscriptions (e.g. Netflix, Spotify)
- Automatically calculates renewal dates based on frequency
- Automatically sends email reminders if a subscription is expiring within the next 7 days
- Uses **Node Cron** to schedule daily checks
- Express rate limiter blocks spam users (too many requests)
- Clean project structure with Mongoose models, utility helpers, and modular controllers
  
## Tech Stack

- **Node.js & Express**
- **MongoDB & Mongoose**
- **Node-Cron**
- **Day.js** (for date manipulation)
- **Express-rate-limite**
- **Nodemailer** (for sending emails)


