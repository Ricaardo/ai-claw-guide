# 10. OpenClaw 排障与维护通用说明

> **适用对象**：已经安装或部署 OpenClaw，遇到问题或准备升级、卸载的用户 | **文档版本**：V2.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw 排障、升级与卸载通用说明

---

## 零、基础概念速查

### 0.1 怎么打开终端

**macOS：** `Command + 空格`，输入 `Terminal`，按回车。
**Linux：** `Ctrl + Alt + T`。
**Windows（WSL2）：** `Win` 键搜索 `Ubuntu`（或你的 WSL 发行版），点击打开。

### 0.2 命令执行结果

成功时要么无输出，要么显示正常信息（如 `OpenClaw v2.7.3`）。失败时会看到 `error`、`not found`、`permission denied` 等字眼，对照本文档后面的问题处理。

### 0.3 基础概念

- **PATH**：命令搜索目录列表，找不到就报 `command not found`。
- **端口（Port）**：网络服务的门牌号。网关默认端口 `18789`，Web 控制台默认端口 `5154`，两者是不同的服务。
- **JSON**：配置文件格式（如 `openclaw.json`），键和值用英文双引号，最后一项后不加逗号。示例：`{"name": "小明", "age": 18, "hobbies": ["打球", "看书"]}`
- API Key：身份验证密钥，填错/过期/余额用光会返回 `401` 或 `403`。

---

## 一、遇到问题先跑这 4 条命令

不管你遇到什么问题，请先在终端里依次执行下面 4 条命令，把结果记下来。

### 命令 1：检查 OpenClaw 是否装好了

```bash
openclaw --version
```

**正常输出：** `OpenClaw v2.7.3`

### 命令 2：让 OpenClaw 自我体检

```bash
openclaw doctor
```

**正常输出：** 全部显示 `[OK]`

### 命令 3：检查网关状态

```bash
openclaw gateway status
```

**正常输出：** `Gateway is running on port 18789`

### 命令 4：重启网关

```bash
openclaw gateway restart
```

**正常输出：** `Gateway stopped` → `Gateway started on port 18789`

### 1.1 快速定位问题

根据你看到的现象，直接跳到对应问题：

| 你遇到的情况 | 看哪个问题 |
|-------------|-----------|
| 输入 `openclaw` 提示 command not found | → 问题 1 |
| Web 控制台显示 unauthorized | → 问题 2 |
| 网关启动失败 | → 问题 3 |
| 端口被占用 | → 问题 4 |
| 发消息后没有回复 / 转圈 | → 问题 5 |
| npm install 报错 | → 问题 6 或 7 |
| 配置文件报错 | → 问题 8 |
| 其他问题 | → 问题 9-17 |

---

## 二、最常见问题逐条详解

下面列出了 17 个常见问题。**前 5 个覆盖了 90% 的情况**，大多数人只需要看前 5 个。

### 问题 1：`openclaw: command not found`

这是最常见的问题，几乎每个新手都会遇到，不是你的操作有误。

OpenClaw 的可执行文件不在 PATH 中。

**方法一：** 关掉终端重新打开，再试 `openclaw --version`。

**方法二（macOS）：**

```bash
echo 'export PATH="$(npm prefix -g)/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
openclaw --version
```

**方法三（Linux / WSL2）：**

```bash
echo 'export PATH="$(npm prefix -g)/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
openclaw --version
```

**都不行就重装：**

```bash
npm install -g openclaw
# 或者用官方一键脚本
curl -fsSL https://get.openclaw.ai | bash
```

修好后应看到：`OpenClaw v2.7.3`

---

### 问题 2：Web 控制台显示 `unauthorized` / `401 Unauthorized`

通常只是链接没复制完整，很容易修。

```bash
openclaw onboard
```

执行后会输出带 token 的完整链接。**把完整链接全部复制**粘贴到浏览器地址栏，`#token=` 后面的部分不能少。

---

### 问题 3：网关启动失败（`Failed to start gateway` / `Cannot find module`）

先跑 `openclaw doctor`。配置文件问题见"问题 8"，Node 版本太低见"问题 11"。无明显提示时重装依赖：

