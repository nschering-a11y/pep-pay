# PEP Pay

[English](README.md) · [Deutsch](README.de.md)

**面向原生 Pepecoin (PEP) 的免费、自行托管付款请求组件。**

PEP Pay 显示收款地址、固定的 PEP 金额，以及包含 Pepecoin 付款 URI 的二维码。它不处理付款，也不托管或保管任何代币。

## 功能

- 无需注册或用户账户；不依赖中央支付服务。
- 自行托管：网站运营者在自己的服务器上提供 JavaScript 文件。
- 二维码包含收款地址和金额。
- 可复制收款地址和金额。
- 支持英语、德语和中文界面。
- 采用 MIT 许可证，欢迎社区参与开发。

## 买家重要提示

**付款前，请向卖家确认商品是否仍然有货。** PEP Pay 不提供商品预留，不会阻止多人为同一商品付款，也不处理退款。

## 重要限制

- PEP Pay 不发送、接收或托管代币。
- 它不会验证交易，也不会显示付款确认。卖家必须自行在收款钱包中检查到账情况。
- 带预填金额的 URI（`pepecoin:地址?amount=金额`）已由项目维护者使用 Coinomi 测试。尚未验证其他钱包的兼容性。确认交易前，请务必在钱包中核对地址和金额。
- PEP Pay 不计算商品价格、增值税、发票、运费或库存，也不承担卖家的法律义务。相关责任由卖家承担。
- 仅使用原生 Pepecoin (PEP)，不要发送名称相似的其他代币。

## 环境要求

- Node.js 20 或更高版本
- npm

## 构建

```bash
npm install
npm run build
```

可供网站使用的文件将生成在 `dist/pep-pay.js`。

本地预览：

```bash
npm run dev
```

请打开终端中显示的本地 Vite 地址。

## 在网站中嵌入

1. 构建项目。
2. 将 `dist/pep-pay.js` 上传到自己的网站，例如 `/assets/pep-pay.js`。
3. 在需要显示付款请求的位置添加以下 HTML。请将示例地址替换为自己的 Pepecoin 收款地址，并设置金额。

```html
<div
  class="pep-pay"
  data-address="YOUR_PEP_RECEIVING_ADDRESS"
  data-amount="1000"
  data-currency="PEP"
  data-description="订单或商品说明"
  data-language="zh">
</div>

<script src="/assets/pep-pay.js" defer></script>
```

语言设置：
- `zh` – 中文
- `en` – 英语
- `de` – 德语

金额必须是大于零的 PEP 数值。卖家需自行在钱包中检查是否到账。

## 配置

| 属性 | 必填 | 说明 |
|---|---:|---|
| `class="pep-pay"` | 是 | 初始化组件 |
| `data-address` | 是 | 卖家的原生 Pepecoin 收款地址 |
| `data-amount` | 是 | 大于零的 PEP 付款金额 |
| `data-currency` | 否 | 显示单位；默认 `PEP` |
| `data-description` | 否 | 可选的商品或订单说明 |
| `data-language` | 否 | `zh`、`en` 或 `de`；默认英语 |

## 隐私与安全

- 组件不需要客户账户或个人信息。
- 不包含分析功能、中央 API 或支付服务器。
- 不要在网站或此组件中输入助记词或私钥。
- 发送前请在钱包中核对收款地址和金额。
- 网站运营者负责安全托管脚本（建议使用 HTTPS），并自行核实收款。

## 参与贡献

欢迎提交错误报告、文档改进、翻译和代码贡献。请参阅 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可证

MIT。详见 [LICENSE](LICENSE)。
