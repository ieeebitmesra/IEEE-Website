"use server";

import { prisma } from "@/lib";
import { updateThisUserRating } from "./updateThisUserRating";

export async function createUser(formData: {
  name: string;
  email: string;
  leetcodeHandle: string;
  codeforcesHandle: string;
  codechefHandle: string;
}) {
  try {
    // Initialize default values
    const userData = {
      name: formData.name,
      email: formData.email,
      leetcodeHandle: formData.leetcodeHandle || "none",
      codeforcesHandle: formData.codeforcesHandle || "none",
      codechefHandle: formData.codechefHandle ? formData.codechefHandle : "none", // Explicitly handle empty string
      leetcodeRating: 0,
      leetcodeProblemsSolved: 0,
      codeforcesRating: 0,
      codeforcesProblemsSolved: 0,
      codechefRating: 0,
      codechefProblemsSolved: 0,
      totalScore: 0,
    };

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        email: formData.email,
      },
    });

    let user;
    
    if (existingUser) {
      // Update existing user
      user = await prisma.user.update({
        where: {
          id: existingUser.id,
        },
        data: {
          name: userData.name,
          leetcodeHandle: userData.leetcodeHandle,
          codeforcesHandle: userData.codeforcesHandle,
          codechefHandle: userData.codechefHandle,
        },
      });
    } else {
      // Create new user
      user = await prisma.user.create({
        data: userData,
      });
    }

    // Fetch ratings for the user
    if (user) {
      await updateThisUserRating({ userId: user.id });
    }

    return { success: true, user, isUpdate: !!existingUser };
  } catch (error) {
    console.error("Error creating/updating user:", error);
    return { success: false, error: "Failed to create/update user" };
  }
}
