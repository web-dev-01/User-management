import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/hashPassword";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await connectDB();

  try {
    const { token, password } = await req.json();

    if (!token || !password) {
      return Response.json({ success: false, message: "Token and password are required" }, { status: 400 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return Response.json({ success: false, message: "Invalid token or user not found" }, { status: 404 });
    }

    user.password = await hashPassword(password);
    await user.save();

    return Response.json({ success: true, message: "Password reset successfully" });

  } catch (error) {
    console.error(error);
    return Response.json({ success: false, message: "Invalid or expired token", error: error.message }, { status: 400 });
  }
}
