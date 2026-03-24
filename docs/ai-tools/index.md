# AI 编码工具安装指南

> 适合小白，从零开始，5 分钟跑通

## 先搞清楚：你需要哪个？

| 工具 | 费用 | 适合谁 |
|------|------|--------|
| **OpenCode** ⭐ | **有免费模型**，其他按量付费 | 普通用户首选，够用且免费 |
| Claude Code | 订阅制 $20-100/月 | 重度用户，需要最强模型 |
| Gemini CLI | 有免费额度 | 需要处理图片、长文档 |
| Codex | 按量付费 | 需要 ChatGPT Plus 订阅 |

**小白建议**：先装 **OpenCode**，用免费模型，够用再考虑付费。

---

## 文档导航

### 新手必读

1. **[前置环境安装](./prerequisites)** - 装 Node.js（所有工具都需要）
2. **[OpenCode 安装配置](./opencode)** ⭐ - 推荐，有免费模型

### 其他工具

3. **[Claude Code](./claude-code)** - Anthropic 出品
4. **[Gemini CLI](./gemini-cli)** - Google 出品
5. **[Codex](./codex)** - OpenAI 出品

### 进阶配置

6. **[CC-Switch](./cc-switch)** - 统一管理多个工具配置
7. **[代理配置](./proxy)** - 国内加速访问
8. **[常见问题](./faq)** - 遇到问题先看这里

---

## 5 分钟快速上手

### 小白版（免费）

```
1. 装 Node.js     → https://nodejs.org 下载
2. 装 OpenCode   → npm install -g opencode-ai
3. 注册免费账号   → https://opencode.ai/zen
4. 配置 Key      → opencode auth login
5. 开始用       → opencode
```

### 进阶版（付费）

```
1. 装 Node.js     → https://nodejs.org 下载
2. 装所有工具     → npm install -g opencode-ai @anthropic-ai/claude-code
3. 买 API Key    → 各平台购买
4. 装 CC-Switch  → 统一管理配置
5. 开始用       → opencode / claude / codex
```

---

## 获取 API Key

| 提供商 | 获取地址 | 免费额度 |
|--------|----------|---------|
| OpenCode Zen | https://opencode.ai/zen | 有免费模型 |
| Anthropic | https://console.anthropic.com/settings/keys | $5 新用户 |
| Google | https://aistudio.google.com/apikey | 有免费额度 |
| OpenAI | https://platform.openai.com/api-keys | 无 |

---

*最后更新：2026-03-24*
