"use server";
import { prisma } from "@/lib";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const updateThisUserRating = async ({
  userId: userIdentification,
}: {
  userId: string;
}) => {
  try {
    const user = await prisma.user.findFirst({
      where: {
        id: userIdentification,
      },
    });
    if (!user) {
      console.error("User not found");
      return;
    }
    
    try {
      let updates = {
        codeforcesRating: 0,
        codeforcesProblemsSolved: 0,
        leetcodeRating: 0,
        leetcodeProblemsSolved: 0,
        codechefRating: 0,
        codechefProblemsSolved: 0,
        totalScore: 0,
      };

      // Codeforces update with retry logic
      if (user.codeforcesHandle && user.codeforcesHandle !== "none") {
        try {
          const [statusRes, ratingRes] = await Promise.allSettled([
            fetchWithRetry(`https://codeforces.com/api/user.status?handle=${user.codeforcesHandle}`, 3),
            fetchWithRetry(`https://codeforces.com/api/user.rating?handle=${user.codeforcesHandle}`, 3),
          ]);

          if (statusRes.status === 'fulfilled' && statusRes.value) {
            const solvedProblemSet = new Set();
            statusRes.value.data.result.forEach((submission: any) => {
              if (submission.verdict === "OK") {
                solvedProblemSet.add(
                  `${submission.problem.contestId}-${submission.problem.index}`
                );
              }
            });
            updates.codeforcesProblemsSolved = solvedProblemSet.size;
          }

          if (ratingRes.status === 'fulfilled' && ratingRes.value && 
              ratingRes.value.data?.status === "OK" && 
              ratingRes.value.data.result.length > 0) {
            updates.codeforcesRating =
              ratingRes.value.data.result[ratingRes.value.data.result.length - 1].newRating;
          }
        } catch (error) {
          console.error(`Error fetching Codeforces data for ${user.name}:`, error);
        }
      }

      // Leetcode update with retry logic and alternative endpoints
      if (user.leetcodeHandle && user.leetcodeHandle !== "none") {
        try {
          // Try primary endpoint first
          const [ratingRes, solvedRes] = await Promise.allSettled([
            fetchWithRetry(`https://alfa-leetcode-api-x0kj.onrender.com/userContestRankingInfo/${user.leetcodeHandle}`, 2),
            fetchWithRetry(`https://alfa-leetcode-api-x0kj.onrender.com/${user.leetcodeHandle}/solved`, 2),
          ]);

          // Process rating data if available
          if (ratingRes.status === 'fulfilled' && ratingRes.value && ratingRes.value.data?.data?.userContestRanking) {
            updates.leetcodeRating = Math.round(
              ratingRes.value.data.data.userContestRanking.rating || 0
            );
          }

          // Process solved problems data if available
          if (solvedRes.status === 'fulfilled' && solvedRes.value) {
            updates.leetcodeProblemsSolved = solvedRes.value.data.solvedProblem || 0;
          }

          // If either failed, try alternative endpoint
          if (ratingRes.status === 'rejected' || solvedRes.status === 'rejected') {
            try {
              // Fallback to alternative API (you may need to implement or find one)
              const fallbackData = await fetchWithRetry(
                `https://leetcode-stats-api.herokuapp.com/${user.leetcodeHandle}`, 
                2
              );
              
              if (fallbackData && fallbackData.data) {
                // If primary rating failed but fallback succeeded
                if (ratingRes.status === 'rejected' && fallbackData.data.ranking) {
                  updates.leetcodeRating = fallbackData.data.ranking;
                }
                
                // If primary solved count failed but fallback succeeded
                if (solvedRes.status === 'rejected' && fallbackData.data.totalSolved) {
                  updates.leetcodeProblemsSolved = fallbackData.data.totalSolved;
                }
              }
            } catch (fallbackError) {
              console.error(`Fallback LeetCode API also failed for ${user.name}:`, fallbackError);
            }
          }
        } catch (error) {
          console.error(`Error fetching LeetCode data for ${user.name}:`, error);
        }
      }

      // Codechef update with retry logic - only if handle exists and is not "none"
      if (user.codechefHandle && user.codechefHandle !== "none") {
        try {
          const ccResponse = await fetchWithRetry(
            `https://codechef-api.vercel.app/handle/${user.codechefHandle}`,
            3
          );
          
          if (ccResponse && ccResponse.data) {
            updates.codechefRating = ccResponse.data.currentRating || 0;
            // If the API provides problems solved count, update it here
            updates.codechefProblemsSolved = ccResponse.data.problemsSolved || 0;
          }
        } catch (error) {
          console.error(`Error fetching CodeChef data for ${user.name}:`, error);
          // Don't fail the entire update if CodeChef fails
        }
      }

      // Calculate total score - only count platforms that successfully returned data
      // and only include CodeChef if it was provided
      updates.totalScore =
        updates.codeforcesRating +
        updates.leetcodeRating +
        (user.codechefHandle && user.codechefHandle !== "none" ? updates.codechefRating : 0) +
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

    revalidatePath("/leaderboard");
    return true;
  } catch (error) {
    console.error("Failed to update ratings:", error);
    return false;
  }
};

// Helper function to retry failed requests
async function fetchWithRetry(url: string, maxRetries: number = 3, delay: number = 1000) {
  let lastError;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response;
    } catch (error) {
      console.warn(`Attempt ${attempt + 1}/${maxRetries} failed for ${url}:`, error);
      lastError = error;
      
      // Wait before retrying
      if (attempt < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delay * (attempt + 1)));
      }
    }
  }
  
  throw lastError;
}