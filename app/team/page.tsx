"use client";
import { Header1 } from "@/components/ui/header";
import { LinkedinIcon, InstagramIcon, GithubIcon, TwitterIcon, Code2, Users2, Trophy, Rocket } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Footer } from "@/components/ui/footer";
import { Meteors } from "@/components/ui/meteor";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin: string;
  github: string;
  instagram: string;
  department: string;
}

export default function TeamPage() {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  const departments = [
    "all",
    "Management",
    "Technical",
    "Design",
    "Content",
    "Events",
    "Executive",
    
  ];

  const teamMembers: TeamMember[] = [
    {
      name: "Prateek Krishna",
      role: "President",
      image: "/team/prateek.jpg",
      linkedin: "https://www.linkedin.com/in/prateekkrishna?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
     
    },
    {
      name: "Gajendra Agarwal",
      role: "Vice President",
      image: "/team/gajendra.jpg",
      linkedin: "https://www.linkedin.com/in/gajendra-agarwal-a51aa9228/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Vaishali Jain",
      role: "Vice President",
      image: "/team/vaishali.jpg",
      linkedin: "https://www.linkedin.com/in/vaishali-jain-571361229/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Divjot Singh",
      role: "Director",
      image: "/team/divjot.jpg",
      linkedin: "https://www.linkedin.com/in/divjot-singh-4185b8280/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
     
    },
    {
      name: "Shouryaman Singh",
      role: "General Secretary",
      image: "/team/shouryaman.jpg",
      linkedin: "https://www.linkedin.com/in/shouryaman?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Hritabhash Ray",
      role: "General Secretary",
      image: "/team/Hritabhash.jpg",
      linkedin: "https://www.linkedin.com/in/hritabhash-ray-53563922b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "keshav agarwal",
      role: "Joint Secretary",
      image: "/team/keshav.jpg",
      linkedin: "https://www.linkedin.com/in/keshavagarwal0927?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Akash Kumar Tiwary",
      role: "Joint Secretary",
      image: "/team/Akash Kumar Tiwary .jpg",
      linkedin: "https://www.linkedin.com/in/akashkt10172?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Sukham Singh",
      role: "Joint Secretary",
      image: "/team/sukham.jpg",
      linkedin: "https://www.linkedin.com/in/sukham-singh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Adarsh Narayan",
      role: "Co-Director",
      image: "/team/adarsh.jpg",
      linkedin: "https://www.linkedin.com/in/adarsh-narayan-711a24263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Ataullah Ansari",
      role: "Co-Director",
      image: "/team/ataullah.jpg",
      linkedin: "https://www.linkedin.com/in/attaullah-ansari-1304aa264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "MD. Gufran",
      role: "Treasurer",
      image: "/team/gufran.jpg",
      linkedin: "https://www.linkedin.com/in/mdgufrann?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
      
    },
    {
      name: "Rishabh Raj",
      role: "Joint Treasurer",
      image: "/team/rishabh.jpg",
      linkedin: "https://www.linkedin.com/in/rishabh-raj-60060b25a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
      
    },
    {
      name: "Nikhil Kumar Singh",
      role: "Web Master ",
      image: "/team/nikhil.jpg",
      linkedin: "https://www.linkedin.com/in/nikhil-singh-64a414160?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Garvit Raj",
      role: "Tech Head",
      image: "/team/garvit.jpg",
      linkedin: "https://www.linkedin.com/in/garvitrajbitmesra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Abhiraj Sinha",
      role: "Tech Head",
      image: "/team/abhiraj.jpg",
      linkedin: "https://www.linkedin.com/in/abhiraj-sinha-240269249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Soumojjal Sen",
      role: "Tech Head",
      image: "/team/soumojjal.jpg",
      linkedin: "https://www.linkedin.com/in/soumojjal-sen-7b8490256?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "shailesh kumar",
      role: "Design heads",
      image: "/team/shailesh.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Design",
      
    },
    {
      name: "Sakshi Sinha",
      role: "Design heads",
      image: "/team/sakshi.jpg",
      linkedin: "https://www.linkedin.com/in/sakshi-sinha-09a377270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Design",
     
    },
    {
      name: "Nayan Shenoy",
      role: "Content heads",
      image: "/team/nayan.jpg",
      linkedin: "https://www.linkedin.com/in/nayan-shenoy-14704a24b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Content",
      
    },
    {
      name: "Harshita Kedia",
      role: "Content heads",
      image: "/team/harshita.jpg",
      linkedin: "https://www.linkedin.com/in/harshitakedia?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Content",
      
    },
    {
      name: "Akshay Gupta",
      role: "Event Heads",
      image: "/team/akshay.jpg",
      linkedin: "https://www.linkedin.com/in/akshayguptanarsina?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Events",
      
    },
    {
      name: "Akshat Tambi",
      role: "Event Heads",
      image: "/team/akshat.jpg",
      linkedin: "https://www.linkedin.com/in/1akshat-tambi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Events",
      
    },
    {
      name: "Arman Sethi",
      role: "Event Heads",
      image: "/team/arman.jpg",
      linkedin: "https://www.linkedin.com/in/armansethi-tech?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Events",
      
    },
    
    {
      name: "Saquib Jawed",
      role: "Developer",
      image: "/team/saquib.jpg",
      linkedin: "https://www.linkedin.com/in/mdsaquibjawed/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },

    {
      name: "Subhayu Das",
      role: "Developer",
      image: "/team/subhayu.jpg",
      linkedin: "https://www.linkedin.com/in/subhayu-das/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Ankit Singh Sisodia",
      role: "Developer",
      image: "/team/ankit.jpg",
      linkedin: "https://www.linkedin.com/in/ankit-sisodya/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Akshat Gupta",
      role: "Developer",
      image: "/team/",
      linkedin: "https://www.linkedin.com/in/akshat-gupta-9b39992a7/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },

    {
      name: "Aayush Raturi",
      role: "Senior Executive Members ",
      image: "/team/aayush.jpg",
      linkedin: "https://www.linkedin.com/in/aayush-raturi-1816a6135/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
     
    },
    {
      name: "Amrit Yashasvi Lal",
      role: "Senior Executive Members ",
      image: "/team/amrit.jpg",
      linkedin: "https://www.linkedin.com/in/amrit-yashasvi-lal-604672232/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
      
    },
    {
      name: "Anish Kumar Singh",
      role: "Senior Executive Members ",
      image: "/team/anish.jpg",
      linkedin: "https://www.linkedin.com/in/anish-kumar-singh-155334222/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
      
    },
    {
      name: "Ayush Kumar",
      role: "Senior Executive Members ",
      image: "/team/ayush.jpg",
      linkedin: "https://www.linkedin.com/in/ayushkumar3070/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
     
    },
    {
      name: "Priyanshu Singhal",
      role: "Senior Executive Members ",
      image: "/team/priyanshu.jpg",
      linkedin: "https://www.linkedin.com/in/priyanshu-singhal1/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
      
    },
    {
      name: "Rajat Singh",
      role: "Senior Executive Members ",
      image: "/team/rajat.jpg",
      linkedin: "https://linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
     
    },
    {
      name: "Raj Aryan",
      role: "Senior Executive Members ",
      image: "/team/raj.jpg",
      linkedin: "https://www.linkedin.com/in/thatrajaryan/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
      
    },
    {
      name: "Shivang Airan",
      role: "Senior Executive Members ",
      image: "/team/shivang.jpg",
      linkedin: "https://www.linkedin.com/in/shivang007/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
     
    },
    {
      name: "Suman Shekhar Bhardwaj",
      role: "Senior Executive Members ",
      image: "/team/suman.jpg",
      linkedin: "https://www.linkedin.com/in/suman-shekhar-bhardwaj-240513237/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
      
    },
    {
      name: "Sumit Agarwal",
      role: "Senior Executive Members ",
      image: "/team/sumit.jpg",
      linkedin: "https://www.linkedin.com/in/sumit-agarwal2002/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
     
    }
  ];

  const stats = [
    { icon: Code2, number: "50+", label: "Active Projects" },
    { icon: Users2, number: "100+", label: "Team Members" },
    { icon: Trophy, number: "30+", label: "Awards Won" },
    { icon: Rocket, number: "150+", label: "Events Organized" },
  ];

  const filteredMembers = teamMembers.filter(member => 
    selectedDepartment === "all" || member.department === selectedDepartment
  );

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
          <motion.h1 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-6xl font-bold text-white mb-6 text-center"
          >
            Meet Our <span className="text-blue-400">Team</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white/70 text-center max-w-2xl mx-auto mb-12"
          >
            The passionate individuals driving innovation and excellence at IEEE BIT Mesra
          </motion.p>
        </div>

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
                <Icon className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-white/60 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Department Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {departments.map((dept, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDepartment(dept)}
              className={`px-6 py-2 rounded-full text-sm transition-colors ${
                selectedDepartment === dept
                  ? "bg-blue-500 text-white"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {dept === "all" ? "All Teams" : dept}
            </motion.button>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-20">
          {filteredMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 group"
            >
              <div className="relative h-48">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 text-sm">{member.role}</p>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex gap-3 pt-2 justify-center">
                  <motion.a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-white/60 hover:text-white transition"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-sm rounded-lg p-12 border border-white/10 mb-20"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Want to Join Our Team?</h2>
          <p className="text-white/70 mb-8">
            We're always looking for passionate individuals to join our community
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            Apply Now
          </motion.button>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
} 