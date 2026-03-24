# Claude Code 安装配置

> Anthropic 出品，深度理解，结构化输出

## 安装

### macOS

```bash
# Homebrew
brew install anthropic/tap/claude-code

# 或 npm
npm install -g @anthropic-ai/claude-code
```

### Windows

```powershell
npm install -g @anthropic-ai/claude-code
```

### Linux

```bash
npm install -g @anthropic-ai/claude-code
```

### 验证

```bash
claude --version
```

---

## 配置 API Key

### 方式一：OAuth 登录（有订阅的用这个）

```bash
claude auth login
# 浏览器打开，登录 Anthropic 账号
# 授权完成
```

### 方式二：API Key

```bash
export ANTHROPIC_API_KEY="sk-ant-api03-你的Key"
```

获取 API Key：https://console.anthropic.com/settings/keys

---

## 费用说明

| 订阅 | 价格 | 说明 |
|------|------|------|
| Claude Pro | $20/月 | 基础版 |
| Claude Max | $100/月 | 更多用量 |
| API 按量 | 按 token 计费 | 灵活但贵 |

新用户有 $5 免费额度。

---

## 基本用法

```bash
# 启动
claude

# 直接提问
claude "帮我解释这段代码"

# 在项目中使用
cd /path/to/project
claude "帮我重构这个函数"
```

---

*返回：[AI 编码工具总览](./index)*
