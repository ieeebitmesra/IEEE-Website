import { motion } from "framer-motion";
import Image from "next/image";
import { Trophy, Medal } from "lucide-react";
import { Participant } from "@/app/leaderboard/page";

interface TopPerformersProps {
  participants: Participant[];
}

export function TopPerformers({ participants }: TopPerformersProps) {
  // Ensure we have at most 3 participants
  const topThree = participants.slice(0, 3);
  
  // If we have less than 3 participants, fill with empty slots
  while (topThree.length < 3) {
    topThree.push(null as any);
  }
  
  // Rearrange to put 1st place in the middle, 2nd on the left, 3rd on the right
  const arranged = [
    topThree[1] || null, // 2nd place
    topThree[0] || null, // 1st place
    topThree[2] || null, // 3rd place
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <h2 className="text-3xl font-bold text-white text-center mb-10">Top Performers</h2>
      
      <div className="flex flex-col md:flex-row justify-center items-end gap-4 md:gap-8">
        {arranged.map((participant, index) => {
          const actualRank = index === 0 ? 2 : index === 1 ? 1 : 3;
          const heights = ["h-64", "h-72", "h-60"];
          const marginTop = index === 1 ? "" : "mt-8";
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className={`relative ${heights[index]} w-full md:w-64 bg-gradient-to-b from-blue-500/20 to-transparent rounded-t-xl border-t border-l border-r border-white/10 flex flex-col items-center justify-end ${marginTop}`}
            >
              {participant ? (
                <>
                  <div className="absolute top-0 left-0 right-0 flex justify-center">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-full w-12 h-12 flex items-center justify-center -mt-6 border-2 border-white/20">
                      {actualRank === 1 && <Trophy className="h-6 w-6" />}
                      {actualRank === 2 && <span className="text-xl font-bold">2</span>}
                      {actualRank === 3 && <span className="text-xl font-bold">3</span>}
                    </div>
                  </div>
                  
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white/10 mb-4">
                    <Image 
                      src={participant.avatar || "/team/noimage.jpg"}
                      alt={participant.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-1">{participant.name}</h3>
                  <p className="text-blue-400 mb-2">{participant.totalScore} points</p>
                  
                  <div className="grid grid-cols-3 gap-2 w-full p-4 text-center text-xs">
                    <div>
                      <p className="text-white/60">LeetCode</p>
                      <p className="text-white font-medium">{participant.leetcodeRating}</p>
                    </div>
                    <div>
                      <p className="text-white/60">CodeForces</p>
                      <p className="text-white font-medium">{participant.codeforcesRating}</p>
                    </div>
                    <div>
                      <p className="text-white/60">CodeChef</p>
                      <p className="text-white font-medium">{participant.codechefRating}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center p-8">
                  <div className="w-24 h-24 rounded-full bg-white/5 mb-4 flex items-center justify-center">
                    <Trophy className="h-8 w-8 text-white/20" />
                  </div>
                  <p className="text-white/40 text-center">Position Available</p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}