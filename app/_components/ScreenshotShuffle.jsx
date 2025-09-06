"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const screenshots = [
  { src: "/Dashboard-1.png", alt: "Dashboard View" },
  { src: "/Budgets-scrnshot.png", alt: "Budgets Page View" },
  { src: "/Transactions-scrnshot.png", alt: "Transactions Page View" },
  { src: "/Dashboard-2.png", alt: "Dashboard Categories View" },
];

function ScreenshotShuffle() {
  const [cards, setCards] = useState(screenshots);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prevCards) => {
        const last = prevCards[prevCards.length - 1];
        const rest = prevCards.slice(0, prevCards.length - 1);
        return [last, ...rest];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    // FIX: Removed fixed height and added aspect-video to match screenshot ratio
    <div className="relative aspect-video w-full max-w-2xl mx-auto">
      <AnimatePresence>
        {cards.map((card, index) => (
          <motion.div
            key={card.src}
            className="absolute h-full w-full"
            initial={{ scale: 0.8, y: 0, opacity: 0 }}
            animate={{
              x: index * -30,
              y: index * 10,
              rotate: index * -3,
              scale: 1 - index * 0.1,
              zIndex: cards.length - index,
              opacity: 1,
            }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Image
              src={card.src}
              alt={card.alt}
              fill
              className="rounded-xl shadow-2xl border-2 border-white/10 object-contain"
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default ScreenshotShuffle;