import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";

const lynkt = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  if (!name) {
    return NextResponse.json({ messages: ["user not found"] }, { status: 404 });
  }

  try {
    const response = await lynkt.get(`/users/${name}/links`, {
      headers: {
        Authorization: "Api-Key olokomeu",
      },
    });

    if (!response.data || response.data.length === 0) {
      return NextResponse.json(
        { messages: ["user not found"] },
        { status: 404 },
      );
    }

    return NextResponse.json(response.data.data);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { messages: ["user not found"], error: err.message },
      { status: 500 },
    );
  }
}
