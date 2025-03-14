"use server";
import { prisma } from "@/lib";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const updateUsersRating = async () => {
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
          totalScore: 0
        };

        // Codeforces update
        if (user.codeforcesHandle) {
          const [statusRes, ratingRes] = await Promise.all([
            axios.get(`https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}`),
            axios.get(`https://codeforces.com/api/user.rating?handle=${user.codeforcesHandle}`)
          ]);

          const solvedProblemSet = new Set();
          statusRes.data.result.forEach((submission: any) => {
            if (submission.verdict === "OK") {
              solvedProblemSet.add(`${submission.problem.contestId}-${submission.problem.index}`);
            }
          });

          if (ratingRes.data?.status === "OK" && ratingRes.data.result.length > 0) {
            updates.codeforcesRating = ratingRes.data.result[ratingRes.data.result.length - 1].newRating;
          }
          updates.codeforcesProblemsSolved = solvedProblemSet.size;
        }

        // Leetcode update
        if (user.leetcodeHandle) {
          const [ratingRes, solvedRes] = await Promise.all([
            axios.get(`https://alfa-leetcode-api-x0kj.onrender.com/userContestRankingInfo/${user.leetcodeHandle}`),
            axios.get(`https://alfa-leetcode-api-x0kj.onrender.com/${user.leetcodeHandle}/solved`)
          ]);

          updates.leetcodeRating = Math.round(ratingRes.data.data.userContestRanking?.rating || 0);
          updates.leetcodeProblemsSolved = solvedRes.data.solvedProblem || 0;
        }

        // Codechef update
        if (user.codechefHandle) {
          const ccResponse = await axios.get(`https://codechef-api.vercel.app/handle/${user.codechefHandle}`);
          updates.codechefRating = ccResponse.data.currentRating || 0;
        }

        // Calculate total score
        updates.totalScore = (
          updates.codeforcesRating + 
          updates.leetcodeRating + 
          updates.codechefRating +
          (updates.codeforcesProblemsSolved * 2) +
          (updates.leetcodeProblemsSolved * 2)
        );

        // Single update per user
        await prisma.user.update({
          where: { id: user.id },
          data: updates
        });

        console.log(`Updated ${user.name}'s ratings:`, updates);

      } catch (error) {
        console.error(`Error updating user ${user.name}:`, error);
      }
    }

    revalidatePath("/leaderboard");
    return true;

  } catch (error) {
    console.error('Failed to update ratings:', error);
    return false;
  }
};