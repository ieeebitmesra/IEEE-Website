"use client";
import { Header1 } from "@/components/ui/header";
import { Meteors } from "@/components/ui/meteor";
import { BackgroundSparkles } from "@/components/ui/animations/BackgroundSparkles";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Download, Calendar, Users, Clock, Trophy, BookOpen, Target } from "lucide-react";
import { useRef } from "react";
import { Footer } from "@/components/ui/footer";

interface Workshop {
  number: string;
  title: string;
  duration: string;
  date?: string;
  coursePlanning: {
    day: string;
    content: string;
  }[];
}

export default function WorkshopPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const workshops: Workshop[] = [
    {
      number: "1",
      title: "DSA SERIES",
      duration: "4 months",
      date: "Aug-Dec 2024",
      coursePlanning: [
        {
          day: "Module 1",
          content: "Introduction to Data Structures & Algorithms, Time & Space Complexity Analysis, Arrays and Strings"
        },
        {
          day: "Module 2",
          content: "Searching and Sorting Algorithms, Recursion and Backtracking, Problem-solving strategies"
        },
        {
          day: "Module 3",
          content: "Linked Lists, Stacks, Queues, Trees, and Graph algorithms"
        },
        {
          day: "Module 4",
          content: "Dynamic Programming, Greedy Algorithms, Advanced problem-solving techniques"
        }
      ]
    },
    {
      number: "2",
      title: "GIT/LINUX WORKSHOP",
      duration: "1 day",
      date: "September 7, 2024",
      coursePlanning: [
        {
          day: "Morning Session",
          content: "Introduction to Git, Basic commands, Branching and merging, Collaborative workflows with GitHub"
        },
        {
          day: "Afternoon Session",
          content: "Linux fundamentals, Command line basics, File system navigation, Package management, Shell scripting introduction"
        }
      ]
    },
    {
      number: "3",
      title: "C++ WORKSHOP",
      duration: "2 days",
      date: "January 29, 2025",
      coursePlanning: [
        {
          day: "Day 1",
          content: "C++ fundamentals, Object-Oriented Programming concepts, STL introduction, Memory management"
        },
        {
          day: "Day 2",
          content: "Advanced STL usage, Competitive programming techniques, Optimization strategies, Problem-solving sessions"
        }
      ]
    }
  ];

  const stats = [
    { icon: Users, value: "500+", label: "Students Trained" },
    { icon: Clock, value: "100+", label: "Hours of Content" },
    { icon: Trophy, value: "20+", label: "Projects Built" },
    { icon: BookOpen, value: "4+", label: "Domains Covered" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
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
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl font-bold text-white mb-6"
          >
            Technical <span className="text-blue-400">Workshops</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-lg max-w-2xl mx-auto"
          >
            Enhance your skills with our hands-on workshops designed to provide practical knowledge in various technical domains.
          </motion.p>
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10"
              >
                <Icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Workshops */}
        <div className="space-y-16 mb-20">
          {workshops.map((workshop, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
            >
              <div className="p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                  <div className="flex items-center gap-4 mb-4 md:mb-0">
                    <div className="bg-blue-500/20 w-12 h-12 rounded-lg flex items-center justify-center text-blue-400 font-bold text-xl">
                      {workshop.number}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{workshop.title}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <div className="flex items-center gap-1 text-white/60 text-sm">
                          <Clock className="w-4 h-4" />
                          <span>{workshop.duration}</span>
                        </div>
                        {workshop.date && (
                          <div className="flex items-center gap-1 text-white/60 text-sm">
                            <Calendar className="w-4 h-4" />
                            <span>{workshop.date}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-all duration-300 flex items-center gap-2"
                  >
                    Register <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <div className="bg-white/5 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-white mb-4">Course Planning</h4>
                  <div className="space-y-6">
                    {workshop.coursePlanning.map((plan, planIndex) => (
                      <div key={planIndex} className="relative pl-6 border-l border-blue-500/30">
                        <div className="absolute left-[-5px] top-0 w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                        <h5 className="text-blue-400 font-medium mb-2">{plan.day}</h5>
                        <p className="text-white/70">{plan.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-8 mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Why Join Our Workshops?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Target className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Practical Skills</h3>
              <p className="text-white/70">Our workshops focus on hands-on learning with real-world applications, ensuring you gain practical skills that are immediately applicable.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Users className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Expert Mentorship</h3>
              <p className="text-white/70">Learn from experienced professionals and senior students who provide guidance and share industry insights.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <BookOpen className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive Resources</h3>
              <p className="text-white/70">Access to workshop materials, code repositories, and additional learning resources to continue your learning journey.</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
              <Trophy className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Certificates</h3>
              <p className="text-white/70">Earn certificates upon completion that validate your skills and enhance your resume for future opportunities.</p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Enhance Your Skills?</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8">
            Join our upcoming workshops and be part of a community that values knowledge sharing and technical excellence.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg shadow-lg transition-all duration-300"
          >
            View All Workshops
          </motion.button>
        </motion.div>
      </motion.div>

      <Footer />
    </div>
  );
}