import cron from "node-cron";
import { Borrow } from "../models/borrowModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import { User } from "../models/userModels.js";

export const notifyUsers = () => {
  cron.schedule("*/30 * * * *", async () => {
    try {
      const now = new Date();
      const borrowers = await Borrow.find({
        dueDate: { $lte: now },
        returnDate: null,
        notified: false,
      });

      for (const borrow of borrowers) {
        // Handle both cases: embedded user object and direct ObjectId
        const userId =
          typeof borrow.user === "object" && borrow.user !== null
            ? borrow.user._id || borrow.user.id
            : borrow.user;

        if (!userId) {
          console.warn("User ID not found in borrow record:", borrow);
          continue;
        }

        const user = await User.findById(userId);

        if (user?.email) {
          await sendEmail({
            email: user.email,
            subject: "Book Due Reminder",
            message: `Dear ${user.name}, your borrowed book is due. Please return it as soon as possible.`,
          });

          borrow.notified = true;
          await borrow.save();

          console.log(`📧 Notification sent to ${user.email}`);
        } else {
          console.warn("⚠️ User not found or missing email:", userId);
        }
      }
    } catch (error) {
      console.error("❌ Error in notifying users:", error);
    }
  });

  console.log("⏰ Notification Cron Job started.");
};
