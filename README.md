# 话术训练员

> AI 情景话术练习与测评工具 —— 通过 6 道混合场景题，AI 即时点评，提升你的日常与职场沟通能力。

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/sixstones-fll/shuahu-app.git
cd shuahu-app
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境变量

复制 `.env.example` 为 `.env.local`，填入你的 OpenRouter API Key：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

获取 API Key：访问 [openrouter.ai](https://openrouter.ai/) → 注册 → Keys → Create Key

### 4. 启动开发服务器

```bash
npm run dev
```

打开 [http://localhost:3001](http://localhost:3001)

## 📋 功能特性

- ✅ **AI 动态出题** — 每轮 6 道（3 普通 + 3 压力场景），AI 实时生成，绝不重复
- ✅ **AI 单题评分** — 四维度评分（得体度/语气分寸/表达逻辑/风险避坑），满分 10 分
- ✅ **即时解析反馈** — 优点、建议、参考话术、优化技巧
- ✅ **综合报告** — 总分（60 分制）、评级、六维雷达图、总结与建议
- ✅ **语音输入** — 支持浏览器原生 Web Speech API 语音转文字
- ✅ **动画转场** — 点赞鼓励页 + 西装男转场页，4.5 秒自动跳转
- ✅ **响应式设计** — 移动端优先，完美适配手机/平板/桌面

## 🏗 技术栈

| 技术 | 用途 |
|------|------|
| Next.js 16 | React 框架（App Router） |
| TypeScript | 类型安全 |
| Tailwind CSS | 样式系统 |
| Framer Motion | 动画编排 |
| Recharts | 六维雷达图 |
| Zod | 运行时 Schema 校验 |
| OpenRouter API | AI 模型调用（moonshotai/kimi-k2.6） |

## 📁 项目结构

```
shuahu-app/
├── src/app/
│   ├── api/
│   │   ├── generate-questions/  # 题目生成 API
│   │   ├── evaluate/            # 单题评分 API
│   │   └── report/              # 综合报告 API
│   ├── components/
│   │   ├── AppProvider.tsx      # 全局状态 Context
│   │   ├── OnboardingModal.tsx  # 入场弹窗
│   │   ├── HomePage.tsx         # 主页
│   │   ├── QuizPage.tsx         # 答题页
│   │   ├── ThumbsPage.tsx       # 点赞鼓励动画页
│   │   ├── SuitManPage.tsx      # 西装男转场动画页
│   │   └── ReportPage.tsx       # 综合报告页
│   ├── lib/
│   │   ├── openrouter.ts        # OpenRouter API 封装
│   │   ├── schemas.ts           # Zod Schema 定义
│   │   └── mock-data.ts         # 假数据（降级用）
│   ├── types/
│   │   └── index.ts             # TypeScript 类型 + Reducer
│   ├── page.tsx                 # 主入口（路由分发）
│   ├── layout.tsx               # 根布局
│   └── globals.css              # 全局样式
├── public/                      # 静态资源
└── vercel.json                  # Vercel 部署配置
```

## 🔧 API 降级策略

所有 AI API 在以下情况会自动降级到本地 mock 数据：
- `OPENROUTER_API_KEY` 未配置
- 网络连接失败或超时（默认 30 秒）
- OpenRouter API 返回错误
- JSON 解析失败
- Zod Schema 校验失败

降级行为对用户完全透明，无需手动干预。

## 🌍 部署到 Vercel

### 一键部署

```bash
npx vercel
```

### 环境变量配置

在 Vercel Dashboard → Project Settings → Environment Variables 中添加：

| 变量名 | 值 |
|--------|-----|
| `OPENROUTER_API_KEY` | `sk-or-v1-xxxxxxxx` |

### 手动部署

```bash
vercel --prod
```

## 📝 许可证

MIT License

---

Made with ❤️ by [sixstones-fll](https://github.com/sixstones-fll)