```bash
cd $(npm prefix -g)/lib/node_modules/openclaw
npm install
cd ~
openclaw gateway restart
```

还不行就看日志：`openclaw gateway logs --lines 50`

---

### 问题 4：端口被占用（`EADDRINUSE: address already in use :::18789`）

```bash
lsof -i :18789                # 找出占用端口的进程
kill 12345                     # 把 12345 换成实际 PID（kill -9 强制）
openclaw gateway start
```

或改端口：编辑 `~/.openclaw/openclaw.json` 把 `"port": 18789` 改成其他值，然后 `openclaw gateway restart`。

---

### 问题 5：模型不回复 / 回复为空（转圈、空白、`No response from model`、`Request timeout`）

这通常是 API 配置问题，按下面步骤逐项检查就能解决。

检查配置文件中的 `apiKey`、`baseUrl`、`model` 三项是否正确。

```bash
cat ~/.openclaw/openclaw.json
```

**快速验证 API 连通性：**

> ⚠️ 下面的命令需要把 `YOUR_API_KEY` 替换成你自己的 API Key。

```bash
# OpenAI
curl -s https://api.openai.com/v1/models \
  -H "Authorization: Bearer YOUR_API_KEY" | head -c 200

# Anthropic
curl -s https://api.anthropic.com/v1/messages \
  -H "x-api-key: YOUR_API_KEY" -H "anthropic-version: 2023-06-01" -H "content-type: application/json" \
  -d '{"model":"claude-3-5-sonnet-20241022","max_tokens":10,"messages":[{"role":"user","content":"hi"}]}' | head -c 300

# DeepSeek
curl -s https://api.deepseek.com/v1/models -H "Authorization: Bearer YOUR_API_KEY" | head -c 200
```

**检查项**：Key 前后无多余空格、baseUrl 正确、模型 ID 正确（如 `gpt-4o` 不是 `gpt4o`）、账号有余额、网络可达。改完后 `openclaw gateway restart`。

---

### 问题 6：npm install 超时或失败（`ETIMEDOUT`）

```bash
# 换国内镜像源
npm config set registry https://registry.npmmirror.com
npm install -g openclaw
```

备选：用 cnpm（`npm install -g cnpm --registry=https://registry.npmmirror.com && cnpm install -g openclaw`）或加长超时（`npm config set fetch-timeout 120000`）。

---

### 问题 7：npm install 权限不足（`EACCES`）

**推荐方法**：改变 npm 全局安装位置：

```bash
mkdir -p ~/.npm-global
npm config set prefix '~/.npm-global'

# macOS (zsh)：
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.zshrc && source ~/.zshrc

# Linux / WSL2 (bash)：
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc && source ~/.bashrc

npm install -g openclaw
```

或用 `sudo npm install -g openclaw`（不推荐）。

---

### 问题 8：配置文件 JSON 格式错误（`Failed to parse config file` / `invalid JSON`）

```bash
# 验证 JSON
node -e "\
  try { \
    const fs = require('fs'); \
    const path = process.env.HOME + '/.openclaw/openclaw.json'; \
    JSON.parse(fs.readFileSync(path, 'utf8')); \
    console.log('JSON 格式正确！'); \
  } catch(e) { \
    console.log('JSON 格式错误：', e.message); \
  }"

# 手动修复常见问题：多余逗号、中文引号、缺少括号
nano ~/.openclaw/openclaw.json
openclaw gateway restart
```

---

### 问题 9：Skills 安装失败

确认技能名字拼写正确（`openclaw skills search xxx`），确认 OpenClaw 版本够新（`openclaw --version`），然后重新安装：

```bash
openclaw skills install xxx --verbose
```

如果是网络问题，参考"问题 6"换镜像源。

---

### 问题 10：node-gyp rebuild 失败

有些 npm 包需要编译 C/C++ 代码。安装编译工具后重试：

**macOS：**
```bash
xcode-select --install
npm install -g openclaw
```

**Linux / WSL2：**
```bash
sudo apt update && sudo apt install -y build-essential python3
npm install -g openclaw
```

---

### 问题 11：Node 版本太低

