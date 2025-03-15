import { NextResponse } from "next/server";
import { updateAllUsersRating } from "@/actions/updateAllUserRating";

export async function GET() {
  await updateAllUsersRating();
  return NextResponse.json({ ok: true, message: "Users rating updated" });
}
