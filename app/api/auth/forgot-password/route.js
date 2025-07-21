import { sendEmail } from "@/lib/email";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  const { email } = await req.json();

  const user = await User.findOne({ identifier: email });

  if (!user) {
    return Response.json({ success: false, message: "User not found" }, { status: 404 });
  }

  // Generate reset token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

  const resetLink = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  const html = `
    <h2>Password Reset</h2>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link will expire in 15 minutes.</p>
  `;

  await sendEmail({
    to: email,
    subject: "Reset Your Password - Champion Semiconductor LLP",
    html
  });

  return Response.json({ success: true, message: "Password reset link sent to your email." });
}
