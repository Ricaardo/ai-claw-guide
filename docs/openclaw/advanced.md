# 11. OpenClaw 进阶玩法通用说明

> **适用对象**：已经跑通 OpenClaw 基础链路（能正常聊天、Skills 能用），准备继续扩展能力的用户 | **文档版本**：V2.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw 进阶能力全面指南，覆盖工具模式、持久记忆、局域网、自动化、多 Agent、费用优化、安全加固等

---

## 一、先确认你已经跑通基础链路

在开始任何进阶操作之前，请确认以下 4 项全部通过：

| 检查项 | 命令 | 期望结果 |
|-------|------|---------|
| OpenClaw 服务运行中 | `openclaw gateway status` | 显示 `OpenClaw gateway is running` |
| 模型 API 已配置 | `openclaw config get model` | 显示你配置的模型名称 |
| Web 控制台能打开 | 浏览器访问 `http://localhost:5154` | 能看到 Web 界面并正常对话 |
| 聊天渠道或 Skill 正常 | 在任意渠道发消息 | 能收到回复 |

4 项都通过后，下面的所有进阶功能都可以放心操作了。

### 不知道从哪开始？

| 你想做什么 | 看哪一章 |
|-----------|---------|
| 让 AI 记住我的偏好 | → 三、USER.md 持久记忆 |
| 手机/平板也能用 | → 四、局域网访问 |
| 定时自动执行任务 | → 五、自动化工作流 |
| 同时用多个 AI 助手 | → 六、多 Agent 配置 |
| 省钱 | → 七、费用与选型优化 |
| 不想手动编辑配置文件 | → 十、可视化配置工具 |

---

## 二、工具能力模式切换

### 五种模式详细说明

| 模式 | 说明 | 能做什么 | 不能做什么 | 推荐 |
|------|------|----------|-----------|------|
| `messaging` | 纯聊天模式 | 文字对话、知识问答 | 不能执行命令、不能操作文件、不能联网 | 只想安全聊天 |
| `default` | 默认模式 | 聊天 + 已安装的 Skills | 不能直接执行终端命令 | 大多数用户用这个（推荐） |
| `coding` | 编程模式 | 聊天 + Skills + 读写代码文件 + 执行编程相关命令 | 不能执行系统管理命令 | 写代码的用户 |
| `full` | 完整模式 | 聊天 + Skills + 代码 + 终端命令 + 文件操作 | 极少数危险操作仍被限制 | 需要完全控制 |
| `all` | 全开模式 | 所有能力全部打开，无任何限制 | 无限制 | 仅限高级用户 |

### 怎么切换

```bash
# 查看当前模式
openclaw config get tools.mode

# 切换到 coding 模式
openclaw config set tools.mode "coding"

# 切换到 full 模式
openclaw config set tools.mode "full"

# 切换到 messaging 模式（只聊天）
openclaw config set tools.mode "messaging"

# 切换回默认模式
openclaw config set tools.mode "default"

# 切换到全开模式（谨慎使用）
openclaw config set tools.mode "all"
```

---

## 三、USER.md 持久记忆（5 分钟）

### 文件放在哪

```
~/.openclaw/USER.md
```

- macOS：`/Users/你的用户名/.openclaw/USER.md`
- Linux：`/home/你的用户名/.openclaw/USER.md`
- Windows：`C:\Users\你的用户名\.openclaw\USER.md`

### 怎么写

```bash
# macOS / Linux
nano ~/.openclaw/USER.md

# 如果你更习惯用 VS Code
code ~/.openclaw/USER.md
```

Windows 用户：

```powershell
notepad "$env:USERPROFILE\.openclaw\USER.md"
```

### USER.md 示例模板

```markdown
# 关于我

## 个人背景
- 职业、行业、技术水平简述

## 工作偏好
- 回复语言（如：中文）
- 偏好风格（如：简洁直接、结论先行）
- 输出格式（如：优先用表格和编号列表）
- 不确定时直接说明，不要编造

## 常用工具
- 文档/设计/项目管理/数据分析等工具列表

## 沟通风格
- 对特定指令的理解约定（如"帮我搞一下"=直接执行）

## 常见任务
- 周期性任务及格式要求
- 高频任务类型

## 其他
- 时区、工作时间等
```

### 注意事项

- USER.md 的内容在**每次对话开始时**加载，改后需**开新对话**才能生效。
- 不要在 USER.md 里写密码、API Key 等敏感信息。
- 建议控制在 200 行以内，太长会浪费模型的上下文窗口。

---

## 四、局域网访问（10 分钟）

默认情况下，OpenClaw 只能在安装它的那台电脑上访问（只能用 `localhost`）。开启局域网访问后，同一 Wi-Fi 下的其他设备（手机、平板、另一台电脑）也能访问。

### 怎么设置

