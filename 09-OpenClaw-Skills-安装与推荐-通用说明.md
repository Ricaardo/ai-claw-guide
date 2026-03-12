# 09. OpenClaw Skills 安装与推荐通用说明

> **适用对象**：已经装好 OpenClaw，准备扩展能力的用户 | **文档版本**：V2.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw Skills 的安装、推荐与安全说明

---

## 先看结论

OpenClaw 装好后，如果不安装 Skills，它只是一个聊天助手——你说什么它回答什么，但它**做不了任何实际操作**。

安装了 Skills 后，它才能真正"干活"：帮你整理文件、查天气、定时提醒、浏览网页、收发邮件……

如果你只想先装一组最基础的，按这个顺序来：

1. `skill-vetter`（安全审查）
2. `backup`（配置备份）
3. `browser`（浏览器操作）
4. `shell`（终端命令）
5. `scheduler`（定时任务）
6. `weather`（天气查询）

---

## 一、Skills 是什么

| 没有 Skills | 有了 Skills |
|------------|-----------|
| 只能文字聊天 | 能帮你操作浏览器、整理文件、执行终端命令 |
| 不知道外面发生了什么 | 能联网搜索最新信息 |
| 不会主动做事 | 能定时执行任务、收发邮件 |

所有可安装的 Skills 都在 **ClawHub**（`https://clawhub.ai`）上，截至 2026 年 3 月已有 13000+ 个。先装最常用的 6 个就够了。

---

## 二、怎么安装 Skills

在终端里执行：

```bash
npx clawhub@latest install <Skill 名称>
```

安装完后重启网关让新 Skill（技能）生效：

```bash
openclaw gateway restart
```

> **其他方式**：也可以在 Web 控制台或飞书等渠道里直接对 OpenClaw 说"帮我安装 xxx Skill"。查看已安装的 Skill：`npx clawhub@latest list`。

---

## 三、新手必装的 6 个 Skills

所有 Skill 的安装方式都相同：`npx clawhub@latest install <名称>`，然后 `openclaw gateway restart`。

| 名称 | 说明 | 使用示例 |
|------|------|---------|
| skill-vetter | 安装新 Skill 前自动扫描是否有恶意代码 | （自动运行） |
| backup | 备份 OpenClaw 配置文件，换电脑或改坏时可恢复 | "帮我备份当前配置" |
| browser | 打开浏览器、访问网页、截图、填写表单 | "帮我打开 baidu.com 并截个图" |
| shell | 在电脑上执行终端命令：创建文件夹、查磁盘等 | "帮我看看电脑还剩多少磁盘空间" |
| scheduler | 定时执行任务（需要其他 Skills 配合，仅在运行期间生效） | "每天早上 8 点给我发天气预报" |
| weather | 查询天气信息 | "今天北京天气怎么样？" |

装完这 6 个基础 Skill 后，你的 OpenClaw 已经能查天气、浏览网页、整理文件、定时提醒了。

---

## 四、进阶推荐 Skills

### 4.1 brave-search — 联网搜索

让 OpenClaw 搜索互联网上的最新信息。

```bash
npx clawhub@latest install brave-search
openclaw gateway restart
```

**需要 API Key**：

1. 打开 `https://brave.com/search/api/`，注册并登录
2. 选择免费套餐（Free，每月 2000 次搜索）
3. 在 Dashboard 中复制 API Key

```bash
openclaw config set 'skills.brave-search.config.apiKey' "你复制的APIKey"
openclaw gateway restart
```

### 4.2–4.6 其他进阶 Skills

| 名称 | 说明 | 需要额外配置？ |
|------|------|---------------|
| imap-smtp-email | 读取和发送邮件 | 需要（邮箱账号、应用专用密码、IMAP/SMTP 地址） |
| github | 操作 GitHub：查看仓库、创建 Issue、提交代码 | 需要（GitHub Personal Access Token） |
| self-improving-agent | 跨对话记住你的偏好和习惯 | 不需要 |
| coding-agent | 增强编程能力：写代码、调试、代码审查 | 不需要 |
| mistral-ocr | 识别图片中的文字（OCR） | 可能需要（Mistral API Key） |

---

## 五、一键安装推荐组合

### 组合一：日常办公（推荐所有人）

```bash
npx clawhub@latest install skill-vetter
npx clawhub@latest install backup
npx clawhub@latest install browser
npx clawhub@latest install shell
npx clawhub@latest install scheduler
npx clawhub@latest install weather
openclaw gateway restart
```

### 组合二：信息搜集

在组合一基础上加装：`brave-search`

### 组合三：开发者

在组合一基础上加装：`github`、`coding-agent`

### 组合四：全功能

在组合一基础上加装：`brave-search`、`imap-smtp-email`、`self-improving-agent`

---

## 六、Skills 管理

```bash
npx clawhub@latest list                  # 查看已安装
npx clawhub@latest update --all          # 更新所有
npx clawhub@latest update <Skill 名称>     # 更新单个
npx clawhub@latest uninstall <Skill 名称>  # 卸载（之后需 openclaw gateway restart）
```

---

## 七、安全注意事项

不用紧张，只要按下面的清单做，安全风险很低。

ClawHub 上的 Skills 是任何人都可以上传的，需要注意甄别。2026 年初曾发现 341 个伪装成常见工具的恶意 Skills（ClawHavoc 事件），此后官方加强了审核并推出了 `skill-vetter`。

**安全检查清单**：

1. **先装 skill-vetter** — 让它帮你自动扫描
2. **看下载量和作者** — 下载量高、有公开 GitHub 仓库的更可靠
3. **看权限要求** — 如果一个"天气查询"工具要求读取你的文件系统，那就很可疑
4. **不用的就卸载** — 减少攻击面
5. **定期更新** — `npx clawhub@latest update --all`

---

## 八、Skills 常见问题

### Q1：安装失败，提示 npm ERR 或 EACCES

确认已配置用户级 npm 全局目录（参考安装文档），并设置国内镜像：`npm config set registry https://registry.npmmirror.com`，然后重试。

### Q2：装了 Skill 但 OpenClaw 好像没有这个能力

最常见原因是忘了 `openclaw gateway restart`。重启后仍不行，用 `npx clawhub@latest list` 确认 Skill 已安装。

### Q3：怎么知道一个 Skill 是不是在工作

直接对 OpenClaw 说一句需要用到该 Skill 的话（如装了 weather 就问"今天天气怎么样"）。能正确执行说明在工作。

### Q4：Skill 之间会冲突吗

一般不会。每个 Skill 是独立的，功能相似时 OpenClaw 会自己选择最合适的。

### Q5：怎么找更多 Skills

去 ClawHub 浏览（`https://clawhub.ai`）、终端搜索（`npx clawhub@latest search <关键词>`）、或直接对 OpenClaw 说"帮我找一个能 xxx 的 Skill"。

### Q6：我想装一个 ClawHub 上没有的 Skill

可以从 GitHub 安装（安全性需自行判断）：

```bash
npx clawhub@latest install --url https://github.com/作者/仓库名
openclaw gateway restart
```

---

## 参考说明

这是跨平台的 Skills 通用说明。Skills 的安装和使用方式在 macOS、Windows（WSL2）、Linux 和云端上完全一致——因为 Skills 运行在 OpenClaw 内部，和操作系统无关。
