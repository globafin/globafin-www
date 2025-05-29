"use client";
import { TESTIMONIALS } from "@/lib/constants";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import WidthConstraint from "./ui/width-constraint";

const AUTOPLAY_INTERVAL = 5000;

const fadeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.4 } },
};

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const testimonial = TESTIMONIALS[current];

  return (
    <section className="py-16 lg:pt-32 bg-white">
      <WidthConstraint>
        <div className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-md transition-all duration-300 min-h-[350px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={current}
              variants={fadeVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col lg:flex-row w-full"
            >
              <div className="lg:w-1/2 w-full max-h-[450px] aspect-square relative">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center w-full h-full aspect-square"
                  priority
                />
              </div>
              <div className="lg:w-1/2 w-full bg-primary text-white flex flex-col justify-between p-8 relative">
                <FaQuoteLeft className="text-green-400 text-3xl mb-4" />
                <p className="text-lg md:text-2xl font-[300] leading-relaxed mb-8">
                  {testimonial.quote}
                </p>
                <div className="border-t border-[#fff]/10 pt-4">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="ml-2 text-blue-200 text-xs">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Carousel indicators */}
        <div className="flex justify-center mt-6 space-x-3">
          {TESTIMONIALS.map((_, idx) => (
            <div
              key={idx}
              className="w-3 h-3 rounded-full border-2 flex items-center justify-center border-primary transition-colors duration-200"
            >
              <button
                onClick={() => setCurrent(idx)}
                aria-label={`Show testimonial ${idx + 1}`}
                className={`rounded-full border w-full h-full border-white inline-block transition-colors duration-200 ${
                  current === idx ? "bg-primary" : "bg-white"
                }`}
                style={{ outline: "none" }}
              />
            </div>
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Testimonials;
