import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import AdminUser from "@/app/models/Admin-users";
import { generateToken } from "@/lib/jwtToken";
import { serialize } from "cookie"; // For setting cookies

// Login AdminUser
export async function POST(request: Request) {
  await connectDB();
  try {
    const { email, password } = await request.json();
    // Validate email and password
    if (!email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }
    // Find user by email
    const user = await AdminUser.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }
    // Generate token
    const token = generateToken(user._id);
    // Set the token as an HTTP-only cookie
    const cookie = serialize("authToken", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 day
    });
    // Return response with cookie in the header
    const response = NextResponse.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
      token,
    });
    response.headers.set("Set-Cookie", cookie); // Attach the cookie to the response
    return response;
  } catch (error) {
    console.error("Error during login:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

//log Out Adminuser
export async function GET(request: Request) {
  const response = NextResponse.json({ message: "Logout successful" });
  response.headers.set(
    "Set-Cookie",
    serialize("authToken", "", {
      httpOnly: true,
      expires: new Date(0), // Expire the cookie immediately
    })
  );
  return response;
}
