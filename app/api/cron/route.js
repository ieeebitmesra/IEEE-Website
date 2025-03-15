
import { updateAllUsersRating } from "@/actions/updateAllUserRating";
import { NextResponse } from "next/server";

export async function GET() {
<<<<<<< HEAD:app/api/cron/route.js
  await updateUsersRating();
=======
  await updateAllUsersRating();
  console.log("crone job executed");
>>>>>>> da8875d618becff8d0a60a7b3bd4a8107f951a9b:app/api/cron/route.ts
  return NextResponse.json({ ok: true, message: "Users rating updated" });
}