**第 1 步：修改网关绑定地址**

```bash
openclaw config set gateway.host "0.0.0.0"
```

**第 2 步：重启网关**

```bash
openclaw gateway restart
```

**第 3 步：找到你本机的 IP 地址**

macOS：

```bash
ipconfig getifaddr en0
```

Linux：

```bash
hostname -I | awk '{print $1}'
```

Windows（PowerShell）：

```powershell
(Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.InterfaceAlias -like "Wi-Fi*" -or $_.InterfaceAlias -like "以太网*"}).IPAddress
```

**第 4 步：确认防火墙放行端口**

Linux（如果你用了 ufw）：

```bash
sudo ufw allow 5154/tcp
sudo ufw reload
```

Windows（PowerShell，管理员运行）：

```powershell
New-NetFirewallRule -DisplayName "OpenClaw" -Direction Inbound -Protocol TCP -LocalPort 5154 -Action Allow
```

### 手机/平板怎么连

1. 确保手机/平板和你的电脑连在**同一个 Wi-Fi** 下
2. 打开手机/平板的浏览器
3. 在地址栏输入：`http://你的电脑IP:5154`（比如 `http://192.168.1.100:5154`）

### 安全注意事项

1. **不要在公共 Wi-Fi 下开启局域网访问**（咖啡馆、机场等）
2. **建议设置 Web Token 保护**（见本文"安全加固"章节）：

```bash
openclaw config set gateway.auth.token "你设一个复杂的密码"
openclaw gateway restart
```

3. **用完之后可以关掉局域网访问**：

```bash
openclaw config set gateway.host "127.0.0.1"
openclaw gateway restart
```

---

## 五、自动化工作流实战（每个案例 5 分钟）

自动化工作流是 OpenClaw 最强大的能力之一。下面给 5 个完整的实战案例。

### 案例 1：每天定时发天气预报和今日待办

**所需 Skills**：`scheduler`、`weather`、`notify`

**指令要点**：
- 每天早上 8:00 执行
- 查询指定城市天气（今天和明天）
- 读取 `~/.openclaw/data/todo.md` 的待办事项
- 合并为"早安简报"（天气 + 待办 + 一句正能量），通过通知渠道发送

**复制粘贴即可用**：对 OpenClaw 说：`请帮我设置一个定时任务：每天早上 8 点查询北京天气，读取 ~/.openclaw/data/todo.md 的待办，合并成早安简报发给我。`

---

### 案例 2：监控某个网页变化并通知

**所需 Skills**：`scheduler`、`browser`、`notify`

**指令要点**：
- 每隔 30 分钟检查目标 URL
- 内容变化时通知，附 diff 对比
- 页面打不开也通知

**复制粘贴即可用**：对 OpenClaw 说：`请帮我每 30 分钟检查一次 https://example.com 的内容，如果有变化就通知我。`

---

### 案例 3：定期整理下载文件夹

**所需 Skills**：`scheduler`、`shell`

**指令要点**：
- 每天晚上 22:00 执行
- 按扩展名分类移动：PDF → 文档/PDF、Office 文件 → 文档/Office、图片/视频/压缩包/安装包各入对应子文件夹
- 只移动不删除，完成后发报告

---

### 案例 4：自动搜索行业新闻生成简报

**所需 Skills**：`scheduler`、`brave-search`、`notify`

**指令要点**：
- 每天上午 9:00 执行
- 按关键词搜索最近 24 小时中文新闻
- 筛选 5-8 条，每条含标题、摘要、来源链接
- 附 100 字以内"今日看点"总结

---

### 案例 5：邮件自动分类和回复草稿

**所需 Skills**：`scheduler`、`imap-smtp-email`、`notify`

**先配置邮件**：

```bash
openclaw config set skills.email.imap_host "imap.gmail.com"
openclaw config set skills.email.imap_port 993
openclaw config set skills.email.smtp_host "smtp.gmail.com"
openclaw config set skills.email.smtp_port 587
openclaw config set skills.email.username "你的邮箱@gmail.com"
openclaw config set skills.email.password "你的应用专用密码"
```

注意：如果你用 Gmail，需要先在 Google 账号里生成"应用专用密码"。其他邮箱（QQ、163 等）也类似，需要开启 IMAP 服务并获取授权码。

**指令要点**：
- 每隔 2 小时检查新邮件
- 按发件人/关键词分为：重要（老板/客户）、待办（含"请回复"等关键词）、通知（系统/营销）
- 重要邮件立刻通知并生成回复草稿（存草稿箱，不自动发送）；待办邮件每天下午 5 点汇总；通知邮件静默归档

---

## 六、多 Agent 配置（15 分钟）

你可以同时运行多个 AI 助手，每个助手负责不同类型的任务，配不同的模型和工具权限。

