# 06A. OpenClaw 安装后配置通用说明

> **适用对象**：已经完成安装、准备把 OpenClaw 配到“能长期稳定用”的用户 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 23 日 | **文档定位**：安装完成后的配置总览，重点覆盖 `openclaw.json`、`USER.md`、网关、渠道、Skills 与日常维护

---

## 先看结论

装好 OpenClaw 只是第一步。真正决定“好不好用”的，是安装后的 6 个配置动作：

1. 先确认服务正常
2. 配好默认模型
3. 学会看和改 `~/.openclaw/openclaw.json`
4. 写好 `~/.openclaw/USER.md`
5. 只接入 1 个聊天渠道、只装第 1 批 Skills
6. 做一次备份，避免后面改坏了回不去

如果你不想通读整篇，最低限度先做这几条：

```bash
openclaw doctor
openclaw gateway status
openclaw dashboard
```

然后补上：

- 一个默认模型
- 一个 `USER.md`
- 一个聊天渠道
- 一份配置备份

---

## 一、安装后先看哪些文件

OpenClaw 安装完成后，核心文件基本都在：

```text
~/.openclaw/
```

最重要的是这几个：

| 路径 | 作用 | 建议 |
|------|------|------|
| `~/.openclaw/openclaw.json` | 主配置文件，模型、网关、渠道、部分 Skill 配置都在这里 | 最重要，优先学会看它 |
| `~/.openclaw/USER.md` | 你的长期偏好、沟通风格、工作背景 | 强烈建议创建 |
| `~/.openclaw/logs/` | 运行日志 | 出问题时先看 |
| `~/.openclaw/data/` | 让 OpenClaw 读写的本地数据 | 可放待办、模板、草稿 |
| `~/.openclaw/skills/` | 已安装 Skills | 装完 Skill 后可确认这里有内容 |

如果你只记一个原则：

> `openclaw.json` 管“系统配置”，`USER.md` 管“你的个人偏好”。

---

## 二、推荐配置顺序

不要一上来同时改模型、渠道、Skills、局域网访问、自动化。正确顺序如下：

### 2.1 第一步：确认 OpenClaw 真能跑

```bash
openclaw doctor
openclaw status
openclaw gateway status
```

你要确认的不是“装上了”，而是：

- 命令能执行
- 网关处于运行中
- 浏览器控制台能打开

打开控制台：

```bash
openclaw dashboard
```

如果直接访问提示 `unauthorized`，说明你打开的是不带 token 的地址。可以从配置里查看：

```bash
grep '"token"' ~/.openclaw/openclaw.json
```

### 2.2 第二步：只配置一个默认模型

模型配置详细说明请看：

- [06-OpenClaw-模型配置-通用说明.md](./model-config.md)

原则很简单：

- 第一次只配一个能稳定回复的模型
- 先别追求“最强”，先追求“能稳定工作”
- 改完模型后一定执行 `openclaw gateway restart`

例如：

```bash
openclaw config set models.default "deepseek/deepseek-chat"
openclaw gateway restart
```

### 2.3 第三步：创建 `USER.md`

这是很多人装完后最容易漏掉的一步。

`USER.md` 是 OpenClaw 的“长期用户说明书”。你不需要每次都重新解释“请用中文回答”“结论先说”“我主要做什么工作”，把这些写进去即可。

文件位置：

```text
~/.openclaw/USER.md
```

创建方式：

```bash
nano ~/.openclaw/USER.md
```

或者：

```bash
code ~/.openclaw/USER.md
```

推荐模板：

```markdown
# 关于我

## 个人背景
- 我主要做什么工作
- 我的技术水平大概是什么程度

## 输出偏好
- 默认使用中文
- 先给结论，再给步骤
- 少讲空话，优先给可执行命令
- 不确定时直接说不确定

## 常用工具
- 飞书
- Notion
- VS Code
- GitHub

## 工作习惯
- 我说“帮我处理一下”通常表示可以直接执行
- 修改文档时优先保留原结构
- 提供命令时优先给复制粘贴可运行版本

## 常见任务
- 写文档
- 配置开发环境
- 排查报错
- 整理会议纪要
```

注意：

- `USER.md` 修改后，通常要开新对话才会完整生效
- 不要把 API Key、密码、Cookie 写进 `USER.md`
- 建议控制在 100 到 200 行内，太长会拖慢上下文

### 2.4 第四步：只接入一个聊天渠道

聊天渠道详细说明请看：

