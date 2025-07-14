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
      name: "Shouryaman Singh ",         //done
      role: "President",
      image: "/team/shouryaman.jpg",
      linkedin: "https://www.linkedin.com/in/shouryaman?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Retr0991",
      instagram: "https://www.instagram.com/shouryamansingh/",
      department: "Management",
      
     
    },
    {
      name: "Akash Kumar Tiwary",          //done
      role: "Vice President",
      image: "/team/Akash Kumar Tiwary .jpg",
      linkedin: "https://www.linkedin.com/in/akashkt10172?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/AkashKT10172",
      instagram: "https://www.instagram.com/akashdidwhat/",
      department: "Management",
      
    },
    {
      name: "Hritabhash Ray",         //done
      role: "Vice President",
      image: "/team/Hritabhash.jpg",
      linkedin: "https://www.linkedin.com/in/hritabhash-ray-53563922b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Hritabhash1",
      instagram: "https://www.instagram.com/hritabhashray/",
      department: "Management",
      
    },
    { 
      name: "MD Gufran",         //done
      role: "Director",
      image: "/team/gufran.jpg",
      linkedin: "https://www.linkedin.com/in/mdgufrann?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
     
    },
    {
      name: "MD Faique Ibrahimi",      //done
      role: "General Secretary",
      image: "/team/faique.jpeg",
      linkedin: "https://www.linkedin.com/in/md-faique-ibrahimi-623541300/",
      github: "https://github.com/FaiqueIbrahimi",
      instagram: "https://www.instagram.com/its_me_faique/",
      department: "Management",
      
    },
    {
      name: "Achintya Kumar",
      role: "General Secretary",
      image: "/team/Achintya.jpg",
      linkedin: "https://www.linkedin.com/in/achintya-kumar/",
      github: "https://github.com/Achintya512",
      instagram: "https://www.instagram.com/achintya.kr",
      department: "Management",
      
    },
    {
      name: "Nischal Singh",           //done
      role: "Joint Secretary",
      image: "/team/Nischal Singh.jpg",
      linkedin: "https://www.linkedin.com/in/nischal-singh-b22b3a299/",
      github: "https://github.com/Nischal07bot",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Akshat Gupta",         //done
      role: "Joint Secretary",
      image: "/team/akshatk23.jpg",
      linkedin: "https://www.linkedin.com/in/akshat-gupta-9b39992a7/",
      github: "https://github.com/axhatggg",
      instagram: "https://www.instagram.com/axhat.g/",
      department: "Management",
      
    },
    
    {
      name: "Ankit Singh Sisodia",
      role: "Joint Secretary",

      image: "/team/ankit.jpg",
      linkedin: "https://www.linkedin.com/in/ankit-sisodya/",
      github: "https://github.com/Ankitsinghsisodya",
      instagram: "https://www.instagram.com/ankitsinghsisodya/",
      department: "Management",
      
    },
    {
      name: "Saquib Jawed",              //done
      role: "Co-Director",
      image: "/team/saquib.jpg",
      linkedin: "https://www.linkedin.com/in/mdsaquibjawed/",
      github: "https://github.com/saquibjawedbit",
      instagram: "https://www.instagram.com/saquibsj123/",
      department: "Management",
      
    },
    {                  
      name: "Kunal Kashyap",              //done
      role: "Co-Director",
      image: "/team/kunal.jpeg",
      linkedin: "https://www.linkedin.com/me?trk=p_mwlite_feed-secondary_nav",
      github: "https://github.com/Kunal1522",
      instagram: "https://www.instagram.com/kunal_kashyap_1522?igsh=MTNiNGF1NDdhYjFmeA==",
      department: "Management",
      
    },
    {
      name: "Satvik Vansh",
      role: "Treasurer",
      image: "/team/satvik.jpg",
      linkedin: "https://www.linkedin.com/in/satvik-vansh-3b4386311?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://www.instagram.com/satvikxvansh",
      department: "Management",
      
      
    },
    {
      name: "Arnav Kumar",
      role: "Joint Treasurer",
      image: "/team/arnav.jpg",
      linkedin: "https://www.linkedin.com/in/arnav-kumar-9691a61b4",
      github: "https://github.com",
      instagram: "https://www.instagram.com/satvikxvansh",
      department: "Management",
      
      
    },
    {
      name: "Sachin Kumar",
      role: "Web Master ",
      image: "/team/sachin.jpg",
      linkedin: "https://www.linkedin.com/in/sachin-kumar-90884117a/",
      github: "https://github.com/SKSingh0703",
      instagram: "https://www.instagram.com/sachin_kumar_0703/",
      department: "Technical",
      
    },
    {
      name: "Aariya Kumari",
      role: "Tech Head",
      image: "/team/noimage.jpg",
      linkedin: "https://www.linkedin.com",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Arijit Dubey",
      role: "Tech Head",
      image: "/team/arijit.webp",
      linkedin: "https://www.linkedin.com/in/arijit-dubey-85471028a/",
      github: "https://github.com/Cicada1107",
      instagram: "https://www.instagram.com/omniman1107/",
      department: "Technical",
      
    },
    {
      name: "Shreyansh Jugran",
      role: "Tech Head",
      image: "/team/shreyansh.jpg",
      linkedin: "https://www.linkedin.com/in/shreyansh-jugran-754b98280",
      github: "https://github.com/SageSaiyan",
      instagram: "https://www.instagram.com/shreyanshjugran",
      department: "Technical",
      
    },
    {
      name: "Aman Kumar Sah",
      role: "Design heads",
      image: "/team/amansah.jpg",
      linkedin: "https://www.linkedin.com/in/aman-kumar-sah-12a370238?",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Design",
      
    },
    {
      name: "Priyanshu Ranjan",
      role: "Design heads",
      image: "/team/priyanshuk23.jpeg",
      linkedin: "https://www.linkedin.com/in/priyanshu-ranjan-a83718286/",
      github: "https://github.com",
      instagram: "https://www.instagram.com/_priyanshu3011/",
      department: "Design",
     
    },
    {
      name: "Abhigyaan Srivastava",
      role: "Content head",
      image: "/team/abhigyaan.webp",
      linkedin: "https://www.linkedin.com/in/abhigyan-srivastava-19609827b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/abhi-14gyan",
      instagram: "https://www.instagram.com/abhi_14gyan?igsh=MXZyYXpkaGd6cDJwYg==",
      department: "Content",
      
    },
    {
      name: "Md Zaid Alam",
      role: "Content head",
      image: "/team/zaid.jpeg",
      linkedin: "http://linkedin.com/in/zaid-alam",
      github: "https://github.com/iammdzaidalam",
      instagram: "https://www.instagram.com/zaidddiebuoy",
      department: "Content",
      
    },
    {
      name: "Varun Gupta",
      role: "Event Head",
      image: "/team/VarunGupta.jpg",
      linkedin: "https://www.linkedin.com/in/varunn-guptaa/",
      github: "https://github.com/VarunThisSide",
      instagram: "https://www.instagram.com/varunnnguptaa/",
      department: "Events",
      
    },
    {
      name: "Pratyasha Palit",
      role: "Event Head",
      image: "/team/Pratyasha.jpg",
      linkedin: "https://www.linkedin.com/in/pratyasha-palit-b4873a317",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Events",
      
    },
    {
      name: "Sumit Pramanik",
      role: "Event Head",
      image: "/team/SumitP.jpg",
      linkedin: "https://www.linkedin.com/in/sumit-pramanik-43b16a24b/",
      github: "https://github.com/supra41",
      instagram: "https://instagram.com",
      department: "Events",
      
    },

    {
      name: "Subhayu Das",
      role: "Developer",
      image: "/team/subhayu.jpg",
      linkedin: "https://www.linkedin.com/in/subhayu-das/",
      github: "https://github.com/subhayudas",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },

    
    {
      name: "Naman Kumar Das", //done
      role: "Senior Executive Member",
      image: "/team/noimage.jpg",
      linkedin: "https://www.linkedin.com/in/naman-kumar-das-884919260/",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Executive",
      
    },
    {
      name: "Nayan Shenoy", // done
      role: "Senior Executive Member",
      image: "/team/nayan.jpg",
      linkedin: "https://www.linkedin.com/in/nayan-shenoy-14704a24b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Content",
      
    },
    {
      name: "Nikhil Kumar Singh", //done
      role: "Senior Executive Member",
      image: "/team/nikhil.jpg",
      linkedin: "https://www.linkedin.com/in/nikhil-singh-64a414160?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Technical",
      
    },
    {
      name: "Adarsh Narayan", //done
      role: "Senior Executive Member",
      image: "/team/adarsh.jpg",
      linkedin: "https://www.linkedin.com/in/adarsh-narayan-711a24263?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    {
      name: "Sakshi Sinha", //done
      role: "Senior Executive Member",
      image: "/team/Sakshi.webp",
      linkedin: "https://www.linkedin.com/in/sakshi-sinha-09a377270?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Design",
     
    },
    {
      name: "Akshat Tambi", //done
      role: "Senior Executive Member",
      image: "/team/akshat.jpg",
      linkedin: "https://www.linkedin.com/in/1akshat-tambi?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Events",
      
    },
    {
      name: "Ataullah Ansari", //done
      role: "Senior Executive Member",
      image: "/team/noimage.jpg",
      linkedin: "https://www.linkedin.com/in/attaullah-ansari-1304aa264?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com",
      instagram: "https://instagram.com",
      department: "Management",
      
    },
    
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

       
      </motion.div>
      <Footer />
    </div>
  );
} 