import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/hashPassword";
import { sendVerificationEmail } from "@/utils/sendVerificationEmail";
import crypto from "crypto";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { name, identifier, password, role, adminKey } = body;

  // 🛑 Input Validation
  if (!name || !identifier || !password || !role) {
    return Response.json(
      { success: false, message: "All fields are required including role" },
      { status: 400 }
    );
  }

  try {
    // ✅ Check if user already exists
    const existingUser = await User.findOne({ identifier });

    if (existingUser) {
      return Response.json(
        { success: false, message: "User already exists" },
        { status: 409 }
      );
    }

    // 🔑 Verify admin/owner role with adminKey
    if (role === "admin" || role === "owner") {
      if (adminKey !== process.env.ADMIN_SECRET_KEY) {
        return Response.json(
          { success: false, message: "Invalid admin/owner key" },
          { status: 403 }
        );
      }
    }

    // 🔐 Hash the password
    const hashedPassword = await hashPassword(password);

    // ✉️ Generate email verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // 🆕 Create user
    const newUser = await User.create({
      name,
      identifier,
      password: hashedPassword,
      role,
      isVerified: false, // By default false
      verificationToken,
    });

    // 📧 Send verification email
    await sendVerificationEmail(identifier, verificationToken);

    // 🎯 Return success
    return Response.json(
      {
        success: true,
        message: "User registered successfully. Please verify your email.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return Response.json(
      { success: false, message: "Signup failed", error: error.message },
      { status: 500 }
    );
  }
}
