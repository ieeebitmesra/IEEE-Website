"use client";
import { Header1 } from "@/components/ui/header";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Users, Heart, Target, Trophy } from "lucide-react";

export default function AboutUsPage() {
  const milestones = [
    { year: "1963", title: "IEEE Founded", description: "Formed from the merger of AIEE and IRE" },
    { year: "2000s", title: "BIT Mesra Chapter", description: "Establishment of IEEE Student Branch at BIT Mesra" },
    { year: "2020", title: "Virtual Transition", description: "Successfully adapted to online events during pandemic" },
    { year: "2023", title: "Expanded Initiatives", description: "Launched new flagship events and workshops" },
    { year: "2024", title: "Growing Community", description: "Expanding membership and technical activities" },
  ];

  const values = [
    { icon: Code, title: "Innovation", description: "Pushing boundaries in technology" },
    { icon: Users, title: "Community", description: "Building strong tech networks" },
    { icon: Heart, title: "Knowledge Sharing", description: "Disseminating what we know and learning what we don't" },
    { icon: Target, title: "Excellence", description: "Striving for quality in everything" },
  ];

  const achievements = [
    "Successful Cicada CTF competitions",
    "LEAD Leadership Development Program",
    "MegaProject Innovation Showcase",
    "Coding Weekender Hackathons",
    "Industry Expert Speaker Sessions",
    "Technical Workshops Series",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative">
      <Header1 />
      <Meteors number={20} />

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="container mx-auto px-4 pt-24"
      >
        <div className="relative">
          {/* IEEE Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <Image
              src="/logo.png"
              alt="IEEE BIT Mesra Logo"
              width={120}
              height={120}
              className="rounded-lg"
            />
          </motion.div>
          
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6 text-center"
          >
            About <span className="text-blue-400">IEEE BIT Mesra</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-center max-w-2xl mx-auto mb-12"
          >
            Advancing Technology for Humanity
          </motion.p>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center mt-16">
          {/* Team photo section removed */}

          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            <h2 className="text-4xl text-blue-400 font-bold">Who are we?</h2>
            <h3 className="text-2xl text-white font-semibold">
              Empowering the next generation of tech innovators
            </h3>
            <p className="text-gray-400 leading-relaxed">
              IEEE is a global non-profit professional association dedicated to advancing technological innovation. Headquartered in New York City, IEEE was founded on January 1, 1963, as a result of the merger between the American Institute of Electrical Engineers (AIEE)—which had renowned scientists like Thomas Edison and Nikola Tesla among its members—and the Institute of Radio Engineers (IRE).
            </p>
            <p className="text-gray-400 leading-relaxed">
              The IEEE Student Branch BIT Mesra is a vibrant student chapter dedicated to promoting technical excellence, research, and innovation. We provide a platform for students to collaborate, learn, and contribute to the ever-evolving world of technology. Through our workshops, hackathons, and technical events, we strive to bridge the gap between academia and industry, ensuring that our members stay ahead in the rapidly changing tech landscape.
            </p>
            <motion.div
              whileHover={{ x: 5 }}
              className="inline-block"
            >
              <Link 
                href="/team"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              >
                Meet our team <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Our Vision & Mission */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Vision & Mission</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="text-blue-400 text-2xl mb-4">🚀</div>
              <p className="text-white/80">Empowering students with cutting-edge knowledge in technology and innovation.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="text-blue-400 text-2xl mb-4">📡</div>
              <p className="text-white/80">Creating a network of like-minded individuals to collaborate on impactful projects.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="text-blue-400 text-2xl mb-4">🎯</div>
              <p className="text-white/80">Bridging the gap between academia and industry through real-world applications.</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
            >
              <div className="text-blue-400 text-2xl mb-4">🌍</div>
              <p className="text-white/80">Contributing to global progress through research, workshops, and knowledge sharing.</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Values</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                >
                  <Icon className="w-8 h-8 text-blue-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">{value.title}</h3>
                  <p className="text-white/60">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        
        {/* Timeline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32 mb-20"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Journey</span></h2>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-blue-400 border-4 border-blue-900 z-10`}></div>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-blue-400 mb-1">{milestone.year}</h3>
                    <h4 className="text-lg font-semibold text-white mb-2">{milestone.title}</h4>
                    <p className="text-white/60">{milestone.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-32"
        >
          <h2 className="text-4xl font-bold text-white text-center mb-16">Our <span className="text-blue-400">Achievements</span></h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 flex items-center gap-4"
              >
                <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                <p className="text-white/80">{achievement}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </motion.div>
      <Footer />
    </div>
  );
}