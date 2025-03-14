import { NextResponse } from "next/server";
import { updateUsersRating } from "@/actions/updateUserRating";

export async function GET() {
  await updateUsersRating();
  console.log("crone job executed");
  return NextResponse.json({ ok: true, message: "Users rating updated" });
}
