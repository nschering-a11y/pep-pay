import QRCode from "qrcode";

const STYLE_ID = "pep-pay-widget-styles";

const translations = {
  en: {
    title: "Pay with Pepecoin",
    scan: "Scan the QR code with your PEP wallet",
    address: "Receiving address",
    amount: "Amount",
    description: "Description",
    copyAddress: "Copy address",
    copyAmount: "Copy amount",
    copied: "Copied",
    invalid: "Please check the receiving address and amount.",
    amountNote: "Check the address and amount in your wallet before sending.",
    availability: "Please check item availability with the seller before paying.",
    warning: "Only send native Pepecoin (PEP) to this address."
  },
  de: {
    title: "Mit Pepecoin bezahlen",
    scan: "QR-Code mit deiner PEP-Wallet scannen",
    address: "Empfangsadresse",
    amount: "Betrag",
    description: "Beschreibung",
    copyAddress: "Adresse kopieren",
    copyAmount: "Betrag kopieren",
    copied: "Kopiert",
    invalid: "Bitte Empfangsadresse und Betrag prüfen.",
    amountNote: "Bitte prüfe Adresse und Betrag in deiner Wallet vor dem Senden.",
    availability: "Bitte vor der Zahlung die Verfügbarkeit der Ware beim Verkäufer prüfen.",
    warning: "Nur native Pepecoin (PEP) an diese Adresse senden."
  },
  zh: {
    title: "使用 Pepecoin 付款",
    scan: "使用 PEP 钱包扫描二维码",
    address: "收款地址",
    amount: "金额",
    description: "说明",
    copyAddress: "复制地址",
    copyAmount: "复制金额",
    copied: "已复制",
    invalid: "请检查收款地址和金额。",
    amountNote: "发送前请在钱包中核对地址和金额。",
    availability: "付款前请向卖家确认商品是否仍然有货。",
    warning: "请仅向此地址发送原生 Pepecoin (PEP)。"
  }
};

function addStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .pep-pay-card{box-sizing:border-box;max-width:390px;padding:22px;border:1px solid #dce5dd;
      border-radius:18px;background:#fff;color:#183323;font:15px/1.45 system-ui,-apple-system,sans-serif;
      box-shadow:0 8px 28px rgba(18,48,29,.07)}
    .pep-pay-card *{box-sizing:border-box}
    .pep-pay-head{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:16px}
    .pep-pay-brand{font-size:19px;font-weight:800;letter-spacing:.04em;color:#176b3a}
    .pep-pay-free{font-size:11px;font-weight:700;color:#176b3a;background:#e8f5ec;padding:4px 9px;border-radius:99px}
    .pep-pay-title{font-size:18px;font-weight:700;margin:0 0 14px}
    .pep-pay-qr{display:flex;justify-content:center;align-items:center;background:#f7faf7;border-radius:14px;padding:16px;margin:12px 0}
    .pep-pay-qr canvas{max-width:100%;height:auto}
    .pep-pay-label{display:block;font-size:12px;font-weight:700;color:#53645a;margin:13px 0 5px}
    .pep-pay-value{overflow-wrap:anywhere;background:#f3f6f3;border-radius:9px;padding:10px 12px;font-size:13px}
    .pep-pay-amount{font-size:23px;font-weight:800;color:#176b3a}
    .pep-pay-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}
    .pep-pay-button{border:0;border-radius:9px;padding:10px 13px;background:#176b3a;color:white;font:600 13px system-ui;cursor:pointer}
    .pep-pay-button.secondary{background:#e9f1eb;color:#17472a}
    .pep-pay-button:focus-visible{outline:3px solid #82c99b;outline-offset:2px}
    .pep-pay-note{font-size:12px;color:#53645a;margin:12px 0 0}
    .pep-pay-warning{font-size:11px;color:#79552a;background:#fff7e8;padding:9px 10px;border-radius:8px;margin-top:12px}
    .pep-pay-error{color:#a32929;background:#fff0f0;padding:10px;border-radius:8px}
    .pep-pay-demo{border:2px solid #b42318;background:#fff7f6;color:#7a271a;padding:16px;border-radius:12px}
    .pep-pay-demo strong{display:block;font-size:16px;margin-bottom:6px}
    .pep-pay-demo p{margin:6px 0;font-size:13px}
  `;
  document.head.appendChild(style);
}

async function copyText(text, button, copiedLabel) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const field = document.createElement("textarea");
    field.value = text;
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();
    document.execCommand("copy");
    field.remove();
  }

  const old = button.textContent;
  button.textContent = copiedLabel;
  window.setTimeout(() => {
    button.textContent = old;
  }, 1400);
}

async function renderWidget(el) {
  if (el.dataset.pepPayReady === "true") return;
  el.dataset.pepPayReady = "true";
  addStyles();

  const address = (el.dataset.address || "").trim();
  const amount = (el.dataset.amount || "").trim();
  const currency = (el.dataset.currency || "PEP").trim().toUpperCase();
  const description = (el.dataset.description || "").trim();
  const lang = translations[el.dataset.language] ? el.dataset.language : "en";
  const t = translations[lang];
  const numericAmount = Number(amount);

  const isDemo = el.dataset.demo === "true";
  const demoCopy = {
    de: {
      heading: "DEMO – KEINE ZAHLUNG SENDEN",
      message: "Nur eine Funktionsvorschau. Die angezeigte Testadresse ist ungültig und kann keine Zahlung empfangen.",
      address: "Ungültige Demo-Adresse",
      amount: "Beispielbetrag",
      badge: "NICHT ZAHLBAR"
    },
    en: {
      heading: "DEMO – DO NOT SEND PAYMENT",
      message: "Feature preview only. The test address shown is invalid and cannot receive a payment.",
      address: "Invalid demo address",
      amount: "Example amount",
      badge: "NOT PAYABLE"
    },
    zh: {
      heading: "演示 – 请勿付款",
      message: "仅用于功能预览。此处显示的测试地址无效，无法接收付款。",
      address: "无效演示地址",
      amount: "示例金额",
      badge: "不可付款"
    }
  }[lang];

  if (!address || address === "YOUR_PEP_RECEIVING_ADDRESS" ||
      !Number.isFinite(numericAmount) || numericAmount <= 0) {
    el.innerHTML = `<div class="pep-pay-card"><div class="pep-pay-error">${t.invalid}</div></div>`;
    return;
  }

  const card = document.createElement("section");
  card.className = "pep-pay-card";
  card.setAttribute("aria-label", "PEP Pay payment information");

  const head = document.createElement("div");
  head.className = "pep-pay-head";
  const brand = document.createElement("div");
  brand.className = "pep-pay-brand";
  brand.textContent = "PEP PAY";
  const free = document.createElement("span");
  free.className = "pep-pay-free";
  free.textContent = isDemo ? demoCopy.badge : "FREE";
  if (isDemo) {
    free.style.color = "#8b1e16";
    free.style.background = "#fde8e7";
  }
  head.append(brand, free);

  const title = document.createElement("h2");
  title.className = "pep-pay-title";
  title.textContent = t.title;

  if (isDemo) {
    const demoNotice = document.createElement("div");
    demoNotice.className = "pep-pay-demo";
    const demoHeading = document.createElement("strong");
    demoHeading.textContent = demoCopy.heading;
    const demoMessage = document.createElement("p");
    demoMessage.textContent = demoCopy.message;
    demoNotice.append(demoHeading, demoMessage);
    card.append(demoNotice);
  }

  const scan = document.createElement("p");
  scan.className = "pep-pay-note";
  scan.textContent = t.scan;

  const qrWrap = document.createElement("div");
  qrWrap.className = "pep-pay-qr";
  const canvas = document.createElement("canvas");
  qrWrap.appendChild(canvas);

  const amountLabel = document.createElement("label");
  amountLabel.className = "pep-pay-label";
  amountLabel.textContent = t.amount;
  const amountValue = document.createElement("div");
  amountValue.className = "pep-pay-value pep-pay-amount";
  amountValue.textContent = `${amount} ${currency}`;

  const addressLabel = document.createElement("label");
  addressLabel.className = "pep-pay-label";
  addressLabel.textContent = t.address;
  const addressValue = document.createElement("div");
  addressValue.className = "pep-pay-value";
  addressValue.textContent = isDemo ? "NOT-A-REAL-PEP-ADDRESS" : address;
  if (isDemo) addressLabel.textContent = demoCopy.address;

  const actions = document.createElement("div");
  actions.className = "pep-pay-actions";
  const copyAddress = document.createElement("button");
  copyAddress.type = "button";
  copyAddress.className = "pep-pay-button";
  copyAddress.textContent = t.copyAddress;
  copyAddress.addEventListener("click", () => copyText(isDemo ? "NOT-A-REAL-PEP-ADDRESS" : address, copyAddress, t.copied));

  const copyAmount = document.createElement("button");
  copyAmount.type = "button";
  copyAmount.className = "pep-pay-button secondary";
  copyAmount.textContent = t.copyAmount;
  copyAmount.addEventListener("click", () => copyText(amount, copyAmount, t.copied));
  actions.append(copyAddress, copyAmount);

  card.append(head, title);
  if (description) {
    const descLabel = document.createElement("label");
    descLabel.className = "pep-pay-label";
    descLabel.textContent = t.description;
    const descValue = document.createElement("div");
    descValue.className = "pep-pay-value";
    descValue.textContent = description;
    card.append(descLabel, descValue);
  }

  card.append(scan, qrWrap, amountLabel, amountValue, addressLabel, addressValue, actions);

  const amountNote = document.createElement("p");
  amountNote.className = "pep-pay-note";
  amountNote.textContent = isDemo ? demoCopy.message : t.amountNote;
  const availability = document.createElement("p");
  availability.className = "pep-pay-warning";
  availability.textContent = t.availability;
  const warning = document.createElement("p");
  warning.className = "pep-pay-note";
  warning.textContent = t.warning;
  card.append(amountNote, availability, warning);
  el.replaceChildren(card);

  try {
    // Payment URI amount-prefill is experimental; wallet support has not been confirmed.
    // Demo QR deliberately contains an invalid placeholder address and cannot receive funds.
    const qrAddress = isDemo ? "NOT-A-REAL-PEP-ADDRESS" : address;
    const paymentURI = `pepecoin:${qrAddress}?amount=${amount}`;
    await QRCode.toCanvas(canvas, paymentURI, {
      width: 220,
      margin: 1,
      errorCorrectionLevel: "M",
      color: { dark: "#102b1b", light: "#ffffff" }
    });
  } catch {
    qrWrap.textContent = t.invalid;
    qrWrap.classList.add("pep-pay-error");
  }
}

function init() {
  document.querySelectorAll(".pep-pay").forEach(renderWidget);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init, { once: true });
} else {
  init();
}

window.PepPay = Object.freeze({ version: "0.2.0", init });
