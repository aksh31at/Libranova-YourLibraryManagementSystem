import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import {sendEmail} from "./sendEmail.js"

export async function sendVerificationEmail(verificationCode, email, res) {
    try{
        const message = generateVerificationOtpEmailTemplate(verificationCode);
        await sendEmail({
            email, 
            subject: "Verification Code(Libranova)",
            message,
        });
        res.status(200).json({
            success:true,
            message:"Verification code sent successfully"
        });
    } catch (error) {
    console.error("Email Error:", error); // 👈 ADD THIS LINE
    return res.status(500).json({
        success: false,
        message: "Failed to send verification email.",
        error: error.message // 👈 Optional: show the actual error in response
    });
    }
}