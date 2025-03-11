"use client";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { BackgroundSparkles } from "@/components/ui/animations/BackgroundSparkles";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Trophy, 
  Medal, 
  Code, 
  Search, 
  Filter, 
  ArrowUpDown, 
  Github,
  RefreshCw,
  User,
  Sparkles
} from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LeaderboardTable } from "@/components/ui/leaderboard/LeaderboardTable";
import { LeaderboardForm } from "@/components/ui/leaderboard/LeaderboardForm";
import { LeaderboardStats } from "@/components/ui/leaderboard/LeaderboardStats";
import { TopPerformers } from "@/components/ui/leaderboard/TopPerformers";
import { supabase } from "@/lib/supabase";

export interface Participant {
  id: string;
  name: string;
  leetcode: string;
  codeforces: string;
  codechef: string;
  leetcodeRating: number;
  leetcodeSolved: number;
  codeforcesRating: number;
  codeforcesSolved: number;
  codechefRating: number;
  codechefSolved: number;
  totalScore: number;
  rank: number;
  avatar: string;
  lastUpdated: string;
}

export default function LeaderboardPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<string>("totalScore");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [showForm, setShowForm] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Fetch participants data from Supabase
  useEffect(() => {
    async function fetchParticipants() {
      try {
        setIsLoading(true);
        
        // Check if Supabase URL and key are configured
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
          console.warn('Supabase credentials not configured. Using mock data.');
          // Use mock data as fallback
          const mockData: Participant[] = [
            {
              id: "1",
              name: "Prateek Krishna",
              leetcode: "prateek_krishna",
              codeforces: "prateek_cf",
              codechef: "prateek_cc",
              leetcodeRating: 2100,
              leetcodeSolved: 450,
              codeforcesRating: 1850,
              codeforcesSolved: 320,
              codechefRating: 1950,
              codechefSolved: 280,
              totalScore: 6950,
              rank: 1,
              avatar: "/team/prateek.jpg",
              lastUpdated: "2023-06-15"
            },
            {
              id: "2",
              name: "Sukham Singh",
              leetcode: "sukham_singh",
              codeforces: "sukham_cf",
              codechef: "sukham_cc",
              leetcodeRating: 1950,
              leetcodeSolved: 420,
              codeforcesRating: 1800,
              codeforcesSolved: 300,
              codechefRating: 1900,
              codechefSolved: 260,
              totalScore: 6630,
              rank: 2,
              avatar: "/team/sukham.jpg",
              lastUpdated: "2023-06-14"
            },
            {
              id: "3",
              name: "Vaishali Jain",
              leetcode: "vaishali_jain",
              codeforces: "vaishali_cf",
              codechef: "vaishali_cc",
              leetcodeRating: 1900,
              leetcodeSolved: 400,
              codeforcesRating: 1750,
              codeforcesSolved: 280,
              codechefRating: 1850,
              codechefSolved: 240,
              totalScore: 6420,
              rank: 3,
              avatar: "/team/vaishali.jpg",
              lastUpdated: "2023-06-13"
            }
          ];
          setParticipants(mockData);
          return;
        }
        
        // Fetch data from Supabase
        const { data, error } = await supabase
          .from('participants')
          .select('*')
          .order('totalScore', { ascending: false });
          
        if (error) {
          console.error('Error fetching participants:', error);
          throw error;
        }
        
        // Add rank to each participant based on their position
        const rankedData = data.map((participant, index) => ({
          ...participant,
          rank: index + 1
        }));
        
        setParticipants(rankedData);
      } catch (error) {
        console.error('Failed to fetch participants:', error);
        // Use mock data as fallback on error
        const mockData: Participant[] = [
          {
            id: "1",
            name: "Prateek Krishna",
            leetcode: "prateek_krishna",
            codeforces: "prateek_cf",
            codechef: "prateek_cc",
            leetcodeRating: 2100,
            leetcodeSolved: 450,
            codeforcesRating: 1850,
            codeforcesSolved: 320,
            codechefRating: 1950,
            codechefSolved: 280,
            totalScore: 6950,
            rank: 1,
            avatar: "/team/prateek.jpg",
            lastUpdated: "2023-06-15"
          },
          {
            id: "2",
            name: "Sukham Singh",
            leetcode: "sukham_singh",
            codeforces: "sukham_cf",
            codechef: "sukham_cc",
            leetcodeRating: 1950,
            leetcodeSolved: 420,
            codeforcesRating: 1800,
            codeforcesSolved: 300,
            codechefRating: 1900,
            codechefSolved: 260,
            totalScore: 6630,
            rank: 2,
            avatar: "/team/sukham.jpg",
            lastUpdated: "2023-06-14"
          },
          {
            id: "3",
            name: "Vaishali Jain",
            leetcode: "vaishali_jain",
            codeforces: "vaishali_cf",
            codechef: "vaishali_cc",
            leetcodeRating: 1900,
            leetcodeSolved: 400,
            codeforcesRating: 1750,
            codeforcesSolved: 280,
            codechefRating: 1850,
            codechefSolved: 240,
            totalScore: 6420,
            rank: 3,
            avatar: "/team/vaishali.jpg",
            lastUpdated: "2023-06-13"
          }
        ];
        setParticipants(mockData);
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchParticipants();
  }, []);

  // Function to handle sorting
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  // Function to filter participants based on search query
  const filteredParticipants = participants.filter(participant => 
    participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.leetcode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.codeforces.toLowerCase().includes(searchQuery.toLowerCase()) ||
    participant.codechef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to sort participants
  const sortedParticipants = [...filteredParticipants].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case "name":
        aValue = a.name;
        bValue = b.name;
        return sortOrder === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      case "leetcodeRating":
        aValue = a.leetcodeRating;
        bValue = b.leetcodeRating;
        break;
      case "leetcodeSolved":
        aValue = a.leetcodeSolved;
        bValue = b.leetcodeSolved;
        break;
      case "codeforcesRating":
        aValue = a.codeforcesRating;
        bValue = b.codeforcesRating;
        break;
      case "codeforcesSolved":
        aValue = a.codeforcesSolved;
        bValue = b.codeforcesSolved;
        break;
      case "codechefRating":
        aValue = a.codechefRating;
        bValue = b.codechefRating;
        break;
      case "codechefSolved":
        aValue = a.codechefSolved;
        bValue = b.codechefSolved;
        break;
      default:
        aValue = a.totalScore;
        bValue = b.totalScore;
    }
    
    return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
  });

  // Function to handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      // Check if Supabase is configured
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.warn('Supabase credentials not configured. Cannot refresh data.');
        // Just simulate a refresh with the current data
        setTimeout(() => {
          setRefreshing(false);
        }, 1000);
        return;
      }
      
      // Fetch fresh data from Supabase
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('totalScore', { ascending: false });
        
      if (error) {
        console.error('Error refreshing participants:', error);
        throw error;
      }
      
      // Add rank to each participant based on their position
      const rankedData = data.map((participant, index) => ({
        ...participant,
        rank: index + 1
      }));
      
      setParticipants(rankedData);
    } catch (error) {
      console.error('Failed to refresh participants:', error);
      // Don't change the current data on error
    } finally {
      setRefreshing(false);
    }
  };

  // Calculate stats
  const stats = [
    { 
      icon: User, 
      value: participants.length.toString(), 
      label: "Participants" 
    },
    { 
      icon: Code, 
      value: participants.reduce((sum, p) => sum + p.leetcodeSolved + p.codeforcesSolved + p.codechefSolved, 0).toString(), 
      label: "Problems Solved" 
    },
    { 
      icon: Trophy, 
      value: Math.max(...participants.map(p => p.totalScore)).toString(), 
      label: "Highest Score" 
    },
    { 
      icon: Sparkles, 
      value: Math.max(...participants.map(p => p.leetcodeRating)).toString(), 
      label: "Top LeetCode Rating" 
    }
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <BackgroundSparkles />
      <Header1 />
      
      {/* Hero Section */}
      <motion.div 
        style={{ y }}
        className="container mx-auto px-4 pt-24 pb-20"
      >
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6"
          >
            Coding <span className="text-blue-400">Leaderboard</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-lg"
          >
            Track your progress and compete with fellow coders across multiple platforms
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <LeaderboardStats stats={stats} />

        {/* Top Performers */}
        <TopPerformers participants={participants.slice(0, 3)} />

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 p-6 mt-16">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search participants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleRefresh}
                disabled={refreshing}
                className="border-white/10 text-white hover:bg-white/10"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            
            <div className="flex gap-2 w-full md:w-auto">
              <Button 
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white w-full md:w-auto"
              >
                Join Leaderboard
              </Button>
            </div>
          </div>

          {/* Leaderboard Table */}
          <LeaderboardTable 
            participants={sortedParticipants} 
            sortBy={sortBy}
            sortOrder={sortOrder}
            handleSort={handleSort}
            isLoading={isLoading}
          />
        </div>

        {/* Submission Form Modal */}
        {showForm && (
          <LeaderboardForm 
            onClose={() => setShowForm(false)}
            onSubmit={async (data) => {
              try {
                setIsLoading(true);
                
                // Check if Supabase is configured
                if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
                  console.warn('Supabase credentials not configured. Using mock data.');
                  // Create a mock participant
                  const mockParticipant: Participant = {
                    id: `mock-${Date.now()}`,
                    name: data.name,
                    leetcode: data.leetcode,
                    codeforces: data.codeforces,
                    codechef: data.codechef,
                    leetcodeRating: 0,
                    leetcodeSolved: 0,
                    codeforcesRating: 0,
                    codeforcesSolved: 0,
                    codechefRating: 0,
                    codechefSolved: 0,
                    totalScore: 0,
                    rank: participants.length + 1,
                    avatar: '/team/noimage.jpg',
                    lastUpdated: new Date().toISOString()
                  };
                  
                  // Add the mock participant to the state
                  setParticipants(prev => [...prev, mockParticipant]);
                  setShowForm(false);
                  return;
                }
                
                // Add participant to Supabase
                const { data: newParticipant, error } = await supabase
                  .from('participants')
                  .insert([{
                    name: data.name,
                    leetcode: data.leetcode,
                    codeforces: data.codeforces,
                    codechef: data.codechef,
                    leetcodeRating: 0,
                    leetcodeSolved: 0,
                    codeforcesRating: 0,
                    codeforcesSolved: 0,
                    codechefRating: 0,
                    codechefSolved: 0,
                    totalScore: 0,
                    rank: participants.length + 1,
                    avatar: '/team/noimage.jpg',
                    lastUpdated: new Date().toISOString()
                  }])
                  .select()
                  .single();
                  
                if (error) {
                  console.error('Error adding participant:', error);
                  throw error;
                }
                
                // Add the new participant to the state
                setParticipants(prev => [...prev, newParticipant]);
                
                // Close the form
                setShowForm(false);
                
                // Refresh the leaderboard to update rankings
                handleRefresh();
              } catch (error) {
                console.error('Failed to add participant:', error);
                alert('Failed to add participant. Please try again.');
              } finally {
                setIsLoading(false);
              }
            }}
          />
        )}
      </motion.div>

      <Footer />
    </div>
  );
}