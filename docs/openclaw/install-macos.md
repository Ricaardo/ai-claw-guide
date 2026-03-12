# 03. OpenClaw 本地安装指南（macOS 版，零基础适用）

> **适用对象**：中国大陆用户，无需编程基础 | **文档版本**：V2.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw macOS 本地安装完整指南，零基础适用

---

## 先看这 3 句话

- 这份文档适合「想把 OpenClaw 装在自己电脑上、愿意自己掌控环境、能接受一次性安装配置」的人
- 如果你不想在本机装环境，只想尽快用起来，请改看"云端部署指南"
- 如果你是纯新手，优先看"二、本地安装篇"；如果你已经安装完成，只是不知道怎么配模型，可直接跳到"三、模型配置"

> 只想先在 Mac 上快速装起来，不想先读完整篇？先看 [`02-OpenClaw-本地安装-macOS-一键脚本指南.md`](./install-macos-script.md)。

### 5 分钟成功路径

1. 安装 Homebrew
2. 安装 Node.js 22 或更高版本
3. 安装 OpenClaw
4. 运行 `openclaw onboard`
5. 打开本地 Web 控制台并发送一句测试消息

### 阅读导航

| 你的情况 | 建议直接看哪里 |
|------|------|
| 第一次在 Mac 上装这类工具 | `二、本地安装篇` |
| 已经装好 OpenClaw，但打不开 | `六、常见问题排查` |
| 想选一个省钱又好用的模型 | `三、模型配置` |
| 想接飞书、钉钉等聊天渠道 | `四、聊天渠道配置` |

---

## 一、OpenClaw 是什么？

- **能真正干活**：不仅回答问题，还能操作你的电脑——发邮件、管日历、整理文件、写代码、控制浏览器
- **24 小时待命**：部署后在后台运行，通过飞书、钉钉等发消息即可指挥
- **支持多种模型**：Claude、GPT、DeepSeek、通义千问、智谱 GLM、Kimi、MiniMax 等
- **完全免费开源**：软件本身不收费，唯一费用是模型 API 调用（国产模型月均几十元即可）

---

## 二、本地安装篇（以 macOS 为主）

macOS 是 OpenClaw 原生支持最好的平台，也是社区推荐的本地部署首选。

### 先别往下翻：安装失败先看这里

- `openclaw: command not found`：先看 `2.4` 里的 PATH 处理
- `node --version` 低于 22：先升级 Node.js 再继续
- npm 提示权限不足：不要先上 `sudo`，先按 `2.4` 的用户目录方案处理
- 浏览器打不开控制台：先到常见问题里看端口占用和配置错误

### 2.0 安装前判断

本地安装适合你的前提：电脑大多数时间开机、愿意安装基础环境（Homebrew / Node.js）、希望文件和配置掌握在自己手里。否则建议改走云端部署。

### 2.1 安装 Homebrew

打开「终端」（Spotlight 搜索"终端"）：

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

安装过程中需要输入 Mac 登录密码（输入时屏幕不显示，正常现象）。完成后按提示执行 `eval` 命令将 Homebrew 加入环境变量。

### 2.2 安装 Node.js（版本 ≥ 22）

```bash
brew install node
node --version
# 输出应为 v22.x.x 或更高
```

> 版本低于 22 可用 `brew upgrade node` 升级。

### 2.3 配置 npm 国内镜像

```bash
npm config set registry https://registry.npmmirror.com
```

### 2.4 安装 OpenClaw

**方法一：官方脚本（推荐）**
```bash
curl -fsSL https://get.openclaw.ai | bash
```

**方法二：npm 全局安装**
```bash
npm install -g openclaw@latest
```

**如果 npm 提示权限不足：**

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
npm install -g openclaw@latest
```

安装完成后验证：
```bash
openclaw --version
```

**如果提示 `openclaw: command not found`**：

```bash
npm prefix -g
echo 'export PATH=$(npm prefix -g)/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### 2.5 运行配置向导（onboard）

运行配置向导（onboard 是英文"引导上手"的意思）：

```bash
openclaw onboard
```

向导会依次引导你完成：选择 AI 模型、输入 API Key、选择聊天渠道、安装 Skills、启动网关服务等。

配置完成后，向导会给出 Web 控制台地址（通常是 `http://127.0.0.1:18789/#token=xxxxx`），在浏览器打开即可开始使用。

> 如果收到回复，恭喜，你的 OpenClaw 已经安装成功了！

### 2.6 macOS 防止休眠

Mac 进入睡眠后 OpenClaw 会停止工作。解决方案：

- 系统设置 → 电池（或节能）→ 将「在电池供电时关闭显示器之后自动休眠」关闭
- 或使用 `caffeinate` 命令防止休眠：
  ```bash
  caffeinate -s &
  ```
- Mac mini / Mac Studio 等桌面机型更适合做长期运行的 OpenClaw 主机

### 2.7 其他平台简要说明

