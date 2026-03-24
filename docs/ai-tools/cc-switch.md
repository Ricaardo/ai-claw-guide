# CC-Switch 配置管理

> 一键管理多个 AI 编码工具的配置

## 什么是 CC-Switch？

- 开源桌面应用（GitHub 18000+ 星）
- 统一管理 Claude Code、Codex、Gemini CLI、OpenCode
- 一键切换 API 代理
- 内置测速、故障转移

**适合**：需要切换不同 API 代理的用户

---

## 安装

### macOS

```bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
```

### Windows

1. 打开 https://github.com/farion1231/cc-switch/releases
2. 下载 `CC-Switch-v3.x.x-Windows.msi`
3. 双击安装

### Linux

```bash
curl -L https://github.com/farion1231/cc-switch/releases/latest/download/CC-Switch-*-linux-x86_64.AppImage -o cc-switch.AppImage
chmod +x cc-switch.AppImage
./cc-switch.AppImage
```

---

## 基本用法

### 添加 Provider

1. 打开 CC-Switch
2. 点击左侧 **Provider Management**
3. 点击 **Add Provider**
4. 填写信息

### 切换 Provider

- 在主界面选择 Provider → 点击 **Enable**
- 或在系统托盘点击 Provider 名称

---

## 支持的 Provider

| 服务 | 特点 |
|------|------|
| OpenCode Zen | 官方服务，有免费模型 |
| APIYI | 国内代理，中文支持好 |
| OpenRouter | 最全面，400+ 模型 |

---

*返回：[AI 编码工具总览](./index)*
