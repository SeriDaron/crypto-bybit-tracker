'use client';

import React, { useState, useEffect } from 'react';
import { TrendingUp, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react';

interface CryptoTicker {
  symbol: string;
  price: string;
  volume24h: string;
  high24h: string;
  low24h: string;
  anomalyScore: number;
  status: string;
}

export default function TrackerDashboard() {
  const [tickers, setTickers] = useState<CryptoTicker[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFallback, setIsFallback] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchMarketData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/bybit');
      const data = await response.json();
      
      if (data.result) {
        setTickers(data.result);
        setIsFallback(!!data.fallback);
        setLastUpdated(new Date().toLocaleTimeString());
      } else {
        setError('Data formatting anomaly detected.');
      }
    } catch (err: unknown) {
      setError('Localized execution environment latency.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-[#F3F4F6] p-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-[#1F2937] pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="text-[#3B82F6] h-6 w-6" />
              <h1 className="text-2xl font-bold tracking-tight">Nexus.Crypto Analytics Layer</h1>
            </div>
            <p className="text-[#9CA3AF] text-sm">
              Real-time multi-stream anomaly scanning over live exchange ticker frameworks.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {lastUpdated && (
              <span className="text-xs text-[#6B7280]">
                Last Sync: <span className="text-[#3B82F6] font-mono font-bold">{lastUpdated}</span>
              </span>
            )}
            <button
              onClick={fetchMarketData}
              disabled={loading}
              className="flex items-center gap-2 text-xs bg-[#1F2937] hover:bg-[#374151] transition-all px-4 py-2 rounded-lg font-medium border border-[#374151] disabled:opacity-50"
            >
              <RefreshCw className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
          </div>
        </div>

        {/* Dynamic State Alert */}
        {isFallback && (
          <div className="bg-[#1E3A8A]/30 border border-[#3B82F6]/40 text-[#93C5FD] p-4 rounded-xl flex items-start gap-3 mb-6 text-xs">
            <CheckCircle className="text-[#3B82F6] h-5 w-5 shrink-0" />
            <div>
              <span className="font-bold">Portfolio Simulation Mode Active:</span> Local Node backend runtime execution is running on pre-compiled active asset matrices to bypass cross-origin browser sandbox layouts.
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
            <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Monitored Assets</h3>
            <p className="text-2xl font-bold font-mono text-[#3B82F6]">{loading && tickers.length === 0 ? '...' : tickers.length} Pairs</p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
            <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Volatility Alerts</h3>
            <p className="text-2xl font-bold font-mono text-[#EF4444]">
              {loading && tickers.length === 0 ? '...' : tickers.filter(t => t.anomalyScore > 5.0).length} Active
            </p>
          </div>
          <div className="bg-[#111827] border border-[#1F2937] p-5 rounded-xl">
            <h3 className="text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider mb-2">Processing State</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <p className="text-sm font-semibold font-mono text-[#10B981]">
                {isFallback ? 'Demo Mode Active' : 'Live Data Inbound'}
              </p>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#111827] border border-[#1F2937] rounded-xl overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#1F2937]/50 border-b border-[#1F2937] text-xs font-semibold text-[#9CA3AF] uppercase tracking-wider">
                  <th className="py-4 px-6">Asset</th>
                  <th className="py-4 px-6 text-right">Price (USD)</th>
                  <th className="py-4 px-6 text-right">24H Low / High</th>
                  <th className="py-4 px-6 text-right">24H Volume</th>
                  <th className="py-4 px-6 text-center">Anomaly Index</th>
                  <th className="py-4 px-6 text-right">State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1F2937] text-sm font-mono">
                {loading && tickers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#6B7280] text-xs">
                      <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-[#3B82F6]" />
                      Streaming dynamic asset data frameworks...
                    </td>
                  </tr>
                ) : (
                  tickers.map((ticker) => (
                    <tr key={ticker.symbol} className="hover:bg-[#1F2937]/30 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#F3F4F6] text-base">{ticker.symbol}</td>
                      <td className="py-4 px-6 text-right font-semibold text-[#10B981]">\${ticker.price}</td>
                      <td className="py-4 px-6 text-right text-xs text-[#9CA3AF]">
                        \${ticker.low24h} / <span className="text-[#F3F4F6]">\${ticker.high24h}</span>
                      </td>
                      <td className="py-4 px-6 text-right text-xs text-[#D1D5DB]">{ticker.volume24h}</td>
                      <td className="py-4 px-6">
                        <div className="flex flex-col items-center gap-1 max-w-[120px] mx-auto">
                          <span className={`text-xs font-bold ${ticker.anomalyScore > 5.0 ? 'text-[#EF4444]' : 'text-[#3B82F6]'}`}>
                            {ticker.anomalyScore} / 10.0
                          </span>
                          <div className="w-full bg-[#1F2937] h-1.5 rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${ticker.anomalyScore > 5.0 ? 'bg-[#EF4444]' : 'bg-[#3B82F6]'}`}
                              style={{ width: `${ticker.anomalyScore * 10}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full border ${
                          ticker.anomalyScore > 5.0 
                            ? 'bg-[#7F1D1D]/20 text-[#FCA5A5] border-[#EF4444]/30' 
                            : 'bg-[#064E3B]/20 text-[#A7F3D0] border-[#10B981]/30'
                        }`}>
                          {ticker.anomalyScore > 5.0 ? <AlertTriangle className="h-3 w-3" /> : <CheckCircle className="h-3 w-3" />}
                          {ticker.status}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}
