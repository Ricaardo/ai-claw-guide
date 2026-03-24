# 常见问题

## Q1: 提示 `command not found`

**解决**：
1. 关闭终端，重新打开
2. 执行 `source ~/.zshrc`
3. 检查安装：`which opencode`

---

## Q2: 提示 `Free usage exceeded`

**原因**：免费模型用完了

**解决**：
1. 换一个免费模型：`/model big-pickle`
2. 或者等第二天刷新
3. 或者充值：https://opencode.ai/zen

---

## Q3: 提示 `API Key 无效`

**解决**：
1. 重新复制 Key，确保完整
2. 检查前后有没有空格
3. 重新配置：`opencode auth login`

---

## Q4: 连接超时

**解决**：
1. 检查网络
2. 配置代理（见代理配置）
3. 换一个代理服务

---

## Q5: Windows 提示无法加载脚本

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## Q6: 模型回复很慢

可能原因：
1. 免费模型排队（高峰期限流）
2. 网络问题

解决：
1. 换一个模型试试
2. 避开高峰时段

---

## Q7: 如何查看使用量？

```bash
/cost
```

---

## Q8: 如何撤销 AI 的修改？

```bash
/undo
# 或用 git
git checkout .
```

---

*返回：[AI 编码工具总览](./index)*
