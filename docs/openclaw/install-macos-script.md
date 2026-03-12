# 02. OpenClaw 本地安装一键脚本指南（macOS 版）

> **适用对象**：第一次在 Mac 上安装 OpenClaw 的新手 | **文档版本**：V1.1
> **更新日期**：2026 年 3 月 11 日 | **文档定位**：OpenClaw macOS 最短安装路径，复制粘贴即可

---

## 先说结论

你只需要做 3 件事：打开终端把命令逐条复制粘贴执行、在配置向导里选模型填 API Key、在浏览器里测试。想理解原理请看完整版 03 号文档。

---

## 第一步：打开终端

打开终端（Cmd+Space 搜索 Terminal）。

---

## 第二步：安装 Xcode 命令行工具

```bash
xcode-select --install
```

如果提示"已经安装"，跳过这一步，直接进入第三步即可。

---

## 第三步：安装 Homebrew

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

过程中可能要求输入你的 Mac 登录密码。**输入时屏幕不会显示任何字符**，这是正常的，输完按回车即可。

安装完成后，终端会提示你执行一两条 `eval` 开头的命令。请照做——把它显示的那几行复制粘贴执行一遍。

**验证**：

```bash
brew --version
```

---

## 第四步：安装 Node.js

```bash
brew install node
```

**验证**：

```bash
node --version
```

如果显示 `v22.x.x` 或更高，说明成功。如果低于 22，执行：

```bash
brew upgrade node
```

---

## 第五步：配置 npm 国内镜像

```bash
npm config set registry https://registry.npmmirror.com
```

---

## 第六步：配置 npm 全局目录（避免权限问题）

```bash
mkdir -p ~/.npm-global
npm config set prefix ~/.npm-global
echo 'export PATH="$HOME/.npm-global/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```

---

## 第七步：安装 OpenClaw

```bash
npm install -g openclaw@latest
```

**验证**：

```bash
openclaw --version
```

如果提示 `openclaw: command not found`，执行一下 `source ~/.zshrc` 再试。

---

## 第八步：运行配置向导

```bash
openclaw onboard
```

向导会依次让你完成：

1. **确认安全声明**：按提示继续
2. **选择模型**：新手建议选 `MiniMax M2.5` 或 `DeepSeek`
3. **填写 API Key**：把你在模型平台注册后拿到的密钥粘贴进去
4. **聊天渠道**：新手先跳过，后续可在文档 08 中配置
5. **Skills**：新手先跳过，下一步会单独安装
6. **网关服务**：建议安装

---

## 第九步：安装推荐 Skills

推荐 Skills 请参考 [09-OpenClaw-Skills-安装与推荐-通用说明.md](./skills.md)

---

## 第十步：验证

在浏览器的 Web 控制台里输入：

```
你好，你是谁？
```

如果收到回复，恭喜，安装成功！

---

## 装完了，接下来看哪里

| 你想做什么 | 看哪份文档 |
|------|------|
| 想了解每一步的原理 | [03-macOS 零基础指南](./install-macos.md) |
| 想比较不同模型 | [06-模型配置通用说明](./model-config.md) |
| 想接飞书、Discord 等 | [08-聊天渠道通用说明](./channel-guide.md) |
| 装好了但出错 | [10-排障与维护](./troubleshooting.md) |

---

## 最常见的 3 个问题

### Q1：某一步提示 `command not found`

说明上一步没装成功。回去重新执行上一步的安装命令。

### Q2：npm install 很慢或超时

确认你执行了第五步的镜像配置。如果还慢，可能是网络问题，换个网络再试。

### Q3：浏览器打开后提示 unauthorized

你用的不是完整地址。回到终端，找到 `onboard` 输出的那个带 `#token=` 的完整链接，复制完整再打开。
