# 04E. 飞书云 Claw 推荐配置清单

> **适用对象**：飞书云 Claw 已经装好，想知道“我这种用户最适合配什么”的用户 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 23 日 | **文档定位**：按用户类型给出推荐模型、Skills、定时任务和资料目录配置，减少选择成本

---

## 先看结论

飞书云 Claw 不适合所有人都照着同一套配置来。

最好的方式是按你自己的使用类型选一套最小可用组合：

1. 轻度个人用户
2. 办公型用户
3. 运营/信息型用户
4. 技术/服务器用户

先选对方向，再去加配置，效率最高。

---

## 一、所有人都建议先做的基础项

不管你属于哪一类，先做这 6 件事：

1. 确认默认模型稳定可用
2. 装 `skill-vetter`
3. 装 `backup`
4. 装 `scheduler`
5. 创建 `~/.openclaw/USER.md`
6. 创建 `~/.openclaw/data/`

最小 `USER.md`：

```markdown
# 关于我

- 默认使用中文
- 先给结论，再给步骤
- 不确定时直接说明
- 提供命令时优先给可复制版本
- 涉及删除、覆盖、外发时先确认
```

推荐 `data/` 初始文件：

```text
~/.openclaw/data/
├── todo.md
├── weekly-template.md
└── writing-style.md
```

---

## 二、轻度个人用户推荐配置

### 适合谁

- 主要把它当提醒器和日常小助手
- 不追求复杂自动化
- 以飞书对话为主

### 推荐模型

- `DeepSeek Chat`
- `通义千问`

优先看重：

- 便宜
- 稳定
- 中文足够好

### 推荐 Skills

1. `skill-vetter`
2. `backup`
3. `scheduler`
4. `weather`

### 推荐定时任务

1. 每天早上天气提醒
2. 每天下午收尾提醒
3. 每周五周报提醒

### 推荐资料文件

- `todo.md`

### 不建议一开始就加的东西

- 浏览器自动巡检
- 搜索日报
- 服务器巡检

---

## 三、办公型用户推荐配置

### 适合谁

- 日常用飞书办公
- 经常写日报、周报、会议准备
- 想把提醒和待办整理自动化

### 推荐模型

- `DeepSeek Chat`
- `MiniMax M2.5`

### 推荐 Skills

1. `skill-vetter`
2. `backup`
3. `scheduler`
4. `weather`
5. `brave-search`

### 推荐定时任务

1. 每个工作日上午 9 点今日重点提醒
2. 每周五下午 5 点周报提醒
3. 每天早上 8 点天气 + 待办早安简报

### 推荐资料文件

- `todo.md`
- `weekly-template.md`
- `meeting-template.md`

### 最值得先做的组合

`scheduler + weather + todo.md`

因为这是最容易立刻感受到价值的一组。

---

## 四、运营 / 信息型用户推荐配置

### 适合谁

- 要经常看行业消息
- 关注竞品、活动页、公告更新
- 更在意信息获取效率

### 推荐模型

- `MiniMax M2.5`
- `DeepSeek Chat`

### 推荐 Skills

1. `skill-vetter`
2. `backup`
3. `scheduler`
4. `brave-search`
5. `browser`

### 推荐定时任务

1. 每天上午 9 点行业新闻简报
2. 每天下午 3 点网页公告巡检
3. 每周一竞品动态汇总

### 推荐资料文件

- `keywords.md`
- `sites.md`
- `summary-style.md`

### 最值得先做的组合

`scheduler + brave-search`

因为它最直接把飞书变成“资讯推送入口”。

---

## 五、技术 / 服务器用户推荐配置

### 适合谁

- 自己有云主机
- 会查日志、看资源
- 希望从飞书里做轻量巡检和提醒

### 推荐模型

- `MiniMax M2.5`
- `DeepSeek Chat`

### 推荐 Skills

1. `skill-vetter`
2. `backup`
3. `scheduler`
4. `shell`
5. `browser`
6. `brave-search`

### 推荐定时任务

1. 每天上午 10 点服务器健康检查
2. 每天下午 3 点网页巡检
3. 每周固定一次配置备份提醒

### 推荐资料文件

- `servers.md`
- `checklist.md`
- `deploy-notes.md`

### 最值得先做的组合

`scheduler + shell`

因为这组最容易替你减少重复巡检动作。

---

## 六、如果你不知道自己属于哪类

直接从“办公型用户方案”开始。

原因很简单：

- 成本适中
- 风险低
- 最容易感受到自动化价值

也就是先配：

1. `scheduler`
2. `weather`
3. `brave-search`
4. `todo.md`
5. `weekly-template.md`

---

## 七、各类型都不建议一开始做的事

### 7.1 一次装太多 Skills

会让排查成本暴涨。

### 7.2 一开始就上复杂组合任务

先做简单提醒，再做组合任务。

### 7.3 不写 `USER.md`

这样它长期表现会很飘。

### 7.4 不建 `data/` 目录

这样后面想做简报和自动化时会很乱。

---

## 八、推荐的升级顺序

不管你是哪类用户，都建议按这个顺序升级：

1. 普通对话稳定
2. 安装基础 Skills
3. 做一个简单定时任务
4. 建 `USER.md`
5. 建 `data/`
6. 再加搜索 / 浏览器 / shell
7. 最后再做组合工作流

---

## 九、如果你现在只想要一套“通用最优解”

直接抄这套：

### 模型

- 主力：`DeepSeek Chat` 或 `MiniMax M2.5`

### Skills

1. `skill-vetter`
2. `backup`
3. `scheduler`
4. `weather`
5. `brave-search`

### 文件

- `~/.openclaw/USER.md`
- `~/.openclaw/data/todo.md`
- `~/.openclaw/data/weekly-template.md`

### 定时任务

1. 每天 8 点天气提醒
2. 每个工作日 9 点今日重点提醒
3. 每周五 5 点周报提醒

这套对绝大多数飞书云 Claw 用户都足够实用。

---

## 下一步看哪篇

| 你的目标 | 建议阅读 |
|------|------|
| 想看飞书云 Claw 后续使用主线 | [04A-飞书云 Claw 安装后使用与配置指南.md](./feishu-cloud-usage.md) |
| 想直接抄定时任务模板 | [04B-飞书云 Claw 定时任务模板大全.md](./feishu-cloud-scheduler-recipes.md) |
| 想看 Skills 话术和场景 | [04C-飞书云 Claw 常用 Skills 场景手册.md](./feishu-cloud-skills-playbook.md) |
| 想先快速排障 | [04D-飞书云 Claw 故障排查速查表.md](./feishu-cloud-troubleshooting.md) |
