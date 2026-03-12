# 04. OpenClaw 云端部署指南（通用版，零基础适用）

> **适用对象**：中国大陆用户，无需编程基础 | **文档版本**：V2.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw 云端部署完整指南，零基础适用

---

## 先看这 3 句话

- 这份文档适合「不想折腾命令行、希望 7x24 小时在线、想直接用手机或 IM 控制 OpenClaw」的人
- 如果你更想把 OpenClaw 装在自己的 Mac 或电脑上，请改看"本地安装指南"
- 如果你是纯新手，优先看"二、云端部署篇"；如果你已经部署好了服务器，可直接跳到"三、模型配置"

### 5 分钟成功路径

1. 买一台阿里云或腾讯云轻量服务器
2. 在控制台里配置一个可用的模型 API Key
3. 按页面提示生成 OpenClaw 访问链接或 Token
4. 用浏览器打开 Web 控制台
5. 先发一句测试消息，确认已经能正常回复

### 阅读导航

| 你的情况 | 建议直接看哪里 |
|------|------|
| 完全不会命令行，只想一键部署 | `2.3 一键云端部署` |
| 在阿里云和腾讯云之间纠结 | `两大云平台对比总结` |
| 已经部署成功，只是不知道配什么模型 | `三、模型配置` |
| 想接飞书、钉钉等聊天渠道 | `四、聊天渠道配置` |

---

## 一、OpenClaw 是什么？

- **能真正干活**：不仅回答问题，还能操作服务器——发邮件、管日历、整理文件、写代码
- **24 小时待命**：部署后在后台运行，通过飞书、钉钉等发消息即可指挥
- **支持多种模型**：Claude、GPT、DeepSeek、通义千问、智谱 GLM、Kimi、MiniMax 等
- **完全免费开源**：软件本身不收费，唯一费用是模型 API 调用（国产模型月均几十元即可）

---

## 二、云端部署篇

### 2.1 硬件要求

| 项目 | 最低要求 | 推荐配置 |
|------|---------|---------|
| CPU | 双核以上 | 4 核以上 |
| 内存 | 4GB | 8GB 及以上 |
| 硬盘 | 2GB 可用空间 | 10GB 以上 |
| GPU | **不需要** | 不需要（AI 计算由云端模型完成） |

### 2.2 选择你的云端平台

| 平台 | 难度 | 说明 |
|------|------|------|
| **阿里云轻量应用服务器** | ⭐ | 预装镜像资料最成熟，适合只想点鼠标完成部署的新手 |
| **腾讯云 Lighthouse** | ⭐ | 面板化配置更强，适合要接 QQ、企微、飞书、钉钉的用户 |
| **腾讯云智能体开发平台** | ⭐ | 托管程度最高，几乎不用管理服务器，但费用通常更高 |

### 2.3 云端部署怎么选（给小白的最短答案）

- 想要**便宜、成熟、资料多**：选阿里云
- 想要**QQ / 企业微信 / 钉钉 / 飞书接入更省心**：选腾讯云 Lighthouse
- 想要**连服务器都不想管**：选腾讯云智能体开发平台

### ⚠️ 安全注意事项（必读）

| 场景 | 安全建议 |
|------|---------|
| API Key | 不要分享给他人，不要发到群里，定期轮换 |
| Web 控制台 Token | 包含 Token 的链接不要发给别人，拿到链接 = 拿到完整控制权 |
| Skills 安装 | 始终先安装 `skill-vetter` 检查安全性，优先选高下载量、有 GitHub 仓库的技能 |
| 服务器端口 | 一键部署默认使用随机端口，较安全；注意不要暴露网关到公网 |
| 自动化确认 | 开启全自动模式前务必了解风险，AI 将自主执行操作 |

> **核心原则**：API Key = 银行卡密码，Web Token = 家门钥匙，请妥善保管。请确保始终使用最新版本以获得安全修复。

---

### ▶ 方案 A：阿里云轻量应用服务器部署（推荐新手首选）

#### 第一步：购买服务器

1. 打开阿里云 OpenClaw 一键部署专题页：`https://www.aliyun.com/activity/ecs/clawdbot`
2. 点击【一键购买并部署】
3. 配置参数：
   - **镜像**：选择「应用镜像」→ `OpenClaw`（已预装全部依赖）
   - **实例规格**：内存 **2GiB 及以上**（推荐 2 核 2G）
   - **地域**：推荐「中国香港」（免备案、联网搜索正常）或「美国（弗吉尼亚）」
   - **购买时长**：测试选 1 个月，长期推荐年付
