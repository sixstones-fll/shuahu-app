"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Mic,
  MicOff,
  Send,
  Loader2,
  ChevronRight,
  Star,
  Sparkles,
  ThumbsUp,
  AlertCircle,
} from "lucide-react";
import { useApp } from "./AppProvider";
import { getMockEvaluation } from "../lib/mock-data";

export default function QuizPage() {
  const { state, dispatch } = useApp();
  const [answer, setAnswer] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showEval, setShowEval] = useState(false);
  const [isListening, setIsListening] = useState(false);

  const questions = state.questions;
  const currentIdx = state.currentQuestionIndex;
  const question = questions[currentIdx];
  const total = questions.length;

  if (!question) return null;

  const handleVoiceToggle = () => {
    const supported = "SpeechRecognition" in window || "webkitSpeechRecognition" in window;
    if (!supported) {
      alert("您的浏览器不支持语音输入");
      return;
    }
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTimeout(() => {
        setAnswer((p) => p + "我觉得可以这样做，先表达理解，然后说明自己的情况。");
        setIsListening(false);
      }, 2000);
    }
  };

  const handleSubmit = () => {
    if (!answer.trim() || isEvaluating) return;
    setIsEvaluating(true);
    setTimeout(() => {
      const mockEval = getMockEvaluation(question.id);
      dispatch({
        type: "ADD_ANSWER",
        record: {
          question,
          answer,
          evaluation: { ...mockEval, userAnswer: answer },
        },
      });
      setIsEvaluating(false);
      setShowEval(true);
    }, 1500);
  };

  const handleNext = () => {
    setShowEval(false);
    setAnswer("");
    if (currentIdx < total - 1) {
      dispatch({ type: "NEXT_QUESTION" });
    } else {
      dispatch({ type: "SET_PHASE", phase: "thumbs" });
    }
  };

  const progressPercent = ((currentIdx + (showEval ? 1 : 0)) / total) * 100;
  const lastEval = state.answers[state.answers.length - 1]?.evaluation;

  return (
    <div className="min-h-full flex flex-col bg-[#F5F5DC] noise-bg-light relative">
      <ChatBgSpots />

      {/* 顶部导航 */}
      <header className="sticky top-0 z-30 bg-[#F5F5DC]/90 backdrop-blur-md border-b border-[#D4C4A8]/50">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => dispatch({ type: "SET_PHASE", phase: "home" })}
            className="flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-800">
              第 {currentIdx + 1} 题
            </span>
            <span className="text-sm text-neutral-400">/ 共 {total} 题</span>
          </div>
          <div className="w-14" />
        </div>
        <div className="h-[2px] bg-[#D4C4A8]/40">
          <motion.div
            className="h-full bg-neutral-800 rounded-full"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      </header>

      {/* 题目 + 答题 */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="space-y-5"
          >
            {/* 场景标签 */}
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${
                  question.scene === "压力场景"
                    ? "bg-neutral-800/8 text-neutral-700 border border-neutral-800/8"
                    : "bg-white/70 text-neutral-500 border border-[#C9B99D]/50"
                }`}
              >
                {question.scene === "压力场景" && <AlertCircle className="w-3 h-3" />}
                {question.scene}
              </span>
            </div>

            {/* 题目卡片 */}
            <div className="bg-white rounded-2xl border border-white/10 p-6 shadow-lg shadow-black/10">
              <h2 className="text-lg font-bold text-neutral-900 leading-relaxed mb-3">
                {question.title}
              </h2>
              <p className="text-neutral-600 leading-relaxed text-[15px]">
                {question.content}
              </p>
            </div>

            {/* 答题区 */}
            <div className="bg-white rounded-2xl border border-white/10 p-5 shadow-lg shadow-black/10">
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-neutral-700">你的回答</label>
                <button
                  onClick={handleVoiceToggle}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    isListening
                      ? "bg-neutral-900 text-white animate-pulse"
                      : "bg-neutral-100 text-neutral-500 hover:bg-neutral-200"
                  }`}
                >
                  {isListening ? <Mic className="w-3.5 h-3.5" /> : <MicOff className="w-3.5 h-3.5" />}
                  {isListening ? "聆听中..." : "语音输入"}
                </button>
              </div>
              <textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="在这里输入你的回答..."
                rows={5}
                className="w-full resize-none rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-[15px] text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all"
              />
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-neutral-400">{answer.length} 字</span>
                <button
                  onClick={handleSubmit}
                  disabled={!answer.trim() || isEvaluating}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-sm font-medium hover:bg-neutral-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
                >
                  {isEvaluating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      AI 分析中...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      提交答案
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 解析弹窗 */}
      <AnimatePresence>
        {showEval && lastEval && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && handleNext()}
          >
            <motion.div
              initial={{ y: 100, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 100, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl"
            >
              {/* 头部 */}
              <div className="sticky top-0 bg-white rounded-t-3xl border-b border-neutral-100 px-6 pt-5 pb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-neutral-900">本题解析</h3>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-1 text-sm text-neutral-500 hover:text-neutral-800"
                >
                  下一题<ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="px-6 py-5 space-y-6">
                {/* 得分 */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-neutral-900 flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{lastEval.score}</span>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-500">本题得分</p>
                    <p className="text-lg font-bold text-neutral-900">
                      {lastEval.score >= 8 ? "回答出色！" : lastEval.score >= 6 ? "还有提升空间" : "需要加强练习"}
                    </p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < lastEval.score ? "fill-neutral-800 text-neutral-800" : "text-neutral-200"}`} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* 你的回答 */}
                <div>
                  <h4 className="text-sm font-bold text-neutral-700 mb-2">你的回答</h4>
                  <div className="bg-neutral-50 rounded-xl p-4 text-sm text-neutral-600 leading-relaxed border border-neutral-100">
                    {lastEval.userAnswer}
                  </div>
                </div>

                {/* 优点 + 建议 */}
                <div className="grid grid-cols-1 gap-4">
                  <div className="bg-green-50/50 rounded-xl p-4 border border-green-100/50">
                    <h4 className="text-sm font-bold text-green-800 mb-2 flex items-center gap-1.5">
                      <ThumbsUp className="w-3.5 h-3.5" />优点
                    </h4>
                    <ul className="space-y-1.5">
                      {lastEval.strengths.map((s, i) => (
                        <li key={i} className="text-sm text-green-700/80 leading-relaxed flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-green-400 shrink-0" />{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-amber-50/50 rounded-xl p-4 border border-amber-100/50">
                    <h4 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />建议改进
                    </h4>
                    <ul className="space-y-1.5">
                      {lastEval.weaknesses.map((w, i) => (
                        <li key={i} className="text-sm text-amber-700/80 leading-relaxed flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400 shrink-0" />{w}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 参考话术 */}
                <div>
                  <h4 className="text-sm font-bold text-neutral-700 mb-2 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />参考话术
                  </h4>
                  <div className="space-y-2">
                    {lastEval.reference.map((ref, i) => (
                      <div key={i} className="bg-neutral-800 rounded-xl p-4 text-sm text-neutral-100 leading-relaxed">
                        <span className="text-neutral-400 text-xs font-medium mr-2">版本 {i + 1}</span>
                        {ref}
                      </div>
                    ))}
                  </div>
                </div>

                {/* 优化建议 */}
                <div className="bg-neutral-100/80 rounded-xl p-4 border border-neutral-200/50">
                  <h4 className="text-sm font-bold text-neutral-700 mb-2">优化小建议</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">{lastEval.tip}</p>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full py-3.5 rounded-xl bg-neutral-900 text-white text-sm font-bold hover:bg-neutral-800 transition-all active:scale-[0.98]"
                >
                  {currentIdx < total - 1 ? "下一题" : "查看报告"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
