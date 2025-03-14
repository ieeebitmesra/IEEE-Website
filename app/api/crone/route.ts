"use server";
import { NextResponse } from "next/server";

import { updateAllUsersRating } from "@/actions/updateAllUserRating";

export async function GET(request: Request) {
  try {
    // Verify the request is coming from a legitimate cron job
    // Call the update function
    await updateAllUsersRating();

    return new NextResponse("Users ratings updated successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Cron job failed:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
