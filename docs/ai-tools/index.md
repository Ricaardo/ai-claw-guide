# AI 编码工具配送指南

> 适合小白的完整安装配置教程

## 本文档能帮你做什么

| 你想做的事 | 对应工具 |
|-----------|---------|
| 写代码时让 AI 帮你补全、解释、重构 | Claude Code / Codex |
| 需要处理图片、长文档的编码任务 | Gemini CLI |
| 想同时用多个模型，灵活切换 | OpenCode |

---

## 第一步：前置环境安装

所有 AI 编码工具都需要 **Node.js** 环境。如果你已经装好了，可以跳过这一步。

### 1.1 检查是否已安装

打开终端（Mac 用 Terminal，Windows 用 PowerShell），输入：

```bash
node --version
npm --version
```

如果显示版本号（如 `v22.x.x`），说明已安装，跳到**第二步**。

如果提示 `command not found`，请继续往下看。

### 1.2 macOS 安装 Node.js

#### 方式一：Homebrew（推荐）

```bash
# 1. 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 2. 安装 Node.js
brew install node
```

#### 方式二：官网下载

1. 打开 https://nodejs.org
2. 点击 **LTS 版本**（左边那个绿色按钮）下载
3. 双击 `.pkg` 文件安装
4. 安装完成后**关闭并重新打开终端**

#### 验证安装

```bash
node --version   # 应该显示 v22.x.x 或更高
npm --version    # 应该显示 10.x.x 或更高
```

### 1.3 Windows 安装 Node.js

#### 方式一：官网下载（推荐）

1. 打开 https://nodejs.org
2. 点击 **LTS 版本** 下载 `.msi` 安装包
3. 双击安装，一路点 Next
4. **重要**：安装完成后关闭所有 PowerShell/CMD 窗口，重新打开

#### 方式二：winget

```powershell
winget install OpenJS.NodeJS.LTS
```

#### 验证安装

```powershell
node --version
npm --version
```

### 1.4 Linux 安装 Node.js

#### Ubuntu/Debian

```bash
# 使用 NodeSource 仓库（推荐）
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### CentOS/RHEL/Fedora

```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs
```

#### 验证安装

```bash
node --version
npm --version
```

### 1.5 安装 Bun（可选，但推荐）

Bun 比 npm 更快，推荐使用。

#### macOS / Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

安装后重新打开终端，验证：

```bash
bun --version  # 应该显示 1.x.x
```

#### Windows

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

---

## 第二步：选择你要用的工具

| 工具 | 适合谁 | 需要什么 |
|------|--------|---------|
| **Claude Code** | 写代码、理解复杂逻辑 | Anthropic API Key 或 Claude 订阅 |
| **Gemini CLI** | 处理图片、长文本、多模态 | Google API Key 或 Gemini 订阅 |
| **Codex** | 代码生成、计划模式 | OpenAI API Key 或 ChatGPT Plus |
| **OpenCode** | 想同时用多个模型 | 任意一个模型的 API Key |

不知道选哪个？先装 **Claude Code**，最稳定。

---

## 第三步：安装工具

### 3.1 Claude Code 安装

#### macOS

```bash
# 方式一：Homebrew（推荐）
brew install anthropic/tap/claude-code

# 方式二：npm
npm install -g @anthropic-ai/claude-code

# 方式三：bun（更快）
bun install -g @anthropic-ai/claude-code
```

#### Windows

```powershell
# 方式一：npm（推荐）
npm install -g @anthropic-ai/claude-code

# 方式二：scoop
scoop bucket add anthropic https://github.com/anthropics/scoop-bucket
scoop install claude-code

# 方式三：winget
winget install Anthropic.ClaudeCode
```

#### Linux

```bash
# 方式一：npm（推荐）
npm install -g @anthropic-ai/claude-code

# 方式二：bun
bun install -g @anthropic-ai/claude-code
```

#### 验证安装

```bash
claude --version
# 应该显示版本号
```

### 3.2 Gemini CLI 安装

#### macOS

```bash
# Homebrew
brew install google-gemini/tap/gemini-cli

# 或 npm
npm install -g @google/gemini-cli

# 或 bun
bun install -g @google/gemini-cli
```

#### Windows

```powershell
npm install -g @google/gemini-cli

