"use client";

import { motion, useAnimationControls } from "framer-motion";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

const topImages = [
  {
    src: "/gallery/image1.jpg",
    alt: "IEEE Event 1",
  },
  {
    src: "/gallery/image11.jpg",
    alt: "IEEE Workshop",
  },
  {
    src: "/gallery/image3.jpg",
    alt: "Hackathon",
  },
  {
    src: "/gallery/image4.jpg",
    alt: "Tech Talk",
  },
  {
    src: "/gallery/image5.jpg",
    alt: "Project Demo",
  }
];

const bottomImages = [
  {
    src: "/gallery/image6.jpg",
    alt: "Technical Workshop",
  },
  {
    src: "/gallery/image7.jpg",
    alt: "Annual Conference",
  },
  {
    src: "/gallery/image8.jpg",
    alt: "Team Collaboration",
  },
  {
    src: "/gallery/image9.jpg",
    alt: "Award Ceremony",
  },
  {
    src: "/gallery/image10.jpg",
    alt: "Networking Event",
  }
];

const duplicatedTopImages = [...topImages, ...topImages, ...topImages, ...topImages, ...topImages];
const duplicatedBottomImages = [...bottomImages, ...bottomImages, ...bottomImages, ...bottomImages, ...bottomImages];

export function Gallery() {
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const containerRef1 = useRef<HTMLDivElement>(null);
  const containerRef2 = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const startAnimation = (controls: any, direction: 1 | -1, imageSet: any[]) => {
    const baseWidth = isMobile ? 160 : 300;
    const gap = isMobile ? 16 : 40;
    const itemWidth = baseWidth + gap;
    const totalWidth = itemWidth * imageSet.length;

    controls.start({
      x: direction === 1 
        ? [-totalWidth/3, -totalWidth/1.5]
        : [-totalWidth/3, -totalWidth/6],
      transition: {
        duration: isMobile ? 35 : 20,
        repeat: Infinity,
        ease: "linear",
        repeatType: "loop",
        repeatDelay: 0
      }
    }).then(() => {
      controls.set({ x: direction === 1 ? 0 : -totalWidth/2 });
    });
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const initAnimation = () => {
      controls1.stop();
      controls2.stop();
      
      timeoutId = setTimeout(() => {
        startAnimation(controls1, 1, duplicatedTopImages);
        startAnimation(controls2, -1, duplicatedBottomImages);
      }, 100);
    };

    initAnimation();

    window.addEventListener('focus', initAnimation);
    window.addEventListener('blur', () => {
      controls1.stop();
      controls2.stop();
    });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('focus', initAnimation);
      window.removeEventListener('blur', () => {});
      controls1.stop();
      controls2.stop();
    };
  }, [isMobile]);

  const CarouselRow = ({ 
    controls, 
    containerRef, 
    direction,
    images
  }: { 
    controls: any; 
    containerRef: any; 
    direction: 1 | -1;
    images: any[];
  }) => (
    <div 
      className="relative h-[160px] md:h-[250px] mask-edges mb-4 md:mb-8" 
      ref={containerRef}
    >
      <motion.div
        className="flex absolute gap-4 md:gap-10"
        initial={{ x: direction === 1 ? 0 : -images.length * (isMobile ? 176 : 340) }}
        animate={controls}
        style={{
          touchAction: "none",
          willChange: "transform",
          transform: "translate3d(0,0,0)",
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          perspective: 1000,
          WebkitPerspective: 1000
        }}
      >
        {images.map((image, idx) => (
          <motion.div
            key={idx}
            className="relative h-[160px] w-[160px] md:h-[250px] md:w-[300px] flex-shrink-0 rounded-xl overflow-hidden group"
            style={{
              WebkitTapHighlightColor: "transparent",
              transform: "translate3d(0,0,0)"
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              priority={idx < 2}
              sizes="(max-width: 768px) 160px, 300px"
              quality={isMobile ? 75 : 90}
            />
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent/0"
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <motion.p 
                className="absolute bottom-2 md:bottom-4 left-2 md:left-4 right-2 md:right-4 text-xs md:text-sm font-medium text-white"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
              >
                {image.alt}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );

  return (
    <section id="gallery" className="py-10 md:py-20">
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-2xl md:text-4xl font-bold text-white text-center mb-8 md:mb-12"
      >
        Our <span className="text-blue-400">Gallery</span>
      </motion.h2>

      <div className="relative max-w-7xl mx-auto overflow-hidden px-4 md:px-8">
        <CarouselRow 
          controls={controls1} 
          containerRef={containerRef1} 
          direction={1}
          images={duplicatedTopImages}
        />
        <CarouselRow 
          controls={controls2} 
          containerRef={containerRef2} 
          direction={-1}
          images={duplicatedBottomImages}
        />
      </div>

      <style jsx>{`
        .mask-edges {
          mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent,
            black 5%,
            black 95%,
            transparent
          );
        }
      `}</style>
    </section>
  );
}