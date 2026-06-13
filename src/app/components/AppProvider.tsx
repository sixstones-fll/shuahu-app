"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import { appReducer, initialState, AppState } from "../types";

const STORAGE_KEY = "shuahu_user";

function getStoredUser() {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function setStoredUser(user: { id: string; avatar: string }) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<import("../types").AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (init) => {
    const user = getStoredUser();
    return {
      ...init,
      user,
      phase: (user ? "home" : "onboarding") as AppState["phase"],
    };
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}

export function useLocalStorage() {
  return { getStoredUser, setStoredUser };
}
