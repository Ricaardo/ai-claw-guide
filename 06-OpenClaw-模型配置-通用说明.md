# 06. OpenClaw 模型配置通用说明

> **适用对象**：已经装好或部署好 OpenClaw，准备接入模型的用户 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw 模型选择与接入通用说明

---

## 先看结论

> **不知道怎么选？** 如果你不想研究，直接选 MiniMax M2.5（性价比最高、中文最好）。下面 MiniMax 配置部分有完整步骤。

如果你不想细看整篇，直接按这个顺序判断：

- 最稳的主力模型：`MiniMax M2.5`
- 最省钱的辅助模型：`DeepSeek Chat`
- 想要免费额度：`通义千问 Qwen`
- 想要高精度国产模型：`智谱 GLM`
- 想用长文本：`Kimi`
- 想少注册平台：`硅基流动`
- 想用海外顶级效果：`Claude / GPT / Gemini`

---

## 一、模型怎么选

OpenClaw 本身不包含大语言模型，需要你接入一个模型 API。选型主要看 3 件事：

1. 工具调用（让 AI 不只聊天，还能执行操作，比如查天气、整理文件）和 Agent 能力（让 AI 自主完成多步骤复杂任务）是否强
2. 成本是否可接受
3. 注册和支付门槛是否适合自己

不用一次配完所有模型。先配一个能用就行，后面随时可以换。

### 1.1 推荐顺序

**国产模型推荐**：

| 模型 | 推荐指数 | 费用 | 特点 |
|------|---------|------|------|
| **MiniMax M2.5** | ⭐⭐⭐⭐⭐ | 编程套餐曾低至 29 元/月起 | Agent 能力（让 AI 自主完成多步骤复杂任务）强，兼容 Anthropic 协议，当前最均衡 |
| **DeepSeek** | ⭐⭐⭐⭐⭐ | 极低 | 性价比极高，适合做辅助模型 |
| **通义千问 Qwen** | ⭐⭐⭐⭐ | 有免费额度 | 阿里出品，适合轻度使用 |
| **智谱 GLM** | ⭐⭐⭐⭐ | 有编程套餐 | 推理和稳定性较强 |
| **Kimi（月之暗面）** | ⭐⭐⭐⭐ | 有编程套餐 | 长文本能力突出 |
| **豆包** | ⭐⭐⭐ | 按量计费 | 字节系生态 |

**海外模型推荐**：

| 模型 | 推荐指数 | 费用 | 特点 |
|------|---------|------|------|
| **Claude（Anthropic）** | ⭐⭐⭐⭐⭐ | $20/月起 | OpenClaw 原生适配最好，但门槛高 |
| **GPT（OpenAI）** | ⭐⭐⭐⭐ | $20/月起 | 综合能力强 |
| **Gemini（Google）** | ⭐⭐⭐⭐ | 有免费额度 | 速度快，适合轻量任务 |

---

## 二、各提供商常见接法

> 以下价格、套餐、免费额度和公开入口均以 **2026 年 3 月 11 日** 整理，后续以官网为准。

### 2.1 MiniMax M2.5（完整示例）

1. 访问：`https://www.minimaxi.com` 或 `https://platform.minimax.io`
2. 注册并创建 API Key
3. 配置：

```bash
openclaw config set 'models.providers.minimax' --json '{
  "baseUrl": "https://api.minimaxi.com/anthropic",
  "apiKey": "你的MiniMaxAPIKey",
  "api": "anthropic-messages",
  "models": [
    { "id": "MiniMax-M2.5", "name": "MiniMax M2.5" },
    { "id": "MiniMax-M2.5-highspeed", "name": "MiniMax M2.5 高速版" }
  ]
}'
openclaw config set models.default "minimax/MiniMax-M2.5"
openclaw gateway restart
```

> 配置完成后执行 `openclaw gateway restart`，然后在 Web 控制台试着说一句话。如果收到回复，说明模型配置成功了。

### 2.2 DeepSeek（完整示例）

1. 访问：`https://platform.deepseek.com`
2. 创建 API Key
3. 配置：

```bash
openclaw config set 'models.providers.deepseek' --json '{
  "baseUrl": "https://api.deepseek.com/v1",
  "apiKey": "sk-你的APIKey",
  "api": "openai-completions",
  "models": [
    { "id": "deepseek-chat", "name": "DeepSeek Chat" },
    { "id": "deepseek-reasoner", "name": "DeepSeek Reasoner (R1)" }
  ]
}'
openclaw config set models.default "deepseek/deepseek-chat"
openclaw gateway restart
```

