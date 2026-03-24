# AI Coding Tools Distribution Guide

> 一期编码工具配送：Claude Code、Gemini CLI、Codex、OpenCode

## 概述

本文档提供主流AI编码工具的完整安装配置指南，覆盖 macOS、Linux、Windows 三端，包含 API Key 设置和反向代理配置。

| 工具 | 厂商 | 模型 | 特点 |
|------|------|------|------|
| **Claude Code** | Anthropic | Claude Opus/Sonnet | 深度理解，结构化输出 |
| **Gemini CLI** | Google | Gemini 2.5 Pro/Flash | 多模态，长上下文 |
| **Codex** | OpenAI | GPT-5.3-codex | 代码生成，plan mode |
| **OpenCode** | 开源 | 多模型支持 | 插件系统，高度可定制 |

---

## 1. Claude Code

### 1.1 安装

#### macOS

```bash
# 使用 Homebrew
brew install anthropic/tap/claude-code

# 或使用 npm
npm install -g @anthropic-ai/claude-code

# 或使用 bun
bun install -g @anthropic-ai/claude-code
```

#### Linux

```bash
# npm (推荐)
npm install -g @anthropic-ai/claude-code

# bun (更快)
bun install -g @anthropic-ai/claude-code

# 直接下载二进制
curl -fsSL https://github.com/anthropics/claude-code/releases/latest/download/claude-code-linux-x64 -o /usr/local/bin/claude
chmod +x /usr/local/bin/claude
```

#### Windows

```powershell
# 使用 npm
npm install -g @anthropic-ai/claude-code

# 使用 scoop
scoop bucket add anthropic https://github.com/anthropics/scoop-bucket
scoop install claude-code

# 使用 winget
winget install Anthropic.ClaudeCode
```

### 1.2 API Key 设置

#### 方式一：OAuth 登录（推荐）

```bash
claude auth login
# 选择 Anthropic
# 浏览器完成 OAuth 授权
```

#### 方式二：API Key 直接配置

```bash
# 设置环境变量
export ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxx"

# 或写入配置文件
echo 'ANTHROPIC_API_KEY="sk-ant-api03-xxxxxxxxxxxx"' >> ~/.claude/.env
```

#### 方式三：配置文件

创建 `~/.claude/config.json`：

```json
{
  "apiKey": "sk-ant-api03-xxxxxxxxxxxx",
  "model": "claude-opus-4-6-20250219"
}
```

### 1.3 反向代理配置

#### 环境变量方式

```bash
# 设置代理基础 URL
export ANTHROPIC_BASE_URL="https://your-proxy.com/v1"

# 或者在 .env 文件中
echo 'ANTHROPIC_BASE_URL="https://your-proxy.com/v1"' >> ~/.claude/.env
```

#### 配置文件方式

`~/.claude/config.json`：

```json
{
  "baseUrl": "https://your-proxy.com/v1",
  "apiKey": "your-proxy-api-key"
}
```

#### 常见代理服务配置

**Cloudflare Workers 代理**：

```json
{
  "baseUrl": "https://anthropic-proxy.your-domain.workers.dev/v1",
  "headers": {
    "X-Proxy-Auth": "your-proxy-token"
  }
}
```

**nginx 反向代理**：

```nginx
location /anthropic/ {
    proxy_pass https://api.anthropic.com/;
    proxy_set_header Host api.anthropic.com;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Authorization $http_authorization;
}
```

```json
{
  "baseUrl": "https://your-server.com/anthropic"
}
```

---

## 2. Gemini CLI

### 2.1 安装

#### macOS

```bash
# Homebrew
brew install google-gemini/tap/gemini-cli

# npm
npm install -g @google/gemini-cli

# bun
bun install -g @google/gemini-cli
```

#### Linux

```bash
# npm (推荐)
npm install -g @google/gemini-cli

# bun
bun install -g @google/gemini-cli

# AppImage
curl -fsSL https://github.com/google-gemini/gemini-cli/releases/latest/download/gemini-cli-linux-x64.AppImage -o gemini-cli
chmod +x gemini-cli
sudo mv gemini-cli /usr/local/bin/
```

#### Windows

```powershell
# npm
npm install -g @google/gemini-cli

# scoop
scoop bucket add google https://github.com/google/scoop-bucket
scoop install gemini-cli

# winget
winget install Google.GeminiCLI
```

### 2.2 API Key 设置

#### 方式一：Google OAuth（推荐）

```bash
gemini auth login
# 选择 Google OAuth
# 浏览器完成授权
```

#### 方式二：API Key

```bash
# 获取 API Key: https://aistudio.google.com/apikey

# 设置环境变量
export GEMINI_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxxx"

# 或写入 .env 文件
mkdir -p ~/.gemini
echo 'GEMINI_API_KEY="AIzaSyxxxxxxxxxxxxxxxxxxx"' >> ~/.gemini/.env
```

