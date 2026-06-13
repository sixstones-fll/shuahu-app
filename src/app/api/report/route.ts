// API Route: /api/report
// 调用 OpenRouter API 生成综合报告
// 失败时降级到 mock data

import { NextResponse } from "next/server";
import { callOpenRouter, extractJsonFromMarkdown } from "../../lib/openrouter";
import {
  ReportRequestSchema,
  ReportResponseSchema,
  type ReportRequest,
} from "../../lib/schemas";
import { getMockReport } from "../../lib/mock-data";

export async function POST(request: Request) {
  // 先读取 body 并保存，避免后续重复读取
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { report: getMockReport(0), _fallback: true },
      { status: 200 }
    );
  }

  // 计算总分（从原始数据中计算，不依赖 schema 校验）
  let totalScore = 0;
  try {
    const body = rawBody as Record<string, unknown>;
    const answers = body.answers as Array<Record<string, unknown>> | undefined;
    if (answers && Array.isArray(answers)) {
      totalScore = answers.reduce(
        (sum: number, a: Record<string, unknown>) => {
          const evalData = a.evaluation as Record<string, unknown> | undefined;
          return sum + (typeof evalData?.score === "number" ? evalData.score : 0);
        },
        0
      );
    }
  } catch {
    totalScore = 0;
  }

  try {
    // 校验请求体 — 忽略 userAnswer 字段（前端传来的 evaluation 包含 userAnswer）
    const bodyForValidate = rawBody as Record<string, unknown>;
    const answersArr = bodyForValidate.answers as Array<Record<string, unknown>> | undefined;
    if (answersArr && Array.isArray(answersArr)) {
      bodyForValidate.answers = answersArr.map((a: Record<string, unknown>) => {
        const evalData = a.evaluation as Record<string, unknown> | undefined;
        return {
          question: a.question,
          answer: a.answer,
          evaluation: {
            score: typeof evalData?.score === "number" ? evalData.score : 0,
            strengths: Array.isArray(evalData?.strengths) ? evalData.strengths : [],
            weaknesses: Array.isArray(evalData?.weaknesses) ? evalData.weaknesses : [],
            reference: Array.isArray(evalData?.reference) ? evalData.reference : [],
            tip: typeof evalData?.tip === "string" ? evalData.tip : "",
          },
        };
      });
    }
    const validated = ReportRequestSchema.parse(bodyForValidate);

    const content = await callOpenRouter(
      [
        {
          role: "system",
          content: `你是一个专业的沟通能力分析专家。请根据用户的6道答题记录，生成综合能力分析报告。

分析维度（每项0-5分，保留1位小数）：
1. 分寸把控：在不同场景中把握沟通尺度的能力
2. 拒绝能力：在需要拒绝时既维护关系又守住边界的能力
3. 临场应变：面对突发情况快速反应和调整的能力
4. 表达逻辑：表达清晰、有条理、有说服力的能力
5. 共情能力：理解对方立场和感受的能力
6. 气场状态：在沟通中展现自信和从容的能力

输出要求：
- totalScore: 总分（0-60的整数，6题得分之和）
- rating: 评级（"优秀"48-60分/"良好"36-47分/"一般"24-35分/"待提升"0-23分）
- dimensions: 6项能力分值数组，每项包含 name 和 score
- summary: 整体总结（80-150字，提炼共性问题）
- suggestions: 提升建议（4-6条，每条30-80字）

必须以 JSON 格式输出：
{
  "report": {
    "totalScore": 42,
    "rating": "良好",
    "dimensions": [
      {"name": "分寸把控", "score": 3.5},
      ...
    ],
    "summary": "...",
    "suggestions": ["...", "..."]
  }
}`,
        },
        {
          role: "user",
          content: buildReportPrompt(validated, totalScore),
        },
      ],
      0.7
    );

    // 提取 JSON
    const jsonStr = extractJsonFromMarkdown(content);
    const parsed = JSON.parse(jsonStr) as unknown;

    // Zod 校验
    const result = ReportResponseSchema.parse(parsed);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Report API error:", error);

    // 降级到 mock data — 使用预先计算好的 totalScore
    const mockReport = getMockReport(totalScore);
    return NextResponse.json(
      { report: mockReport, _fallback: true },
      { status: 200 }
    );
  }
}

function buildReportPrompt(req: ReportRequest, totalScore: number): string {
  const answersSummary = req.answers
    .map(
      (a, i) => `\n【第${i + 1}题】${a.question.scene} - ${a.question.title}
用户回答：${a.answer}
得分：${a.evaluation.score}/10
优点：${a.evaluation.strengths.join("；")}
不足：${a.evaluation.weaknesses.join("；")}`
    )
    .join("\n");

  return `用户答题记录：
${answersSummary}

总分：${totalScore}/60

请生成综合能力分析报告。`;
}
