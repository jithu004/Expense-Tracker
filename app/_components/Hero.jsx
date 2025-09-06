"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { PiggyBank, ReceiptText, Wallet, BarChart, Landmark } from "lucide-react";
import ScreenshotShuffle from "./ScreenshotShuffle";

const iconList = [PiggyBank, ReceiptText, Wallet, BarChart, Landmark];

const FloatingIcon = ({ icon, style }) => {
  const Icon = icon;
  const animation = {
    y: [0, Math.random() * 20 - 10, 0],
    x: [0, Math.random() * 20 - 10, 0],
    rotate: [0, Math.random() * 10 - 5, 0],
  };

  return (
    <motion.div
      className="absolute"
      style={style}
      animate={animation}
      transition={{
        duration: Math.random() * 5 + 5,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    >
      <Icon className="h-12 w-12 text-white/10" />
    </motion.div>
  );
};

function Hero() {
  const { isSignedIn } = useUser();
  const [backgroundIcons, setBackgroundIcons] = useState([]);

  useEffect(() => {
    const generatedIcons = Array.from({ length: 16 }).map((_, i) => {
      const Icon = iconList[i % iconList.length];
      const style = {
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
      };
      return { id: i, icon: Icon, style };
    });
    setBackgroundIcons(generatedIcons);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      {backgroundIcons.map(item => (
          <FloatingIcon key={item.id} icon={item.icon} style={item.style} />
      ))}

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 lg:pt-8 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Manage Your Expenses
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              Take control of your money. Start tracking, budgeting, and saving today with a simple and intuitive interface.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-10 flex items-center justify-center lg:justify-start gap-x-6"
          >
            <Link
              href={isSignedIn ? "/dashboard" : "/sign-in"}
              className="rounded-md bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors"
            >
              Get started
            </Link>
          </motion.div>
        </div>
        
        <div className="mt-16 sm:mt-24 lg:mt-0 flex items-center justify-center">
            <ScreenshotShuffle />
        </div>
      </div>
    </div>
  );
}

export default Hero;