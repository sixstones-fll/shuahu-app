// Zod Schema 定义 - 用于 API 请求/响应的类型安全校验
// 所有 AI API 返回的数据结构都在这里定义

import { z } from "zod";

// ===== 题目生成 API Schema =====

export const QuestionSchema = z.object({
  id: z.number(),
  scene: z.enum(["普通场景", "压力场景"]),
  title: z.string().min(1).max(50),
  content: z.string().min(10).max(500),
});

export const GenerateQuestionsResponseSchema = z.object({
  questions: z.array(QuestionSchema).length(6),
});

export type Question = z.infer<typeof QuestionSchema>;
export type GenerateQuestionsResponse = z.infer<typeof GenerateQuestionsResponseSchema>;

// ===== 单题评分 API Schema =====

export const EvaluationSchema = z.object({
  score: z.number().min(0).max(10),
  strengths: z.array(z.string()).min(1).max(5),
  weaknesses: z.array(z.string()).min(1).max(5),
  reference: z.array(z.string()).min(1).max(3),
  tip: z.string().min(5).max(300),
});

export const EvaluateRequestSchema = z.object({
  questionId: z.number(),
  scene: z.enum(["普通场景", "压力场景"]),
  title: z.string(),
  content: z.string(),
  userAnswer: z.string().min(1),
});

export const EvaluateResponseSchema = z.object({
  evaluation: EvaluationSchema,
});

export type Evaluation = z.infer<typeof EvaluationSchema>;
export type EvaluateRequest = z.infer<typeof EvaluateRequestSchema>;
export type EvaluateResponse = z.infer<typeof EvaluateResponseSchema>;

// ===== 综合报告 API Schema =====

export const DimensionSchema = z.object({
  name: z.string(),
  score: z.number().min(0).max(5),
});

export const ReportSchema = z.object({
  totalScore: z.number().min(0).max(60),
  rating: z.enum(["优秀", "良好", "一般", "待提升"]),
  dimensions: z.array(DimensionSchema).length(6),
  summary: z.string().min(10).max(500),
  suggestions: z.array(z.string()).min(3).max(8),
});

export const ReportRequestSchema = z.object({
  answers: z.array(
    z.object({
      question: QuestionSchema,
      answer: z.string(),
      evaluation: EvaluationSchema,
    })
  ).min(1).max(6),
});

export const ReportResponseSchema = z.object({
  report: ReportSchema,
});

export type Dimension = z.infer<typeof DimensionSchema>;
export type Report = z.infer<typeof ReportSchema>;
export type ReportRequest = z.infer<typeof ReportRequestSchema>;
export type ReportResponse = z.infer<typeof ReportResponseSchema>;
