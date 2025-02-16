"use client";

import { Header1 } from "@/components/ui/header";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Link2, Twitter } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900">
      <Header1 />
      <div className="container mx-auto px-4 pt-24">
        <div className="relative mb-16">
          <h1 className="text-6xl font-bold text-white text-center">Contact Us</h1>
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-transparent to-rose-500/20 blur-3xl -z-10" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-8">
            <div className="flex items-center gap-3 mb-8">
              <div className="text-blue-400 text-2xl">Send us a message</div>
            </div>
            
            <form className="space-y-6">
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Message"
                  rows={6}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-6">
                Send
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-12">
            <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl text-blue-400 mb-6">Contact</h2>
              <div className="space-y-4 text-white/80">
                <p>Phone Number</p>
                <p>mail@bitmesra.ac.in</p>
                <p>Address, BIT Mesra</p>
                <p>Ranchi, Jharkhand</p>
              </div>
            </div>

            <div className="bg-[#0A0A2C]/80 backdrop-blur-sm border border-white/10 rounded-lg p-8">
              <h2 className="text-2xl text-blue-400 mb-6">Connect</h2>
              <div className="flex gap-6">
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Instagram className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Twitter className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Facebook className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition">
                  <Link2 className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center text-white/60 mt-24 pb-8">
          © 2025 IEEE, BIT Mesra. All rights reserved.
        </div>
      </div>
    </div>
  );
} 