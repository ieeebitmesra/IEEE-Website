"use client";

import { motion, Reorder, useDragControls } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const initialImages = [
  {
    src: "/gallery/image1.jpg",
    alt: "IEEE Event 1",
    size: "large", // 2x2
  },
  {
    src: "/gallery/image2.jpg",
    alt: "IEEE Workshop",
    size: "small", // 1x1
  },
  {
    src: "/gallery/image3.jpg",
    alt: "Hackathon",
    size: "medium", // 2x1
  },
  {
    src: "/gallery/image4.jpg",
    alt: "Tech Talk",
    size: "small",
  },
  {
    src: "/gallery/image5.jpg",
    alt: "Project Demo",
    size: "medium",
  },
  {
    src: "/gallery/image6.jpg",
    alt: "Team Building",
    size: "small",
  },
  {
    src: "/gallery/image7.jpg",
    alt: "Technical Workshop",
    size: "large",
  },
  {
    src: "/gallery/image8.jpg",
    alt: "Innovation Summit",
    size: "medium",
  },
  {
    src: "/gallery/image9.jpg",
    alt: "Code Sprint",
    size: "small",
  },
  {
    src: "/gallery/image10.jpg",
    alt: "IEEE Conference",
    size: "medium",
  },
];

export function Gallery() {
  const [images, setImages] = useState(() => {
    return [...initialImages].sort(() => Math.random() - 0.5);
  });
  const [currentPage, setCurrentPage] = useState(0);
  const imagesPerPage = 6; // Keep 6 images per page for better layout
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <section id="gallery" className="py-20"> {/* Added id="gallery" */}
      <motion.h2 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-4xl font-bold text-white text-center mb-12"
      >
        Our <span className="text-blue-400">Gallery</span>
      </motion.h2>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="min-h-[600px] relative grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-4">
          {images
            .slice(currentPage * imagesPerPage, (currentPage + 1) * imagesPerPage)
            .map((image, index) => (
              <motion.div
                key={image.src}
                drag
                dragMomentum={false}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileDrag={{ scale: 1.05, zIndex: 50 }}
                className={`${
                  image.size === "large" 
                    ? "col-span-2 row-span-2" 
                    : image.size === "medium"
                    ? "col-span-2 row-span-1"
                    : "col-span-1 row-span-1"
                } relative h-[200px] sm:h-[250px] md:h-[200px] lg:h-[250px]`}
              >
                <div className="relative w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable={false}
                  />
                </div>
              </motion.div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevPage}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextPage}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
}