### 怎么配置

**第 1 步：打开配置文件**

```bash
nano ~/.openclaw/openclaw.json
```

**第 2 步：添加 agents 配置**

以下示例展示一个 Agent 的完整配置，其他 Agent 结构相同：

```json
{
  "model": {
    "provider": "minimax",
    "name": "minimax-m2.5",
    "api_key": "你的API Key"
  },
  "agents": {
    "coder": {
      "name": "代码助手",
      "description": "专门负责编程相关任务",
      "model": {
        "provider": "minimax",
        "name": "minimax-m2.5"
      },
      "tools": { "mode": "coding" },
      "system_prompt": "你是一个专业的编程助手。你擅长 Python、JavaScript、Go 等语言。代码注释用中文。",
      "skills": ["shell", "browser"],
      "memory": { "user_file": "~/.openclaw/agents/coder/USER.md" }
    }
  },
  "agents_default": "coder"
}
```

> 按同样的结构添加更多 Agent（如 `researcher`、`assistant`），只需修改 `name`、`description`、`model`、`tools.mode`、`system_prompt`、`skills` 和 `memory.user_file` 即可。

**第 3 步：为每个 Agent 创建记忆文件（可选）**

```bash
mkdir -p ~/.openclaw/agents/coder
```

**第 4 步：保存并重启**

```bash
openclaw gateway restart
```

### 怎么切换 Agent

```bash
# 查看所有可用的 Agent
openclaw agent list

# 切换到代码助手
openclaw agent switch coder

# 切换到研究员
openclaw agent switch researcher

# 切回日常助手
openclaw agent switch assistant
```

在 Web 界面中，通常在对话框的顶部或侧边栏可以看到 Agent 切换按钮。

---

## 七、费用与选型优化

### 日常使用大概花多少钱

| 使用场景 | 推荐模型 | 月费用估算 |
|---------|---------|-----------|
| 轻度使用（每天聊几次） | DeepSeek Chat | 几乎免费 ~ 5 元/月 |
| 中度使用（每天 20-50 次对话） | DeepSeek Chat 或 通义千问 | 5 ~ 30 元/月 |
| 重度使用（写代码、做分析、自动化） | MiniMax M2.5 | 29 ~ 100 元/月 |
| 重度 + 高精度需求 | Claude / GPT-4 | 100 ~ 500+ 元/月 |
| 自动化任务（定时任务频繁触发） | DeepSeek（辅助）+ MiniMax（主力） | 50 ~ 200 元/月 |

注意：以上只是粗略估算。实际费用跟对话长度、是否带长文本、是否频繁调用工具等都有关系。

### 怎么监控用量

```bash
# 查看今日用量统计
openclaw usage today

# 查看本月用量统计
openclaw usage month

# 查看历史用量
openclaw usage history --days 30

# 设置每日费用上限提醒（比如每天花超过 10 元就提醒）
openclaw config set usage.daily_limit 10
openclaw config set usage.alert true
```

### 省钱策略：双模型搭配

日常聊天用便宜模型，复杂任务临时切高级模型：

```bash
# 主力模型用 DeepSeek（便宜）
openclaw config set model.name "deepseek-chat"

# 需要时临时切换（在聊天里直接说）
请用 minimax-m2.5 帮我分析这份代码
```

或者在配置文件里设置模型路由：

```json
{
  "model": {
    "default": "deepseek-chat",
    "routing": {
      "coding": "minimax-m2.5",
      "chat": "deepseek-chat"
    }
  }
}
```

也可善用免费额度：通义千问（每月免费调用量）、DeepSeek（价格极低）、智谱 GLM（新用户免费 Token）、硅基流动（部分模型有免费额度）。

### 推荐组合方案

| 方案 | 主力模型 | 辅助模型 | 月预算 |
|------|---------|---------|--------|
| 极省方案 | DeepSeek Chat | 无 | 5 元以内 |
| 均衡方案 | MiniMax M2.5 | DeepSeek Chat | 30-60 元 |
| 高配方案 | Claude/GPT-4 | MiniMax M2.5 | 200-500 元 |
| 国产全家桶 | MiniMax M2.5 | 通义千问 | 30-80 元 |

---

## 八、托管版对比：Kimi Claw / MaxClaw / 自部署

