"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "./AppProvider";

export default function ThumbsPage() {
  const { dispatch } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_PHASE", phase: "suitman" });
    }, 4500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-[#F5F5DC] noise-bg-light relative overflow-hidden">
      <ChatBgSpots />

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative z-10 text-center"
      >
        {/* 大拇指 SVG 动画 */}
        <motion.div
          animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
          className="w-32 h-32 mx-auto mb-6"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              d="M30 55V75C30 78.3 32.7 81 36 81H70C73.3 81 76 78.3 76 75V55C76 51.7 73.3 49 70 49H62V35C62 28.4 56.6 23 50 23C43.4 23 38 28.4 38 35V49H36C32.7 49 30 51.7 30 55Z"
              fill="#1a1a1a"
              stroke="#1a1a1a"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            />
            <motion.path
              d="M24 49H20C16.7 49 14 51.7 14 55V75C14 78.3 16.7 81 20 81H24C27.3 81 30 78.3 30 75V55C30 51.7 27.3 49 24 49Z"
              fill="#1a1a1a"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            />
            {/* 闪光 */}
            <motion.circle
              cx="75" cy="25" r="4" fill="#1a1a1a"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <motion.circle
              cx="20" cy="30" r="3" fill="#1a1a1a"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-2xl font-bold text-neutral-900 mb-3"
        >
          很棒！顺利完成全部答题 👍
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-neutral-500"
        >
          正在生成专属能力报告...
        </motion.p>

        {/* 进度点动画 */}
        <motion.div className="flex gap-2 justify-center mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-neutral-800"
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function ChatBgSpots() {
  return (
    <>
      <div className="chat-bg-spot w-64 h-64 bg-[#D4C4A8] -top-20 -left-20" />
      <div className="chat-bg-spot w-48 h-48 bg-[#D4C4A8] top-1/3 -right-10" />
      <div className="chat-bg-spot w-56 h-56 bg-[#C9B99D] bottom-20 left-1/4" />
      <div className="chat-bg-spot w-40 h-40 bg-[#D4C4A8] bottom-0 right-1/4" />
    </>
  );
}
