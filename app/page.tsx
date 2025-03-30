"use client";
import Hero from "@/components/ui/landing/Hero";
import { Features } from "@/components/ui/landing/Features";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { motion, useScroll } from "framer-motion";
import { ArrowRight, Calendar, Users, Award, BookOpen, ExternalLink, Code, Cpu, Zap } from "lucide-react";
import { useRef, useState } from "react";
import { Gallery } from "@/components/ui/landing/Gallery";
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { Suspense } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ElegantShape } from "@/components/ui/shape-landing-hero";
import { LeaderboardCTA } from "@/components/ui/landing/LeaderboardCTA";

// Create a client component that uses useSearchParams
function AccountDeletedCheck() {
  const searchParams = useSearchParams();
  
  useEffect(() => {
    // Check for account deleted parameter
    if (searchParams.get('accountDeleted') === 'true') {
      toast.success('Your account has been successfully deleted');
    }
  }, [searchParams]);
  
  return null; // This component doesn't render anything
}


// Timeline component
const TimelineEvent = ({ date, title, description, isLeft = true }: { date: string; title: string; description: string; isLeft?: boolean }) => (
  <motion.div 
    initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
    whileInView={{ opacity: 1, x: 0 }}
    className={`flex w-full ${isLeft ? 'justify-start' : 'justify-end'}`}
  >
    <div className={`w-5/6 md:w-2/5 ${isLeft ? 'text-right pr-8' : 'text-left pl-8'} relative`}>
      <div className={`absolute top-0 ${isLeft ? '-right-4' : '-left-4'} w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center z-10`}>
        <Calendar className="w-4 h-4 text-white" />
      </div>
      <div className={`absolute top-0 ${isLeft ? 'right-0' : 'left-0'} h-full w-px bg-gradient-to-b from-blue-500 to-purple-500`}></div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-blue-400 mb-1">{date}</p>
      <p className="text-white/70">{description}</p>
    </div>
  </motion.div>
);

