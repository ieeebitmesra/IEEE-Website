"use server";

import { prisma } from "@/lib";

export const deleteUser = async (userId: string) => {
  try {
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
