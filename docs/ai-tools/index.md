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

## 第一步：装 Node.js（所有工具都需要）

### macOS

```bash
# 方式一：官网下载（最简单）
# 1. 打开 https://nodejs.org
# 2. 点击左边 LTS 版本下载
# 3. 双击安装，一路点继续

# 方式二：命令行（有 Homebrew 的）
brew install node
```

### Windows

```powershell
# 1. 打开 https://nodejs.org
# 2. 点击左边 LTS 版本下载 .msi 文件
# 3. 双击安装，一路点 Next
# 4. 关掉所有终端，重新打开
```

### Linux

```bash
# Ubuntu/Debian
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs

# CentOS/RHEL
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs
```

### 验证安装

打开终端，输入：

```bash
node --version   # 应该显示 v22.x.x
npm --version    # 应该显示 10.x.x
```

如果显示版本号，继续下一步。如果报错，重启终端再试。

---

## 第二步：装 AI 编码工具

### 方式一：只装 OpenCode（推荐小白）

```bash
npm install -g opencode-ai
```

验证：

```bash
opencode --version
```

### 方式二：装所有工具（进阶用户）

```bash
# macOS / Linux 一键安装
npm install -g opencode-ai @anthropic-ai/claude-code @openai/codex @google/gemini-cli

# Windows 逐个装
npm install -g opencode-ai
npm install -g @anthropic-ai/claude-code
npm install -g @openai/codex
npm install -g @google/gemini-cli
```

---

## 第三步：配置 API Key

### OpenCode 配置（重点推荐）

OpenCode 有**免费模型**，不需要花钱就能用：

| 免费模型 | 说明 |
|---------|------|
| **Big Pickle** | 免费，日常编码够用 |
| **MiniMax M2.5 Free** | 免费，速度快 |
| **Kimi K2.5 Free** | 免费，中文友好 |
| **GLM 4.7 Free** | 免费，国产模型 |

#### 注册 OpenCode Zen（获取免费额度）

1. 打开 https://opencode.ai/zen
2. 注册账号（邮箱或 GitHub 登录）
3. 进入 Dashboard，找到 API Key
4. 复制 Key

#### 配置 Key

```bash
# 方式一：交互式配置（推荐）
opencode auth login
# 选择 OpenCode Zen
# 粘贴你的 API Key

# 方式二：环境变量
export OPENCODE_API_KEY="你的Key粘贴在这里"

# 方式三：写入配置文件
mkdir -p ~/.config/opencode
cat > ~/.config/opencode/opencode.json << 'EOF'
{
  "providers": {
    "opencode": {
      "apiKey": "你的Key粘贴在这里"
    }
  }
}
EOF
```

#### 验证配置

```bash
opencode
# 输入一个问题测试，比如：hello
```

### Claude Code 配置

如果你有 Claude 订阅或 API Key：

```bash
# 方式一：OAuth 登录（有订阅的用这个）
claude auth login
# 浏览器打开，登录 Anthropic 账号

# 方式二：API Key
export ANTHROPIC_API_KEY="sk-ant-api03-你的Key"
```

获取 API Key：https://console.anthropic.com/settings/keys

### Gemini CLI 配置

```bash
# 方式一：OAuth 登录
gemini auth login

# 方式二：API Key（有免费额度）
export GEMINI_API_KEY="AIzaSy你的Key"
```

获取 API Key：https://aistudio.google.com/apikey

### Codex 配置

```bash
# 方式一：OAuth 登录（需要 ChatGPT Plus）
codex auth login

# 方式二：API Key
export OPENAI_API_KEY="sk-你的Key"
```

获取 API Key：https://platform.openai.com/api-keys

---

## 第四步：CC-Switch（可选，进阶用户）

> **CC-Switch** 是一个桌面应用，可以一键管理多个 AI 编码工具的配置，特别适合需要切换不同 API 代理的用户。

### 什么是 CC-Switch？

- 开源桌面应用（GitHub 18000+ 星）
- 统一管理 Claude Code、Codex、Gemini CLI、OpenCode 的配置
- 支持一键切换 API 代理
- 内置测速、故障转移

### 安装 CC-Switch

#### macOS

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

#### Windows

1. 打开 https://github.com/farion1231/cc-switch/releases
2. 下载 `CC-Switch-v3.x.x-Windows.msi`
3. 双击安装

#### Linux

```bash
# 下载 AppImage
curl -L https://github.com/farion1231/cc-switch/releases/latest/download/CC-Switch-*-linux-x86_64.AppImage -o cc-switch.AppImage
chmod +x cc-switch.AppImage
./cc-switch.AppImage
```