| 对比项 | 自部署 OpenClaw | Kimi Claw | MaxClaw |
|-------|----------------|-----------|---------|
| **安装难度** | 需要自己装，有一定门槛 | 注册即用，无需安装 | 注册即用，无需安装 |
| **自由度** | 最高，所有配置都能改 | 有限，只能改开放的选项 | 中等 |
| **模型选择** | 任意模型，自己接 | 仅限 Kimi 系列模型 | 支持多种模型 |
| **Skills 支持** | 全部支持 | 支持部分官方 Skills | 支持部分 Skills |
| **费用结构** | 模型 API 按量付费 | 订阅制（月费） | 订阅制 |
| **月费参考** | 0 + API 费用（可控） | 约 30-100 元/月 | 约 50-150 元/月 |
| **数据存储** | 全在你本地 | 在对方服务器 | 在对方服务器 |
| **隐私安全** | 最高（数据不出本地） | 取决于对方隐私政策 | 取决于对方隐私政策 |
| **7x24 在线** | 需要电脑一直开着或用服务器 | 是 | 是 |
| **多设备访问** | 需要自己配局域网/公网 | 天然支持 | 天然支持 |
| **自动化工作流** | 完全支持 | 部分支持 | 部分支持 |
| **多 Agent** | 支持 | 不支持或有限 | 有限支持 |

---

## 九、OpenCode 辅助排障

OpenCode 是一个命令行 AI 编程助手，可以辅助排障和编程。详细介绍和安装方法见 [10-排障与维护](./troubleshooting.md) 的「用 OpenCode 辅助排障」章节。

---

## 十、可视化配置工具

如果你不喜欢手动编辑 JSON 文件，可以用社区提供的可视化配置工具：

| 工具名 | 类型 | 特点 |
|-------|------|------|
| **OpenClawSwitch** | 桌面应用 | 图形界面，直接编辑配置，支持模型切换 |
| **ClawConfig Web** | 网页工具 | 在浏览器里编辑配置，生成 JSON 后复制粘贴 |
| **openclaw-tui** | 终端界面 | 在终端里用上下键选择配置项，比直接编辑 JSON 直观 |

### 怎么安装

**OpenClawSwitch（推荐新手用）**

```bash
# macOS
brew install --cask openclawswitch

# Linux（下载 AppImage）
wget https://github.com/openclawswitch/releases/latest/download/OpenClawSwitch.AppImage
chmod +x OpenClawSwitch.AppImage && ./OpenClawSwitch.AppImage
```

Windows 用户：去 GitHub Releases 页面下载 .exe 安装包。

其他工具安装方式类似：`openclaw-tui` 用 `pip install openclaw-tui` 安装；**ClawConfig Web** 无需安装，直接访问 `https://clawconfig.tools`。

---

## 十一、备份与恢复

### 配置目录在哪

```
~/.openclaw/
├── openclaw.json          # 主配置文件
├── USER.md                # 持久记忆文件
├── skills/                # 已安装的 Skills
├── agents/                # 多 Agent 配置和记忆
├── data/                  # 数据文件
├── logs/                  # 日志文件
├── memory/                # 对话记忆
└── backups/               # 备份文件
```

### 怎么备份

```bash
# 完整备份
tar -czf ~/openclaw-backup-$(date +%Y%m%d).tar.gz -C ~ .openclaw/

# 只备份配置（不含日志和数据）
tar -czf ~/openclaw-config-backup-$(date +%Y%m%d).tar.gz \
  ~/.openclaw/openclaw.json \
  ~/.openclaw/USER.md \
  ~/.openclaw/agents/
```

### 怎么恢复

```bash
# 先停止 OpenClaw
openclaw stop

# 把当前配置改个名（以防万一）
mv ~/.openclaw ~/.openclaw-old

# 解压备份包
tar -xzf ~/openclaw-backup-20260311.tar.gz -C ~

# 重新启动
openclaw start

# 确认恢复成功
openclaw status
openclaw config get model
```

---

## 十二、安全加固

如果你要长期使用 OpenClaw，尤其是开启了局域网访问或部署在服务器上，安全加固是非常重要的。

### 12.1 API Key 管理

API Key 就像你的银行密码，泄露了别人可以用你的 Key 调用模型，费用算在你头上。

**更安全的做法是用环境变量**：

```bash
# 把 API Key 写入环境变量（macOS / Linux）
echo 'export OPENCLAW_API_KEY="你的API Key"' >> ~/.zshrc
source ~/.zshrc
```

然后在配置文件里引用：

```json
{
  "model": {
    "provider": "minimax",
    "name": "minimax-m2.5",
    "api_key": "${OPENCLAW_API_KEY}"
  }
}
```

其他建议：每 3-6 个月轮换一次 API Key，并在模型提供商后台设置每日/每月费用上限。

### 12.2 Web Token 保护

如果你开启了局域网访问，任何人只要知道你的 IP 和端口，就能打开你的 OpenClaw Web 界面。设置 Token 后，必须输入 Token 才能访问。

```bash
# 设置一个 Token（请换成你自己的复杂密码）
openclaw config set gateway.auth.token "MyS3cure_T0ken!2026"
openclaw gateway restart
```

Token 建议：长度至少 16 个字符，包含大小写字母、数字、特殊符号，不要用生日、手机号等容易猜的内容。
