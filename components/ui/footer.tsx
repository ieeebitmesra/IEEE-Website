import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Footer() {
  const quickLinks = [
    { name: "About Us", href: "/about-us" },
    { name: "Events", href: "/events" },
    { name: "Workshops", href: "/workshop" },
    { name: "Leaderboard", href: "/leaderboard" }, 
    { name: "Team", href: "/team" },
    { name: "Contact", href: "/contact" },
  ];

  const resources = [
    { name: "Documentation", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Research Papers", href: "#" },
    { name: "Project Gallery", href: "/#gallery" }, 
  ];

  const contact = [
    { icon: Phone, info: "+91 9123388359", href: "tel:+919123388359" },
    { icon: Mail, info: "ieee@bitmesra.ac.in", href: "mailto:ieee@bitmesra.ac.in" },
    { icon: MapPin, info: "BIT Mesra, Ranchi, Jharkhand - 835215", href: "https://maps.google.com" },
    // Added WhatsApp contact for technical support
    { icon: Phone, info: "WhatsApp for Tech Support", href: "https://wa.me/919123388359" },
  ];

  const socials = [
    { icon: Instagram, href: "https://www.instagram.com/ieee.bitm/" },
    { icon: Facebook, href: "https://www.facebook.com/ieeebitmesra/" },
    { icon: Linkedin, href: "https://www.linkedin.com/company/ieee-student-branch-bit-mesra/?originalSubdomain=in" },
    { icon: Github, href: "https://github.com/ieeebitmesra" },
  ];

  return (
    <footer className="relative mt-20 border-t border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-12 md:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">IEEE BIT Mesra</h3>
            <p className="text-sm text-white/60 leading-relaxed">
              Advancing Technology for Humanity through innovation, education, and collaboration.
            </p>
            <div className="flex gap-4">
              {socials.map((social, index) => {
                const Icon = social.icon;
                return (
                  <motion.a
                    key={index}
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Link href={link.href}>{link.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((resource, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <Link href={resource.href}>{resource.name}</Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-4">
              {contact.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-2 text-white/60 hover:text-white transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    <a href={item.href}>{item.info}</a>
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © 2025 IEEE BIT Mesra. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-white/60">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
              <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}