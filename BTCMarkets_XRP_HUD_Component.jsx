import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export default function XRPPriceHUD() {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [prices, setPrices] = useState({ h1: null, h12: null, h24: null });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(new Date());

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    try {
      setError(null);
      
      // Fetch current ticker
      const tickerRes = await fetch('https://api.btcmarkets.net/v3/markets/XRP-AUD/ticker');
      const ticker = await tickerRes.json();
      
      // Fetch candle data for historical prices
      const now = Date.now();
      const candlesRes = await fetch(
        `https://api.btcmarkets.net/v3/markets/XRP-AUD/candles?timeWindow=1h&from=${new Date(now - 25 * 60 * 60 * 1000).toISOString()}&to=${new Date(now).toISOString()}`
      );
      const candles = await candlesRes.json();
      
      if (ticker && candles && candles.length > 0) {
        const current = parseFloat(ticker.lastPrice);
        
        // Candles are [timestamp, open, close, high, low, volume]
        const sortedCandles = candles.sort((a, b) => new Date(a[0]) - new Date(b[0]));
        
        const h1 = parseFloat(sortedCandles[sortedCandles.length - 2]?.[2] || sortedCandles[sortedCandles.length - 1]?.[2]);
        const h12 = parseFloat(sortedCandles[Math.max(0, sortedCandles.length - 13)]?.[2]);
        const h24 = parseFloat(sortedCandles[0]?.[2]);
        
        setCurrentPrice(current);
        setPrices({ h1, h12, h24 });
        setLoading(false);
        setLastUpdate(new Date());
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch prices');
      setLoading(false);
    }
  };

  const calculateChange = (oldPrice, newPrice) => {
    if (!oldPrice || !newPrice) return { percent: 0, isPositive: true };
    const change = ((newPrice - oldPrice) / oldPrice) * 100;
    return { percent: Math.abs(change), isPositive: change >= 0 };
  };

  const renderPriceCard = (label, oldPrice) => {
    const change = calculateChange(oldPrice, currentPrice);
    return (
      <div className="bg-gradient-to-br from-purple-900/40 to-violet-900/40 backdrop-blur-sm rounded-lg p-3 border border-pink-500/30">
        <div className="text-pink-300/70 text-xs font-medium mb-1">{label}</div>
        <div className="flex items-center justify-between">
          <div className="text-lg font-bold text-violet-200">
            ${oldPrice?.toFixed(4) || '--'}
          </div>
          <div className={`flex items-center gap-1 text-sm font-semibold ${
            change.isPositive ? 'text-green-400' : 'text-red-400'
          }`}>
            {change.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {change.percent.toFixed(2)}%
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-violet-950 flex items-center justify-center">
        <div className="text-pink-400 text-lg animate-pulse">Loading XRP data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-violet-950 flex items-center justify-center p-6">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-4">{error}</div>
          <button 
            onClick={fetchPrices}
            className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-violet-950 p-6 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Main Price Display */}
        <div className="bg-gradient-to-br from-violet-900/60 to-purple-900/60 backdrop-blur-md rounded-2xl p-6 border-2 border-pink-500/40 shadow-2xl shadow-pink-500/20 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-pink-400 text-sm font-semibold tracking-wider">
              XRP / AUD
            </div>
            <button 
              onClick={fetchPrices}
              className="text-violet-300 hover:text-pink-300 transition-colors"
              title="Refresh"
            >
              <RefreshCw size={16} />
            </button>
          </div>
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-pink-300 to-purple-300 mb-2">
            ${currentPrice?.toFixed(4)}
          </div>
          <div className="text-violet-300/60 text-xs">
            Last updated: {lastUpdate.toLocaleTimeString()}
          </div>
        </div>

        {/* Historical Prices */}
        <div className="space-y-3">
          {renderPriceCard('1 Hour Ago', prices.h1)}
          {renderPriceCard('12 Hours Ago', prices.h12)}
          {renderPriceCard('24 Hours Ago', prices.h24)}
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-violet-400/40 text-xs">
          Data from BTC Markets
        </div>
      </div>
    </div>
  );
}