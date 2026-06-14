// API Route: /api/evaluate
// 调用 OpenRouter API 对单题回答进行评分
// 失败时降级到 mock data

import { NextResponse } from "next/server";
import { callOpenRouter, extractJsonFromMarkdown } from "../../lib/openrouter";
import {
  EvaluateRequestSchema,
  EvaluateResponseSchema,
  type EvaluateRequest,
} from "../../lib/schemas";
import { getMockEvaluationById } from "../../lib/mock-data";

export async function POST(request: Request) {
  // 先读取 body 并保存，避免后续重复读取
  let rawBody: unknown;
  try {
    rawBody = await request.json();
  } catch {
    return NextResponse.json(
      { evaluation: getMockEvaluationById(1), _fallback: true },
      { status: 200 }
    );
  }

  try {
    // 校验请求体
    const validated = EvaluateRequestSchema.parse(rawBody);

    const content = await callOpenRouter(
      [
        {
          role: "system",
          content: `你是一个专业的中文沟通话术评估专家。请对用户回答进行评分和点评。

评分标准（满分10分）：
1. 得体度（0-2.5分）：回应是否得体、礼貌、符合社交规范
2. 语气分寸（0-2.5分）：语气是否恰当，不过于强硬也不过于软弱
3. 表达逻辑（0-2.5分）：表达是否清晰、有条理、有说服力
4. 风险避坑（0-2.5分）：是否避免了常见的沟通陷阱和误区

输出要求：
- score: 总分（0-10的整数）
- strengths: 优点列表（2-3条，每条20-50字）
- weaknesses: 建议改进点（2-3条，每条20-50字）
- reference: 参考话术（1-2版优化示范，每版50-150字）
- tip: 优化小建议（1条，30-80字的针对性答题技巧）

必须以 JSON 格式输出：
{
  "evaluation": {
    "score": 7,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "reference": ["..."],
    "tip": "..."
  }
}`,
        },
        {
          role: "user",
          content: buildEvaluatePrompt(validated),
        },
      ],
      0.6
    );

    // 提取 JSON
    const jsonStr = extractJsonFromMarkdown(content);
    const parsed = JSON.parse(jsonStr) as unknown;

    // Zod 校验
    const result = EvaluateResponseSchema.parse(parsed);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Evaluate API error:", error);

    // 降级到 mock data — 使用已保存的 rawBody
    let questionId = 1;
    try {
      if (rawBody && typeof rawBody === "object" && "questionId" in rawBody) {
        questionId = (rawBody as Record<string, unknown>).questionId as number || 1;
      }
    } catch {
      questionId = 1;
    }

    const mockEval = getMockEvaluationById(questionId);
    return NextResponse.json(
      { evaluation: mockEval, _fallback: true },
      { status: 200 }
    );
  }
}

function buildEvaluatePrompt(req: EvaluateRequest): string {
  return `题目信息：
场景：${req.scene}
标题：${req.title}
内容：${req.content}

用户回答：
${req.userAnswer}

请对上述回答进行专业评分和点评。`;
}
