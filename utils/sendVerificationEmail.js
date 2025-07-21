import { sendEmail } from "@/utils/sendEmail";

export const sendVerificationEmail = async (to, token) => {
  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?token=${token}`;

  const subject = "Verify Your Email - Champion Semiconductor";
  const html = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h2>Welcome to Champion Semiconductor!</h2>
      <p>Please verify your email by clicking the button below:</p>
      <a href="${verifyUrl}" style="background-color: #00ED64; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>If you didn't request this, you can ignore this email.</p>
    </div>
  `;

  return await sendEmail({ to, subject, html });
};
