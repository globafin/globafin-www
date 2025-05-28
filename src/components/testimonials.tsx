"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import WidthConstraint from "./ui/width-constraint";

const testimonials = [
  {
    image: "/assets/testimonials/1.png", // Replace with your actual image path
    quote:
      "I've used Globaiin MicroFinance Limited for years! They are consistent and that's important to me. I own a small business and really appreciate the personal interest the team have taken in my success. Thanks so much!",
    name: "Mrs. Serwah",
    role: "Trader",
  },
  {
    image: "/assets/testimonials/1.png",
    quote:
      "Globaiin MicroFinance has been a game changer for my business. Their support and dedication are unmatched.",
    name: "Mr. Kwame",
    role: "Entrepreneur",
  },
  {
    image: "/assets/testimonials/1.png",
    quote:
      "I appreciate the transparency and professionalism. I always feel valued as a client.",
    name: "Ms. Akua",
    role: "Retailer",
  },
];

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
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[current];

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
              className="flex flex-col md:flex-row w-full"
            >
              <div className="md:w-1/2 w-full max-h-[450px] aspect-square relative">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  fill
                  className="object-cover object-center w-full h-full aspect-square"
                  priority
                />
              </div>
              <div className="md:w-1/2 w-full bg-blue-900 text-white flex flex-col justify-between p-8 relative">
                <FaQuoteLeft className="text-green-400 text-3xl mb-4" />
                <p className="text-lg md:text-2xl font-[300] leading-relaxed mb-8">
                  {testimonial.quote}
                </p>
                <div className="border-t border-blue-700 pt-4">
                  <span className="font-semibold">{testimonial.name}</span>
                  <span className="ml-2 text-blue-200 text-xs">{testimonial.role}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        {/* Carousel indicators */}
        <div className="flex justify-center mt-6 space-x-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              aria-label={`Show testimonial ${idx + 1}`}
              className={`w-3 h-3 rounded-full border-2 border-blue-700 inline-block transition-colors duration-200 ${
                current === idx ? "bg-blue-700" : "bg-white"
              }`}
              style={{ outline: "none" }}
            />
          ))}
        </div>
      </WidthConstraint>
    </section>
  );
};

export default Testimonials;