- [07-OpenClaw-聊天渠道-配置总表.md](./channel-overview.md)
- [08-OpenClaw-聊天渠道-通用说明.md](./channel-guide.md)

建议顺序：

1. 先确认 Web 控制台能稳定聊天
2. 再只接入 1 个你最常用的渠道
3. 跑通后再考虑第二个渠道

如果你是中国大陆用户，第一批优先考虑：

- 飞书
- Telegram
- Discord

不建议刚装完就碰：

- 企业微信
- 需要公网 HTTPS 回调的渠道
- 需要平台审核或白名单的渠道

### 2.5 第五步：只装第一批基础 Skills

Skills 文档请看：

- [09-OpenClaw-Skills-安装与推荐-通用说明.md](./skills.md)

第一批只建议装这些：

1. `skill-vetter`
2. `backup`
3. `browser`
4. `shell`
5. `scheduler`
6. `weather`

安装后别忘了：

```bash
openclaw gateway restart
```

---

## 三、`openclaw.json` 应该怎么改

### 3.1 先用命令改，再考虑手动编辑

最稳妥的方式是：

```bash
openclaw config set <配置项> <值>
```

例如：

```bash
openclaw config set gateway.host "127.0.0.1"
openclaw config set gateway.auth.token "你自己设置的复杂口令"
openclaw gateway restart
```

这样改的好处是：

- 不容易把 JSON 格式改坏
- 改完后结构更规范
- 出错时更容易定位

### 3.2 什么时候需要直接编辑文件

只有在以下情况才建议直接打开 `openclaw.json`：

- 你需要整体查看配置结构
- 你要复制一整段 JSON 配置
- 某个配置项命令行不方便录入

打开方式：

```bash
nano ~/.openclaw/openclaw.json
```

或者：

```bash
code ~/.openclaw/openclaw.json
```

### 3.3 改这个文件时最容易犯的错

- 中文引号写成了“智能引号”
- 最后一项后面多了逗号
- 把数字写成字符串，或者反过来
- 改完忘了重启网关

改完后建议立刻执行：

```bash
openclaw gateway restart
openclaw gateway status
```

如果网关起不来，先看：

- [10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md)

---

## 四、安装后最常配的 5 类项目

### 4.1 网关地址与访问范围

默认情况下，OpenClaw 只监听本机地址，适合个人本机使用。

如果你只想本机访问，保持：

```bash
openclaw config set gateway.host "127.0.0.1"
openclaw gateway restart
```

如果你要同一局域网下的手机、平板访问，可以改成：

```bash
openclaw config set gateway.host "0.0.0.0"
openclaw gateway restart
```

但这时你应该同时做两件事：

1. 设置强一点的访问 token
2. 只在可信局域网使用

### 4.2 Web 控制台访问口令

如果你准备开放局域网访问，建议明确设置 token：

```bash
openclaw config set gateway.auth.token "MyS3cure_T0ken!2026"
openclaw gateway restart
```

然后使用带 token 的控制台地址访问。

### 4.3 工具模式

如果你已经确定主要用途，也可以调整工具模式。

先查看当前值：

```bash
openclaw config get tools.mode
```

常见切换方式：

```bash
openclaw config set tools.mode "default"
openclaw config set tools.mode "coding"
openclaw config set tools.mode "messaging"
openclaw config set tools.mode "full"
```

如果你刚装好，还不清楚差异，先保持默认，不要急着开到最激进的模式。

### 4.4 Skill 的额外配置

有些 Skill 装完还不能直接用，因为还缺账号或 API Key。

例如 `brave-search`：

```bash
openclaw config set 'skills.brave-search.config.apiKey' "你复制的APIKey"
openclaw gateway restart
```

像邮箱、GitHub、OCR 这类 Skill，通常也需要后续补参数。判断方法很简单：

- 安装完能不能真正执行
- 日志里有没有提示缺配置
- 文档里有没有写“需要额外配置”

### 4.5 本地数据目录

你可以把一些长期要让 OpenClaw 读取的内容放到：

```text
~/.openclaw/data/
```

例如：

- `todo.md`
- `weekly-template.md`
- `contacts.md`
- `writing-style.md`

这样做的好处是：

- 数据和系统配置分开
- 比把所有内容都塞进 `USER.md` 更清晰
- 适合配合 `scheduler` 等自动化 Skill

---

## 五、`USER.md` 之外，还有哪些“长期记忆”做法

很多人会把所有东西都写进 `USER.md`，这其实不够好。

更合理的拆分方式是：