// What We Do Card
const WhatWeDoCard = ({ icon: Icon, title, description }: { icon: any; title: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 flex flex-col items-center text-center"
  >
    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
      <motion.div
        animate={{ 
          rotate: [0, 10, 0, -10, 0],
          scale: [1, 1.1, 1, 1.1, 1]
        }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Icon className="w-8 h-8 text-blue-400" />
      </motion.div>
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-white/70">{description}</p>
  </motion.div>
);

// Animated Partner Logo (SVG)
const PartnerLogo = ({ name, color }: { name: string; color: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    whileHover={{ y: -5 }}
    className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-lg p-4 flex flex-col items-center justify-center"
  >
    <motion.div
      animate={{ 
        y: [0, -5, 0, 5, 0],
        opacity: [0.7, 1, 0.7]
      }}
      transition={{ duration: 3, repeat: Infinity }}
      className={`text-${color}-400 mb-2`}
    >
      {name === "Microsoft" && <Cpu className="w-10 h-10" />}
      {name === "Google" && <Code className="w-10 h-10" />}
      {name === "Amazon" && <Zap className="w-10 h-10" />}
      {name === "IBM" && <Award className="w-10 h-10" />}
      {name === "Intel" && <Cpu className="w-10 h-10" />}
    </motion.div>
    <p className="text-white/80 text-sm font-medium">{name}</p>
  </motion.div>
);

// Highlight Card with animated background
const HighlightCard = ({ title, date, description }: { title: string; date: string; description: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    className="relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 p-6 group"
  >
    <motion.div 
      className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      animate={{ 
        background: [
          "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))",
          "linear-gradient(to right, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))",
          "linear-gradient(to right, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))"
        ]
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <div className="relative z-10">
      <div className="text-blue-400 font-medium mb-2">{date}</div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-white/60 mb-4">{description}</p>
      <Link href="/events" className="text-blue-400 flex items-center text-sm font-medium hover:text-blue-300 transition-colors">
        Learn more <ArrowRight className="ml-1 h-4 w-4" />
      </Link>
    </div>
  </motion.div>
);

// Hackathon Winner Card
const HackathonWinnerCard = ({ 
  rank, 
  teamName, 
  projectName, 
  description, 
  members, 
  image, 
  techStack,
  demoLink
}: { 
  rank: number; 
  teamName: string; 
  projectName: string; 
  description: string; 
  members: string[]; 
  image: string;
  techStack: string[];
  demoLink?: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    whileHover={{ y: -10, transition: { duration: 0.2 } }}
    className="relative bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 group"
  >
    <div className="absolute top-0 right-0 bg-gradient-to-l from-blue-500 to-purple-500 text-white px-4 py-1 rounded-bl-lg font-bold z-10">
      {rank === 1 ? "🏆 1st Place" : rank === 2 ? "🥈 2nd Place" : "🥉 3rd Place"}
    </div>
    
    <div className="relative h-48 overflow-hidden">
      <Image 
        src={image} 
        alt={projectName}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
    </div>
    
    <div className="p-6 relative">
      <h3 className="text-xl font-bold text-white mb-1">{projectName}</h3>
      <p className="text-blue-400 text-sm mb-2">Team {teamName}</p>
      <p className="text-white/70 mb-4 line-clamp-2">{description}</p>
      
      <div className="mb-4">
        <p className="text-white/80 text-sm mb-2">Tech Stack:</p>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, i) => (
            <span key={i} className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
              {tech}
            </span>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <p className="text-white/80 text-sm mb-2">Team Members:</p>
        <div className="flex flex-wrap gap-1">
          {members.map((member, i) => (
            <span key={i} className="text-xs text-white/70">
              {member}{i < members.length - 1 ? ", " : ""}
            </span>
          ))}
        </div>
      </div>
      
      {demoLink && (
        <Link href={demoLink} className="text-blue-400 flex items-center text-sm font-medium hover:text-blue-300 transition-colors" target="_blank">
          View Project <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      )}
    </div>
  </motion.div>
);

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

  const timelineEvents = [
    {
      date: "September 7, 2024",
      title: "Git/Linux Workshop",
      description: "Hands-on training in Git version control and Linux fundamentals"
    },
    {
      date: "September 15, 2024",
      title: "Cicada CTF",
      description: "Cybersecurity competition testing skills in cryptography, forensics, and OSINT"
    },
    {
      date: "October 26, 2024",
      title: "LEAD Program",
      description: "Leadership and career development program with industry insights"
    },
    {
      date: "December 7, 2024",
      title: "MegaProject",
      description: "Showcase of innovative student projects and research"
    }
  ];

  const whatWeDo = [
    {
      icon: Award,
      title: "Technical Competitions",
      description: "Participate in coding contests, hackathons, and technical quizzes to showcase your skills."
    },
    {
      icon: Users,
      title: "Speaker Sessions",
      description: "Connect with industry professionals through expert talks on emerging technologies."
    },
    {
      icon: BookOpen,
      title: "Workshops & Training",
      description: "Learn cutting-edge technologies through hands-on workshops and training sessions."
    }
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
      <Suspense fallback={null}>
        <AccountDeletedCheck />
      </Suspense>
      <Hero />

      {/* LeaderboardCTA Section - Moved below Hero */}
      <div className="container mx-auto px-4 py-12">
        <LeaderboardCTA />
      </div>

      {/* Achievement Counters with improved design */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
                  className="text-5xl font-bold text-white mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
                >
                  {achievement.number}
                </motion.div>
                <div className="text-white/80 font-medium">{achievement.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* What We Do Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">What We Do</span>
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          IEEE BIT Mesra is dedicated to fostering technical excellence and innovation among students
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {whatWeDo.map((item, index) => (
            <WhatWeDoCard 
              key={index} 
              icon={item.icon} 
              title={item.title} 
              description={item.description} 
            />
          ))}
        </div>
      </motion.div>

      <Features />

      {/* Upcoming Highlights with animated backgrounds instead of images */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Upcoming Highlights</span>
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-12">
          Don't miss out on our exciting upcoming events and activities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {upcomingHighlights.map((highlight, index) => (
            <HighlightCard 
              key={index}
              title={highlight.title}
              date={highlight.date}
              description={highlight.description}
            />
          ))}
        </div>
        <div className="text-center mt-10">
          <Button asChild className="bg-blue-500 hover:bg-blue-600">
            <Link href="/events" className="flex items-center gap-2">
              View All Events <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Event Timeline</span>
        </h2>
        <p className="text-white/70 text-center max-w-2xl mx-auto mb-16">
          Mark your calendar for these upcoming IEEE BIT Mesra events
        </p>
        
        <div className="relative space-y-12">
          {timelineEvents.map((event, index) => (
            <TimelineEvent 
              key={index}
              date={event.date}
              title={event.title}
              description={event.description}
              isLeft={index % 2 === 0}
            />
          ))}
        </div>
      </motion.div>

      {/* Gallery Section with improved design */}
      <Gallery />
      
      {/* Newsletter Section with improved design */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-xl rounded-2xl"></div>
          <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl p-12 border border-white/10">
            <ElegantShape 
              className="absolute -top-10 -right-10 opacity-50 z-0" 
              width={200} 
              height={200} 
              rotate={15} 
              gradient="from-blue-500/10"
            />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">Stay Updated</h2>
              <p className="text-white/70 mb-8">Subscribe to our newsletter for the latest events and updates</p>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition flex items-center justify-center gap-2 ${
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
          </div>
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="container mx-auto px-4 py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Join IEEE BIT Mesra?</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            Become a part of our vibrant community and unlock a world of opportunities in technology and innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
              <Link href="/signup">
                Join Now
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 hover:bg-white/10">
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </motion.div>

      <Footer />
      <Meteors number={20} />
    </div>
  );
}

// Remove the hackathonWinners array that was here
