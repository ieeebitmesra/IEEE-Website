'use server'
import { prisma } from "@/lib";
import axios from "axios";
import { getUser } from "./getUser";

<<<<<<< HEAD:actions/updateUserRating.ts
export const updateUsersRating = async () => {

  let users = await prisma.user.findMany();
  // codeforces code
  users.map(async (user) => {
    if (!user.codeforcesHandle) {
      return;
    }
    let codeforcesResponse = await axios.get(
      `https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}`
    );
    const submissions = codeforcesResponse.data.result;

    const solvedProblemSet = new Set();
    submissions.forEach((submission: any) => {
      if (submission.verdict === "OK") {
        solvedProblemSet.add(
          `${submission.problem.contestId}-${submission.problem.index}`
        );
      }
    });
    const solvedProblems = solvedProblemSet.size;
    let cfRating = 0;
    const ratingResponse = await axios.get(
      `https://codeforces.com/api/user.rating?handle=${user.codeforcesHandle}`
    );
    if (ratingResponse.data && ratingResponse.data.status === "OK") {
      const ratingHistory = ratingResponse.data.result;
      if (ratingHistory && ratingHistory.length > 0) {
        // Get the last contest's rating
        cfRating = ratingHistory[ratingHistory.length - 1].newRating;
      }
    }

    // Update the user in the database
    await prisma.user.update({
      where: { id: user.id },
      data: {
        codeforcesRating: cfRating,
        codeforcesProblemsSolved: solvedProblems,
      },
    });
  });

  // leetcode code
  users.map(async (user) => {
    if (!user.leetcodeHandle) {
      return;
    }
    let lcRating = 0;
    let leetcodeRating = await axios.get(
      `https://alfa-leetcode-api-x0kj.onrender.com/userContestRankingInfo/${user.leetcodeHandle}`
    );
    let leetcodeResponse = await axios.get(
      `https://alfa-leetcode-api-x0kj.onrender.com/${user.leetcodeHandle}/solved`
    );

    lcRating = leetcodeRating.data.data.userContestRanking.rating;
    lcRating = Math.round(lcRating);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        leetcodeRating: lcRating,
        leetcodeProblemsSolved: leetcodeResponse.data["solvedProblem"],
      },
    });
  });
  // codechef code

  users.map(async (user) => {
    if (!user.codechefHandle) {
      return;
    }
    let ccResponse = await axios.get(
      `https://codechef-api.vercel.app/handle/${user.codechefHandle}`
    );
    let ccRating = ccResponse.data["currentRating"];
    await prisma.user.update({
      where: { id: user.id },
      data: {
        codechefRating: ccRating,
      },
    });
  });

  users = await getUser();
  users.map(async (user) => {
    let totalScores = 0;
    if (user.leetcodeRating) {
      totalScores += user.leetcodeRating;
    }
    if (user.codeforcesRating) {
      totalScores += user.codeforcesRating;
    }
    if (user.codechefRating) {
      totalScores += user.codechefRating;
    }
    console.log(totalScores);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        totalScore: totalScores,
      },
    });
  });
  
=======
export const updateAllUsersRating = async () => {
  try {
    const users = await prisma.user.findMany();

    // Process users sequentially
    for (const user of users) {
      try {
        let updates = {
          codeforcesRating: 0,
          codeforcesProblemsSolved: 0,
          leetcodeRating: 0,
          leetcodeProblemsSolved: 0,
          codechefRating: 0,
          totalScore: 0,
        };

        // Codeforces update
        if (user.codeforcesHandle) {
          const [statusRes, ratingRes] = await Promise.all([
            axios.get(
              `https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}`
            ),
            axios.get(
              `https://codeforces.com/api/user.rating?handle=${user.codeforcesHandle}`
            ),
          ]);

          const solvedProblemSet = new Set();
          statusRes.data.result.forEach((submission: any) => {
            if (submission.verdict === "OK") {
              solvedProblemSet.add(
                `${submission.problem.contestId}-${submission.problem.index}`
              );
            }
          });

          if (
            ratingRes.data?.status === "OK" &&
            ratingRes.data.result.length > 0
          ) {
            updates.codeforcesRating =
              ratingRes.data.result[ratingRes.data.result.length - 1].newRating;
          }
          updates.codeforcesProblemsSolved = solvedProblemSet.size;
        }

        // Leetcode update
        if (user.leetcodeHandle) {
          const [ratingRes, solvedRes] = await Promise.all([
            axios.get(
              `https://alfa-leetcode-api-x0kj.onrender.com/userContestRankingInfo/${user.leetcodeHandle}`
            ),
            axios.get(
              `https://alfa-leetcode-api-x0kj.onrender.com/${user.leetcodeHandle}/solved`
            ),
          ]);

          updates.leetcodeRating = Math.round(
            ratingRes.data.data.userContestRanking?.rating || 0
          );
          updates.leetcodeProblemsSolved = solvedRes.data.solvedProblem || 0;
        }

        // Codechef update
        if (user.codechefHandle) {
          const ccResponse = await axios.get(
            `https://codechef-api.vercel.app/handle/${user.codechefHandle}`
          );
          updates.codechefRating = ccResponse.data.currentRating || 0;
        }

        // Calculate total score
        updates.totalScore =
          updates.codeforcesRating +
          updates.leetcodeRating +
          updates.codechefRating +
          updates.codeforcesProblemsSolved * 2 +
          updates.leetcodeProblemsSolved * 2;

        // Single update per user
        await prisma.user.update({
          where: { id: user.id },
          data: updates,
        });

        console.log(`Updated ${user.name}'s ratings:`, updates);
      } catch (error) {
        console.error(`Error updating user ${user.name}:`, error);
      }
    }

    revalidatePath("/leaderboard");
    return true;
  } catch (error) {
    console.error("Failed to update ratings:", error);
    return false;
  }
>>>>>>> da8875d618becff8d0a60a7b3bd4a8107f951a9b:actions/updateAllUserRating.ts
};
