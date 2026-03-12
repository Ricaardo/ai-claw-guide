# 02B. OpenClaw 本地安装一键命令指南（Linux Ubuntu/Debian 版）

> **适用对象**：第一次在 Ubuntu/Debian 上安装 OpenClaw 的新手 | **文档版本**：V1.1
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw Linux 最短安装路径，复制粘贴即可

---

## 先说结论

7 个步骤，全部复制粘贴，约 10 分钟完成。

---

## 第一步：安装基础依赖

```bash
sudo apt-get update
sudo apt-get install -y curl git build-essential ca-certificates
```

---

## 第二步：安装 Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
```

**验证**：

```bash
node --version
```

显示 `v22.x.x` 或更高就对了。

---

## 第三步：配置 npm

```bash
npm config set registry https://registry.npmmirror.com
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
```

---

## 第四步：安装 OpenClaw

```bash
npm install -g openclaw@latest
```

**验证**：

```bash
openclaw --version
```

---

## 第五步：运行配置向导

```bash
openclaw onboard
```

- 模型：先选 `MiniMax M2.5` 或 `DeepSeek`
- 聊天渠道：先跳过
- Skills：先跳过
- 网关服务：建议安装

---

## 第六步：安装推荐 Skills

推荐 Skills 请参考 [09-OpenClaw-Skills-安装与推荐-通用说明.md](09-OpenClaw-Skills-安装与推荐-通用说明.md)

---

## 第七步：验证

在浏览器打开 onboard 给出的 Web 控制台地址，输入：

```
你好，你是谁？
```

收到回复，恭喜，安装成功！

---

## 最常见问题

**Q1：安装时提示 permission denied 或 EACCES**

配置用户级 npm 目录（第三步已包含），或参考 [10-排障与维护](10-OpenClaw-排障与维护-通用说明.md)。

**Q2：`openclaw: command not found`**

关掉终端重新打开。如果仍然报错，执行 `source ~/.bashrc` 后重试。

**Q3：其他问题**

参考 [10-OpenClaw-排障与维护-通用说明](10-OpenClaw-排障与维护-通用说明.md)。

---

## 装完了，接下来看哪里

| 你想做什么 | 看哪份文档 |
|------|------|
| 想比较不同模型 | [06-模型配置通用说明](06-OpenClaw-模型配置-通用说明.md) |
| 想接飞书、Discord 等 | [08-聊天渠道通用说明](08-OpenClaw-聊天渠道-通用说明.md) |
| 装好了但出错 | [10-排障与维护](10-OpenClaw-排障与维护-通用说明.md) |
