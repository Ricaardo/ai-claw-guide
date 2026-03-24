# OpenCode 安装配置

> ⭐ **推荐首选** - 有免费模型，够用且不用花钱

## 为什么选 OpenCode？

- **有免费模型**：Big Pickle、MiniMax M2.5 Free、Kimi K2.5 Free 等
- 开源免费，软件本身不要钱
- 支持 75+ 模型，随时切换
- 中文友好

---

## 安装

```bash
npm install -g opencode-ai
```

验证：

```bash
opencode --version
```

---

## 注册账号（获取免费额度）

1. 打开 https://opencode.ai/zen
2. 注册账号（邮箱或 GitHub 登录）
3. 进入 Dashboard
4. 找到 **API Key**，复制

---

## 配置 API Key

### 方式一：交互式配置（推荐）

```bash
opencode auth login
# 选择 OpenCode Zen
# 粘贴你的 API Key
```

### 方式二：环境变量

```bash
# macOS / Linux
export OPENCODE_API_KEY="你的Key粘贴在这里"

# 写入配置文件让它永久生效
echo 'export OPENCODE_API_KEY="你的Key"' >> ~/.zshrc
source ~/.zshrc
```

### 方式三：配置文件

```bash
mkdir -p ~/.config/opencode
cat > ~/.config/opencode/opencode.json << 'JSONEOF'
{
  "providers": {
    "opencode": {
      "apiKey": "你的Key粘贴在这里"
    }
  }
}
JSONEOF
```

---

## 验证配置

```bash
opencode
# 输入 hello 测试
# 能正常回复就成功了
```

---

## 免费模型列表

| 模型 | 说明 |
|------|------|
| **Big Pickle** | 免费，日常编码够用 |
| **MiniMax M2.5 Free** | 免费，速度快 |
| **Kimi K2.5 Free** | 免费，中文友好 |
| **GLM 4.7 Free** | 免费，国产模型 |

### 切换模型

```bash
opencode
/model big-pickle
/model minimax-m2.5-free
/model kimi-k2.5-free
```

---

## 基本用法

```bash
# 进入项目目录
cd /path/to/your/project

# 启动 OpenCode
opencode

# 或直接提问
opencode "帮我写一个 Python 爬虫"

# 查看使用量
/cost

# 撤销更改
/undo

# 查看帮助
/help
```

---

## 免费模型用完了怎么办？

1. **换另一个免费模型**：`/model big-pickle`
2. **等第二天刷新**（免费额度会重置）
3. **充值**：https://opencode.ai/zen（按量付费，很便宜）

---

## 付费模型（可选）

如果免费模型不够用，可以充值使用更好的模型：

| 模型 | 价格 | 适合 |
|------|------|------|
| MiniMax M2.5 | ~$0.5/1M tokens | 性价比最高 |
| Kimi K2.5 | ~$1/1M tokens | 复杂任务 |
| Claude Opus | ~$15/1M tokens | 最强模型 |

---

*下一步：[CC-Switch 配置管理](./cc-switch) 或 [代理配置](./proxy)*
