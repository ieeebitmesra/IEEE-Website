"use client";
import Hero from "@/components/ui/landing/Hero";
import { Features } from "@/components/ui/landing/Features";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { motion, useScroll } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Gallery } from "@/components/ui/landing/Gallery";
import { useState } from "react";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function Home() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const achievements = [
    { number: "500+", label: "Active Members" },
    { number: "50+", label: "Events Organized" },
    { number: "20+", label: "Workshops" },
    { number: "₹2L+", label: "Prize Pool" },
  ];

  const upcomingHighlights = [
    {
      title: "Hackathon 2024",
      date: "March 15-16",
      description: "48-hour coding challenge",
    },
    {
      title: "Tech Talk Series",
      date: "Every Weekend",
      description: "Industry expert sessions",
    },
    {
      title: "Project Showcase",
      date: "April 1",
      description: "Student innovations",
    },
  ];

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong!');
      }

      setStatus('success');
      setMessage(data.message);
      setEmail('');
    } catch (error: any) {
      setStatus('error');
      setMessage(error.message);
    }

    // Reset status after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative overflow-hidden pt-20">
      <Header1 />
      <Hero />

      {/* Achievement Counters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-20 grid grid-cols-2 md:grid-cols-4 gap-8"
      >
        {achievements.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold text-white mb-2"
            >
              {achievement.number}
            </motion.div>
            <div className="text-white/60">{achievement.label}</div>
          </motion.div>
        ))}
      </motion.div>

      <Features />

      {/* Upcoming Highlights */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <h2 className="text-4xl font-bold text-white text-center mb-12">
          Upcoming <span className="text-blue-400">Highlights</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingHighlights.map((highlight, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <h3 className="text-xl font-bold text-white mb-2">{highlight.title}</h3>
              <div className="text-blue-400 mb-2">{highlight.date}</div>
              <p className="text-white/60">{highlight.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gallery Section */}
      <Gallery />
    
    {/* Newsletter Section */}
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="container mx-auto px-4 py-20"
    >
      <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-white/70 mb-8">Subscribe to our newsletter for the latest events and updates</p>
        <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input 
            type="email" 
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2 ${
              status === 'loading' ? 'opacity-70 cursor-wait' : ''
            }`}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </motion.button>
        </form>
        {message && (
          <p className={`mt-4 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
      </div>
    </motion.div>

      
      

      <Footer />
      <Meteors number={20} />
    </div>
  );
}
