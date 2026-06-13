"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AVATARS } from "../lib/mock-data";
import { useApp, useLocalStorage } from "./AppProvider";

export default function OnboardingModal() {
  const { dispatch } = useApp();
  const { setStoredUser } = useLocalStorage();
  const [userId, setUserId] = useState("");
  const [selectedAvatar, setSelectedAvatar] = useState<number>(-1);

  const isValid = userId.length >= 2 && userId.length <= 8 && selectedAvatar >= 0;

  const handleConfirm = () => {
    if (!isValid) return;
    const user = { id: userId, avatar: AVATARS[selectedAvatar] };
    setStoredUser(user);
    dispatch({ type: "SET_USER", user });
    dispatch({ type: "SET_PHASE", phase: "home" });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl"
        >
          <h2 className="text-xl font-bold text-neutral-900 text-center mb-1">
            欢迎来到话术训练员
          </h2>
          <p className="text-sm text-neutral-500 text-center mb-6">
            设置你的身份，开始练习
          </p>

          {/* ID 输入 */}
          <div className="mb-5">
            <label className="text-sm font-medium text-neutral-700 block mb-2">
              你的昵称
            </label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value.slice(0, 8))}
              placeholder="2-8 个字符"
              className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-300 transition-all text-center text-lg"
            />
            {userId.length > 0 && userId.length < 2 && (
              <p className="text-xs text-red-400 mt-1.5 text-center">
                至少需要 2 个字符
              </p>
            )}
          </div>

          {/* 头像选择 */}
          <div className="mb-6">
            <label className="text-sm font-medium text-neutral-700 block mb-3">
              选择一个头像
            </label>
            <div className="grid grid-cols-5 gap-3">
              {AVATARS.map((avatar, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAvatar(i)}
                  className={`aspect-square rounded-2xl text-2xl flex items-center justify-center transition-all ${
                    selectedAvatar === i
                      ? "bg-neutral-900 text-white scale-110 ring-2 ring-neutral-900 ring-offset-2"
                      : "bg-neutral-100 hover:bg-neutral-200"
                  }`}
                >
                  {avatar}
                </button>
              ))}
            </div>
          </div>

          {/* 确认按钮 */}
          <button
            onClick={handleConfirm}
            disabled={!isValid}
            className="w-full py-3.5 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-[0.98]"
          >
            确认进入
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
