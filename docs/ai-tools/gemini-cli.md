# Gemini CLI 安装配置

> Google 出品，多模态支持，有免费额度

## 安装

### macOS

```bash
brew install google-gemini/tap/gemini-cli
# 或
npm install -g @google/gemini-cli
```

### Windows

```powershell
npm install -g @google/gemini-cli
```

### Linux

```bash
npm install -g @google/gemini-cli
```

### 验证

```bash
gemini --version
```

---

## 配置 API Key

### 方式一：OAuth 登录

```bash
gemini auth login
# 浏览器打开，登录 Google 账号
```

### 方式二：API Key（有免费额度）

1. 打开 https://aistudio.google.com/apikey
2. 创建 API Key
3. 配置：

```bash
export GEMINI_API_KEY="AIzaSy你的Key"
```

---

## 费用说明

Google 提供免费额度，足够个人使用。

---

## 基本用法

```bash
# 启动
gemini

# 直接提问
gemini "帮我写个测试"
```

---

*返回：[AI 编码工具总览](./index)*
