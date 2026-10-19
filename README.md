# Crypto Volatility Tracker (Bybit)

A real-time crypto market dashboard that pulls prices from the public **Bybit V5 API** and flags volatility anomalies. Built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

> **Reliability note:** if Bybit is unreachable (network, region restrictions), the API route returns a static fallback snapshot and the UI labels it as such, so the dashboard never shows an empty state.

## Features

- **Live market data:** a server-side API route proxies the Bybit V5 tickers endpoint (no API key needed).
- **Anomaly score:** a 0-10 index derived from the 24h price change.
- **Auto-refresh:** the dashboard polls every 15 seconds and shows the last update time.
- **Graceful fallback:** clear error and fallback states, never a blank screen.
- **Dark UI:** responsive table with color-coded status badges (Lucide icons).

## Tech Stack

Next.js 15 · React 19 · TypeScript · Tailwind CSS 3 · Lucide React

## Project Structure

```text
src/app/
├── api/bybit/route.ts             # Bybit proxy with fallback data
├── components/TrackerDashboard.tsx  # Data mapping, polling, UI
├── layout.tsx
└── page.tsx
```

## Getting Started

```bash
git clone https://github.com/SeriDaron/crypto-bybit-tracker.git
cd crypto-bybit-tracker
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Extending It

- Add more trading pairs or a symbol selector.
- Stream data via WebSocket instead of polling.
- Add price alerts (Telegram / email) and historical charts.

## Need something similar?

I build trading dashboards, data tools, and API integrations. Feel free to reach out.
