import { connectDB } from "@/lib/dbConnect";
import { NextResponse } from "next/server";
import AdminUser from "@/app/models/Admin-users";

//get all users
export async function GET() {
  await connectDB();
  const users = await AdminUser.find({});
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

    const findUser = await AdminUser.findOne({
      $or: [{ username }, { email }],
    });
    if (findUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    const user = await AdminUser.create({ username, email, password });
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
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

    const deletedUser = await AdminUser.findOneAndDelete({ username });
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