# 或 scoop
scoop bucket add google https://github.com/google/scoop-bucket
scoop install gemini-cli
```

#### Linux

```bash
npm install -g @google/gemini-cli
```

#### 验证安装

```bash
gemini --version
```

### 3.3 Codex 安装

#### macOS

```bash
# Homebrew
brew install openai/tap/codex-cli

# 或 npm
npm install -g @openai/codex

# 或 bun
bun install -g @openai/codex
```

#### Windows

```powershell
npm install -g @openai/codex

# 或 scoop
scoop bucket add openai https://github.com/openai/scoop-bucket
scoop install codex
```

#### Linux

```bash
npm install -g @openai/codex
```

#### 验证安装

```bash
codex --version
```

### 3.4 OpenCode 安装

#### macOS

```bash
# Homebrew
brew install opencode-ai/tap/opencode

# 或 npm
npm install -g opencode-ai

# 或 bun（推荐）
bun install -g opencode-ai
```

#### Windows

```powershell
npm install -g opencode-ai

# 或 scoop
scoop bucket add opencode https://github.com/opencode-ai/scoop-bucket
scoop install opencode
```

#### Linux

```bash
npm install -g opencode-ai
```

#### 验证安装

```bash
opencode --version
```

---

## 第四步：获取 API Key

每个工具都需要一个 **API Key** 才能使用。就像一把钥匙，没有它 AI 就不让你用。

### 4.1 Anthropic API Key（给 Claude Code 用）

#### 方式一：购买 API 额度（按量付费）

1. 打开 https://console.anthropic.com
2. 注册/登录账号
3. 点击左侧菜单 **Settings** → **API Keys**
4. 点击 **Create Key**
5. 给 Key 起个名字（如 `my-key`）
6. 复制生成的 Key（格式：`sk-ant-api03-xxxxx`）

> **注意**：Key 只显示一次，一定要复制保存好！

#### 方式二：Claude Pro/Max 订阅（推荐）

如果你订阅了 Claude Pro/Max，可以用 OAuth 登录，不需要单独的 API Key：

```bash
claude auth login
# 选择 Anthropic
# 浏览器会打开，登录你的 Anthropic 账号
# 授权完成后回到终端
```

### 4.2 Google API Key（给 Gemini CLI 用）

#### 方式一：免费额度（推荐新手）

1. 打开 https://aistudio.google.com/apikey
2. 登录 Google 账号
3. 点击 **Create API Key**
4. 选择一个 Google Cloud 项目（没有就新建一个）
5. 复制生成的 Key（格式：`AIzaSyxxxxx`）

#### 方式二：OAuth 登录

```bash
gemini auth login
# 选择 Google OAuth
# 浏览器打开，登录 Google 账号
# 授权完成
```

### 4.3 OpenAI API Key（给 Codex 用）

#### 方式一：购买 API 额度（按量付费）

1. 打开 https://platform.openai.com/api-keys
2. 注册/登录账号
3. 点击 **Create new secret key**
4. 给 Key 起个名字
5. 复制生成的 Key（格式：`sk-xxxxx`）

> **注意**：需要先充值才能使用，最少 $5

#### 方式二：ChatGPT Plus 订阅

如果你订阅了 ChatGPT Plus，可以用 OAuth：

```bash
codex auth login
# 选择 ChatGPT Plus
# 浏览器打开，登录 OpenAI 账号
# 授权完成
```

### 4.4 多个 Key（给 OpenCode 用）

OpenCode 支持同时配置多个模型，运行交互式向导：

```bash
opencode auth login
# 按提示选择要配置的提供商：
# 1. Anthropic (Claude)
# 2. OpenAI (GPT)
# 3. Google (Gemini)
# 4. GitHub Copilot
# 5. 其他...
```

---

## 第五步：配置 API Key

拿到 Key 之后，需要告诉工具去用它。

### 5.1 Claude Code 配置

#### 方式一：环境变量（推荐）

```bash
# macOS / Linux：添加到 ~/.bashrc 或 ~/.zshrc
echo 'export ANTHROPIC_API_KEY="你的Key粘贴在这里"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell：添加到环境变量
[Environment]::SetEnvironmentVariable("ANTHROPIC_API_KEY", "你的Key粘贴在这里", "User")
# 关闭 PowerShell 重新打开
```

#### 方式二：配置文件

创建文件 `~/.claude/.env`：

```bash
# macOS / Linux
mkdir -p ~/.claude
echo 'ANTHROPIC_API_KEY="你的Key粘贴在这里"' > ~/.claude/.env
```

```powershell
# Windows
mkdir -Force ~/.claude
Set-Content -Path ~/.claude/.env -Value 'ANTHROPIC_API_KEY="你的Key粘贴在这里"'
```

#### 验证配置

```bash
claude "Hello, can you hear me?"
# 如果能正常回复，说明配置成功
```

### 5.2 Gemini CLI 配置

#### 方式一：环境变量

```bash
# macOS / Linux
echo 'export GEMINI_API_KEY="你的Key粘贴在这里"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell
[Environment]::SetEnvironmentVariable("GEMINI_API_KEY", "你的Key粘贴在这里", "User")
```

#### 方式二：配置文件

```bash
mkdir -p ~/.gemini
echo 'GEMINI_API_KEY="你的Key粘贴在这里"' > ~/.gemini/.env
```

#### 验证配置

```bash
gemini "Hello"
```

### 5.3 Codex 配置

#### 方式一：环境变量

```bash
# macOS / Linux
echo 'export OPENAI_API_KEY="你的Key粘贴在这里"' >> ~/.zshrc
source ~/.zshrc

