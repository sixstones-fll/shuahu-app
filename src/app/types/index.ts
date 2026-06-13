export interface User {
  id: string;
  avatar: string;
}

export interface Question {
  id: number;
  scene: "普通场景" | "压力场景";
  title: string;
  content: string;
}

export interface Evaluation {
  score: number;
  userAnswer: string;
  strengths: string[];
  weaknesses: string[];
  reference: string[];
  tip: string;
}

export interface AnswerRecord {
  question: Question;
  answer: string;
  evaluation: Evaluation;
}

export interface Report {
  totalScore: number;
  rating: "优秀" | "良好" | "一般" | "待提升";
  dimensions: {
    name: string;
    score: number;
  }[];
  summary: string;
  suggestions: string[];
}

export type AppPhase =
  | "onboarding"
  | "home"
  | "quiz"
  | "thumbs"
  | "suitman"
  | "report";

export interface AppState {
  phase: AppPhase;
  user: User | null;
  questions: Question[];
  currentQuestionIndex: number;
  answers: AnswerRecord[];
  report: Report | null;
}

export type AppAction =
  | { type: "SET_USER"; user: User }
  | { type: "SET_PHASE"; phase: AppPhase }
  | { type: "SET_QUESTIONS"; questions: Question[] }
  | { type: "NEXT_QUESTION" }
  | { type: "ADD_ANSWER"; record: AnswerRecord }
  | { type: "SET_REPORT"; report: Report }
  | { type: "RESET_QUIZ" }
  | { type: "RESET_ALL" };

export const initialState: AppState = {
  phase: "onboarding",
  user: null,
  questions: [],
  currentQuestionIndex: 0,
  answers: [],
  report: null,
};

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.user };
    case "SET_PHASE":
      return { ...state, phase: action.phase };
    case "SET_QUESTIONS":
      return { ...state, questions: action.questions, currentQuestionIndex: 0, answers: [] };
    case "NEXT_QUESTION":
      return { ...state, currentQuestionIndex: state.currentQuestionIndex + 1 };
    case "ADD_ANSWER":
      return { ...state, answers: [...state.answers, action.record] };
    case "SET_REPORT":
      return { ...state, report: action.report };
    case "RESET_QUIZ":
      return {
        ...state,
        phase: "quiz",
        currentQuestionIndex: 0,
        answers: [],
        report: null,
      };
    case "RESET_ALL":
      return { ...initialState };
    default:
      return state;
  }
}
