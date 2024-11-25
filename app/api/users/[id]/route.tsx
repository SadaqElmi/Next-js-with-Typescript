import { connectDB } from "@/lib/dbConnect";
import User from "@/app/models/Users";
import { NextResponse } from "next/server";

//get all users
export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json(users);
}

//create Admin-user

export async function POST(request: Request) {
  await connectDB();
  try {
    const { username, email, password } = await request.json();

    // Validate data
    if (!username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const findUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (findUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const user = await User.create({ username, email, password });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}

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

    // Find and update User by ID from the URL
    const updatedUser = await User.findByIdAndUpdate(
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
//delete Admin-user

export async function DELETE(request: Request) {
  await connectDB();
  try {
    const { username } = await request.json();
    if (!username) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(deletedUser, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}