4. 完成支付，等待 3~5 分钟，实例变为「运行中」

#### 第二步：获取百炼 API Key

1. 访问百炼（阿里云的 AI 模型服务平台）控制台：`https://bailian.console.aliyun.com`
2. 用阿里云/支付宝账号登录
3. 右上角 ⚙️ → API Key → 创建 API Key
4. **立即复制并保存**（只显示一次）

> 首次开通百炼会发放免费额度，建议开启「免费额度用完即停」。如需长期使用，可购买百炼 Coding Plan（`https://www.aliyun.com/benefit/scene/codingplan`），固定月费、多模型可选。注意 Coding Plan 有专属 API Key（`sk-sp-xxxxx`）和专属 Base URL，与普通百炼 Key 不互通。

#### 第三步：在控制台配置 OpenClaw（全程鼠标操作）

1. 登录阿里云控制台 → 轻量应用服务器 → 点击实例 ID → 应用详情
2. 按页面「OpenClaw 使用步骤」依次操作：

**步骤 1：端口放通** — 点击「执行命令」，系统自动放通端口

**步骤 2：配置百炼 API Key** — 点击「一键配置」，粘贴 API Key，执行

**步骤 3：生成访问 Token** — 点击「执行命令」，**复制并保存完整访问链接**

#### 第四步：开始使用

点击「打开网站页面」，在 Web 控制台发送「你好，你是谁？」——收到回复，恭喜，部署成功！

#### 如何替换/更换 API Key

**方法一：通过控制台面板** — 应用详情 → 模型配置 → 修改 API Key → 保存

**方法二：通过 Web 控制台** — Config → Agents → 修改 Primary Model（格式 `alibaba-cloud/模型Code`）

**方法三：通过 SSH 命令行**

```bash
# 修改百炼 API Key
openclaw config set models.providers.bailian.apiKey "你的新APIKey"

# 切换到 Coding Plan
openclaw config set models.providers.bailian.apiKey "sk-sp-你的CodingPlan密钥"
openclaw config set models.providers.bailian.baseUrl "https://coding.dashscope.aliyuncs.com/v1"

# 重启生效
openclaw gateway restart
```

**替换为非百炼的第三方模型（如 DeepSeek）**

```bash
openclaw config set 'models.providers.deepseek' --json '{
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKey": "sk-你的DeepSeekKey",
  "api": "openai-completions",
  "models": [
    { "id": "deepseek-chat", "name": "DeepSeek Chat" },
    { "id": "deepseek-reasoner", "name": "DeepSeek R1" }
  ]
}'
openclaw config set models.default "deepseek/deepseek-chat"
openclaw gateway restart
```

其他模型的替换方式同理，参考 [06-OpenClaw-模型配置-通用说明.md](06-OpenClaw-模型配置-通用说明.md)。

---

### ▶ 方案 B：腾讯云 Lighthouse 部署

#### 第一步：购买服务器

1. 访问腾讯云 OpenClaw 专属活动页：`https://cloud.tencent.com/act/pro/lighthouse-moltbot`
2. 配置：2 核 2G 以上，国内地域适合接 QQ/企微/飞书/钉钉，海外地域适合 Telegram/Discord
3. 镜像选择「应用模板」→「AI 智能体」→ `OpenClaw（Clawdbot）`
4. 完成支付，约 30 秒创建完成

> 已有服务器可通过「更多」→「重装系统」选择 OpenClaw 镜像（会清空旧数据）。

#### 第二步：在控制台配置模型（可视化面板）

进入腾讯云控制台 → 应用管理，面板直接支持以下模型的一键配置（下拉选择 + 粘贴 Key）：

| 模型 | 获取 API Key 的地址 |
|------|-------------------|
| 腾讯混元 | 腾讯云控制台 |
| DeepSeek（官方） | `https://platform.deepseek.com` |
| 月之暗面 Kimi | `https://platform.moonshot.cn` |
| 智谱 GLM | `https://www.bigmodel.cn` |
| MiniMax | `https://www.minimaxi.com` |
| 通义千问 | `https://bailian.console.aliyun.com` |

在面板中也可直接配置 QQ、企业微信、钉钉、飞书的接入。

#### 第三步：获取访问链接

1. 控制台点击「登录」→「免密连接」进入终端
2. 执行 `openclaw onboard` 完成初始化
3. 获取带 Token 的访问链接，在浏览器打开即可使用

#### 如何替换/更换 API Key

**方法一：通过可视化面板** — 应用管理 → 模型配置 → 修改 → 保存

