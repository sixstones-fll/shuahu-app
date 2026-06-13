// OpenRouter API 封装模块
// 提供统一的 AI 调用接口，含重试和错误降级

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY || "";
const OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1";
const DEFAULT_MODEL = process.env.OPENROUTER_MODEL || "moonshotai/kimi-k2.6";
const API_TIMEOUT_MS = parseInt(process.env.API_TIMEOUT_MS || "30000", 10);
const MAX_RETRIES = 2;

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OpenRouterResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

/**
 * 调用 OpenRouter API，带重试机制
 * @param messages 消息列表
 * @param temperature 温度参数
 * @returns  assistant content 字符串
 */
export async function callOpenRouter(
  messages: OpenRouterMessage[],
  temperature = 0.7
): Promise<string> {
  // 检查 API Key
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (attempt > 0) {
      // 指数退避：1s, 2s
      await new Promise((r) => setTimeout(r, 1000 * attempt));
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

      const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://shuahu-app.vercel.app",
          "X-Title": "话术训练员",
        },
        body: JSON.stringify({
          model: DEFAULT_MODEL,
          messages,
          temperature,
          max_tokens: 4000,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorText = await response.text().catch(() => "Unknown error");
        throw new Error(`OpenRouter API error (${response.status}): ${errorText}`);
      }

      const data = (await response.json()) as OpenRouterResponse;
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("OpenRouter API returned empty content");
      }

      return content;
    } catch (err) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.error(`OpenRouter attempt ${attempt + 1} failed:`, lastError.message);
    }
  }

  throw lastError || new Error("All OpenRouter attempts failed");
}

/**
 * 安全解析 JSON，失败时返回 null
 */
export function safeJsonParse<T>(jsonString: string): T | null {
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

/**
 * 辅助函数：从 API 响应中提取 JSON（处理可能的 markdown 代码块包裹）
 */
export function extractJsonFromMarkdown(content: string): string {
  const codeBlockMatch = content.match(/```(?:json)?\n?([\s\S]*?)```/);
  if (codeBlockMatch) {
    return codeBlockMatch[1].trim();
  }
  // 尝试直接找到 JSON 对象
  const jsonMatch = content.match(/(\{[\s\S]*\})/);
  if (jsonMatch) {
    return jsonMatch[1].trim();
  }
  return content.trim();
}
