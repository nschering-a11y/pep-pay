# PEP Pay

[English](README.md) · [中文](README.zh.md)

**Ein kostenloses, selbst gehostetes Zahlungsanforderungs-Widget für natives Pepecoin (PEP).**

PEP Pay zeigt eine Empfangsadresse, einen festen PEP-Betrag und einen QR-Code mit einer Pepecoin-Zahlungs-URI an. Es wickelt keine Zahlungen ab und verwahrt keine Coins.

## Funktionen

- Keine Registrierung, kein Benutzerkonto und kein zentraler Zahlungsdienst.
- Selbst gehostet: Der Website-Betreiber stellt die JavaScript-Datei selbst bereit.
- Zahlungs-QR-Code mit Adresse und Betrag.
- Schaltflächen zum Kopieren von Adresse und Betrag.
- Benutzeroberfläche auf Deutsch, Englisch und Chinesisch.
- MIT-Lizenz; Beiträge aus der Community sind willkommen.

## Wichtiger Hinweis für Käufer

**Bitte vor der Zahlung die Verfügbarkeit der Ware beim Verkäufer prüfen.** PEP Pay reserviert keine Waren, verhindert keine Mehrfachzahlungen für denselben Artikel und wickelt keine Rückerstattungen ab.

## Grenzen und Verantwortung

- PEP Pay sendet, empfängt und verwahrt keine Coins.
- Es prüft keine Transaktionen und zeigt keine Zahlungsbestätigung an. Der Verkäufer muss den Zahlungseingang selbst in seiner Wallet kontrollieren.
- Die Zahlungs-URI mit vorausgefülltem Betrag (`pepecoin:ADRESSE?amount=BETRAG`) wurde vom Projektbetreiber mit Coinomi getestet. Die Kompatibilität mit anderen Wallets ist nicht verifiziert. Vor dem Bestätigen einer Transaktion müssen Adresse und Betrag in der Wallet geprüft werden.
- PEP Pay berechnet keine Preise, Umsatzsteuer, Rechnungen, Versandkosten oder Lagerbestände und übernimmt keine rechtlichen Pflichten des Verkäufers. Dafür bleibt der Verkäufer verantwortlich.
- Nur natives Pepecoin (PEP) verwenden, keine ähnlich benannten Token.

## Voraussetzungen

- Node.js 20 oder neuer
- npm

## Build

```bash
npm install
npm run build
```

Die einbindbare Datei wird unter `dist/pep-pay.js` erstellt.

Lokale Vorschau:

```bash
npm run dev
```

Öffne die lokale Vite-Adresse, die im Terminal angezeigt wird.

## Einbindung in eine Website

1. Projekt bauen.
2. `dist/pep-pay.js` auf den eigenen Webserver hochladen, zum Beispiel nach `/assets/pep-pay.js`.
3. Folgenden HTML-Code an der gewünschten Stelle einfügen. Beispieladresse durch die eigene Pepecoin-Empfangsadresse ersetzen und den Betrag festlegen.

```html
<div
  class="pep-pay"
  data-address="YOUR_PEP_RECEIVING_ADDRESS"
  data-amount="1000"
  data-currency="PEP"
  data-description="Bestellung oder Artikel"
  data-language="de">
</div>

<script src="/assets/pep-pay.js" defer></script>
```

Sprachwerte:
- `de` – Deutsch
- `en` – Englisch
- `zh` – Chinesisch

Der Betrag muss eine positive Zahl in PEP sein. Der Verkäufer kontrolliert den Zahlungseingang selbst in seiner Wallet.

## Konfiguration

| Attribut | Pflicht | Beschreibung |
|---|---:|---|
| `class="pep-pay"` | Ja | Initialisiert das Widget |
| `data-address` | Ja | Native Pepecoin-Empfangsadresse des Verkäufers |
| `data-amount` | Ja | Positiver Zahlungsbetrag in PEP |
| `data-currency` | Nein | Anzeigeeinheit; Standard ist `PEP` |
| `data-description` | Nein | Optionale Artikel- oder Bestellbeschreibung |
| `data-language` | Nein | `de`, `en` oder `zh`; Standard ist Englisch |

## Datenschutz und Sicherheit

- Das Widget benötigt keine Kundenkonten und keine persönlichen Angaben.
- Es enthält keine Analysefunktion, zentrale API oder Zahlungsserver.
- Niemals Seed Phrase oder Private Key in eine Website oder dieses Widget eingeben.
- Empfangsadresse und Betrag vor dem Senden in der Wallet prüfen.
- Der Website-Betreiber ist für die sichere Bereitstellung des Skripts (HTTPS empfohlen) und die eigenständige Prüfung eingehender Zahlungen verantwortlich.

## Mitwirken

Fehlerberichte, Verbesserungen der Dokumentation, Übersetzungen und Code-Beiträge sind willkommen. Siehe [CONTRIBUTING.md](CONTRIBUTING.md).

## Lizenz

MIT. Siehe [LICENSE](LICENSE).
