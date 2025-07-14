"use server";

import { prisma } from "@/lib";

export const deleteUser = async (userId: string) => {
  try {
    // Check if user exists before attempting to delete
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!userExists) {
      // If user doesn't exist in Prisma, just return success
      console.log(`User ${userId} not found in database, skipping Prisma deletion`);
      return { id: userId, name: "Unknown" };
    }

    // Delete the user from the database
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    
    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Failed to delete user");
  }
};
