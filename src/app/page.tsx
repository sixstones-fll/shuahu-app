"use client";

import { AppProvider, useApp } from "./components/AppProvider";
import OnboardingModal from "./components/OnboardingModal";
import HomePage from "./components/HomePage";
import QuizPage from "./components/QuizPage";
import ThumbsPage from "./components/ThumbsPage";
import SuitManPage from "./components/SuitManPage";
import ReportPage from "./components/ReportPage";

function App() {
  const { state } = useApp();

  switch (state.phase) {
    case "onboarding":
      return <OnboardingModal />;
    case "home":
      return <HomePage />;
    case "quiz":
      return <QuizPage />;
    case "thumbs":
      return <ThumbsPage />;
    case "suitman":
      return <SuitManPage />;
    case "report":
      return <ReportPage />;
    default:
      return <HomePage />;
  }
}

export default function Page() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}