- **Windows**：推荐通过 WSL2 安装，详见 [`02A-OpenClaw-本地安装-Windows-一键脚本指南.md`](./install-windows-script.md)
- **Linux**：详见 [`02B-OpenClaw-本地安装-Linux-一键脚本指南.md`](./install-linux-script.md)

---

安装部分到此结束。接下来配置模型，让 OpenClaw 连上 AI——这一步更简单。

## 三、模型配置

完整的模型配置说明（通用模板、多模型切换、JSON 配置示例等）请参考：[06-OpenClaw-模型配置-通用说明.md](./model-config.md)

### 3.1 本地部署推荐顺序

1. `MiniMax M2.5` — Agent 能力强、响应快
2. `DeepSeek Chat` — 最省钱
3. `通义千问 Qwen`
4. `智谱 GLM`
5. `Kimi`

国产模型注册和支付门槛低，本地部署先跑通基础链路最重要。已有稳定海外 IP 和支付方式的用户再考虑 Claude / GPT / Gemini。

### 3.2 最短成功路径

1. 运行 `openclaw onboard`
2. 在向导里选一个你已有账号的平台
3. 先只配一个默认模型
4. 能回复后，再回头配第二个辅助模型

> 不想分别注册多个海外平台？OpenRouter（`https://openrouter.ai`）是聚合方案，一个 Key 可调用数百种模型。

---

## 四、聊天渠道配置

完整的渠道配置说明请参考：
- [08-OpenClaw-聊天渠道-通用说明.md](./channel-guide.md)
- [07-OpenClaw-聊天渠道-配置总表.md](./channel-overview.md)

### 4.1 macOS 推荐渠道

优先选择（不需要复杂的公网回调，本机容易跑通）：飞书、Discord、Telegram、WhatsApp、iMessage / BlueBubbles

暂不建议一开始选：企业微信、QQ 机器人、需要公网 HTTPS 回调的其他渠道（门槛来自公网地址、内网穿透和平台审核）

### 4.2 使用 Web 控制台（最简单）

```bash
openclaw dashboard
```

浏览器会自动打开 `http://127.0.0.1:18789`。

> 直接访问可能提示 `unauthorized`，请使用 onboard 时提供的带 token 的完整 URL。查看 token：
> ```bash
> grep '"token"' ~/.openclaw/openclaw.json
> ```

---

## 五、日常使用指南

### 5.1 常用命令速查

| 命令 | 说明 |
|------|------|
| `openclaw onboard` | 运行配置向导 |
| `openclaw doctor` | 检查系统健康状态 |
| `openclaw status` | 查看运行状态 |
| `openclaw gateway start` | 启动网关服务 |
| `openclaw gateway restart` | 重启网关（改配置后必做） |
| `openclaw gateway status` | 查看网关状态 |
| `openclaw dashboard` | 打开 Web 控制台 |
| `openclaw skills list` | 列出已安装的技能 |
| `openclaw skills install <名称>` | 安装新技能 |
| `openclaw config set <键> <值>` | 修改配置项 |
| `openclaw --version` | 查看版本 |
| `openclaw uninstall` | 卸载 OpenClaw |

### 5.2 工具能力模式切换

默认为 `messaging`（纯聊天），需要文件操作、命令执行等功能时切换为 `full`：

```bash
openclaw config set tools.profile full
openclaw gateway restart
```

完整模式说明详见 [11-OpenClaw-进阶玩法-通用说明.md](./advanced.md)。

### 5.3 让 OpenClaw 7x24 小时运行（macOS）

- 系统设置 → 电池 → 关闭「自动休眠」，或终端运行 `caffeinate -s &`
- MacBook 外接电源时可关闭合盖休眠：
  ```bash
  sudo pmset -b disablesleep 1
  sudo pmset -c disablesleep 1
  ```
- Mac mini / Mac Studio 最适合长期运行，功耗低

---

## 六、常见问题排查

通用问题（npm 超时、端口占用、配置写错、模型回复为空等）请参考：[10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md)

以下为 macOS 特有问题：

### Q1：安装时提示 `openclaw: command not found`

npm 全局安装目录没在系统 PATH 中：
```bash
npm prefix -g
echo 'export PATH=$(npm prefix -g)/bin:$PATH' >> ~/.zshrc
source ~/.zshrc
```

### Q2：安装报错 `node-gyp rebuild` 失败

需要安装 Xcode 命令行工具：
```bash
xcode-select --install
```
弹出对话框后点击「安装」，完成后重新执行 OpenClaw 安装命令。

---

### 6.5 版本升级与卸载

升级和卸载的完整说明请参考：[10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md)

> macOS 注意：如果你是 npm 全局安装，升级前确认用户级 npm 目录仍在 PATH 中。不建议长期依赖 `sudo npm install -g`。

---

## 七、下一步

确认以下基础已完成后，再探索进阶功能：Web 控制台能正常打开、至少一个模型能稳定回复、至少一个聊天渠道已接通。

- [01-OpenClaw-新手路线图.md](../guide/index.md)
- [11-OpenClaw-进阶玩法-通用说明.md](./advanced.md)
