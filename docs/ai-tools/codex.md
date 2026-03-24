# Codex 安装配置

> OpenAI 出品，代码生成能力强

## 安装

### macOS

```bash
brew install openai/tap/codex-cli
# 或
npm install -g @openai/codex
```

### Windows

```powershell
npm install -g @openai/codex
```

### Linux

```bash
npm install -g @openai/codex
```

### 验证

```bash
codex --version
```

---

## 配置 API Key

### 方式一：OAuth 登录（需要 ChatGPT Plus）

```bash
codex auth login
# 选择 ChatGPT Plus
# 浏览器登录
```

### 方式二：API Key

1. 打开 https://platform.openai.com/api-keys
2. 创建 Key
3. 配置：

```bash
export OPENAI_API_KEY="sk-你的Key"
```

---

## 费用说明

需要 OpenAI API 额度或 ChatGPT Plus 订阅（$20/月）。

---

## 基本用法

```bash
# 启动
codex

# 直接提问
codex "帮我重构这个函数"
```

---

*返回：[AI 编码工具总览](./index)*
