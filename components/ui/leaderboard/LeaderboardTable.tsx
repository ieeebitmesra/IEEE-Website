import { ArrowUpDown } from "lucide-react";
import Image from "next/image";
import { Participant } from "@/app/leaderboard/page";
import { motion } from "framer-motion";

interface LeaderboardTableProps {
  participants: Participant[];
  sortBy: string;
  sortOrder: "asc" | "desc";
  handleSort: (column: string) => void;
  isLoading: boolean;
}

export function LeaderboardTable({ 
  participants, 
  sortBy, 
  sortOrder, 
  handleSort,
  isLoading
}: LeaderboardTableProps) {
  const getSortIcon = (column: string) => {
    if (sortBy !== column) return null;
    return (
      <ArrowUpDown className={`ml-1 h-4 w-4 inline ${sortOrder === "asc" ? "rotate-180" : ""}`} />
    );
  };

  const getRowColor = (rank: number) => {
    if (rank === 1) return "bg-gradient-to-r from-yellow-500/20 to-transparent";
    if (rank === 2) return "bg-gradient-to-r from-gray-400/20 to-transparent";
    if (rank === 3) return "bg-gradient-to-r from-amber-700/20 to-transparent";
    return "";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-white">
        <thead>
          <tr className="border-b border-white/10">
            <th className="py-3 px-4 text-left">Rank</th>
            <th className="py-3 px-4 text-left">Participant</th>
            <th 
              className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
              onClick={() => handleSort("leetcodeRating")}
            >
              LeetCode Rating {getSortIcon("leetcodeRating")}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
              onClick={() => handleSort("leetcodeSolved")}
            >
              LeetCode Solved {getSortIcon("leetcodeSolved")}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
              onClick={() => handleSort("codeforcesRating")}
            >
              CodeForces Rating {getSortIcon("codeforcesRating")}
            </th>
            <th 
              className="py-3 px-4 text-left cursor-pointer hover:text-blue-400"
              onClick={() => handleSort("totalScore")}
            >
              Total Score {getSortIcon("totalScore")}
            </th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <motion.tr
              key={participant.id || index}
              className={`border-b border-white/10 ${getRowColor(index + 1)}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <td className="py-3 px-4">
                {index + 1}
                {index < 3 && (
                  <span className="ml-2">
                    {index === 0 && "🥇"}
                    {index === 1 && "🥈"}
                    {index === 2 && "🥉"}
                  </span>
                )}
              </td>
              <td className="py-3 px-4 flex items-center gap-3">
                {participant.avatar ? (
                  <Image 
                    src={participant.avatar} 
                    alt={participant.name} 
                    width={32} 
                    height={32} 
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                    {participant.name.charAt(0)}
                  </div>
                )}
                {participant.name}
              </td>
              <td className="py-3 px-4">{participant.leetcodeRating || 'N/A'}</td>
              <td className="py-3 px-4">{participant.leetcodeSolved || 0}</td>
              <td className="py-3 px-4">{participant.codeforcesRating || 'N/A'}</td>
              <td className="py-3 px-4">{participant.totalScore || 0}</td>
            </motion.tr>
          ))}
          {participants.length === 0 && (
            <tr>
              <td colSpan={6} className="py-8 text-center text-gray-400">
                No participants found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}