| 放哪里 | 适合放什么 |
|------|------|
| `~/.openclaw/USER.md` | 你的身份、偏好、语言风格、默认规则 |
| `~/.openclaw/data/*.md` | 长期资料、模板、清单、待办 |
| `~/.openclaw/agents/<agent>/USER.md` | 某个专门 Agent 的独立偏好 |

例如你有一个专门写代码的 Agent，可以单独给它放：

```text
~/.openclaw/agents/coder/USER.md
```

适合写：

- 代码风格要求
- 常用语言
- 测试习惯
- 是否允许直接执行命令

如果你现在还是新手，先只维护一个总的 `~/.openclaw/USER.md` 就够了。

---

## 六、安装后建议立刻做一次备份

最少备份这两个：

```bash
cp ~/.openclaw/openclaw.json ~/openclaw.json.backup
cp ~/.openclaw/USER.md ~/USER.md.backup 2>/dev/null || true
```

如果你已经开始往 `data/` 里放内容，也建议一起备份。

更完整一点：

```bash
mkdir -p ~/openclaw-backup
cp ~/.openclaw/openclaw.json ~/openclaw-backup/
cp ~/.openclaw/USER.md ~/openclaw-backup/ 2>/dev/null || true
cp -R ~/.openclaw/data ~/openclaw-backup/ 2>/dev/null || true
```

做这一步的原因很现实：

- 很多人第一次改配置时会把 JSON 改坏
- 装 Skill 或换模型时，容易忘记自己原来的设置
- 换电脑时这几份文件最有价值

---

## 七、日常配置维护命令

最常用的就是这些：

| 命令 | 用途 |
|------|------|
| `openclaw doctor` | 做健康检查 |
| `openclaw status` | 看整体状态 |
| `openclaw gateway status` | 看网关是否运行 |
| `openclaw gateway restart` | 改配置后重启 |
| `openclaw dashboard` | 打开控制台 |
| `openclaw skills list` | 看已安装 Skills |
| `openclaw config set <键> <值>` | 修改配置 |
| `openclaw config get <键>` | 查看配置项 |

如果要排障，再补这几个：

```bash
ls -la ~/.openclaw/logs/
openclaw gateway logs
openclaw gateway logs --lines 100
```

---

## 八、最常见的安装后配置错误

### 8.1 一口气改太多

典型错误路径是：

装完后立刻同时配置 3 个模型、2 个渠道、5 个 Skills、局域网访问、自动化任务。

后果就是：出了问题根本不知道是哪一步弄坏的。

正确做法：

- 一次只改一类配置
- 每改完一类就测试一次

### 8.2 忘了重启网关

这是最常见的问题之一。

很多配置项改完后不会立刻生效，必须：

```bash
openclaw gateway restart
```

### 8.3 把敏感信息写进 `USER.md`

`USER.md` 用来写偏好，不是密码本。

不要写：

- API Key
- 邮箱密码
- Cookie
- 企业内部敏感地址

这些应该放在配置项里，或用更安全的方式管理。

### 8.4 还没跑通 Web 控制台，就先折腾聊天渠道

如果浏览器里都不能正常回复，那渠道基本也不会正常。

排查顺序应该永远是：

1. Web 控制台
2. 模型
3. 渠道
4. Skills

---

## 九、推荐你现在就做的最小动作

如果你已经安装完 OpenClaw，但不知道接下来做什么，按这个顺序直接操作即可：

1. 跑 `openclaw doctor`
2. 跑 `openclaw dashboard`，确认控制台能打开
3. 配一个默认模型并测试回复
4. 创建 `~/.openclaw/USER.md`
5. 接入一个聊天渠道
6. 安装第一批基础 Skills
7. 备份 `openclaw.json` 和 `USER.md`

---

## 下一步看哪篇

| 你的目标 | 建议阅读 |
|------|------|
| 只想把模型配好 | [06-OpenClaw-模型配置-通用说明.md](./model-config.md) |
| 想接入飞书、Discord、Telegram 等 | [08-OpenClaw-聊天渠道-通用说明.md](./channel-guide.md) |
| 想挑一个最适合自己的渠道 | [07-OpenClaw-聊天渠道-配置总表.md](./channel-overview.md) |
| 想扩展浏览器、终端、定时等能力 | [09-OpenClaw-Skills-安装与推荐-通用说明.md](./skills.md) |
| 已经跑通，准备继续深入玩 | [11-OpenClaw-进阶玩法-通用说明.md](./advanced.md) |
| 配坏了、报错了、起不来 | [10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md) |
