import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import AdminUser from "@/app/models/Admin-users";

// Update Admin-user
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  await connectDB();

  try {
    const { username, email, password } = await request.json();

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Find and update AdminUser by ID from the URL
    const updatedUser = await AdminUser.findByIdAndUpdate(
      params.id, // Extracted from the dynamic route
      { username, email, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    console.error("Error updating admin user:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
