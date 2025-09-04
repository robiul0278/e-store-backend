import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, link: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // For Gmail with port 587 always false
      auth: {
        user: config.smtp_user,
        pass: config.smtp_pass,
      },
    });

    const info = await transporter.sendMail({
      from: '"E-Store" <robiul0278@gmail.com>',
      to,
      subject: "🔐 Reset Your Password - Valid for 10 Minutes",
      html: `
      <div style="background-color:#f7f7f7; padding:20px; font-family:Arial, sans-serif; line-height:1.5;">
        <div style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 0 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background-color:#4CAF50; padding:20px; text-align:center;">
            <h2 style="color:white; margin:0;">Password Reset Request</h2>
          </div>
          
          <!-- Body -->
          <div style="padding:30px;">
            <p>Dear User,</p>
            <p>Please click the button below to reset your password. This link will expire in <strong>10 minutes</strong>.</p>
            
            <div style="text-align:center; margin:30px 0;">
              <a href="${link}" style="display:inline-block; background-color:#4CAF50; color:white; padding:12px 25px; text-decoration:none; border-radius:5px; font-weight:bold;">
                Reset Password
              </a>
            </div>

            <p>If you did not request a password reset, you can safely ignore this email. Your account will remain secure.</p>
            <p>Thank you,</p>
          </div>

          <!-- Footer -->
          <div style="background-color:#f0f0f0; color:#888; text-align:center; font-size:12px; padding:15px;">
            <p>© ${new Date().getFullYear()} estore.com. All rights reserved.</p>
          </div>
        </div>
      </div>
      `,
    });

    console.log("✅ Email sent successfully:", info.messageId);
  } catch (error: any) {
    console.error("❌ Email sending failed:", error.message || error);
    return { success: false, error: error.message || "Unknown error" };
  }
};
