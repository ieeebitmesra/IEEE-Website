import { Header1 } from "@/components/ui/header";
import { LinkedinIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface AlumniProfile {
  name: string;
  role: string;
  description: string;
  image: string;
  linkedin: string;
  email: string;
}

export default function AlumniPage() {
  const alumni: AlumniProfile[] = [
    {
      name: "Prateek",
      role: "sde texas",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      image: "/alumni/prateek.jpg",
      linkedin: "https://linkedin.com",
      email: "mailto:prateek@gmail.com"
    },
    {
      name: "Shukham",
      role: "sde amazon",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore",
      image: "/alumni/shukham.jpg",
      linkedin: "https://linkedin.com",
      email: "mailto:shukham@gmail.com"
    },
   
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <Header1 />
      <div className="container mx-auto px-4 pt-24">
        <div className="relative">
          <h1 className="text-6xl font-bold text-white mb-12 text-center">Alumni</h1>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {alumni.map((profile, index) => (
            <div 
              key={index}
              className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden"
            >
              <div className="aspect-square relative">
                <Image
                  src={profile.image}
                  alt={profile.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 space-y-4">
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <h3 className="text-blue-400">{profile.role}</h3>
                <p className="text-gray-400 text-sm">{profile.description}</p>
                <div className="flex gap-4">
                  <Link 
                    href={profile.linkedin}
                    className="text-white/60 hover:text-white transition"
                  >
                    <LinkedinIcon className="w-5 h-5" />
                  </Link>
                  <Link 
                    href={profile.email}
                    className="text-white/60 hover:text-white transition"
                  >
                    <MailIcon className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 