### 2.3 其他国产模型（快速配置）

以下均为：注册 → 获取 API Key → 执行配置命令 → `openclaw gateway restart`。

**通义千问 Qwen** — `https://bailian.console.aliyun.com`

```bash
# 方式一：OAuth 插件
openclaw plugins enable qwen-portal-auth && openclaw gateway restart

# 方式二：API Key
openclaw config set 'models.providers.qwen' --json '{ "apiKey": "sk-你的通义千问APIKey" }'
openclaw config set models.default "qwen/qwen-max" && openclaw gateway restart
```

**智谱 GLM** — `https://www.bigmodel.cn`

```bash
openclaw config set 'models.providers.glm' --json '{ "apiKey": "你的智谱APIKey" }'
openclaw config set models.default "glm/glm-5" && openclaw gateway restart
```

**Kimi（月之暗面）** — `https://platform.moonshot.cn`

```bash
openclaw config set 'models.providers.moonshot' --json '{
  "baseUrl": "https://api.moonshot.cn/v1", "apiKey": "你的KimiAPIKey",
  "api": "openai-completions", "models": [{ "id": "moonshot-v1-128k", "name": "Kimi 128K" }]
}'
openclaw config set models.default "moonshot/moonshot-v1-128k" && openclaw gateway restart
```

**硅基流动** — `https://siliconflow.cn`

```bash
openclaw config set 'models.providers.siliconflow' --json '{
  "baseUrl": "https://api.siliconflow.cn/v1", "apiKey": "你的硅基流动APIKey",
  "api": "openai-completions", "models": [{ "id": "deepseek-ai/DeepSeek-V3.2", "name": "DeepSeek V3.2" }]
}'
openclaw config set models.default "siliconflow/deepseek-ai/DeepSeek-V3.2" && openclaw gateway restart
```

---

## 三、海外模型

海外模型的核心门槛通常是：

1. 稳定的海外 IP
2. 国际信用卡
3. 某些平台需要海外手机号验证

### 3.1 Claude（Anthropic）

```bash
openclaw config set 'models.providers.anthropic' --json '{
  "apiKey": "sk-ant-你的AnthropicAPIKey"
}'
openclaw config set models.default "anthropic/claude-sonnet-4-6"
openclaw gateway restart
```

### 3.2 GPT（OpenAI）

```bash
openclaw config set 'models.providers.openai' --json '{
  "apiKey": "sk-你的OpenAIKey"
}'
openclaw config set models.default "openai/gpt-4o"
openclaw gateway restart
```

### 3.3 Gemini（Google）

```bash
openclaw config set 'models.providers.google' --json '{
  "baseUrl": "https://generativelanguage.googleapis.com/v1beta/openai",
  "apiKey": "你的GeminiAPIKey",
  "api": "openai-completions",
  "models": [
    { "id": "gemini-3-flash-preview", "name": "Gemini 3 Flash" },
    { "id": "gemini-3-pro-preview", "name": "Gemini 3 Pro" }
  ]
}'
openclaw config set models.default "google/gemini-3-flash-preview"
openclaw gateway restart
```

### 3.4 OpenRouter

如果你不想分别注册多个海外平台，可以使用 `OpenRouter` 做聚合入口。

---

## 四、多个模型怎么配

- 主力 Agent 任务：`MiniMax M2.5`
- 简单对话 / 省钱：`DeepSeek Chat` 或 `qwen-max`
- 复杂推理：`DeepSeek Reasoner (R1)` 或 `GLM-5`
- 长文本：`Kimi`

---

## 配置后不工作？

- **回复为空或报错 401**：检查 API Key 是否正确复制（前后不能有空格）
- **回复为空或超时**：检查 baseUrl 是否正确，账户是否有余额
- **更多问题**：参考 [10-排障与维护](10-OpenClaw-排障与维护-通用说明.md)

---

## 下一步

| 你想做什么 | 看哪份文档 |
|------|------|
| 接入飞书、Discord 等聊天渠道 | [08-OpenClaw-聊天渠道-通用说明](08-OpenClaw-聊天渠道-通用说明.md) |
| 安装 Skills 扩展能力 | [09-OpenClaw-Skills-安装与推荐-通用说明](09-OpenClaw-Skills-安装与推荐-通用说明.md) |
| 遇到问题需要排障 | [10-OpenClaw-排障与维护-通用说明](10-OpenClaw-排障与维护-通用说明.md) |
