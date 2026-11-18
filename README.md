# PEP Pay

[Deutsch](README.de.md) · [中文](README.zh.md)

**A free, self-hosted payment-request widget for native Pepecoin (PEP).**

PEP Pay displays a receiving address, a fixed PEP amount and a QR code that encodes a Pepecoin payment URI. It does not process or custody payments.

## Features

- No registration, user account, central payment service or recurring fees.
- Self-hosted: the website operator serves the JavaScript file.
- QR payment request with address and amount.
- Copy buttons for the address and amount.
- Interface translations: English, German and Chinese.
- MIT-licensed and open to community contributions.

## Important for buyers

**Please check item availability with the seller before paying.** PEP Pay does not reserve goods, prevent multiple people from paying for the same item, or handle refunds.

## Important limitations

- PEP Pay does not send, receive, hold or custody coins.
- It does not verify transactions or show payment confirmations. The seller must check the receiving wallet independently.
- The amount-prefilled URI (`pepecoin:ADDRESS?amount=AMOUNT`) was tested by the project maintainer with Coinomi. Compatibility with other wallets has not been verified. Always check the address and amount in the wallet before confirming a transaction.
- PEP Pay does not calculate prices, taxes/VAT, invoices, shipping, stock or legal obligations. Sellers remain responsible for these matters.
- Use only native Pepecoin (PEP), not similarly named tokens.

## Requirements

- Node.js 20 or later
- npm

## Build

```bash
npm install
npm run build
```

The distributable file is created at `dist/pep-pay.js`.

For local development:

```bash
npm run dev
```

Open the local Vite URL shown in the terminal.

## Embed on your website

1. Build the project.
2. Upload `dist/pep-pay.js` to your own website, for example to `/assets/pep-pay.js`.
3. Add the following markup where the payment request should appear. Replace the example address with your own Pepecoin receiving address and set the amount.

```html
<div
  class="pep-pay"
  data-address="YOUR_PEP_RECEIVING_ADDRESS"
  data-amount="1000"
  data-currency="PEP"
  data-description="Order or item description"
  data-language="en">
</div>

<script src="/assets/pep-pay.js" defer></script>
```

Language values:
- `en` – English
- `de` – German
- `zh` – Chinese

The amount must be a positive number in PEP. The seller is responsible for checking the payment in their wallet.

## Configuration

| Attribute | Required | Description |
|---|---:|---|
| `class="pep-pay"` | Yes | Initializes the widget |
| `data-address` | Yes | Seller's native Pepecoin receiving address |
| `data-amount` | Yes | Positive payment amount in PEP |
| `data-currency` | No | Display label; defaults to `PEP` |
| `data-description` | No | Optional item/order description |
| `data-language` | No | `en`, `de` or `zh`; defaults to English |

## Privacy and security

- The widget does not require customer accounts or personal information.
- It has no built-in analytics, central API or payment server.
- Never enter a seed phrase or private key into a website or this widget.
- Verify the receiving address and amount in your wallet before sending.
- The site operator is responsible for serving the script securely (HTTPS recommended) and for independently verifying incoming payments.

## Contributing

Bug reports, documentation improvements, translations and code contributions are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT. See [LICENSE](LICENSE).
