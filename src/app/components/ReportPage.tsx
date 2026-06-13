"use client";

import { motion } from "framer-motion";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft, RotateCcw, Home, Star, Target, Zap, TrendingUp } from "lucide-react";
import { useApp } from "./AppProvider";
import { getMockReport } from "../lib/mock-data";

export default function ReportPage() {
  const { state, dispatch } = useApp();

  // 计算总分
  const totalScore = state.answers.reduce((sum, a) => sum + a.evaluation.score, 0);
  const report = getMockReport(totalScore);

  const handleRestart = () => {
    dispatch({ type: "RESET_QUIZ" });
  };

  const handleHome = () => {
    dispatch({ type: "SET_PHASE", phase: "home" });
  };

  return (
    <div className="min-h-full flex flex-col bg-[#F5F5DC] noise-bg-light relative">
      <ChatBgSpots />

      {/* 顶部 */}
      <header className="relative z-10 px-4 pt-6 pb-2">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={handleHome}
            className="flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">返回</span>
          </button>
          <h1 className="text-lg font-bold text-neutral-800">本轮答题报告</h1>
          <div className="w-14" />
        </div>
      </header>

      {/* 报告内容 */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* 总分 + 评级 */}
          <div className="bg-white rounded-2xl border border-white/10 p-6 shadow-lg shadow-black/10 text-center">
            <p className="text-sm text-neutral-500 mb-2">本轮总分</p>
            <div className="flex items-baseline justify-center gap-1 mb-2">
              <span className="text-5xl font-bold text-neutral-900">{totalScore}</span>
              <span className="text-xl text-neutral-400">/ 60</span>
            </div>
            <span
              className={`inline-block px-4 py-1.5 rounded-full text-sm font-bold ${
                report.rating === "优秀"
                  ? "bg-neutral-900 text-white"
                  : report.rating === "良好"
                  ? "bg-neutral-700 text-white"
                  : report.rating === "一般"
                  ? "bg-neutral-400 text-white"
                  : "bg-neutral-300 text-neutral-700"
              }`}
            >
              {report.rating}
            </span>
          </div>

          {/* 雷达图 */}
          <div className="bg-white rounded-2xl border border-white/10 p-6 shadow-lg shadow-black/10">
            <h3 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <Target className="w-4 h-4" />
              六维能力分析
            </h3>
            <div className="h-64 -ml-4">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={report.dimensions}>
                  <PolarGrid stroke="#e5e5e5" />
                  <PolarAngleAxis
                    dataKey="name"
                    tick={{ fontSize: 11, fill: "#737373" }}
                  />
                  <PolarRadiusAxis
                    angle={90}
                    domain={[0, 5]}
                    tick={{ fontSize: 9, fill: "#a3a3a3" }}
                    tickCount={6}
                  />
                  <Radar
                    name="能力值"
                    dataKey="score"
                    stroke="#1a1a1a"
                    fill="#1a1a1a"
                    fillOpacity={0.08}
                    strokeWidth={2}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            {/* 维度分值列表 */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {report.dimensions.map((d) => (
                <div key={d.name} className="text-center">
                  <p className="text-xs text-neutral-500">{d.name}</p>
                  <p className="text-sm font-bold text-neutral-800">{d.score}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 整体总结 */}
          <div className="bg-white rounded-2xl border border-white/10 p-6 shadow-lg shadow-black/10">
            <h3 className="text-base font-bold text-neutral-900 mb-3 flex items-center gap-2">
              <Star className="w-4 h-4" />
              整体总结
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">{report.summary}</p>
          </div>

          {/* 提升建议 */}
          <div className="bg-white rounded-2xl border border-white/10 p-6 shadow-lg shadow-black/10">
            <h3 className="text-base font-bold text-neutral-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              提升建议
            </h3>
            <ul className="space-y-3">
              {report.suggestions.map((s, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-0.5 w-5 h-5 rounded-md bg-neutral-900 text-white text-xs flex items-center justify-center shrink-0 font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-neutral-600 leading-relaxed">{s}</p>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 按钮 */}
          <div className="grid grid-cols-2 gap-4 pt-2 pb-8">
            <button
              onClick={handleRestart}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-neutral-900 text-white font-bold hover:bg-neutral-800 transition-all active:scale-[0.98]"
            >
              <RotateCcw className="w-4 h-4" />
              再来一轮
            </button>
            <button
              onClick={handleHome}
              className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-white border border-neutral-200 text-neutral-800 font-bold hover:bg-neutral-50 transition-all active:scale-[0.98]"
            >
              <Home className="w-4 h-4" />
              返回主页
            </button>
          </div>
        </motion.div>
      </main>
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
