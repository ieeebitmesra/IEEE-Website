"use client";
import { Header1 } from "@/components/ui/header";
import { Meteors } from "@/components/ui/meteor";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { signInWithGoogle, signInWithGithub } from "@/lib/supabase";
import Image from "next/image";

export default function SignUpPage() {
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const handleGoogleSignUp = async () => {
    try {
      setSocialLoading('google');
      await signInWithGoogle();
      // The redirect will be handled by Supabase
    } catch (error) {
      console.error("Google sign-up error:", error);
      setSocialLoading(null);
      toast.error("Failed to sign up with Google. Please try again.");
    }
  };

  const handleGithubSignUp = async () => {
    try {
      setSocialLoading('github');
      await signInWithGithub();
      // The redirect will be handled by Supabase
    } catch (error) {
      console.error("GitHub sign-up error:", error);
      setSocialLoading(null);
      toast.error("Failed to sign up with GitHub. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-[#030303] to-rose-900 relative">
      <Header1 />
      <Meteors number={20} />

      <div className="container mx-auto px-4 pt-24 pb-20">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-md mx-auto"
        >
          <div className="relative bg-black/30 backdrop-blur-xl rounded-2xl border border-white/10 p-8 shadow-xl overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl"></div>
            
            <motion.div 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-center mb-8 relative z-10"
            >
              <h1 className="text-4xl font-bold text-white mb-2">Join IEEE BIT Mesra</h1>
              <p className="text-white/60">Create your account to access exclusive resources and events</p>
            </motion.div>

            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col gap-5 mb-6 relative z-10"
            >
              <div className="p-5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border border-white/10 mb-5">
                <h3 className="text-white font-medium mb-3">Why sign up?</h3>
                <ul className="text-white/70 text-sm space-y-3">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Access to exclusive IEEE resources and materials
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Participate in workshops and coding competitions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    Connect with industry professionals and peers
                  </li>
                </ul>
              </div>
              
              <Button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={socialLoading !== null}
                className="w-full bg-white hover:bg-gray-100 text-gray-800 py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {socialLoading === 'google' ? (
                  <div className="w-5 h-5 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Image src="/google-icon.svg" alt="Google" width={24} height={24} />
                    <span className="font-medium">Sign up with Google</span>
                  </>
                )}
              </Button>

              <Button
                type="button"
                onClick={handleGithubSignUp}
                disabled={socialLoading !== null}
                className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
              >
                {socialLoading === 'github' ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Github className="w-6 h-6" />
                    <span className="font-medium">Sign up with GitHub</span>
                  </>
                )}
              </Button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-center relative z-10"
            >
              <p className="text-white/60">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}