### CC-Switch 基本用法

1. 打开 CC-Switch
2. 点击左侧 **Provider Management**
3. 添加你的 API 代理（比如 OpenCode Zen、第三方代理等）
4. 点击 **Enable** 启用

**支持的代理服务**：
- OpenCode Zen（官方）
- APIYI（apiyi.com）
- OpenRouter（openrouter.ai）
- 自建代理

### 为什么用 CC-Switch？

| 场景 | 不用 CC-Switch | 用 CC-Switch |
|------|---------------|-------------|
| 切换代理 | 手动改配置文件 | 一键切换 |
| 管理多个 Key | 分散在不同文件 | 统一管理 |
| 测速 | 自己 curl 测试 | 内置测速功能 |

---

## 第五步：代理配置（国内用户看这里）

> **小白提示**：如果你能正常使用，不需要配置代理。只有访问慢或被墙时才需要。

### 什么是代理？

简单说：API 服务器在国外，你访问慢 → 用国内代理服务器中转 → 速度快。

### 最简单的方式：用 CC-Switch

装好 CC-Switch 后，添加代理 Provider：

| 字段 | 填写 |
|------|------|
| Name | 随便起名，比如 `我的代理` |
| API Base URL | 代理服务给你的地址 |
| API Key | 代理服务给你的 Key |

### 手动配置代理（不用 CC-Switch）

#### OpenCode

```bash
# 编辑配置文件
cat > ~/.config/opencode/opencode.json << 'EOF'
{
  "providers": {
    "custom": {
      "baseUrl": "https://你的代理地址.com/v1",
      "apiKey": "代理给你的Key"
    }
  }
}
EOF
```

#### Claude Code

```bash
export ANTHROPIC_BASE_URL="https://你的代理地址.com/v1"
```

#### Gemini CLI

```bash
export GOOGLE_API_BASE_URL="https://你的代理地址.com/v1"
```

#### Codex

```bash
export OPENAI_BASE_URL="https://你的代理地址.com/v1"
```

### 常见代理服务

| 服务 | 特点 |
|------|------|
| OpenCode Zen | 官方服务，有免费模型 |
| APIYI | 国内代理，中文支持好 |
| OpenRouter | 最全面，400+ 模型 |
| 自建 nginx | 完全控制 |

---

## 第六步：开始使用

### OpenCode 基本用法

```bash
# 进入项目目录
cd /path/to/your/project

# 启动 OpenCode
opencode

# 或直接提问
opencode "帮我写一个 Python 爬虫"

# 切换模型
/model minimax-m2.5-free

# 查看使用量
/cost

# 撤销更改
/undo
```

### Claude Code 基本用法

```bash
claude "帮我解释这段代码"
```

### Gemini CLI 基本用法

```bash
gemini "帮我写个测试"
```

### Codex 基本用法

```bash
codex "帮我重构这个函数"
```

---

## 常见问题

### Q1: 提示 `command not found`

**解决**：
1. 关闭终端，重新打开
2. 执行 `source ~/.zshrc`
3. 检查安装：`which opencode`

### Q2: 提示 `Free usage exceeded`

**原因**：免费模型用完了

**解决**：
1. 换一个免费模型：`/model big-pickle`
2. 或者等第二天刷新
3. 或者充值：https://opencode.ai/zen

### Q3: 提示 `API Key 无效`

**解决**：
1. 重新复制 Key，确保完整
2. 检查前后有没有空格
3. 重新配置：`opencode auth login`

### Q4: 连接超时

**解决**：
1. 检查网络
2. 配置代理（见第五步）
3. 换一个代理服务

### Q5: Windows 提示无法加载脚本

```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 总结：5 分钟快速上手

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

## 附录

### 官方文档

- [OpenCode Docs](https://opencode.ai/docs)
- [Claude Code Docs](https://docs.anthropic.com/claude-code)
- [Gemini CLI Docs](https://github.com/google-gemini/gemini-cli)
- [Codex Docs](https://github.com/openai/codex)
- [CC-Switch GitHub](https://github.com/farion1231/cc-switch)

### 获取 API Key

| 提供商 | 获取地址 | 免费额度 |
|--------|----------|---------|
| OpenCode Zen | https://opencode.ai/zen | 有免费模型 |
| Anthropic | https://console.anthropic.com/settings/keys | $5 新用户 |
| Google | https://aistudio.google.com/apikey | 有免费额度 |
| OpenAI | https://platform.openai.com/api-keys | 无 |

---

*最后更新：2026-03-24*