OpenClaw 需要 Node.js >= 18.0.0。用 nvm 升级：

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.zshrc  # macOS；Linux/WSL2 用 source ~/.bashrc
nvm install 20
nvm alias default 20
npm install -g openclaw
```

---

### 问题 12：openclaw onboard 卡住不动

```bash
# 按 Ctrl+C 中断，然后：
pkill -f openclaw
sleep 2
lsof -i :18789  # 如果还有输出，用 kill 杀掉（参见问题 4）
openclaw onboard
```

如果还卡，加 `--verbose` 查看详细输出：`openclaw onboard --verbose`

---

### 问题 13：浏览器打不开控制台地址

```bash
# 确认网关在运行
openclaw gateway status
# 如果 not running：
openclaw gateway start
```

如果是远程服务器，把 `localhost` 换成服务器 IP。WSL2 用户在 WSL2 终端执行 `hostname -I` 获取 IP。

---

### 问题 14：飞书 / Discord 等渠道连不上

```bash
openclaw gateway status
cat ~/.openclaw/openclaw.json
# 核对 Token、Secret 等信息
```

**本地部署用户**需要内网穿透（如 `ngrok http 18789`），或使用支持长连接/轮询的渠道。**云服务器用户**确认防火墙开放了端口（`sudo ufw allow 18789`）。

---

### 问题 15：模型 API Key 报错 / 401 / 403

去模型提供商官网确认 Key 状态（Active、有余额、有权限），重新复制 Key 更新到配置文件，注意前后不能有空格。修改后执行 `openclaw gateway restart`。

---

### 问题 16：端口被占用但 lsof 查不到进程

进程已退出但端口未释放（TIME_WAIT 状态）。等 30 秒再试，或换一个端口。

---

### 问题 17：安装或运行时提示 ENOMEM / 内存不足

**云服务器**增加 swap：

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

**本地电脑**关掉占内存的程序后再试。

---

## 三、用 OpenCode 辅助排障

### 3.1 什么是 OpenCode

OpenCode 是一个开源的命令行 AI 编程助手（类似 Cursor 的终端版），可以直接在终端里与 AI 对话、读写文件、执行命令。当 OpenClaw 出问题时，你可以用 OpenCode 来帮你分析日志、定位错误、修复配置。

### 3.2 为什么用它来排障

- 不需要你自己读懂日志，把日志内容喂给它就行
- 它能直接读取你的配置文件并检查是否有误
- 它能执行命令帮你自动修复常见问题

### 3.3 安装 OpenCode

三种方式任选其一：

```bash
# 方法一：macOS Homebrew
brew install opencode-ai/tap/opencode

# 方法二：Go 安装
go install github.com/opencode-ai/opencode@latest

# 方法三：npm（无需安装，直接运行）
npx opencode@latest
```

### 3.4 配置 OpenCode

OpenCode 需要一个模型 API Key 才能工作。创建配置文件 `~/.opencode/config.json`：

```json
{
  "provider": "anthropic",
  "model": "claude-sonnet-4-20250514",
  "apiKey": "your-api-key"
}
```

或者用环境变量：`export ANTHROPIC_API_KEY="your-key"`

> OpenCode 也支持 OpenAI、DeepSeek 等其他提供商——如果你在 OpenClaw 里已经配好了某家的 API Key，直接拿来用就行。

### 3.5 排障实战示例

**示例 1：分析报错日志**

启动 `opencode`，然后输入：

> 帮我分析这段 OpenClaw 报错日志：[粘贴日志内容]

**示例 2：检查配置文件**

启动 `opencode`，然后输入：

> 帮我检查 ~/.openclaw/openclaw.json 的配置是否正确

**示例 3：自动排查并修复**

启动 `opencode`，然后输入：

> OpenClaw 网关起不来，帮我排查并修复

如果你能在 OpenCode 里正常对话，说明它已经可以帮你排查问题了。

---

## 四、版本升级

### 4.1 升级前备份

```bash
cp -r ~/.openclaw ~/.openclaw-backup-$(date +%Y%m%d)
```

### 4.2 执行升级

**npm 安装用户：**

```bash
openclaw gateway stop
npm install -g openclaw@latest
openclaw gateway start
```

**官方脚本安装用户：**

```bash
openclaw gateway stop
curl -fsSL https://get.openclaw.ai | bash
openclaw gateway start
```

### 4.3 升级后验证

```bash
openclaw --version
openclaw doctor
openclaw gateway status
```

---

## 五、完全卸载

### 5.1 macOS 卸载

```bash
openclaw gateway stop

