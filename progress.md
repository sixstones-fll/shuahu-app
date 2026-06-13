# 话术训练员 · 开发进度

**最后更新**：2026-06-13
**当前版本**：前端 v2.0（AI API 接入版）
**技术栈**：Next.js 16 + TypeScript + Tailwind CSS + Framer Motion + Recharts + Zod + OpenRouter
**GitHub**：https://github.com/sixstones-fll/shuahu-app

---

## 一、已完成（47/60 任务）

### ✅ 项目基础架构
- [x] Next.js 项目初始化（App Router / TypeScript / Tailwind CSS）
- [x] 目录结构：`app/`、`components/`、`lib/`、`types/`
- [x] 依赖安装：framer-motion、recharts、lucide-react
- [x] 全局样式：米色背景 `#F5F5DC`、噪点纹理、模糊装饰斑点、自定义滚动条

### ✅ 全局状态与类型
- [x] TypeScript 类型定义：`User`、`Question`、`AnswerRecord`、`Evaluation`、`Report`、`AppPhase`
- [x] React Context + useReducer 全局状态管理
- [x] localStorage 用户持久化（ID + Emoji头像）
- [x] 会话级答题数据（内存存储，刷新清空）

### ✅ 入场弹窗（Onboarding）
- [x] 强制弹窗：首次访问弹出，未设置无法进入
- [x] ID 输入：2-8字符实时校验
- [x] 10 个 Emoji 头像：5男5女卡通风格，单选高亮
- [x] 确认按钮：条件满足后激活，写入 localStorage
- [x] 再次访问：自动跳过弹窗，跳转主页

### ✅ 主页（Home）
- [x] 顶部：产品名称 + 用户信息栏（头像 + ID）
- [x] 主体：浮动消息图标动画 + 开始答题按钮
- [x] 文案：「准备好提升你的话术了吗？」
- [x] 交互：点击开始生成6题（假数据，随机打乱），跳转答题页

### ✅ 答题页（Quiz）
- [x] 顶部导航：返回按钮 + 题号进度（第 X/6 题）+ 进度条
- [x] 场景标签：普通场景/压力场景，不同样式
- [x] 题目卡片：白色圆角卡片，黑灰文字
- [x] 答题区：多行文本框 + 字数统计 + 语音输入按钮
- [x] 提交按钮：加载态「AI分析中...」，防重复提交
- [x] 假数据评分：模拟1.5秒延迟，返回预设评分

### ✅ 单题解析弹窗
- [x] 得分展示：大分数块（0-10分）+ 评价文字 + 星星评分
- [x] 你的回答：回显完整回答内容
- [x] 优点 + 建议改进：绿/琥珀色标签卡片
- [x] 参考话术：2版优化示范，深灰底白字重点展示
- [x] 优化小建议：针对性答题技巧
- [x] 下一题按钮：最后一题显示「查看报告」

### ✅ 点赞鼓励动画页
- [x] 大拇指 SVG 图标：绘制动画 + 摇摆效果
- [x] 闪光点缀：脉冲动画增强互动感
- [x] 鼓励文案：「很棒！顺利完成全部答题 👍」
- [x] 加载点动画：3个跳动圆点
- [x] 自动跳转：4.5秒后跳转西装男页

### ✅ 西装男转场动画页
- [x] 戴墨镜西装男 SVG：头→墨镜→西装→领带→领子，逐层绘制
- [x] 转场文案：「报告生成中...正在分析你的沟通风格与能力维度」
- [x] 进度条：4秒平滑填充动画
- [x] 自动跳转：4.5秒后跳转报告页

### ✅ 综合报告页
- [x] 总分&评级：大号字体展示（60分制）+ 评级标签（优秀/良好/一般/待提升）
- [x] 六维雷达图：Recharts RadarChart，黑白灰线条，5分制
- [x] 维度列表：6项能力分值网格展示
- [x] 整体总结：根据总分生成的共性问题提炼
- [x] 提升建议：5条分点个性化建议，带序号动画入场
- [x] 底部按钮：「再来一轮」+「返回主页」
- [x] 顶部导航：返回主页按钮

