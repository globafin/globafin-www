"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const images = [
  "/assets/hero.svg",
  "/assets/hero-2.jpg",
];

const BackgroundSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-0">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/20" />
    </div>
  );
};

export default BackgroundSlider; 