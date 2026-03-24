# 前置环境安装

> 所有 AI 编码工具都需要 Node.js 环境

## 检查是否已安装

打开终端，输入：

```bash
node --version   # 应该显示 v22.x.x
npm --version    # 应该显示 10.x.x
```

如果显示版本号，说明已安装，跳到 [OpenCode 安装](./opencode)。

如果提示 `command not found`，请继续往下看。

---

## macOS 安装

### 方式一：官网下载（最简单）

1. 打开 https://nodejs.org
2. 点击左边 LTS 版本下载
3. 双击 `.pkg` 文件安装
4. 安装完成后**关闭并重新打开终端**

### 方式二：Homebrew

```bash
# 安装 Homebrew（如果没有）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Node.js
brew install node
```

---

## Windows 安装

### 官网下载（推荐）

1. 打开 https://nodejs.org
2. 点击左边 LTS 版本下载 `.msi` 文件
3. 双击安装，一路点 Next
4. **关掉所有终端，重新打开**

### 或使用 winget

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## Linux 安装

### Ubuntu/Debian

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### CentOS/RHEL/Fedora

```bash
curl -fsSL https://rpm.nodesource.com/setup_22.x | sudo bash -
sudo yum install -y nodejs
```

---

## 验证安装

```bash
node --version   # 应该显示 v22.x.x
npm --version    # 应该显示 10.x.x
```

显示版本号就成功了！继续下一步：[OpenCode 安装](./opencode)

---

## 常见问题

### 提示 `command not found`

1. 关闭终端，重新打开
2. 检查安装路径：`which node`
3. 如果没有，重新安装

### Windows 提示权限错误

```powershell
# 以管理员身份运行 PowerShell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

*下一步：[OpenCode 安装配置](./opencode)*
