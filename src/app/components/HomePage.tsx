"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Loader2 } from "lucide-react";
import { useApp } from "./AppProvider";
import { getRandomQuestions } from "../lib/mock-data";

export default function HomePage() {
  const { state, dispatch } = useApp();
  const user = state.user!;
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      // 尝试调用真实 API 生成题目
      const response = await fetch("/api/generate-questions");
      const data = await response.json();

      if (data.questions && Array.isArray(data.questions)) {
        dispatch({ type: "SET_QUESTIONS", questions: data.questions });
      } else {
        // 降级到假数据 — 每道题随机抽取变体
        dispatch({ type: "SET_QUESTIONS", questions: getRandomQuestions() });
      }
    } catch {
      // API 失败时降级到假数据 — 每道题随机抽取变体
      dispatch({ type: "SET_QUESTIONS", questions: getRandomQuestions() });
    } finally {
      setIsLoading(false);
      dispatch({ type: "SET_PHASE", phase: "quiz" });
    }
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F5F5DC] noise-bg-light">
      <ChatBgSpots />

      {/* 顶部 */}
      <header className="relative z-10 px-4 pt-6 pb-2">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <h1 className="text-lg font-bold text-neutral-800">话术训练员</h1>
          <div className="flex items-center gap-2 bg-white/70 backdrop-blur-sm rounded-full px-3 py-1.5 border border-[#C9B99D]/30">
            <span className="text-xl">{user.avatar}</span>
            <span className="text-sm font-medium text-neutral-700">{user.id}</span>
          </div>
        </div>
      </header>

      {/* 主体 */}
      <main className="flex-1 relative z-10 flex flex-col items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          {/* 主视觉 */}
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 mx-auto bg-white rounded-3xl shadow-lg shadow-neutral-200/50 flex items-center justify-center border border-neutral-100"
            >
              <MessageCircle className="w-14 h-14 text-neutral-800" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* 文案 */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-neutral-900">
              准备好提升你的话术了吗？
            </h2>
            <p className="text-neutral-500 max-w-xs mx-auto leading-relaxed">
              6 道混合场景题，AI 即时点评<br />
              让你在日常与职场中游刃有余
            </p>
          </div>

          {/* 开始按钮 */}
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleStart}
            disabled={isLoading}
            className="group flex items-center gap-2 mx-auto px-8 py-4 rounded-2xl bg-neutral-900 text-white font-semibold text-lg shadow-xl shadow-neutral-900/20 hover:bg-neutral-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                出题中...
              </>
            ) : (
              <>
                开始答题
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </motion.button>

          {/* 提示 */}
          <p className="text-xs text-neutral-400">
            每轮 6 道题 · 约 5-10 分钟完成
          </p>
        </motion.div>
      </main>
    </div>
  );
}

/* 背景装饰斑点 */
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