# Windows PowerShell
[Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "你的Key粘贴在这里", "User")
```

#### 方式二：配置文件

```bash
mkdir -p ~/.codex
cat > ~/.codex/config.toml << 'EOF'
[api]
key = "你的Key粘贴在这里"
model = "gpt-5.3-codex"
EOF
```

#### 验证配置

```bash
codex "Hello"
```

### 5.4 OpenCode 配置

推荐用交互式向导：

```bash
opencode auth login
# 按提示输入每个提供商的 Key
```

或者手动编辑配置文件 `~/.config/opencode/opencode.json`：

```json
{
  "providers": {
    "anthropic": {
      "apiKey": "sk-ant-api03-你的Key"
    },
    "openai": {
      "apiKey": "sk-你的Key"
    },
    "google": {
      "apiKey": "AIzaSy你的Key"
    }
  }
}
```

---

## 第六步：反向代理配置（可选）

> **小白提示**：如果你能正常使用，不需要配置代理。只有在国内访问不畅时才需要。

### 6.1 什么是反向代理？

简单说，就是用一个中间服务器帮你转发请求。比如 API 服务器在国外，你访问慢或者被墙，就可以用国内的代理服务器中转。

### 6.2 Claude Code 代理配置

```bash
# 设置代理 URL
export ANTHROPIC_BASE_URL="https://你的代理地址.com/v1"

# 或写入配置文件
echo 'ANTHROPIC_BASE_URL="https://你的代理地址.com/v1"' >> ~/.claude/.env
```

### 6.3 Gemini CLI 代理配置

```bash
export GOOGLE_API_BASE_URL="https://你的代理地址.com/google/v1"
```

### 6.4 Codex 代理配置

```bash
export OPENAI_BASE_URL="https://你的代理地址.com/v1"
```

### 6.5 OpenCode 代理配置

编辑 `~/.config/opencode/opencode.json`：

```json
{
  "providers": {
    "anthropic": {
      "baseUrl": "https://你的代理地址.com/v1",
      "apiKey": "代理给你的Key"
    }
  }
}
```

---

## 第七步：开始使用

### 7.1 Claude Code 基本用法

```bash
# 进入你的项目目录
cd /path/to/your/project

# 启动 Claude Code
claude

# 或者直接问问题
claude "帮我解释一下这个项目的代码结构"
```

### 7.2 Gemini CLI 基本用法

```bash
# 进入项目目录
cd /path/to/your/project

# 启动
gemini

# 或直接提问
gemini "帮我写一个 Python 爬虫"
```

### 7.3 Codex 基本用法

```bash
# 进入项目目录
cd /path/to/your/project

# 启动
codex

# 或直接提问
codex "帮我重构这段代码"
```

### 7.4 OpenCode 基本用法

```bash
# 进入项目目录
cd /path/to/your/project

# 启动
opencode

