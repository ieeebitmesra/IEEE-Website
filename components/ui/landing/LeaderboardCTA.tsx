import { motion } from "framer-motion";
import { Trophy, Code, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LeaderboardCTA() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-4xl mx-auto bg-gradient-to-r from-blue-900/40 to-purple-900/40 backdrop-blur-md rounded-xl border border-white/10 p-6 md:p-8 shadow-xl"
    >
      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-shrink-0 bg-blue-500/20 p-4 rounded-full">
          <Trophy className="w-10 h-10 text-blue-400" />
        </div>
        
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Join the Coding Leaderboard</h3>
          <p className="text-white/70 mb-4">
            Submit your LeetCode, CodeForces, and CodeChef IDs after signing up to rank yourself among all students at BIT Mesra. Showcase your coding skills and compete with peers!
          </p>
          
          <div className="flex flex-wrap gap-3 items-center">
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Sign Up Now
              </Button>
            </Link>
            
            <Link href="/leaderboard">
              <Button variant="outline" className="border-white/20 hover:bg-white/10">
                View Leaderboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { platform: "LeetCode", color: "from-yellow-500/20 to-yellow-600/20", icon: Code },
          { platform: "CodeForces", color: "from-red-500/20 to-red-600/20", icon: Code },
          { platform: "CodeChef", color: "from-green-500/20 to-green-600/20", icon: Code }
        ].map((item, index) => (
          <div 
            key={index}
            className={`bg-gradient-to-r ${item.color} p-3 rounded-lg border border-white/10 flex items-center gap-3`}
          >
            <item.icon className="w-5 h-5 text-white/70" />
            <span className="text-white/90 font-medium">{item.platform}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}