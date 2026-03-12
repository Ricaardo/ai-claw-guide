# 08. OpenClaw 聊天渠道通用说明

> **适用对象**：想给 OpenClaw 接入聊天渠道的用户（无需任何编程基础） | **文档版本**：V2.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：从零开始的聊天渠道接入指南，重点覆盖飞书、Discord、Telegram 三大推荐渠道的保姆级教程，同时涵盖其他常见渠道的配置概要与通用排障

> 如果你是新手，直接看下面的「飞书」教程（三），这是最简单的上手方式。

---

## 一、什么是聊天渠道

聊天渠道让你在日常 IM 里与 OpenClaw 对话。消息经渠道往返，OpenClaw 调用模型生成回复。

---

## 二、怎么选渠道

选渠道的核心原则：选你每天都在用的平台；如果是本地部署（没有公网 IP），优先选支持长连接/轮询的渠道（飞书、Telegram、Discord）。

### 按用户类型的推荐顺序

| 推荐顺序 | 渠道 | 个人用户（大陆） | 海外用户 | 企业用户 |
|----------|------|-----------------|---------|---------|
| 1 | **飞书** | 不需公网回调、不需审核、中文体验好 | — | 国内企业首选，权限管理完善 |
| 2 | **Discord** | 创建 Bot 简单（需科学上网） | 社区用户多、功能丰富 | — |
| 3 | **Telegram** | 创建 Bot 极简、不需审核（需科学上网） | 全球用户量大、创建 Bot 最简单 | — |
| 4 | **Slack** | — | 职场用户首选，配置稍复杂 | 海外企业首选 |
| 5 | **企业微信** | — | — | 已在用企微则值得接入，配置门槛较高 |

---

## 三、飞书接入保姆级教程（约 15 分钟）

### 3.1 为什么推荐飞书

- **不需要公网 IP**：飞书支持"长连接"模式，你的电脑主动连飞书，本地部署也能用。
- **不需要审核**：创建企业自建应用后，在自己的企业内部直接可用。
- **注册免费**：个人也可以免费注册飞书，不需要企业资质。

### 3.2 你需要准备什么

