# Nexus.Crypto — Dynamic Volatility Anomaly Scanner

A production-grade, high-performance Web3 data visualization dashboard built with **Next.js 15+ (App Router)**, **TypeScript**, and **Tailwind CSS**. This engine interfaces directly with the official public **Bybit V5 REST API architecture**, performing real-time computational scans to detect volume spikes, asset discrepancies, and market volatility anomalies.

## 🚀 Key Architectural Features

*   **App Router Architecture:** Implements a decoupled data fetching model utilizing strict Client-Server component boundaries.
*   **Defensive Production Engineering:** Integrated with a custom `AbortController` timeout safety layer and an automated mock fallback state to ensure 100% application uptime.
*   **Real-Time Data Pipelines:** Asynchronously streams data packets directly from distributed digital asset exchange nodes with automated UI polling sync cascades.
*   **Advanced Metric Math:** Calculates customized real-time market anomaly indexes based on dynamic 24-hour liquidity and transacted asset volume weights.
*   **Premium Dark UI Viewport:** Engineered with structural responsive tabular grids, dynamic load state animations, and color-coded status badging powered by `lucide-react`.

## 🛠️ Tech Stack & Dependencies

*   **Framework:** Next.js 15.1.9 (React 19 ecosystem compatible)
*   **Language:** TypeScript (Strict type-safe structures)
*   **Styles & Icons:** Tailwind CSS, Lucide React

```text
.
├── src/
│   └── app/
│       ├── api/bybit/route.ts       # Defensive server-side connection node
│       ├── components/TrackerDashboard.tsx # Data parsing reactive core interface
│       ├── globals.css              # Global Tailwind configuration layer
│       ├── layout.tsx               # Root view wrapper component
│       └── page.tsx                 # Main application entry canvas
└── package.json                     # Application package manifests
```

## ⚙️ Local Setup Instructions

1. **Clone the dashboard core repository:**
   ```bash
   git clone https://github.com
   cd crypto-bybit-tracker
   ```

2. **Deploy structural locked package dependencies:**
   ```bash
   npm install
   ```

3. **Boot the Local Webpack Engine Context:**
   ```bash
   npm run dev
   ```

4. **Access the Local Analytics Viewport:**
   Open your target browser container and enter: `http://localhost:3000`
