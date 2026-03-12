# 05. OpenClaw 本地安装指南（Windows 版，零基础适用）

> **适用对象**：Windows 10 / Windows 11 用户，无需编程基础 | **文档版本**：V1.0
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw Windows 本地安装说明（WSL2 路线）

---

## 先看这 3 句话

- 截至 **2026 年 3 月 11 日**，OpenClaw 官方对 Windows 的推荐方案是：**通过 WSL2 运行**（WSL2 是 Windows 内置的 Linux 运行环境，微软官方支持）
- 如果你是零基础用户，不建议优先尝试"纯原生 Windows"安装，成功率和兼容性都不如 WSL2
- WSL2 是 Windows 官方的 Linux 环境，OpenClaw 在其中运行更稳定。

### 5 分钟成功路径

1. 在 Windows 里安装 WSL2
2. 安装 Ubuntu
3. 在 Ubuntu 里安装 OpenClaw
4. 运行 `openclaw onboard`
5. 在浏览器里打开 OpenClaw Web 控制台

### 阅读导航

| 你的情况 | 建议直接看哪里 |
|------|------|
| 完全不知道 WSL2 是什么 | 二、正式安装前要准备什么 |
| 只想要最稳的安装路线 | 2.2 + 2.3 + 2.4 |
| 想先看模型怎么选 | [06-模型配置通用说明](./model-config.md) |
| 想接飞书、QQ、企业微信、Discord 等渠道 | 4.2 节末尾 |
| 装好了但打不开 | 六、最常见问题排查 |

---

## 一、先判断：Windows 上适不适合你

如果你用的是 Windows 10/11、愿意按教程装一个 Ubuntu 子系统并复制几条命令，就适合继续；如果完全不想接触命令行、电脑经常关机或只想最快体验，建议改走云端方案。

### 1.1 为什么官方推荐 WSL2

- CLI 和网关跑在 Linux 里，运行环境更一致
- Node、pnpm、Linux 二进制和 Skills 兼容性更好
- 原生 Windows 方案更容易遇到兼容性问题

---

## 二、正式安装前要准备什么

### 2.1 系统要求

- Windows 10 2004 及以上，或 Windows 11
- 电脑支持虚拟化
- 至少 8GB 内存更稳妥
- 至少 10GB 可用空间

### 2.2 先安装 WSL2

打开 **PowerShell（管理员）**，执行：

```powershell
wsl --install
```

如果你的电脑还没装 WSL，这条命令通常会：

- 自动开启需要的系统功能
- 自动安装 WSL
- 默认安装 Ubuntu

执行完成后，如果系统要求重启，就先重启电脑。

### 2.3 如果 `wsl --install` 没有直接成功

```powershell
wsl --list --online
wsl --install -d Ubuntu-24.04
```

如果安装过程卡住：

```powershell
wsl --install --web-download -d Ubuntu-24.04
```

### 2.4 第一次打开 Ubuntu

安装好后：

1. 打开开始菜单
2. 搜索 `Ubuntu`
3. 点开它
4. 第一次启动时，系统会让你创建：
   - Linux 用户名
   - Linux 密码

这个用户名和密码是 **Ubuntu 里的账号**，不是你的 Windows 账号。

请记好，因为后面会用到。

---

WSL2 环境准备完毕，接下来安装 OpenClaw 本体——步骤更简单，跟着粘贴就行。

## 三、在 WSL2 里安装 OpenClaw

### 3.1 先启用 systemd

在 Ubuntu 终端执行：

```bash
sudo tee /etc/wsl.conf >/dev/null <<'EOF'
[boot]
systemd=true
EOF
```

然后回到 PowerShell，执行：

```powershell
wsl --shutdown
```

再重新打开 Ubuntu。验证：

```bash
systemctl --user status
```

### 3.2 安装 OpenClaw

在 Ubuntu 终端执行：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash
```

如果你更想跳过首次向导，只安装程序：

```bash
curl -fsSL https://openclaw.ai/install.sh | bash -s -- --no-onboard
```

### 3.3 运行首次配置

如果安装脚本没有自动带你进入向导，就手动执行：

```bash
openclaw onboard
```

向导里通常会让你完成这些事：

1. 确认安全声明
2. 选择模型平台
3. 输入 API Key 或完成授权登录
4. 选择是否安装聊天渠道
5. 选择是否安装 Skills
6. 是否安装网关服务

零基础用户建议：

- 模型先选一个最熟悉、最便宜或最容易注册的
- Skills 先少装
- 网关服务建议装上

如果你想系统比较模型，再看这份通用说明：

[`06-OpenClaw-模型配置-通用说明.md`](./model-config.md)

---

## 四、Windows 上最关键的两件事

### 4.1 网关服务安装

```bash
openclaw onboard --install-daemon
```

或者：

```bash
openclaw gateway install
```

或者：

```bash
openclaw configure
```

如果之前装过、想修复，可以试：

```bash
openclaw doctor
```

### 4.2 怎样从 Windows 浏览器访问

在 Ubuntu 里完成 `openclaw onboard` 后，复制它输出的 Web 控制台地址，在 Windows 浏览器打开。如果地址带 Token，请保存完整链接。

> 聊天渠道配置请参考 [08-OpenClaw-聊天渠道-通用说明](./channel-guide.md)。

---

## 五、进阶：开机后自动运行

```bash
# 让用户服务在未登录时继续运行
sudo loginctl enable-linger "$(whoami)"

# 安装 Gateway 用户服务
openclaw gateway install
```

在 **PowerShell（管理员）** 执行以下命令让 WSL 开机自启：

```powershell
schtasks /create /tn "WSL Boot" /tr "wsl.exe -d Ubuntu --exec /bin/true" /sc onstart /ru SYSTEM
```

> 如果你的发行版名字不是 `Ubuntu`，先用 `wsl --list --verbose` 确认，再替换命令中的名称。

---

## 六、最常见问题排查

通用排障说明：[10-OpenClaw-排障与维护-通用说明.md](./troubleshooting.md)

### Q1：`wsl --install` 提示命令不可用

确认系统为 Windows 10 2004+ 或 Windows 11，且 PowerShell 以管理员身份运行。系统版本太老请先升级。

### Q2：Ubuntu 装好了，但命令执行很慢

尽量在 Ubuntu 自己的 Linux 目录里操作，避免跨盘读写。检查网络访问 npm / GitHub 是否较慢。

### Q3：`openclaw: command not found`

1. 重新打开 Ubuntu
2. 再执行一次安装脚本
3. 再执行 `openclaw onboard`

### Q4：浏览器打开地址后显示未授权

重新运行 `openclaw onboard`，复制完整地址（不要删掉 `#token=...` 部分）。

如果以上问题都解决了，能正常收到回复，恭喜，安装成功！

---

## 装完了，接下来看哪里

| 你想做什么 | 看哪份文档 |
|------|------|
| 配置不同的模型 | [06-OpenClaw-模型配置-通用说明](./model-config.md) |
| 接入飞书、Discord 等 | [08-OpenClaw-聊天渠道-通用说明](./channel-guide.md) |
| 安装 Skills 扩展能力 | [09-OpenClaw-Skills-安装与推荐-通用说明](./skills.md) |
| 装好了但出错 | [10-OpenClaw-排障与维护-通用说明](./troubleshooting.md) |
