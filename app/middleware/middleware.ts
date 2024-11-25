import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value; // Retrieve the token value

  if (!token) {
    // If no token, respond with 401 Unauthorized
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);

    // If verification succeeds, allow the request to continue
    const response = NextResponse.next();

    // Optionally, you can add user data to request headers
    response.headers.set("x-user-id", (decoded as any).id);

    return response;
  } catch (error) {
    // If verification fails, respond with 401 Unauthorized
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const config = {
  matcher: ["/protected-route", "/another-protected-route"], // Add routes to protect
};
