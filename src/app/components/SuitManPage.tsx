"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { useApp } from "./AppProvider";

export default function SuitManPage() {
  const { dispatch } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ type: "SET_PHASE", phase: "report" });
    }, 4500);
    return () => clearTimeout(timer);
  }, [dispatch]);

  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-[#F5F5DC] noise-bg-light relative overflow-hidden">
      <ChatBgSpots />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 text-center"
      >
        {/* 西装男 SVG */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="w-36 h-36 mx-auto mb-6"
        >
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* 头 */}
            <circle cx="50" cy="28" r="16" fill="#1a1a1a" />
            {/* 墨镜 */}
            <motion.path
              d="M38 26H46V30H38V26Z M54 26H62V30H54V26Z"
              fill="#333"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            <motion.line
              x1="46" y1="28" x2="54" y2="28"
              stroke="#333"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
            {/* 身体/西装 */}
            <motion.path
              d="M30 46 L25 90 H75 L70 46 H30Z"
              fill="#1a1a1a"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            />
            {/* 领带 */}
            <motion.path
              d="M47 46 L50 52 L53 46Z"
              fill="#333"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            />
            {/* 领子 */}
            <motion.path
              d="M40 46 L47 50 L50 46 L53 50 L60 46"
              stroke="#333"
              strokeWidth="1.5"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            />
            {/* 闪光 */}
            <motion.circle
              cx="72" cy="22" r="3" fill="#1a1a1a"
              animate={{ scale: [1, 1.4, 1], opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-xl font-bold text-neutral-900 mb-3"
        >
          报告生成中...
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1 }}
          className="text-sm text-neutral-500"
        >
          正在分析你的沟通风格与能力维度
        </motion.p>

        {/* 进度条 */}
        <div className="w-48 h-1 bg-neutral-200 rounded-full mx-auto mt-6 overflow-hidden">
          <motion.div
            className="h-full bg-neutral-800 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 4, ease: "easeInOut" }}
          />
        </div>
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