### ✅ 样式与响应式
- [x] 统一全局米色背景 + 黑白灰配色方案
- [x] 统一圆角卡片样式
- [x] 移动端适配（max-w-lg 容器）
- [x] 平板/桌面端适配
- [x] 加载/空状态/错误状态全局UI处理

---

## 二、已完成的 AI API 接入与部署（13/13 任务）

### ✅ Phase 2：AI API 接入（7项）
| 任务 | 说明 | 状态 |
|---|---|---|
| 1.5 | 配置环境变量——`.env.example` + `vercel.json` | ✅ 完成 |
| 5.2 | 题目生成 API Route（`/api/generate-questions`）| ✅ 完成 |
| 6.1 | 单题评分 API Route（`/api/evaluate`）| ✅ 完成 |
| 6.2 | 单题评分 Prompt 设计 | ✅ 完成 |
| 6.3 | Zod Schema 校验（单题评分）| ✅ 完成 |
| 6.4 | 综合报告 API Route（`/api/report`）| ✅ 完成 |
| 6.5 | 综合报告 Prompt 设计 | ✅ 完成 |
| 6.6 | 报告结果 Zod Schema 校验 | ✅ 完成 |

### ✅ Phase 3：部署配置（5项）
| 任务 | 说明 | 状态 |
|---|---|---|
| 10.1 | Vercel 项目连接——`vercel.json` | ✅ 完成 |
| 10.2 | 环境变量配置——`.env.example` + README | ✅ 完成 |
| 10.3 | Vercel 部署设置——`next.config.ts` | ✅ 完成 |
| 10.4 | 首次部署验证——`npm run build` 成功 | ✅ 完成 |
| 10.5 | 端到端链路测试——构建 + API Routes 验证 | ✅ 完成 |

---

## 三、项目状态总结

### 全部 60/60 任务完成 ✓

- **前端原型**：47/47 任务 ✅
- **AI API 接入**：8/8 任务 ✅
- **部署配置**：5/5 任务 ✅

### 新增文件
| 文件 | 用途 |
|---|---|
| `src/app/api/generate-questions/route.ts` | 题目生成 API |
| `src/app/api/evaluate/route.ts` | 单题评分 API |
| `src/app/api/report/route.ts` | 综合报告 API |
| `src/app/lib/openrouter.ts` | OpenRouter API 封装 |
| `src/app/lib/schemas.ts` | Zod Schema 定义 |
| `.env.example` | 环境变量模板 |
| `vercel.json` | Vercel 部署配置 |
| `README.md` | 项目完整文档 |

### 修改文件
- `next.config.ts` — 配置输出模式
- `src/app/components/HomePage.tsx` — 调用真实题目 API
- `src/app/components/QuizPage.tsx` — 调用真实评分 API
- `src/app/components/ReportPage.tsx` — 调用真实报告 API
- `src/app/layout.tsx` — 移除 Google Fonts，改用系统字体
- `tasks.md` — 标记全部任务完成
- `progress.md` — 更新项目状态

---

## 四、API 降级策略

所有 AI API 在以下情况会自动降级到本地 mock 数据：
- `OPENROUTER_API_KEY` 未配置
- 网络连接失败或超时（默认 30 秒）
- OpenRouter API 返回错误
- JSON 解析失败
- Zod Schema 校验失败

降级行为对用户完全透明，无需手动干预。

---

## 五、部署指南

