import connectDB from "@/lib/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/hashPassword";

export async function POST(req) {
  await connectDB();

  const body = await req.json();
  const { name, identifier, password } = body;

  if (!name || !identifier || !password) {
    return Response.json({ success: false, message: "All fields are required" }, { status: 400 });
  }

  try {
    const existingUser = await User.findOne({ identifier });

    if (existingUser) {
      return Response.json({ success: false, message: "User already exists" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      name,
      identifier,
      password: hashedPassword,
    });

    return Response.json({ success: true, message: "User registered successfully", user: newUser }, { status: 201 });
  } catch (error) {
    return Response.json({ success: false, message: "Signup failed", error: error.message }, { status: 500 });
  }
}
