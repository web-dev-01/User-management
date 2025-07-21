import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  try {
    const { identifier, password } = await req.json();

    // 🛑 Input Validation
    if (!identifier || !password) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    // 🔍 Check if user exists
    const user = await User.findOne({ identifier });

    if (!user) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    // 🔒 Check if email is verified
    if (!user.isVerified) {
      return Response.json(
        {
          success: false,
          message: "Email not verified. Please verify your email before login.",
        },
        { status: 403 }
      );
    }

    // 🔑 Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return Response.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    // 🪙 Generate JWT Token
    const token = jwt.sign(
      { id: user._id, identifier: user.identifier, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // 🎯 Send successful response
    return Response.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.identifier, // Since identifier is used as email/phone
        role: user.role,
        isVerified: user.isVerified,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return Response.json(
      { success: false, message: "Error during login", error: error.message },
      { status: 500 }
    );
  }
}