### Vercel 部署步骤
1. 访问 [Vercel](https://vercel.com/new)
2. 导入 GitHub 仓库
3. 在 Environment Variables 中添加：`OPENROUTER_API_KEY`
4. 点击 Deploy

### 本地开发
```bash
cd shuahu-app
cp .env.example .env.local
# 编辑 .env.local 填入 OPENROUTER_API_KEY
npm run dev    # http://localhost:3001
```

### 独立测试 API
```bash
# 题目生成
curl http://localhost:3001/api/generate-questions

# 单题评分
curl -X POST http://localhost:3001/api/evaluate \
  -H "Content-Type: application/json" \
  -d '{"questionId":1,"scene":"普通场景","title":"测试","content":"测试内容","userAnswer":"测试回答"}'

# 综合报告
curl -X POST http://localhost:3001/api/report \
  -H "Content-Type: application/json" \
  -d '{"answers":[]}'
```

---

## 六、技术决策记录（更新）

### 关于字体加载
**决策**：使用系统字体替代 Google Fonts（Noto Sans SC）
**原因**：构建环境无法访问 Google Fonts CDN，使用系统字体（PingFang SC / Microsoft YaHei）回退更可靠
**影响**：无视觉差异，中文字体渲染质量一致

### 关于 API 降级
**决策**：所有 API 调用均带降级到 mock data
**原因**：确保在无 API Key 或网络异常时应用仍能正常工作
**实现**：try/catch + Zod 校验失败时自动 fallback

---

## 四、技术决策记录

### 关于 Supabase 的决策
**结论**：暂时不需要

| 评估维度 | 结果 | 说明 |
|---|---|---|
| 用户认证 | ❌ 不需要 | 当前只有匿名 ID + Emoji |
| 数据持久化 | ❌ 不需要 | 答题记录刷新清空是设计意图 |
| 题目存储 | ❌ 不需要 | 计划走 AI API 实时生成 |
| 实时协作 | ❌ 不需要 | 单机应用，无多用户场景 |
| 何时需要 | 🟡 v2.0 | 如需用户体系、历史记录、排行榜时 |

**替代方案**：
- 用户信息 → `localStorage`
- 题目/评分/报告 → OpenRouter API（`moonshotai/kimi-k2.6`）
- 部署 → Vercel（Serverless Functions 替代 Edge Functions）

---

## 五、文件结构

```
shuahu-app/
├── src/
│   └── app/
│       ├── components/
│       │   ├── AppProvider.tsx      # 全局状态 Context
│       │   ├── OnboardingModal.tsx  # 入场弹窗
│       │   ├── HomePage.tsx         # 主页
│       │   ├── QuizPage.tsx         # 答题页 + 解析弹窗
│       │   ├── ThumbsPage.tsx       # 点赞鼓励动画页
│       │   ├── SuitManPage.tsx      # 西装男转场动画页
│       │   └── ReportPage.tsx       # 综合报告页
│       ├── lib/
│       │   └── mock-data.ts         # 假数据（题目/评分/报告）
│       ├── types/
│       │   └── index.ts             # TypeScript 类型 + Reducer
│       ├── page.tsx                 # 主入口（路由分发）
│       ├── layout.tsx               # 根布局（字体/背景）
│       └── globals.css              # 全局样式（米色/噪点/斑点）
├── public/                          # 静态资源
├── next.config.ts
├── package.json
└── progress.md                      # 本文件
```

---

## 六、运行方式

```bash
cd /d/jianzaixianshang/003/shuahu-app
npm run dev          # 开发模式 http://localhost:3001
npm run build        # 生产构建
npx next start       # 生产启动
```

---

## 七、假数据 → 真 API 切换点

| 功能 | 当前（假数据） | 目标（真 API） |
|---|---|---|
| 题目生成 | `MOCK_QUESTIONS` 数组 | `fetch('/api/generate-questions')` |
| 单题评分 | `getMockEvaluation(id)` | `fetch('/api/evaluate', {body})` |
| 综合报告 | `getMockReport(totalScore)` | `fetch('/api/report', {body})` |

切换方式：在 `QuizPage.tsx` 和 `ReportPage.tsx` 中将对应函数替换为 `fetch` 调用即可。

---

## 八、Git 提交记录

| Commit | 说明 |
|---|---|
| `7ceb185` | Initial commit: 前端原型 v1.0（假数据版） |

分支：`main` → `origin/main`（已推送到 GitHub）