**方法二：通过 SSH 命令行**

```bash
openclaw config set 'models.providers.deepseek' --json '{
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKey": "sk-你的新Key",
  "api": "openai-completions",
  "models": [
    { "id": "deepseek-chat", "name": "DeepSeek Chat" }
  ]
}'
openclaw config set models.default "deepseek/deepseek-chat"
openclaw gateway restart
```

---

### ▶ 方案 C：腾讯云智能体开发平台部署（纯托管，最省心）

1. 访问腾讯云智能体开发平台，登录后找到 OpenClaw 部署功能
2. 一键创建，无需管理服务器
3. 支持直接在面板中配置 QQ、企微、飞书、钉钉
4. 费用按月订阅，需购买专业版或企业版

---

### ▶ 两大云平台对比总结

| 对比项 | 阿里云轻量应用服务器 | 腾讯云 Lighthouse |
|--------|-------------------|-----------------|
| 最低价格 | 曾有 68 元/年起活动价 | 曾有 99 元/年起活动价 |
| 默认模型 | 百炼（通义千问系列） | 需自行选择配置 |
| 国内 IM 支持 | 飞书、钉钉（需手动配） | QQ、企微、钉钉、飞书（面板化配置） |
| 配置方式 | 控制台引导 + 命令行 | **可视化面板**（更适合小白） |
| Coding Plan | 曾有 7.9 元/月起活动 | 无对应套餐 |
| 联网搜索 | 内置 SearXNG（2026.2.3+） | 需自行配置 |

> 价格信息核实于 2026 年 3 月 11 日，请以购买页面当天显示为准。

---

## 三、模型配置

完整的模型配置说明（通用模板、多模型切换、JSON 配置示例等）请参考：[06-OpenClaw-模型配置-通用说明.md](06-OpenClaw-模型配置-通用说明.md)

### 3.1 云端部署推荐顺序

1. `MiniMax M2.5` — Agent 能力强、响应快
2. `DeepSeek Chat` — 最省钱
3. `通义千问 Qwen`
4. `智谱 GLM`
5. `Kimi`
6. `Claude / GPT / Gemini`（云端更容易配合海外模型）

云端平台镜像差异：阿里云默认偏百炼/通义千问路线，腾讯云面板更适合自己切换到其他模型。不管走哪家云，模型接入方式与通用文档一致。

> 不想分别注册多个海外平台？OpenRouter（`https://openrouter.ai`）是聚合方案，一个 Key 可调用数百种模型。

---

## 四、聊天渠道配置

完整的渠道配置说明请参考：
- [08-OpenClaw-聊天渠道-通用说明.md](08-OpenClaw-聊天渠道-通用说明.md)
- [07-OpenClaw-聊天渠道-配置总表.md](07-OpenClaw-聊天渠道-配置总表.md)

### 4.1 云端推荐渠道

云端有固定公网地址，更容易满足回调和审核要求，推荐：飞书、Discord、Telegram、Slack、企业微信、QQ 机器人

### 4.2 使用 Web 控制台（最简单）

```bash
openclaw dashboard
```

> 直接访问可能提示 `unauthorized`，请使用带 token 的完整 URL。查看 token：
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

完整模式说明详见 [11-OpenClaw-进阶玩法-通用说明.md](11-OpenClaw-进阶玩法-通用说明.md)。

### 5.3 确认网关运行状态

云服务器天然 24 小时在线，确认网关正常即可：

```bash
openclaw gateway status
systemctl status openclaw-gateway   # 如果使用了 systemd
```

---

## 六、常见问题排查

所有通用问题（command not found、npm 超时、端口占用、配置写错、模型回复为空等）请参考：[10-OpenClaw-排障与维护-通用说明.md](10-OpenClaw-排障与维护-通用说明.md)

---

## 6.5 版本升级与卸载

升级和卸载的完整说明请参考：[10-OpenClaw-排障与维护-通用说明.md](10-OpenClaw-排障与维护-通用说明.md)

> 云端注意：如果使用云平台镜像，优先检查平台面板是否提供升级入口。手工改过的模型和渠道配置，升级后记得复核默认值是否被覆盖。

---

## 七、下一步

确认以下基础已完成后，再探索进阶功能：Web 控制台能正常打开、至少一个模型能稳定回复、至少一个聊天渠道已接通。

- [01-OpenClaw-新手路线图.md](01-OpenClaw-新手路线图.md)
- [11-OpenClaw-进阶玩法-通用说明.md](11-OpenClaw-进阶玩法-通用说明.md)