#### 方式三：配置文件

`~/.gemini/settings.json`：

```json
{
  "apiKey": "AIzaSyxxxxxxxxxxxxxxxxxxx",
  "model": "gemini-2.5-pro-preview-05-06"
}
```

### 2.3 反向代理配置

#### 环境变量方式

```bash
export GOOGLE_API_BASE_URL="https://your-proxy.com/google/v1"
export GOOGLE_AI_BASE_URL="https://your-proxy.com/google-ai"
```

#### 配置文件方式

`~/.gemini/settings.json`：

```json
{
  "baseUrl": "https://your-proxy.com/google/v1beta",
  "apiKey": "your-proxy-key"
}
```

#### Vertex AI 代理

```json
{
  "provider": "vertexai",
  "projectId": "your-project-id",
  "location": "us-central1",
  "baseUrl": "https://your-proxy.com/vertexai"
}
```

---

## 3. Codex (OpenAI)

### 3.1 安装

#### macOS

```bash
# Homebrew
brew install openai/tap/codex-cli

# npm
npm install -g @openai/codex

# bun
bun install -g @openai/codex
```

#### Linux

```bash
# npm (推荐)
npm install -g @openai/codex

# bun
bun install -g @openai/codex

# 直接下载
curl -fsSL https://github.com/openai/codex/releases/latest/download/codex-linux-x64 -o /usr/local/bin/codex
chmod +x /usr/local/bin/codex
```

#### Windows

```powershell
# npm
npm install -g @openai/codex

# scoop
scoop bucket add openai https://github.com/openai/scoop-bucket
scoop install codex

# winget
winget install OpenAI.CodexCLI
```

### 3.2 API Key 设置

#### 方式一：ChatGPT Plus 订阅（OAuth）

```bash
codex auth login
# 选择 ChatGPT Plus
# 浏览器完成 OAuth 授权
```

#### 方式二：API Key

```bash
# 获取 API Key: https://platform.openai.com/api-keys

# 设置环境变量
export OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxx"

# 或写入配置
mkdir -p ~/.codex
echo 'OPENAI_API_KEY="sk-xxxxxxxxxxxxxxxxxxxx"' >> ~/.codex/.env
```

#### 方式三：配置文件

`~/.codex/config.toml`：

```toml
[api]
key = "sk-xxxxxxxxxxxxxxxxxxxx"
model = "gpt-5.3-codex"
```

### 3.3 反向代理配置

#### 环境变量方式

```bash
export OPENAI_BASE_URL="https://your-proxy.com/v1"
export OPENAI_API_BASE="https://your-proxy.com/v1"
```

#### 配置文件方式

`~/.codex/config.toml`：

```toml
[api]
base_url = "https://your-proxy.com/v1"
key = "your-proxy-key"
```

#### Azure OpenAI 代理

```toml
[api]
base_url = "https://your-resource.openai.azure.com/openai"
key = "your-azure-key"
api_version = "2024-12-01-preview"
```

---

## 4. OpenCode

### 4.1 安装

#### macOS

```bash
# Homebrew
brew install opencode-ai/tap/opencode

# npm
npm install -g opencode-ai

# bun (推荐)
bun install -g opencode-ai

# 直接下载
curl -fsSL https://github.com/opencode-ai/opencode/releases/latest/download/opencode-darwin-arm64 -o /usr/local/bin/opencode
chmod +x /usr/local/bin/opencode
```

#### Linux

```bash
# npm
npm install -g opencode-ai

# bun (推荐)
bun install -g opencode-ai

# 二进制下载
curl -fsSL https://github.com/opencode-ai/opencode/releases/latest/download/opencode-linux-x64 -o /usr/local/bin/opencode
chmod +x /usr/local/bin/opencode

# AppImage
curl -fsSL https://github.com/opencode-ai/opencode/releases/latest/download/opencode-linux-x64.AppImage -o opencode
chmod +x opencode
sudo mv opencode /usr/local/bin/
```

#### Windows

```powershell
# npm
npm install -g opencode-ai

# scoop
scoop bucket add opencode https://github.com/opencode-ai/scoop-bucket
scoop install opencode

# winget
winget install OpenCodeAI.OpenCode

# 直接下载
# 从 https://github.com/opencode-ai/opencode/releases 下载 opencode-windows-x64.exe
```

### 4.2 API Key 设置

#### 多模型支持

OpenCode 支持多种模型提供商，配置灵活：

```bash
# 交互式配置向导
opencode auth login

# 选择要配置的提供商：
# - Anthropic (Claude)
# - OpenAI (GPT)
# - Google (Gemini)
# - GitHub Copilot
# - Kimi
# - GLM
# - 自定义
```

#### Anthropic

```bash
opencode auth login
# Provider: Anthropic
# Login method: Claude Pro/Max (OAuth) 或 API Key
```

#### OpenAI