# 或直接提问
opencode "帮我创建一个 React 组件"
```

---

## 常见问题

### Q1: 提示 `command not found`

**原因**：环境变量没有生效

**解决**：
1. 关闭终端，重新打开
2. 或者执行 `source ~/.zshrc`（macOS/Linux）
3. 检查安装路径是否在 PATH 中：`echo $PATH`

### Q2: 提示 `API Key 无效`

**原因**：
- Key 复制不完整
- Key 过期或被删除
- 格式错误（多了空格或引号）

**解决**：
1. 重新到官网复制 Key
2. 检查配置文件中的 Key 是否正确
3. Key 前后不要有空格

### Q3: 提示 `连接超时`

**原因**：网络问题或被墙

**解决**：
1. 检查网络连接
2. 配置代理（见第六步）
3. 使用国内镜像或代理服务

### Q4: 提示 `余额不足` / `Rate limit`

**原因**：
- API 额度用完了
- 请求太频繁被限制

**解决**：
1. 到官网充值
2. 等一会儿再试
3. 换一个 API Key

### Q5: Windows 提示 `无法加载脚本`

**原因**：PowerShell 执行策略限制

**解决**：

```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 附录：一键安装脚本

### macOS / Linux

```bash
#!/bin/bash
# save as install-ai-tools.sh
# usage: bash install-ai-tools.sh

set -e

echo "=== 安装 AI 编码工具 ==="

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "Node.js 未安装，请先安装 Node.js"
    echo "访问 https://nodejs.org 下载安装"
    exit 1
fi

echo "Node.js $(node --version) 已安装"

# 安装工具
echo "安装 Claude Code..."
npm install -g @anthropic-ai/claude-code 2>/dev/null || bun install -g @anthropic-ai/claude-code

echo "安装 Gemini CLI..."
npm install -g @google/gemini-cli 2>/dev/null || bun install -g @google/gemini-cli

echo "安装 Codex..."
npm install -g @openai/codex 2>/dev/null || bun install -g @openai/codex

echo "安装 OpenCode..."
npm install -g opencode-ai 2>/dev/null || bun install -g opencode-ai

echo ""
echo "=== 安装完成！==="
echo ""
echo "下一步：获取 API Key"
echo "  - Anthropic: https://console.anthropic.com/settings/keys"
echo "  - Google: https://aistudio.google.com/apikey"
echo "  - OpenAI: https://platform.openai.com/api-keys"
echo ""
echo "然后运行 'opencode auth login' 配置 Key"
```

### Windows

```powershell
# save as install-ai-tools.ps1
# usage: .\install-ai-tools.ps1

Write-Host "=== 安装 AI 编码工具 ===" -ForegroundColor Green

# 检查 Node.js
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "Node.js 未安装，请先安装" -ForegroundColor Red
    Write-Host "访问 https://nodejs.org 下载安装"
    exit 1
}

Write-Host "Node.js $(node --version) 已安装"

# 安装工具
Write-Host "安装 Claude Code..." -ForegroundColor Yellow
npm install -g @anthropic-ai/claude-code

Write-Host "安装 Gemini CLI..." -ForegroundColor Yellow
npm install -g @google/gemini-cli

Write-Host "安装 Codex..." -ForegroundColor Yellow
npm install -g @openai/codex

Write-Host "安装 OpenCode..." -ForegroundColor Yellow
npm install -g opencode-ai

Write-Host ""
Write-Host "=== 安装完成！===" -ForegroundColor Green
Write-Host ""
Write-Host "下一步：获取 API Key"
Write-Host "  - Anthropic: https://console.anthropic.com/settings/keys"
Write-Host "  - Google: https://aistudio.google.com/apikey"
Write-Host "  - OpenAI: https://platform.openai.com/api-keys"
Write-Host ""
Write-Host "然后运行 'opencode auth login' 配置 Key"
```

---

## 总结：5 分钟快速上手

1. **装 Node.js** → https://nodejs.org 下载安装
2. **装工具** → `npm install -g @anthropic-ai/claude-code`
3. **拿 Key** → https://console.anthropic.com/settings/keys
4. **配 Key** → `export ANTHROPIC_API_KEY="你的Key"`
5. **开始用** → `claude`

完成！🎉

---

*最后更新：2026-03-24*<tool_call>
<function=todowrite>
<parameter=todos>[{"status": "completed", "priority": "high", "content": "重写文档添加前置环境安装（Node/npm/bun）"}, {"status": "completed", "priority": "high", "content": "补充详细的 API Key 获取步骤"}, {"status": "completed", "priority": "high", "content": "添加后续 AI 配置详细说明"}, {"status": "in_progress", "priority": "medium", "content": "提交并推送到 GitHub"}]