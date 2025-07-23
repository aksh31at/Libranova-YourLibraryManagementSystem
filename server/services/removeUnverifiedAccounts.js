import cron from "node-cron";
import { User } from "../models/userModels.js";

export const removeUnverifiedAccounts = () => {
  cron.schedule("*/5 * * * *", async () => {
    const thirtyMinutesAgo=new Date(Date.now() - 30 * 60 * 1000);
    await User.deleteMany({
        accountVerified: false,
        createdAt: { $lt: thirtyMinutesAgo }
    });
    console.log("🗑️ Unverified accounts older than 30 minutes have been removed.");
  })
}