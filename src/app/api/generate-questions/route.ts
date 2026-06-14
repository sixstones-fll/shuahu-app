// API Route: /api/generate-questions
// 调用 OpenRouter API 动态生成 6 道题目（3普通 + 3压力），随机打乱顺序
// 失败时降级到 mock data

import { NextResponse } from "next/server";
import { callOpenRouter, extractJsonFromMarkdown } from "../../lib/openrouter";
import { GenerateQuestionsResponseSchema } from "../../lib/schemas";
import { getAllQuestionVariantsForAPI, saveAPIUsedVariants } from "../../lib/mock-data";

export async function GET() {
  try {
    const content = await callOpenRouter(
      [
        {
          role: "system",
          content: `你是一个专业的中文沟通话术训练题目生成专家。请生成6道情景沟通题目，用于帮助用户提升日常沟通和职场话术能力。

要求：
1. 生成3道"普通场景"题目：日常社交、亲友往来、简单求助、常规赞美等低压力场景
2. 生成3道"压力场景"题目：职场冲突、被质疑、不合理请求、当众沟通、立场博弈等高压力场景
3. 每道题目包含：id（1-6）、scene（"普通场景"或"压力场景"）、title（场景标题，5-15字）、content（具体情景描述，50-150字）
4. 题目要贴近中国职场和日常生活，语言自然
5. 每轮生成的题目要有创意，避免重复

必须以 JSON 格式输出，格式如下：
{
  "questions": [
    {
      "id": 1,
      "scene": "普通场景",
      "title": "同事请你帮忙",
      "content": "具体情景描述..."
    },
    ...共6道
  ]
}`,
        },
        {
          role: "user",
          content: `请生成6道全新的沟通话术训练题目。当前时间戳：${Date.now()}，请确保题目创意独特。`,
        },
      ],
      0.9 // 较高温度以增加多样性
    );

    // 提取 JSON
    const jsonStr = extractJsonFromMarkdown(content);
    const parsed = JSON.parse(jsonStr) as unknown;

    // Zod 校验
    const validated = GenerateQuestionsResponseSchema.parse(parsed);

    // 打乱顺序
    const shuffled = [...validated.questions].sort(() => Math.random() - 0.5);
    // 重新分配 id
    const finalQuestions = shuffled.map((q, i) => ({ ...q, id: i + 1 }));

    return NextResponse.json({ questions: finalQuestions });
  } catch (error) {
    console.error("Generate questions API error:", error);

    // 降级到 mock data — 使用统一的去重逻辑，确保两轮不重复
    const { questions, usedVariants } = getAllQuestionVariantsForAPI();
    // 保存已使用记录到 sessionStorage（通过前端传递）
    // 注意：API 端无法直接访问 sessionStorage，需要前端在收到响应后自行保存
    // 这里我们在响应中包含 usedVariants，让前端处理

    return NextResponse.json(
      { questions, _fallback: true, usedVariants },
      { status: 200 }
    );
  }
}
