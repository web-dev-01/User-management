import dbConnect from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  try {
    const { identifier, password } = await req.json();

    if (!identifier || !password) {
      return Response.json({ success: false, message: "All fields are required" }, { status: 400 });
    }

    // 1. Check user existence
    const user = await User.findOne({ identifier });

    if (!user) {
      return Response.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // 2. Password compare
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return Response.json({ success: false, message: "Invalid password" }, { status: 401 });
    }

    // 3. Create JWT
    const token = jwt.sign(
      { id: user._id, identifier: user.identifier, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return Response.json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        identifier: user.identifier,
        role: user.role || "employee",
        verified: user.verified,
      },
    });

  } catch (error) {
    return Response.json(
      { success: false, message: "Error during login", error: error.message },
      { status: 500 }
    );
  }
}
