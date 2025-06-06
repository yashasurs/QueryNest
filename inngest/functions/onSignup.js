import { inngest } from "../client.js";
import User from "../../models/user.model.js";
import { NonRetriableError } from "inngest";
import { sendEmail } from "../../utils/nodemailer.js";

export const onSignup = inngest.createFunction(
    { id: "onSignup", retries: 3 },
    { event: "user/signup" },
    async ({ event, step }) => {
        try {
            const { email } = event.data;
            const user = await step.run("Send welcome email", async () => {
                const userObject = await User.findOne({ email });
                if (!userObject) {
                    throw new NonRetriableError("User not found");
                }
                return userObject;
            });
            await step.run("Send welcome email", async () => {
                const subject = "Welcome to Our Service!";
                const message = `Hello ${user.name},\n\nThank you for signing up! We're excited to have you on board.\n\nBest regards,\nYour Team`;

                await sendEmail(user.email, subject, message);
            });
            return { success: true, userId: user._id };
        } catch (error) {
            console.error("Failed to send welcome email:", error);
            throw error;
        }
    }
);