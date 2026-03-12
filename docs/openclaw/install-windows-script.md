# 02A. OpenClaw 本地安装一键命令指南（Windows 版）

> **适用对象**：第一次在 Windows 上安装 OpenClaw 的新手 | **文档版本**：V1.1
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw Windows 最短安装路径（WSL2 路线），复制粘贴即可

---

## 先说结论

- 本方案是"在 Windows 里装一个 Ubuntu 小环境，再在里面装 OpenClaw"，是当前官方对零基础用户最稳的 Windows 路线
- 全过程你只需要粘贴命令，不需要理解原理

想了解每一步的原理，请看完整版：[`05-OpenClaw-本地安装-Windows-零基础指南.md`](./install-windows.md)

---

> 提醒：接下来会用到两个不同的终端。第一阶段用 Windows PowerShell，第二阶段切换到 Ubuntu 终端。注意区分。

## 第一阶段：安装 WSL2 和 Ubuntu（在 PowerShell 里做）

打开 PowerShell（管理员）：右键点击开始按钮，选择 "终端(管理员)" 或 "PowerShell(管理员)"。

### 第一步：安装 WSL

```powershell
wsl --install
```

这条命令会自动安装 WSL 和 Ubuntu。

**执行后可能出现的情况**：

- 如果提示需要重启：先重启电脑，重启后再继续
- 如果安装过程卡住，换一种方式：

```powershell
wsl --install --web-download -d Ubuntu-24.04
```

### 第二步：第一次打开 Ubuntu

1. 打开开始菜单，搜索 `Ubuntu`，点开它
2. 第一次会让你创建 Linux 用户名和密码

**注意**：这个用户名和密码是 Ubuntu 里用的，不是你的 Windows 账号。输入密码时屏幕不会显示任何字符，这是正常的。请记住这个密码，后面会用到。

### 第三步：启用 systemd

详见 [05-OpenClaw-本地安装-Windows-零基础指南.md](./install-windows.md) 中的 systemd 配置章节。简要步骤：

在 Ubuntu 终端里执行：

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

再重新打开 Ubuntu。

---

第一阶段完成。接下来的第二阶段更简单——全部在 Ubuntu 终端里操作。

## 第二阶段：安装 OpenClaw（在 Ubuntu 终端里做）

从这里开始，所有命令都在 **Ubuntu 终端**里执行，不是 PowerShell。

### 第四步：安装基础依赖

```bash
sudo apt-get update
sudo apt-get install -y curl git build-essential ca-certificates
```

### 第五步：安装 Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**验证**：

```bash
node --version
```

显示 `v22.x.x` 或更高就对了。

### 第六步：配置 npm

```bash
npm config set registry https://registry.npmmirror.com
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

### 第七步：安装 OpenClaw

```bash
npm install -g openclaw@latest
```

**验证**：

```bash
openclaw --version
```

如果提示 `command not found`，执行 `source ~/.bashrc` 再试。

### 第八步：运行配置向导

```bash
openclaw onboard
```

向导里的选择建议：

- 模型：先选 `MiniMax M2.5` 或 `DeepSeek`
- 聊天渠道：先跳过
- Skills：先跳过
- 网关服务：建议安装

完成后会给你一个 Web 控制台地址。复制完整地址（包括 `#token=` 部分），在 **Windows 浏览器**里打开。

### 第九步：安装推荐 Skills

推荐 Skills 请参考 [09-OpenClaw-Skills-安装与推荐-通用说明.md](./skills.md)

### 第十步：验证

在浏览器的 Web 控制台里输入：

```
你好，你是谁？
```

收到回复，恭喜，安装成功！

---

## 特别注意：Windows 上的两个常见坑

### 坑 1：第一次跑很可能需要分两次完成

因为安装 WSL / Ubuntu 后通常需要重启或创建用户，这不是故障。重启后从"第二步"继续即可。

### 坑 2：操作要在正确的窗口里做

- **PowerShell**：只有第一步和第三步（`wsl --shutdown`）在这里做
- **Ubuntu 终端**：从第四步开始，所有命令都在这里做

如果你在 PowerShell 里执行 Linux 命令（如 `apt-get`），会报错。反过来也一样。

---

## 装完了，接下来看哪里

| 你想做什么 | 看哪份文档 |
|------|------|
| 想了解每一步的原理 | [05-Windows 零基础指南](./install-windows.md) |
| 想比较不同模型 | [06-模型配置通用说明](./model-config.md) |
| 想接飞书、Discord 等 | [08-聊天渠道通用说明](./channel-guide.md) |
| 装好了但出错 | [10-排障与维护](./troubleshooting.md) |
