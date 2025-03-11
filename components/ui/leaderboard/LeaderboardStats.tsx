import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

interface LeaderboardStatsProps {
  stats: Stat[];
}

export function LeaderboardStats({ stats }: LeaderboardStatsProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 flex flex-col items-center justify-center text-center"
          >
            <div className="bg-blue-500/20 p-3 rounded-full mb-3">
              <Icon className="h-6 w-6 text-blue-400" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-1">{stat.value}</h3>
            <p className="text-white/60 text-sm">{stat.label}</p>
          </motion.div>
        );
      })}
    </motion.div>
  );
}