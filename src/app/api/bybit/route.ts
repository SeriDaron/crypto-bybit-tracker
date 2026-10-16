import { NextResponse } from 'next/server';

export async function GET() {
  const targetSymbols = ['BTCUSDT', 'ETHUSDT', 'SOLUSDT', 'XRPUSDT', 'LINKUSDT'];

  // Guaranteed hardcoded snapshot in case of a network failure
  const fallbackData = [
    { symbol: 'BTCUSDT', price: '82500.00', change24h: '1.45', volume: '45210' },
    { symbol: 'ETHUSDT', price: '4250.00', change24h: '-0.85', volume: '284100' },
    { symbol: 'SOLUSDT', price: '215.30', change24h: '5.12', volume: '124050' },
    { symbol: 'XRPUSDT', price: '1.12', change24h: '12.40', volume: '890040' },
    { symbol: 'LINKUSDT', price: '19.85', change24h: '0.25', volume: '34010' }
  ];

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);

    const response = await fetch('https://bytick.com', {
      next: { revalidate: 5 },
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) throw new Error();

    const data = await response.json();

    if (data.retCode !== 0 || !data.result?.list) throw new Error();

    const formattedData = data.result.list
      .filter((ticker: any) => targetSymbols.includes(ticker.symbol))
      .map((ticker: any) => ({
        symbol: ticker.symbol,
        price: ticker.lastPrice,
        change24h: (parseFloat(ticker.price24hPcnt) * 100).toFixed(2),
        volume: ticker.volume24h
      }));

    if (formattedData.length === 0) throw new Error();

    return NextResponse.json({ success: true, data: formattedData });

  } catch (error) {
    // Safe auto-fallback if Bybit is unreachable locally
    return NextResponse.json({ success: false, data: fallbackData });
  }
}
