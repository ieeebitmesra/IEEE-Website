
import { updateAllUsersRating } from "@/actions/updateAllUserRating";
import { NextResponse } from "next/server";

export async function GET() {
  await updateAllUsersRating();
  console.log("crone job executed");
  return NextResponse.json({ ok: true, message: "Users rating updated" });
}
