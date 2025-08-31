import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, link: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env === "production",
        auth: {
            user: "robiul0278@gmail.com",
            pass: "lswv vltp wacq dctd",
        },
    });

    await transporter.sendMail({
        from: 'robiul0278@gmail.com',
        to,
        subject: "Reset your password within 10 minutes",
        // text: `Change password please. Reset link: ${link}`,
        html: `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 30px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <div style="background-color: #4CAF50; color: white; padding: 20px 30px; text-align: center;">
        <h2>Password Reset Request</h2>
         </div>
         <div style="padding: 30px;">
         <p>Hi there,</p>
         <p>We received a request to reset your password. Click the button below to change it:</p>
         <div style="text-align: center; margin: 30px 0;">
          <a href="${link}" style="background-color: #4CAF50; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
         </div>
         <p>If you didn't request a password reset, you can safely ignore this email.</p>
         <p>Thanks,<br>The YourApp Team</p>
         </div>
         <div style="background-color: #f0f0f0; color: #888; text-align: center; font-size: 12px; padding: 20px;">
         <p>© 2025 YourApp. All rights reserved.</p>
         </div>
         </div>
        </div>
    `
    });
}
