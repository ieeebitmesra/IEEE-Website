"use client";
import { Header1 } from "@/components/ui/header";
import { Meteors } from "@/components/ui/meteor";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Footer } from "@/components/ui/footer";
import { 
  LogOut, 
  User as UserIcon, 
  Settings,
  Mail,
  Github,
  Code,
  Trophy,
  Calendar,
  BookOpen
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { prisma } from "@/lib";
import { DeleteAccount } from "@/components/ui/delete-account";

export default function ProfilePage() {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("profile");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: "",
    emailNotifications: true
  });
  const [userStats, setUserStats] = useState({
    competitions: 0,
    projects: 0,
    eventsAttended: 0,
    workshops: 0
  });

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/signin");
    } else if (user) {
      // Set initial profile data from user metadata
      setProfileData({
        displayName: user.user_metadata?.full_name || "",
        emailNotifications: user.user_metadata?.emailNotifications !== false
      });

      // Fetch user stats from database
      fetchUserStats();
    }
  }, [user, isLoading, router]);

  const fetchUserStats = async () => {
    try {
      // In a real implementation, you would fetch this data from your API
      // For now, we'll simulate with random data
      setUserStats({
        competitions: Math.floor(Math.random() * 15),
        projects: Math.floor(Math.random() * 10),
        eventsAttended: Math.floor(Math.random() * 30),
        workshops: Math.floor(Math.random() * 8)
      });
    } catch (error) {
      console.error("Error fetching user stats:", error);
    }
  };

  const handleProfileUpdate = async () => {
    if (!user) return;
    
    setIsUpdating(true);
    try {
      // Update user metadata in Supabase
      const { data, error } = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          metadata: {
            emailNotifications: profileData.emailNotifications
          }
        }),
      }).then(res => res.json());

      if (error) throw error;
      
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const toggleEmailNotifications = () => {
    setProfileData(prev => ({
      ...prev,
      emailNotifications: !prev.emailNotifications
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative">
      <Header1 />
      <Meteors number={20} />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-xl">
            {/* Profile Header - Keep this section */}
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Avatar className="h-32 w-32 border-2 border-white/20">
                  <AvatarImage src={user.user_metadata?.avatar_url || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white text-2xl flex items-center justify-center">
                    {user.user_metadata?.full_name?.[0] || user.email?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
              </motion.div>
              
              <div className="flex-1 text-center md:text-left">
                <motion.h1 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-3xl font-bold text-white"
                >
                  {user.user_metadata?.full_name || "IEEE Member"}
                </motion.h1>
                
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="flex items-center gap-2 mt-2 text-white/60 justify-center md:justify-start"
                >
                  <Mail className="h-4 w-4" />
                  <span>{user.email}</span>
                </motion.div>
                
                {user.app_metadata?.provider === 'github' && (
                  <motion.div 
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.15 }}
                    className="flex items-center gap-2 mt-1 text-white/60 justify-center md:justify-start"
                  >
                    <Github className="h-4 w-4" />
                    <span>@{user.user_metadata?.user_name || 'github-user'}</span>
                  </motion.div>
                )}
                
                <motion.div 
                  initial={{ y: -10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start"
                >
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    IEEE Member
                  </span>
                  
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button 
                  onClick={logout}
                  className="flex items-center gap-2 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white border-none"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </motion.div>
            </div>
            
            {/* Navigation Tabs - Keep only the profile tab */}
            <div className="mb-8 border-b border-white/10 pb-2">
              <div className="flex overflow-x-auto gap-2">
                <Button
                  onClick={() => setActiveTab("profile")}
                  variant="ghost"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-white"
                >
                  <UserIcon className="h-4 w-4" />
                  Profile
                </Button>
              </div>
            </div>
            
            {/* Tab Content - Only keep the profile content */}
            <div className="min-h-[300px]">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {/* Stats Cards - Keep this section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* ... existing stats cards ... */}
                </div>
                
                {/* About Me - Keep this section */}
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">About Me</h3>
                  <p className="text-white/70">
                    IEEE member passionate about technology and innovation. Joined the community to collaborate, learn, and contribute to advancing technology for humanity.
                  </p>
                </div>
                
                {/* Membership Details - Keep this section */}
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Membership Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/60">Membership Type</span>
                      <span className="text-white">Student Member</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Join Date</span>
                      <span className="text-white">{new Date(user.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Status</span>
                      <span className="text-green-400">Active</span>
                    </div>
                  </div>
                </div>
                
                {/* Quick Links - Keep this section */}
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Link href="/events">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none">
                        Upcoming Events
                      </Button>
                    </Link>
                    <Link href="/workshop">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none">
                        Workshops
                      </Button>
                    </Link>
                    <Link href="/leaderboard">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none">
                        Leaderboard
                      </Button>
                    </Link>
                    <Link href="/team">
                      <Button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white border-none">
                        Team
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Add the Delete Account section */}
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                  <h3 className="text-xl font-semibold text-white mb-4">Account Management</h3>
                  <p className="text-white/70 mb-6">
                    Kyun karna he delete, mat karo yaar
                  </p>
                  <DeleteAccount />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
      
      <Footer />
    </div>
  );
}