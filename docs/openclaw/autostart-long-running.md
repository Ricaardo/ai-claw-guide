# 06C. OpenClaw 自动启动与长期运行通用说明

> **适用对象**：希望 OpenClaw 在电脑重启后自动恢复、长期后台运行的用户 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 23 日 | **文档定位**：专门讲自动启动、常驻运行、平台差异与稳定性检查

---

## 先看结论

如果你希望 OpenClaw 不只是“偶尔打开用一下”，而是长期可访问，就要把“自动启动”和“稳定运行”分开处理。

你真正需要的是这 4 件事：

1. 让网关能作为服务启动
2. 让系统重启后自动恢复
3. 避免机器睡眠或 WSL 休眠
4. 学会检查日志和运行状态

---

## 一、长期运行前先确认什么

先跑这几条：

```bash
openclaw doctor
openclaw gateway status
openclaw dashboard
```

如果这三步都没稳定通过，先不要做自动启动。因为自动启动只会把问题自动重复一遍。

你要先确认：

- 模型已经能回复
- 网关能正常启动
- Web 控制台可以访问

---

## 二、macOS 怎么长期运行

### 2.1 最常见的问题不是启动，而是睡眠

macOS 上最容易出问题的不是服务安装失败，而是机器睡眠后 OpenClaw 停掉。

解决思路：

- 桌面机长期运行最稳
- 笔记本要避免自动睡眠
- 长期挂机时可配合 `caffeinate`

临时防睡眠：

```bash
caffeinate -s &
```

### 2.2 推荐做法

如果你只是个人使用，最稳的方式通常是：

1. 保证 OpenClaw 已正常安装
2. 安装 Gateway 服务
3. 关闭高频自动休眠
4. 重启一次验证

安装服务：

```bash
openclaw gateway install
```

验证：

```bash
openclaw gateway status
```

### 2.3 重启后检查什么

机器重启后执行：

```bash
openclaw gateway status
openclaw dashboard
```

如果状态正常、控制台能打开，说明自动恢复链路基本可用。

---

## 三、Linux 怎么长期运行

Linux 最适合做长期运行的 OpenClaw 主机，尤其是云服务器或家里常开的迷你主机。

### 3.1 推荐用服务方式运行

```bash
openclaw gateway install
```

如果你的发行版使用 `systemd`，通常还应检查服务状态：

```bash
systemctl --user status openclaw-gateway
```

### 3.2 用户退出后也要继续运行

如果你希望用户退出登录后服务仍继续运行：

```bash
sudo loginctl enable-linger "$(whoami)"
```

这一步在长期运行场景里非常关键。

### 3.3 云主机的额外注意点

如果你跑在云服务器上，还要确认：

- 防火墙端口是否放行
- 安全组是否已放行
- 模型网络访问是否正常
- 机器是否有足够磁盘写日志

---

## 四、Windows / WSL2 怎么长期运行

Windows 本机长期运行 OpenClaw，核心难点通常不是 OpenClaw 本身，而是 WSL2 的生命周期。

### 4.1 WSL2 场景推荐做法

在 Ubuntu 里执行：

```bash
sudo loginctl enable-linger "$(whoami)"
openclaw gateway install
```

然后在 PowerShell（管理员）里让 WSL 开机被唤起：

```powershell
schtasks /create /tn "WSL Boot" /tr "wsl.exe -d Ubuntu --exec /bin/true" /sc onstart /ru SYSTEM
```

如果你的发行版名字不是 `Ubuntu`，先用：

```powershell
wsl --list --verbose
```

确认后再替换。

### 4.2 Windows 用户最容易忽略的问题

- 只配了 Ubuntu 里的服务，没让 WSL 开机自动唤起
- Windows 睡眠或关机后认为“服务应该继续在”
- 浏览器缓存了旧 token 链接

### 4.3 验证链路

重启 Windows 后，检查：

1. WSL 是否被拉起
2. Ubuntu 内 `openclaw gateway status` 是否正常
3. Windows 浏览器能否打开控制台

---

## 五、自动启动之后最该盯的 4 件事

### 5.1 网关状态

```bash
openclaw gateway status
```

### 5.2 日志是否持续报错

```bash
openclaw gateway logs --lines 100
```

如果你看到的是偶发请求错误，不一定说明服务挂了；如果是反复启动失败、配置解析失败，那就要先修。

### 5.3 机器休眠或断网

这类问题在日志里不一定直接显示，但会表现为：

- 聊天渠道突然不回复
- Web 控制台转圈
- 定时任务不再执行

### 5.4 模型余额或 Key 失效

很多“自动运行失效”看起来像服务挂了，其实是模型侧失效。

所以自动运行不仅要看服务，还要定期验证：

- 默认模型 Key 是否有效
- 账户是否有余额
- baseUrl 是否可达

---

## 六、哪些机器更适合长期运行

推荐顺序大致如下：

1. Linux 云服务器
2. 家里常开的 Linux 小主机
3. Mac mini / Mac Studio
4. 长期开机的 Windows + WSL2
5. 日常会合盖休眠的笔记本

如果你想“随时手机上能叫得到”，最后一种反而最不稳。

---

## 七、常见误区

### 7.1 还没跑通，就先配自动启动

错序。先能稳定跑，再自动化启动。

### 7.2 以为开机自启就等于永远在线

不是。还会受这些因素影响：

- 机器睡眠
- 网络中断
- 模型失效
- 日志写满

### 7.3 只看系统服务，不看 OpenClaw 本身

服务处于 `running`，不代表模型能回、控制台能开、渠道能通。

你至少要同时检查：

```bash
openclaw gateway status
openclaw dashboard
```

---

## 八、建议你的最小长期运行方案

如果你只想先稳定起来，不想一下子做复杂部署，建议：

1. 先在一台常开机器上跑通 OpenClaw
2. 执行 `openclaw gateway install`
3. 关闭休眠或降低休眠影响
4. 重启机器验证一次
5. 用 `openclaw gateway logs --lines 100` 做一次检查

---

## 下一步看哪篇

| 你的目标 | 建议阅读 |
|------|------|
| 想开放局域网或远程访问 | [06D-OpenClaw-远程访问与安全配置-通用说明.md](./remote-security.md) |
| 想继续做安装后基础配置 | [06A-OpenClaw-安装后配置-通用说明.md](./post-install-config.md) |
| 想查运行异常和维护问题 | [10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md) |
| 想做定时任务和更复杂自动化 | [11-OpenClaw-进阶玩法-通用说明.md](./advanced.md) |