```bash
opencode auth login
# Provider: OpenAI
# Login method: ChatGPT Plus (OAuth) 或 API Key
```

#### Google Gemini

```bash
opencode auth login
# Provider: Google
# Login method: OAuth with Antigravity
```

#### 配置文件方式

`~/.config/opencode/opencode.json`：

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-xxxxx"
    },
    "openai": {
      "apiKey": "sk-xxxxx"
    },
    "google": {
      "apiKey": "AIzaSyxxxxx"
    }
  }
}
```

### 4.3 反向代理配置

#### 全局代理配置

`~/.config/opencode/opencode.json`：

```json
{
  "proxy": {
    "http": "http://proxy.example.com:8080",
    "https": "https://proxy.example.com:8443",
    "noProxy": "localhost,127.0.0.1"
  }
}
```

#### 按提供商配置代理

```json
{
  "providers": {
    "anthropic": {
      "baseUrl": "https://anthropic-proxy.example.com/v1",
      "apiKey": "proxy-key"
    },
    "openai": {
      "baseUrl": "https://openai-proxy.example.com/v1",
      "apiKey": "proxy-key"
    },
    "google": {
      "baseUrl": "https://gemini-proxy.example.com/v1",
      "apiKey": "proxy-key"
    }
  }
}
```

#### 插件系统代理

OpenCode 支持通过插件实现高级代理功能：

```json
{
  "plugin": ["oh-my-opencode"],
  "proxy": {
    "enabled": true,
    "mode": "auto",
    "fallbackOrder": ["direct", "proxy-a", "proxy-b"]
  }
}
```

---

## 5. 通用配置技巧

### 5.1 环境变量优先级

所有工具遵循以下优先级（从高到低）：

1. 命令行参数
2. 环境变量
3. 配置文件
4. 默认值

### 5.2 多环境配置

使用 `.env` 文件管理不同环境：

```bash
# 开发环境
cp .env.development ~/.claude/.env

# 生产环境
cp .env.production ~/.claude/.env
```

### 5.3 代理健康检查

```bash
# Claude Code
curl -s https://your-proxy.com/v1/models | head

# Gemini CLI
curl -s https://your-proxy.com/google/v1beta/models | head

# Codex
curl -s https://your-proxy.com/v1/models | head
```

---

## 6. 故障排查

### 6.1 常见问题

| 问题 | 解决方案 |
|------|----------|
| API Key 无效 | 检查 key 格式，确认未过期 |
| 连接超时 | 检查代理配置，测试网络连通性 |
| 模型不可用 | 确认订阅级别，检查模型名称 |
| 认证失败 | 重新运行 `auth login`，清除缓存 |

### 6.2 调试模式

```bash
# Claude Code
claude --debug

# Gemini CLI
gemini --verbose

# Codex
codex --debug

# OpenCode
opencode --log-level debug
```

### 6.3 日志位置

| 工具 | 日志路径 |
|------|----------|
| Claude Code | `~/.claude/logs/` |
| Gemini CLI | `~/.gemini/logs/` |
| Codex | `~/.codex/logs/` |
| OpenCode | `/tmp/oh-my-opencode.log` |

---

## 7. 快速参考

### 一键安装脚本

```bash
#!/bin/bash
# install-ai-tools.sh

echo "Installing AI Coding Tools..."

# Claude Code
npm install -g @anthropic-ai/claude-code 2>/dev/null || bun install -g @anthropic-ai/claude-code

# Gemini CLI
npm install -g @google/gemini-cli 2>/dev/null || bun install -g @google/gemini-cli

# Codex
npm install -g @openai/codex 2>/dev/null || bun install -g @openai/codex

# OpenCode
npm install -g opencode-ai 2>/dev/null || bun install -g opencode-ai

echo "Done! Run 'opencode auth login' to configure providers."
```

### 版本检查

```bash
claude --version
gemini --version
codex --version
opencode --version
```

---

## 附录

### A. 官方文档链接

- [Claude Code Docs](https://docs.anthropic.com/claude-code)
- [Gemini CLI Docs](https://github.com/google-gemini/gemini-cli)
- [Codex Docs](https://github.com/openai/codex)
- [OpenCode Docs](https://opencode.ai/docs)
- [OhMyOpenCode Docs](https://github.com/code-yeongyu/oh-my-openagent)

### B. 获取 API Key

| 提供商 | 获取地址 |
|--------|----------|
| Anthropic | https://console.anthropic.com/settings/keys |
| OpenAI | https://platform.openai.com/api-keys |
| Google | https://aistudio.google.com/apikey |
| GitHub Copilot | https://github.com/settings/copilot |

### C. 代理服务推荐

| 服务 | 特点 |
|------|------|
| Cloudflare Workers | 免费额度，全球加速 |
| Vercel Edge | 零配置部署 |
| 自建 nginx | 完全控制 |
| 第三方服务 | 便捷但需信任 |

---

*Last updated: 2026-03-24*