1. **一个飞书账号**
   - 如果没有，去 [飞书官网](https://www.feishu.cn/) 注册一个。用手机号就能注册，全程免费。
   - 注册后你会自动拥有一个"个人企业"，这就够用了。

2. **一台正在运行 OpenClaw 的电脑**
   - OpenClaw 已经安装好并且能正常启动。
   - 如果还没装，请先参阅本系列的安装文档（02 或 03 号文档）。

### 3.3 在飞书开放平台创建应用

#### 第一步：打开飞书开放平台

在浏览器地址栏里输入以下网址并回车：

```
https://open.feishu.cn/app
```

如果弹出登录页面，用你的飞书账号登录。

#### 第二步：点击"创建企业自建应用"

在页面上方或中央区域，点击 **"创建企业自建应用"** 按钮。不要选"创建商店应用"等其他选项。

#### 第三步：填写应用信息

| 字段 | 填什么 | 举例 |
|------|--------|------|
| **应用名称** | 随便起个名字，这个名字就是你以后在飞书里看到的机器人名字 | `我的AI助手` |
| **应用描述** | 简单写一句用途即可 | `接入OpenClaw的AI聊天机器人` |

应用图标可以不传，系统会给一个默认图标。填好后点击 **"确认创建"**。

#### 第四步：进入应用，添加"机器人"能力

创建成功后，页面会自动跳转到应用管理页面。

1. 看左侧菜单栏，找到 **"添加应用能力"** 或 **"应用能力"**。
2. 在能力列表中找到 **"机器人"**，点击 **"添加"** 或 **"开通"**。

添加成功后，左侧菜单栏会多出一个"机器人"选项。

#### 第五步：记录 App ID 和 App Secret

1. 在左侧菜单栏点击 **"凭证与基础信息"**。
2. 分别复制 **App ID**（`cli_` 开头）和 **App Secret**，保存到记事本里。

> 安全提示：App Secret 相当于密码，不要分享给不相关的人。

#### 第六步：配置事件订阅

1. 在左侧菜单栏找到 **"事件订阅"**，点击进入。
2. 点击 **"添加事件"**，搜索并添加：

```
im.message.receive_v1
```

#### 第七步：选择长连接方式接收事件

1. 在"事件订阅"页面，找到 **"接收方式"** 设置区域。
2. 选择 **"使用长连接接收事件"**（WebSocket 方式）。

> 选长连接模式不需要公网 IP，本地部署也能用。

#### 第八步：配置权限

1. 在左侧菜单栏找到 **"权限管理"**，点击进入。
2. 搜索并开通以下权限：

| 权限名称 | 作用 |
|----------|------|
| `im:message` | 允许获取消息内容 |
| `im:message:send_as_bot` | 允许以机器人身份发送消息 |
| `im:chat:readonly` | 允许获取群组信息（群聊场景需要） |

#### 第九步：发布应用

1. 在左侧菜单栏找到 **"版本管理与发布"**，点击 **"创建版本"**。
2. 版本号填 `1.0.0`，更新说明随便写（如"首次发布"），点击 **"保存"** 后 **"申请发布"**。
3. 个人用户自己就是管理员，直接点击"审批通过"即可。

发布成功后，你在飞书的搜索框里就能搜到这个机器人了。

### 3.4 在 OpenClaw 中配置飞书

在终端中执行：

```bash
openclaw channels add
```

选择 **Feishu**（飞书），按提示填写：

| 系统提示 | 你要填什么 | 值从哪来 |
|----------|-----------|----------|
| App ID | 你的 App ID | 第五步复制的 `cli_` 开头的那串 |
| App Secret | 你的 App Secret | 第五步复制的那串长字符 |
| 连接方式（Connection Mode） | 输入 `websocket` | 就填这个单词 |

看到以下输出说明连接成功：

```
[INFO] Feishu channel connected successfully.
[INFO] Waiting for messages...
```

如果报错了，检查 App ID 和 App Secret 有没有复制错，以及第七步是否选的长连接模式。

### 3.5 配对（Pairing）

"配对"是让 OpenClaw 确认你的飞书身份的过程。配对只需做一次，之后就能直接聊天。

#### 具体操作步骤

**第一步：在飞书里给机器人发一条消息**

在飞书搜索你之前给应用取的名字，进入对话窗口，发送一条消息（如"你好"）。此时机器人不会回复（因为还没配对），这是正常的。

在运行 OpenClaw 的终端窗口里，你会看到配对码：

```
[INFO] New pairing request from Feishu user. Pairing code: ABCD1234
```

**第二步：查看待配对列表**

如果没看到配对码，打开另一个终端窗口执行：

```bash
openclaw pairing list feishu
```

**第三步：批准配对**

```bash
openclaw pairing approve feishu ABCD1234
```

把 `ABCD1234` 替换成你实际看到的配对码。

### 3.6 验证成功

配对完成后，在飞书里再给机器人发一句话。如果机器人回复了，飞书渠道接入成功。

> 在对话框里发一句「你好」，如果收到回复，说明渠道配置成功了。

### 3.7 飞书渠道常见问题

**Q1：我在飞书里发了消息，但机器人完全没有回应，终端里也没有任何新的提示。**

按以下顺序排查：

1. **确认 OpenClaw 还在运行。** 看终端窗口是否已关闭或显示报错后停止。
2. **确认应用已发布且事件订阅正确。** 在飞书开放平台检查应用状态为"已发布"，且事件订阅中有 `im.message.receive_v1`、接收方式为"长连接"。
3. **重启 OpenClaw。** 按 `Ctrl+C` 停止后重新启动。

**Q2：配对码在哪里看？我在终端里刷了很多信息，找不到了。**

两种方法：

- **方法一**：另外打开一个终端窗口，执行 `openclaw pairing list feishu`，会列出所有等待配对的请求。
- **方法二**：在飞书里重新给机器人发一条消息，会生成一个新的配对码，同时终端里也会打印出来。

**Q3：我想重新配对（比如换了电脑、重装了 OpenClaw），怎么操作？**

重新配对的步骤和第一次完全一样：

1. 在飞书里给机器人发一条消息。
2. 用 `openclaw pairing list feishu` 查看配对码。
3. 用 `openclaw pairing approve feishu <配对码>` 批准配对。

不需要去飞书开放平台做任何改动。

---

## 四、Discord 接入保姆级教程（约 10 分钟）

### 4.1 你需要准备什么

1. **一个 Discord 账号**
   - 如果没有，去 [Discord 官网](https://discord.com/) 注册一个，完全免费。
   - 你还需要有一个自己的 Discord 服务器（Server）。点击左侧栏的 **"+"** 号即可免费创建。

2. **一台正在运行 OpenClaw 的电脑**

3. **能访问 Discord 的网络环境**
   - 中国大陆用户需要科学上网。

### 4.2 在 Discord 开发者平台创建 Bot

#### 第一步：打开 Discord 开发者平台

访问 `https://discord.com/developers/applications`，用你的 Discord 账号登录。

#### 第二步：创建 Application

点击 **"New Application"**，输入应用名称（即你的机器人名字），勾选同意条款，点击 **"Create"**。

#### 第三步：获取 Bot Token

在左侧菜单点击 **"Bot"**。点击 **"Reset Token"**（或 **"Copy"**）获取 Token。**Token 只会显示一次，立刻复制并保存到安全的地方。**

> Token 相当于 Bot 的密码，不要分享给任何人。丢失后只能 Reset Token 重新生成。

#### 第四步：开启 Intents 并配置权限

1. 在 Bot 页面下方 **"Privileged Gateway Intents"** 区域，**打开 MESSAGE CONTENT INTENT**（必须，否则收不到消息内容），建议同时打开 SERVER MEMBERS INTENT，点击 **"Save Changes"**。
2. 左侧菜单点击 **"OAuth2"** → **"URL Generator"**，SCOPES 勾选 **`bot`**，BOT PERMISSIONS 勾选 `Send Messages`、`Read Message History`、`View Channels`。
3. 复制底部生成的链接，在浏览器中打开，选择你的服务器并授权。

### 4.3 在 OpenClaw 中配置

```bash
openclaw channels add
```

选择 **Discord**，填入 Bot Token。看到以下输出说明连接成功：

```
[INFO] Discord channel connected successfully.
[INFO] Bot is online. Waiting for messages...
```

也可以直接编辑配置：

```bash
openclaw config set 'channels.discord' --json '{
  "enabled": true,
  "token": "你的Bot Token粘贴在这里"
}'
openclaw gateway restart
```

### 4.4 配对

**第一步**：在 Discord 里给 Bot 发一条私信（右键点击 Bot → "Message"），或在频道里 `@你的Bot名字 hello`。

**第二步**：查看配对码：

```bash
openclaw pairing list discord
```

**第三步**：批准配对：

```bash
openclaw pairing approve discord <配对码>
```

### 4.5 验证

配对成功后，在 Discord 里给 Bot 发一条消息。如果 Bot 回复了你，说明 Discord 渠道接入成功了。

> 在对话框里发一句「你好」，如果收到回复，说明渠道配置成功了。

### 4.6 常见问题

**Q1：Bot 在 Discord 里一直显示离线（灰色圆点）。**

- 确认 OpenClaw 正在运行且终端里没有报错。
- 确认 Bot Token 填写正确——最常见的错误是复制时多了一个空格或少了一个字符。重新复制粘贴试试。
- 确认你的电脑能正常访问 Discord（中国大陆用户检查科学上网是否正常）。试着在浏览器里打开 `https://discord.com`，如果打不开，说明网络有问题。
- 确认你没有在其他地方（比如另一台电脑）也用同一个 Token 运行了另一个程序。一个 Token 同一时间只能被一个程序使用。

**Q2：Bot 显示在线了，但发消息没有任何回复。**

- **最常见原因**：忘记开启 MESSAGE CONTENT INTENT。回到 Discord 开发者平台 → Bot 页面 → 往下滚 → 把 "MESSAGE CONTENT INTENT" 开关打开 → 保存 → 重启 OpenClaw。
- 确认你已经完成了配对（第 4.4 节）。没配对的话，OpenClaw 收到消息也不会回复。
- 如果你是在服务器频道里（不是私信），确认你 @了 Bot。大部分配置下，Bot 只会回复被 @ 的消息。

---

## 五、Telegram 接入保姆级教程（约 5 分钟）

### 5.1 你需要准备什么

1. **一个 Telegram 账号** — 去 [Telegram 官网](https://telegram.org/) 下载客户端，用手机号注册即可。
2. **一台正在运行 OpenClaw 的电脑**
3. **能访问 Telegram 的网络环境**（中国大陆用户需要科学上网）

### 5.2 通过 @BotFather 创建 Bot

在 Telegram 搜索 `@BotFather`（认准蓝色认证勾），进入对话：

1. 发送 `/newbot`
2. BotFather 让你输入显示名称（中英文均可，如 `我的AI助手`）
3. BotFather 让你输入用户名（必须英文、以 `bot` 结尾，如 `my_openclaw_ai_bot`）
4. 创建成功后 BotFather 会返回 Token，**立刻复制并保存**。如不慎泄露，可发送 `/revoke` 重置。

### 5.3 在 OpenClaw 中配置

```bash
openclaw channels add
```

选择 **Telegram**，填入从 BotFather 获取的 Token。看到以下输出说明连接成功：

```
[INFO] Telegram channel connected successfully.
[INFO] Waiting for messages...
```

> Telegram Bot 默认使用 Polling 模式，不需要公网 IP。

接下来完成配对：

1. 在 Telegram 中搜索你的 Bot 用户名，点击 **"Start"**（或发送 `/start`）。
2. 发一条消息，比如"你好"。
3. 查看配对码：`openclaw pairing list telegram`
4. 批准配对：`openclaw pairing approve telegram <配对码>`

### 5.4 验证

配对完成后，在 Telegram 里给 Bot 发一条消息。收到 AI 回复即表示接入成功。

> 在对话框里发一句「你好」，如果收到回复，说明渠道配置成功了。

### 5.5 常见问题

**Q1：给 Bot 发消息后，OpenClaw 终端里没有任何反应。**

- **确认 Token 填写正确。** 尝试删除渠道后重新添加，仔细粘贴 Token。
- **确认网络通畅。** 如果你在用代理/VPN，确认终端环境也走了代理（设置 `http_proxy` 和 `https_proxy` 环境变量）。
- **确认没有其他程序也在用这个 Token。** 一个 Bot Token 同一时间只能被一个程序使用。

---

## 六、其他渠道概要

以下渠道同样受 OpenClaw 支持，但配置复杂度或使用门槛各有不同。

### 6.1 Slack

适合海外企业团队使用的职场沟通工具，配置步骤比 Telegram/Discord 多一些。

**配置命令**：

```bash
openclaw channels add
# 在菜单中选择 Slack，按提示填写 Bot Token 和 App-Level Token
```

或者直接编辑配置：

```bash
openclaw config set 'channels.slack' --json '{
  "enabled": true,
  "mode": "socket",
  "appToken": "xapp-你的AppLevelToken",
  "botToken": "xoxb-你的BotToken"
}'
openclaw gateway restart
```

**注意事项**：
- 需要在 [Slack API 平台](https://api.slack.com/apps) 创建 App。
- 强烈建议使用 **Socket Mode**（类似飞书的长连接模式），不需要公网回调地址。
- 使用 Socket Mode 需要在 App 设置的 "Basic Information" → "App-Level Tokens" 中生成一个 Token，权限选 `connections:write`。
- 需要开通的 Bot Token Scopes：`chat:write`、`im:history`、`im:read`、`app_mentions:read`。

### 6.2 WhatsApp

全球用户量最大的即时通讯工具，但接入需要通过 Meta 的商业平台，流程较长。

**配置命令**：

```bash
openclaw channels add
# 选择 WhatsApp，按提示填写 Phone Number ID、Business Account ID 和 Access Token
```

**注意事项**：
- 需要在 [Meta for Developers](https://developers.facebook.com/) 创建应用并配置 WhatsApp Business API。
- 需要 **公网可访问的 Webhook 回调地址**，建议云端部署。
- 需要一个经过验证的 Facebook Business 账号。
- 整体配置比飞书和 Telegram 复杂很多，建议有一定经验后再尝试。

### 6.3 企业微信

适合已经在使用企业微信的国内企业，但配置门槛是所有主流渠道中最高的之一。

**配置命令**：

```bash
openclaw config set 'channels.wechat-work' --json '{
  "enabled": true,
  "corpId": "你的CorpId",
  "agentId": "你的AgentId",
  "secret": "你的Secret",
  "token": "你的Token",
  "encodingAESKey": "你的EncodingAESKey"
}'
openclaw gateway restart
```

**难点和门槛**：

| 门槛 | 具体说明 |
|------|----------|
| 企业认证 | 需要有一个经过认证的企业微信组织。 |
| 公网回调 | 需要公网可访问的回调地址。本地部署需用 frp、ngrok 等内网穿透工具。 |
| 可信域名 | 需要配置可信域名并放置验证文件。 |
| IP 白名单 | API 调用需要把服务器 IP 加入白名单。 |
| 凭证多 | 需要填写 5 个凭证（CorpId、AgentId、Secret、Token、EncodingAESKey）。 |

### 6.4 QQ 机器人

面向 QQ 用户的机器人接入，但目前官方 API 限制较多，个人用户体验不太友好。

**配置命令**：

```bash
openclaw channels add
# 选择 QQ，按提示填写 App ID 和 Token
```

**难点和门槛**：

| 门槛 | 具体说明 |
|------|----------|
| 官方 API 限制 | 目前主要支持频道（Guild）场景，不支持普通 QQ 群和好友私聊。 |
| 开发者认证 | 需要在 [QQ 开放平台](https://q.qq.com/) 注册并认证。 |
| 审核 | 创建的机器人需要提交审核，审核时间不确定。 |
| 沙箱限制 | 审核通过前只能在沙箱频道中测试。 |

### 6.5 钉钉

适合使用钉钉办公的企业用户，配置体验介于飞书和企业微信之间。

**配置命令**：

```bash
openclaw channels add
# 选择 DingTalk，按提示填写 App Key 和 App Secret
```

**注意事项**：
- 需要在 [钉钉开放平台](https://open.dingtalk.com/) 创建企业内部应用。
- 推荐使用 **Stream 模式**（类似飞书长连接），不需要公网地址。
- 需要给应用添加"机器人"能力，并配置消息接收权限。

### 6.6 Signal

注重隐私和安全的即时通讯工具，适合对数据安全有极高要求的用户，但配置最复杂。

**配置命令**：

```bash
openclaw channels add
# 选择 Signal，按提示填写 Signal 号码和 API 地址
```

**注意事项**：
- Signal 没有官方 Bot API，需要借助 `signal-cli` 或 `signald` 等第三方桥接工具。
- 需要一个独立的手机号注册 Signal 账号作为 Bot 号码。
- 需要先部署 signal-cli REST API 服务。
- 适合有一定技术基础、非常在意通信隐私的用户。

### 6.7 iMessage / BlueBubbles

让你在 iMessage 里跟 AI 聊天。仅限 macOS 用户，需要额外安装 BlueBubbles Server。

**配置命令**：

```bash
openclaw channels add
# 选择 BlueBubbles，按提示填写 BlueBubbles 服务器地址和密码
```

**注意事项**：
- 必须有一台始终开机运行的 Mac 电脑。
- 需要先在 Mac 上安装 [BlueBubbles Server](https://bluebubbles.app/)，它把 iMessage 的消息通过 API 暴露出来。
- 优点：对方完全不需要做任何配置，体验非常自然。
- 缺点：需要 Mac + BlueBubbles + OpenClaw 三者配合，且 Mac 不能关机或休眠。

---

## 七、按部署方式怎么选

### 7.1 本地部署（你自己的电脑，没有公网 IP）

| 优先级 | 渠道 | 连接方式 | 说明 |
|--------|------|----------|------|
| 1 | **飞书** | WebSocket 长连接 | 最推荐。完全不需要公网 IP。 |
| 2 | **Telegram** | Polling 轮询 | 不需要公网 IP。 |
| 3 | **Discord** | WebSocket 长连接 | 不需要公网 IP。 |
| 4 | **Slack**（Socket Mode） | WebSocket 长连接 | 选 Socket Mode 就不需要公网 IP。 |
| 5 | **钉钉**（Stream 模式） | 长连接 | 选 Stream 模式就不需要公网 IP。 |
| 6 | **iMessage / BlueBubbles** | 本地 API | Mac 上本地通信，不需要公网 IP。 |
| 不推荐 | 企业微信 | HTTP 回调 | 需要公网回调地址，本地部署需内网穿透。 |
| 不推荐 | WhatsApp | HTTP 回调 | 同上。 |
| 不推荐 | QQ 机器人 | HTTP 回调 | 同上，且还有审核和白名单限制。 |

### 7.2 云端部署（有公网 IP 的服务器）

| 优先级 | 渠道 | 建议的连接方式 | 说明 |
|--------|------|---------------|------|
| 全部可用 | **所有渠道** | 不限 | 有公网 IP 就没有限制。 |
| 特别推荐 | **Telegram**（Webhook） | HTTP 回调 | 比 Polling 模式响应更快、资源消耗更低。 |
| 特别推荐 | **Slack**（Event API） | HTTP 回调 | 比 Socket Mode 更稳定。 |
| 特别推荐 | **企业微信** | HTTP 回调 | 云端部署完美解决了企微最大的配置痛点。 |
| 特别推荐 | **WhatsApp** | HTTP 回调 | 云端部署是 WhatsApp 接入的前提条件。 |

---

## 八、聊天渠道通用排障

大部分问题都是配置信息填错导致的，按下面的清单逐项检查通常就能解决。

无论你用的是哪个渠道，遇到问题时都可以先对照下面的列表来排查。

### Q1：消息发了没有回复

这是最常见的问题。按以下顺序逐一排查：

1. **OpenClaw 是否在运行？** 检查你的终端窗口。如果终端已经关闭了、或者显示了报错信息后停止了，说明 OpenClaw 没在运行。重新启动它。
2. **渠道是否连接成功？** 看终端输出中是否有类似 `connected successfully` 或 `Waiting for messages` 的提示。如果没有，说明渠道本身就没连上，检查凭证是否正确。
3. **是否完成了配对？** 如果没配对，OpenClaw 收到消息也不会回复。执行 `openclaw pairing list <渠道名>` 检查是否有待批准的配对请求。
4. **AI 模型是否正常？** 在 OpenClaw 的浏览器界面（Web UI）里发同样的消息试试。如果浏览器里也不回复，说明是 AI 模型配置的问题（比如 API Key 过期、模型地址填错），不是渠道的问题。请查阅模型配置文档（06 号文档）。
5. **网络是否通畅？** 特别是使用海外服务（Discord、Telegram）的用户，确认代理/VPN 正常工作，且终端环境也走了代理。

### Q2：配对失败

**症状**：执行 `openclaw pairing approve` 后系统提示失败或无反应。

排查清单：
- **配对码是否输错了？** 注意区分大小写、不要多打空格。建议直接从 `openclaw pairing list` 的输出中复制。
- **配对码是否过期了？** 配对码通常有几分钟的有效期。如果过期了，在聊天软件里重新给 Bot 发一条消息，会生成新的配对码。
- **渠道名是否拼对了？** 比如飞书是 `feishu`、Telegram 是 `telegram`、Discord 是 `discord`（注意全小写）。
- **OpenClaw 版本是否太旧？** 尝试更新到最新版。

### Q3：提示 "unauthorized" 或 "401"

**含义**：你提供的凭证（Token、App ID、App Secret 等）不正确或已经过期失效。

解决方法：
1. 回到对应平台的开发者后台，确认你的凭证没有被重置或过期。
2. 重新复制凭证。常见的坑：复制时多了一个空格、少了一个字符、或者复制了旧的 Token。
3. 删除旧渠道并重新添加：

```bash
openclaw channels remove <渠道名>
openclaw channels add
# 重新选择渠道并填写正确的凭证
```

### Q4：渠道连接断开

检查终端是否有 `connection lost` 等错误日志。常见原因：网络波动（等一两分钟看是否自动重连）、电脑休眠、Token 被重置。兜底方案：重启 OpenClaw。

### Q5：回复速度很慢

先在浏览器 Web UI 里发同样的问题。如果也慢，是模型本身的问题（换更快的模型或检查 API 网络）；如果浏览器里快但渠道里慢，检查代理/VPN 速度。

### Q6：能收到消息但不能发出回复

排查权限：飞书检查 `im:message:send_as_bot`、Discord 检查 `Send Messages`、Slack 检查 `chat:write`。也可能是 Bot 在群组中被禁言。

### Q7：多渠道同时用会冲突吗？

不会。各渠道独立运行、独立配对、独立对话记录，互不干扰。

### Q8：怎么删除一个渠道

```bash
openclaw channels remove <渠道名称>
```

删除后平台上的 Bot 还在，但不再回复消息。重新接入只需 `openclaw channels add`。

---

> 本文档版本 V2.0，更新于 2026 年 3 月 11 日。如有疏漏或过时内容，欢迎反馈。