# 如果设置过开机自启动
launchctl list | grep openclaw
launchctl unload ~/Library/LaunchAgents/com.openclaw.gateway.plist 2>/dev/null
rm -f ~/Library/LaunchAgents/com.openclaw.gateway.plist

npm uninstall -g openclaw
rm -rf ~/.openclaw  # 注意：会删除所有配置和聊天记录

# 确认
which openclaw  # 应该没有输出
```

### 5.2 Linux / WSL2 卸载

```bash
openclaw gateway stop

# 如果设置过 systemd 自启动服务
sudo systemctl stop openclaw-gateway 2>/dev/null
sudo systemctl disable openclaw-gateway 2>/dev/null
sudo rm -f /etc/systemd/system/openclaw-gateway.service
sudo systemctl daemon-reload

npm uninstall -g openclaw
rm -rf ~/.openclaw

# 确认
which openclaw  # 应该没有输出
```

WSL2 用户如果连 WSL2 本身也不想要了，在 Windows PowerShell 里执行 `wsl --unregister Ubuntu`（会删除整个 WSL2 环境）。

---

## 六、日志怎么看

### 6.1 日志文件位置

```bash
ls -la ~/.openclaw/logs/
# gateway.log  -- 网关日志（最常看的）
# error.log    -- 错误日志
# access.log   -- 访问日志
```

### 6.2 查看日志

```bash
openclaw gateway logs                  # 查看日志
openclaw gateway logs --lines 100      # 查看最后 100 行
openclaw gateway logs --follow         # 实时追踪（Ctrl+C 停止）
```

### 6.3 日志关键词速查

| 关键词 | 含义 |
| --- | --- |
| `[INFO]` | 普通信息，一般不用管 |
| `[WARN]` | 警告，值得关注 |
| `[ERROR]` | 出错了，需要处理 |
| `[FATAL]` | 严重错误，程序可能崩溃了 |
| `ECONNREFUSED` | 连接被拒绝 |
| `EADDRINUSE` | 端口被占用 |
| `EACCES` | 权限不够 |
| `ETIMEDOUT` | 连接超时 |
| `401` / `authentication_error` | API Key 无效或过期 |
| `429` / `rate_limit` | 请求太频繁，被限速了 |
| `500` / `internal_server_error` | 模型提供商那边出问题了 |

---

## 七、怎么求助

### 7.1 去哪里提问

| 渠道 | 适合什么情况 | 地址 |
| --- | --- | --- |
| OpenClaw GitHub Issues | 确认是软件 Bug、功能建议 | https://github.com/openclaw/openclaw/issues |
| OpenClaw 社区 Discord | 使用问题、快速提问、交流 | 参见官网获取邀请链接 |
| OpenClaw 官方论坛 | 详细的使用教程、经验分享 | 参见官网 |
| 本文档配套群 | 如果你是跟着本文档系列安装的 | 参见文档目录中的联系方式 |

### 7.2 提问模板

```
【环境信息】
- 操作系统：macOS 15.1 / Ubuntu 24.04 / WSL2 Ubuntu 24.04
- Node.js 版本：v20.11.0
- OpenClaw 版本：v2.7.3
- 安装方式：npm 全局安装 / 官方一键脚本

【问题描述】
我在 [做什么操作] 的时候，遇到了 [什么问题]。

【完整的报错信息】
（粘贴完整报错，不要截图——文字更方便别人复制去搜索）

【我已经尝试过的方法】
1. 我试过 xxx，结果是 xxx

【openclaw doctor 的输出】
（粘贴 openclaw doctor 的完整输出）
```

---

## 参考说明

本文档是跨平台通用的排障与维护说明，覆盖了最常见的 17 个问题和完整的维护操作。对于特定平台的安装问题，请同时参考对应平台的安装文档（文档 02/03/05 等）。

如果你遇到了本文档没覆盖到的问题，欢迎反馈，我们会持续更新。
