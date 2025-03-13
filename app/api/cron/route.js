import { NextResponse } from "next/server";
import { updateUsersRating } from "@/actions/updateUserRating";

export async function GET() {
  await updateUsersRating();
  return NextResponse.json({ ok: true, message: "Users rating updated" });
}
