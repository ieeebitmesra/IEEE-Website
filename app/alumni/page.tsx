"use client";
import { Header1 } from "@/components/ui/header";
import { LinkedinIcon, MailIcon, Building2, MapPin, Quote, ArrowRight, Search, Filter, Clock } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { useState } from "react";
import Link from "next/link";

interface AlumniProfile {
  name: string;
  role: string;
  company: string;
  location: string;
  batch: string;
  description: string;
  achievements: string[];
  image: string;
  linkedin: string;
  email: string;
}

export default function AlumniPage() {
  const [selectedBatch, setSelectedBatch] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Empty alumni array - no data to display for now
  const alumni: AlumniProfile[] = [];

  const stats = [
    { number: "500+", label: "Alumni Network" },
    { number: "40+", label: "Countries" },
    { number: "200+", label: "Companies" },
    { number: "50+", label: "Entrepreneurs" },
  ];

  const batches = ["all", "2021", "2020", "2019", "2018"];

  const filteredAlumni = alumni.filter(profile => {
    const batchMatch = selectedBatch === "all" || profile.batch === selectedBatch;
    const searchMatch = profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       profile.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       profile.role.toLowerCase().includes(searchQuery.toLowerCase());
    return batchMatch && searchMatch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <Header1 />
      <Meteors number={20} />

      <main className="flex-grow">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="container mx-auto px-4 pt-24 pb-20"
        >
          <div className="relative">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl font-bold text-white mb-6 text-center"
            >
              Our <span className="text-blue-400">Alumni</span> Network
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-white/70 text-center max-w-2xl mx-auto mb-12"
            >
              Connect with our distinguished alumni making waves across the globe
            </motion.p>
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
          </div>

          {/* Stats Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 text-center border border-white/10"
              >
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Coming Soon Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 mb-20"
          >
            <Clock className="w-12 h-12 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Alumni Directory Coming Soon</h2>
            <p className="text-white/70 mb-8">We're currently building our alumni database. Check back soon to connect with our network of distinguished graduates.</p>
            <Link href="/#gallery" scroll={true}>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
              >
                Get Notified When Live
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Connect CTA */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 mb-20"
          >
            <Quote className="w-8 h-8 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Are You an Alumni?</h2>
            <p className="text-white/70 mb-8">Join our exclusive alumni network and stay connected with your alma mater</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition flex items-center gap-2 mx-auto"
            >
              Connect With Us
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}