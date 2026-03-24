# 代理配置

> 国内用户加速访问

## 什么是代理？

简单说：API 服务器在国外，你访问慢 → 用国内代理服务器中转 → 速度快。

**小白提示**：如果你能正常使用，不需要配置代理。

---

## 最简单的方式：用 CC-Switch

装好 CC-Switch 后，添加代理 Provider，填写地址和 Key 即可。

---

## 手动配置代理

### OpenCode

编辑 `~/.config/opencode/opencode.json`：

```json
{
  "providers": {
    "custom": {
      "baseUrl": "https://你的代理地址.com/v1",
      "apiKey": "代理给你的Key"
    }
  }
}
```

### Claude Code

```bash
export ANTHROPIC_BASE_URL="https://你的代理地址.com/v1"
```

### Gemini CLI

```bash
export GOOGLE_API_BASE_URL="https://你的代理地址.com/v1"
```

### Codex

```bash
export OPENAI_BASE_URL="https://你的代理地址.com/v1"
```

---

## 常见代理服务

| 服务 | 特点 |
|------|------|
| OpenCode Zen | 官方服务，有免费模型 |
| APIYI | 国内代理，中文支持好 |
| OpenRouter | 最全面，400+ 模型 |

---

*返回：[AI 编码工具总览](./index)*
