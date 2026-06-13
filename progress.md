# 话术训练员 · 开发进度

**最后更新**：2026-06-13
**当前版本**：前端原型 v1.0（假数据版）
**技术栈**：Next.js 16 + TypeScript + Tailwind CSS + Framer Motion + Recharts

---

## 一、已完成（47/58 任务）

### ✅ 项目基础架构
- Next.js 项目初始化（App Router / TypeScript / Tailwind CSS）
- 目录结构：`app/`、`components/`、`lib/`、`types/`
- 依赖安装：framer-motion、recharts、lucide-react
- 全局样式：米色背景 `#F5F5DC`、噪点纹理、模糊装饰斑点、自定义滚动条

### ✅ 全局状态与类型
- TypeScript 类型定义：`User`、`Question`、`AnswerRecord`、`Evaluation`、`Report`、`AppPhase`
- React Context + useReducer 全局状态管理
- localStorage 用户持久化（ID + Emoji头像）
- 会话级答题数据（内存存储，刷新清空）

### ✅ 入场弹窗（Onboarding）
- 强制弹窗：首次访问弹出，未设置无法进入
- ID 输入：2-8字符实时校验
- 10 个 Emoji 头像：5男5女卡通风格，单选高亮
- 确认按钮：条件满足后激活，写入 localStorage
- 再次访问：自动跳过弹窗，跳转主页

### ✅ 主页（Home）
- 顶部：产品名称 + 用户信息栏（头像 + ID）
- 主体：浮动消息图标动画 + 开始答题按钮
- 文案：「准备好提升你的话术了吗？」
- 交互：点击开始生成6题（假数据，随机打乱），跳转答题页

### ✅ 答题页（Quiz）
- 顶部导航：返回按钮 + 题号进度（第 X/6 题）+ 进度条
- 场景标签：普通场景/压力场景，不同样式
- 题目卡片：白色圆角卡片，黑灰文字
- 答题区：多行文本框 + 字数统计 + 语音输入按钮
- 提交按钮：加载态「AI分析中...」，防重复提交
- 假数据评分：模拟1.5秒延迟，返回预设评分

### ✅ 单题解析弹窗
- 得分展示：大分数块（0-10分）+ 评价文字 + 星星评分
- 你的回答：回显完整回答内容
- 优点 + 建议改进：绿/琥珀色标签卡片
- 参考话术：2版优化示范，深灰底白字重点展示
- 优化小建议：针对性答题技巧
- 下一题按钮：最后一题显示「查看报告」

### ✅ 点赞鼓励动画页
- 大拇指 SVG 图标：绘制动画 + 摇摆效果
- 闪光点缀：脉冲动画增强互动感
- 鼓励文案：「很棒！顺利完成全部答题 👍」
- 加载点动画：3个跳动圆点
- 自动跳转：4.5秒后跳转西装男页

### ✅ 西装男转场动画页
- 戴墨镜西装男 SVG：头→墨镜→西装→领带→领子，逐层绘制
- 转场文案：「报告生成中...正在分析你的沟通风格与能力维度」
- 进度条：4秒平滑填充动画
- 自动跳转：4.5秒后跳转报告页

### ✅ 综合报告页
- 总分&评级：大号字体展示（60分制）+ 评级标签（优秀/良好/一般/待提升）
- 六维雷达图：Recharts RadarChart，黑白灰线条，5分制
- 维度列表：6项能力分值网格展示
- 整体总结：根据总分生成的共性问题提炼
- 提升建议：5条分点个性化建议，带序号动画入场
- 底部按钮：「再来一轮」+「返回主页」
- 顶部导航：返回主页按钮

---

## 二、跳过/未执行的任务（11项）

### ⏭️ API 开发（6项）——使用假数据替代
| 任务 | 说明 |
|---|---|
| 5.2 | 题目生成 API Route（/api/generate-questions） |
| 6.1 | 单题评分 API Route（/api/evaluate） |
| 6.2 | 单题评分 Prompt 设计 |
| 6.3 | Zod Schema 校验 |
| 6.4 | 综合报告 API Route（/api/report） |
| 6.5 | 综合报告 Prompt 设计 |
| 6.6 | 报告结果 Zod Schema 校验 |

**替代方案**：`lib/mock-data.ts` 提供6道预设题目 + 循环评分数据 + 基于总分的报告生成

### ⏭️ 部署配置（5项）
| 任务 | 说明 |
|---|---|
| 10.1 | Vercel 项目连接 |
| 10.2 | 环境变量配置（OpenRouter API Key） |
| 10.3 | Vercel 部署设置 |
| 10.4 | 首次部署验证 |
| 10.5 | 端到端链路测试 |

---

## 三、下一步待办

### 🔜 Phase 2：接入真实 AI API（优先级：高）
1. **创建 API Route `/api/generate-questions`**
   - 调用 OpenRouter API（moonshotai/kimi-k2.6）
   - Prompt：生成3道普通场景题 + 3道压力场景题，JSON输出
   - 要求：每轮不重复、中文语境、相似度去重

2. **创建 API Route `/api/evaluate`**
   - 接收：题目 + 用户回答
   - 调用 OpenRouter API 评分
   - Prompt：四维度评分（得体度/语气分寸/表达逻辑/风险避坑），JSON输出
   - 返回：score / strengths / weaknesses / reference / tip

3. **创建 API Route `/api/report`**
   - 接收：6题回答数据
   - 调用 OpenRouter API 汇总
   - Prompt：六维能力分析 + 总分 + 评级 + 总结 + 建议，JSON输出
   - 返回：六维分值 + summary + suggestions

4. **错误处理**
   - API 超时重试（最多2次）
   - JSON 解析失败 fallback
   - 网络异常提示「网络开小差，请重试」
   - loading 状态管理

### 🔜 Phase 3：细节打磨（优先级：中）
- [ ] 页面切换时保持滚动位置
- [ ] 解析弹窗关闭后回到题目顶部
- [ ] 语音输入真实集成（当前为模拟）
- [ ] 动画页性能优化（减少重绘）
- [ ] 空状态处理（无题目时的展示）
- [ ] 错误边界（Error Boundary）

### 🔜 Phase 4：部署上线（优先级：中）
- [ ] Vercel 项目创建与配置
- [ ] 环境变量：OPENROUTER_API_KEY
- [ ] 构建验证与性能检查
- [ ] 域名配置（可选）

---

## 四、文件结构

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

## 五、运行方式

```bash
cd /d/jianzaixianshang/003/shuahu-app
npm run dev          # 开发模式 http://localhost:3001
npm run build        # 生产构建
npx next start       # 生产启动
```

---

## 六、假数据 → 真 API 切换点

| 功能 | 当前（假数据） | 目标（真 API） |
|---|---|---|
| 题目生成 | `MOCK_QUESTIONS` 数组 | `fetch('/api/generate-questions')` |
| 单题评分 | `getMockEvaluation(id)` | `fetch('/api/evaluate', {body})` |
| 综合报告 | `getMockReport(totalScore)` | `fetch('/api/report', {body})` |

切换方式：在 `QuizPage.tsx` 和 `ReportPage.tsx` 中将对应函数替换为 `fetch` 调用即可。
