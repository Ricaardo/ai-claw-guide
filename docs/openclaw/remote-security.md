# 06D. OpenClaw 远程访问与安全配置通用说明

> **适用对象**：希望从手机、平板、局域网设备或远程网络访问 OpenClaw 的用户 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 23 日 | **文档定位**：专门讲局域网访问、端口、token、防火墙、暴露风险与最小安全基线

---

## 先看结论

OpenClaw 能不能被远程访问，不是单一配置项的问题，而是 4 层一起决定的：

1. 网关监听地址
2. 端口是否放开
3. 是否有 token 保护
4. 机器是否暴露在可信网络里

如果你只需要家里同一 Wi-Fi 下访问，配置相对简单；如果你要公网远程访问，就必须把安全要求抬高。

---

## 一、先区分三种访问场景

### 1.1 只在本机使用

最安全，也最适合新手。

保持：

```bash
openclaw config set gateway.host "127.0.0.1"
openclaw gateway restart
```

### 1.2 同一局域网访问

适合：

- 手机访问家里的 OpenClaw
- 平板访问同一 Wi-Fi 下的主机

常见做法：

```bash
openclaw config set gateway.host "0.0.0.0"
openclaw gateway restart
```

然后再确认本机 IP、防火墙和 token。

### 1.3 公网远程访问

这是风险最高的一类。

只有在你明确知道自己在做什么时才建议继续。否则优先改用：

- 聊天渠道接入
- VPN
- 内网穿透配合额外鉴权

不要直接把未加固的 OpenClaw 暴露到公网。

---

## 二、局域网访问的最小配置

### 2.1 开启监听

```bash
openclaw config set gateway.host "0.0.0.0"
openclaw gateway restart
```

### 2.2 查看本机 IP

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

### 2.3 设置 token

```bash
openclaw config set gateway.auth.token "MyS3cure_T0ken!2026"
openclaw gateway restart
```

### 2.4 放行端口

Linux `ufw`：

```bash
sudo ufw allow 5154/tcp
sudo ufw reload
```

Windows 防火墙：

```powershell
New-NetFirewallRule -DisplayName "OpenClaw" -Direction Inbound -Protocol TCP -LocalPort 5154 -Action Allow
```

### 2.5 从其他设备访问

在同一 Wi-Fi 下访问：

```text
http://你的电脑IP:5154
```

---

## 三、为什么 token 很重要

如果你开放了局域网或更大范围的访问，而没有 token，相当于：

- 知道地址的人都能尝试访问
- 本地工具能力可能被滥用
- 已安装的 Skills 也可能变成风险放大器

所以只要不是纯本机 `127.0.0.1`，就应该设置一个足够复杂的 token。

推荐要求：

- 至少 16 位
- 包含大小写字母、数字、符号
- 不要重复用你的常用密码

---

## 四、公网访问为什么不建议直接开

因为 OpenClaw 不是一个“默认就为公网裸露设计”的简单静态页面，而是带：

- 模型调用能力
- 本地工具能力
- Skills 扩展能力

一旦暴露，风险远大于普通网页。

如果你确实要公网访问，至少要做到：

1. 有强 token
2. 只开放必要端口
3. 使用 HTTPS
4. 有额外鉴权层
5. 最好只对白名单网络开放

如果这些你还没把握，优先别直接做。

---

## 五、推荐的安全优先顺序

最推荐：

1. 本机访问
2. 局域网访问 + token
3. 通过聊天渠道远程使用
4. VPN 后访问
5. 反向代理 + HTTPS + 白名单
6. 直接公网暴露

最后一种风险最高，不建议当作默认方案。

---

## 六、端口与防火墙怎么理解

OpenClaw 远程访问链路里常见两个层面：

- OpenClaw 自己监听哪个地址和端口
- 操作系统或云平台是否允许外部连接进来

所以你即使配了 `0.0.0.0`，如果防火墙没放行，也照样连不上。

反过来，即使端口放开了，但 token 缺失，也是不安全的。

---

## 七、推荐的最小安全基线

如果你准备让手机或平板访问自己的 OpenClaw，至少做到这些：

1. 只在可信家庭或公司网络内使用
2. `gateway.host` 只在需要时改成 `0.0.0.0`
3. 设置强 token
4. 明确自己开放的是哪个端口
5. 使用完可恢复到本机模式

恢复本机模式：

```bash
openclaw config set gateway.host "127.0.0.1"
openclaw gateway restart
```

---

## 八、常见错误

### 8.1 为了图方便直接全网开放

这是最危险的做法。

### 8.2 只改监听地址，不设 token

风险很大，而且很多人就是卡在这一步。

### 8.3 把“访问不到”误判成安全问题

有时只是：

- IP 看错了
- 端口没放行
- 手机和电脑不在同一 Wi-Fi
- 浏览器访问了旧 token 链接

### 8.4 误以为聊天渠道和网页暴露是同一个风险级别

不是。聊天渠道通常有平台侧鉴权；直接暴露网页服务的攻击面更直接。

---

## 九、推荐你现在就做的版本

如果你是普通用户，最推荐的做法是：

1. 日常保持本机访问
2. 有需要时再临时打开局域网访问
3. 一定设置 token
4. 用完后恢复到 `127.0.0.1`

这比“长期暴露在更大网络里”稳很多。

---

## 下一步看哪篇

| 你的目标 | 建议阅读 |
|------|------|
| 想自动启动并长期常驻 | [06C-OpenClaw-自动启动与长期运行-通用说明.md](./autostart-long-running.md) |
| 想补基础安装后配置 | [06A-OpenClaw-安装后配置-通用说明.md](./post-install-config.md) |
| 想查网络或访问异常 | [10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md) |
| 想接入更自然的远程使用方式 | [08-OpenClaw-聊天渠道-通用说明.md](./channel-guide.md) |
