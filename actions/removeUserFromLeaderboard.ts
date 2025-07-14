"use server";

import { prisma } from "@/lib";

export const removeUserFromLeaderboard = async (email: string) => {
  try {
    // Find the user by email
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      return { success: false, error: "User not found on leaderboard" };
    }

    // Delete the user from the database
    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error removing user from leaderboard:", error);
    return { success: false, error: "Failed to remove user from leaderboard" };
  }
};