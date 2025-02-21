import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

function Hero() {
    return (
        <div className="relative min-h-screen">
            <HeroGeometric
                badge="IEEE"
                title1="Student Branch"
                title2="BIT Mesra"
                // subtitle="Advancing Technology for Humanity"
            />
            
            {/* Call to Action Buttons */}
            <div className="absolute bottom-12 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 w-full px-4 sm:px-0">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-sm mx-auto">
                    <Button 
                        asChild 
                        size="lg" 
                        className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-lg"
                    >
                        <Link href="/about-us" className="flex items-center justify-center">
                            Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                    <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full sm:w-auto border-2 border-white/80 text-purple-500 font-semibold hover:bg-white/10 hover:border-white shadow-lg hover:text-purple-600"
                    >
                        <Link href="/events" className="flex items-center justify-center">
                            View Events
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Hero;
