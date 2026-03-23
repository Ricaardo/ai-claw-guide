# 06E. OpenClaw Skills 深度配置通用说明

> **适用对象**：已经装过基础 Skills，想继续把搜索、邮箱、GitHub、浏览器、自动化等能力配实用的用户 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 23 日 | **文档定位**：专门讲 Skills 的二次配置、验证方式、配置分层与常见错误

---

## 先看结论

很多 Skill 不是“装完就能完全用”，而是“装完后还要补配置”。

安装只是第一层，后面通常还有这三层：

1. 账号或 API Key
2. 使用权限或平台侧授权
3. 验证与日常维护

如果你装了 Skill 却感觉“好像没反应”，大概率卡在这里。

---

## 一、Skill 配置要分两类看

### 1.1 装完通常就能用的

这类一般本地依赖更强，外部账号依赖更弱，比如：

- `shell`
- `browser`
- `backup`
- `scheduler`

但就算是这些，也可能还要确认本机权限或运行环境。

### 1.2 装完还要补参数的

常见包括：

- `brave-search`
- `imap-smtp-email`
- `github`
- `mistral-ocr`

这类 Skill 常见还需要：

- API Key
- Personal Access Token
- 邮箱应用专用密码
- 平台侧权限配置

---

## 二、配置 Skill 的通用流程

建议固定用这个顺序：

1. 安装 Skill
2. 阅读该 Skill 的要求
3. 补配置项
4. 重启网关
5. 用一句真实任务验证

例如：

```bash
npx clawhub@latest install brave-search
openclaw config set 'skills.brave-search.config.apiKey' "你的APIKey"
openclaw gateway restart
```

然后直接测试：

“帮我搜索今天关于 OpenClaw 的最新资讯并给我摘要。”

---

## 三、几类高频 Skill 的配置思路

### 3.1 搜索类

以 `brave-search` 为例，核心是 API Key。

配置后：

```bash
openclaw config set 'skills.brave-search.config.apiKey' "你的APIKey"
openclaw gateway restart
```

验证方式：

- 让 OpenClaw 搜索一个近期话题
- 看返回是否体现最新信息
- 如果没有结果或报权限问题，优先检查 Key

### 3.2 邮箱类

邮箱类 Skill 典型配置包括：

- IMAP 地址
- SMTP 地址
- 端口
- 用户名
- 应用专用密码

像这种配置更适合写进系统配置，而不是 `USER.md`。

### 3.3 GitHub 类

GitHub 类 Skill 通常需要：

- 个人访问令牌
- 仓库访问权限
- 有时还要组织侧授权

最常见的问题不是 Skill 没装好，而是 Token 权限不够。

### 3.4 OCR / 第三方模型类

这类 Skill 常常还依赖外部模型提供商的 Key、额度和网络可达性。

所以排查顺序通常是：

1. Skill 是否已安装
2. Key 是否已配置
3. 模型接口是否可达
4. 账户是否有额度

---

## 四、Skill 配置应该放在哪

原则很简单：

| 放哪里 | 适合什么 |
|------|------|
| `openclaw config set ...` 对应配置 | API Key、端口、服务地址、账号参数 |
| `~/.openclaw/USER.md` | 偏好、默认行为、使用规则 |
| `~/.openclaw/data/` | 模板、待办、清单、长期资料 |

不要把配置项和偏好规则混写。

例如这类内容应该用配置命令：

```bash
openclaw config set 'skills.brave-search.config.apiKey' "你的APIKey"
```

而不是写进 `USER.md`。

---

## 五、装完之后怎么验证 Skill 真的在工作

最有效的办法不是看文件，而是给它一个“必须调用这个 Skill 才能完成”的任务。

例如：

- `weather`：问今天北京天气
- `brave-search`：问最近 24 小时的新闻
- `browser`：让它打开一个网页并截图
- `shell`：让它查看磁盘空间
- `github`：让它读取某个仓库的 Issue

如果你给的是泛泛问题，它可能根本不会调用该 Skill。

---

## 六、为什么装了 Skill 还是“不像有这个能力”

最常见原因有 5 个：

1. 装完忘了 `openclaw gateway restart`
2. 还缺 API Key 或授权
3. 提的问题不够明确，没触发 Skill
4. 网络不通或余额不足
5. Skill 已装，但对应模式/环境受限

先检查：

```bash
openclaw skills list
openclaw gateway restart
openclaw gateway logs --lines 100
```

---

## 七、建议的第一批“深度配置”目标

如果你已经过了基础安装阶段，建议按这个顺序补深度配置：

1. `brave-search`
2. `browser`
3. `shell`
4. `scheduler`
5. `github` 或邮箱类 Skill

原因很简单：

- 搜索解决“最新信息”
- 浏览器解决“网页操作”
- shell 解决“本机执行”
- scheduler 解决“定时自动化”
- GitHub / 邮箱解决“接入真实工作流”

---

## 八、Skill 配置的维护建议

### 8.1 记录哪些 Skill 依赖外部账号

建议自己维护一个清单，例如：

```text
- brave-search：Brave API Key
- github：GitHub PAT
- imap-smtp-email：邮箱应用专用密码
- mistral-ocr：Mistral API Key
```

这样换机器或重装时不会漏。

### 8.2 更新后重新验证

Skill 更新后，至少重测一次关键能力。

### 8.3 不用的卸载

装得越多，排查越复杂，风险面也越大。

---

## 九、最常见错误

### 9.1 把安装成功误认为配置完成

这只是完成了一半。

### 9.2 把 Key 写进 `USER.md`

不应该。

### 9.3 一次装太多 Skill

出了问题很难定位是谁导致的。

### 9.4 忘了真实任务验证

只看“安装列表里有”并不代表能工作。

---

## 十、推荐你现在就做的版本

如果你已经装过基础 Skill，下一步最值得做的是：

1. 给 `brave-search` 补 API Key
2. 用真实问题验证搜索
3. 用 `browser` 做一次网页访问测试
4. 用 `scheduler` 做一个简单定时任务
5. 记录哪些 Skill 还依赖额外账号

---

## 下一步看哪篇

| 你的目标 | 建议阅读 |
|------|------|
| 先看基础 Skills 安装清单 | [09-OpenClaw-Skills-安装与推荐-通用说明.md](./skills.md) |
| 想补整个安装后配置主线 | [06A-OpenClaw-安装后配置-通用说明.md](./post-install-config.md) |
| 想做定时自动化和更复杂玩法 | [11-OpenClaw-进阶玩法-通用说明.md](./advanced.md) |
| Skill 用不起来，需要排障 | [10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md) |
