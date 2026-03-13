import { useMemo, useState } from 'react';
import './App.css';

const MARKET_DATA = {
  EURUSD: { price: 1.0842, change: 0.18, rsi: 41, trend: 'bullish', volatility: 'medium' },
  GBPUSD: { price: 1.2711, change: -0.12, rsi: 63, trend: 'bearish', volatility: 'high' },
  USDJPY: { price: 149.53, change: 0.24, rsi: 57, trend: 'bullish', volatility: 'medium' },
  AUDUSD: { price: 0.6588, change: -0.31, rsi: 34, trend: 'bullish', volatility: 'low' },
  USDCAD: { price: 1.3574, change: 0.09, rsi: 52, trend: 'neutral', volatility: 'low' },
};

const TIMEFRAME_FACTOR = {
  '15m': 0.5,
  '1h': 1,
  '4h': 1.5,
  '1d': 2,
};

const getSignal = (pairData, riskLevel, timeframe) => {
  const trendWeight = pairData.trend === 'bullish' ? 1 : pairData.trend === 'bearish' ? -1 : 0;
  const rsiWeight = pairData.rsi < 40 ? 1 : pairData.rsi > 60 ? -1 : 0;
  const volatilityPenalty = pairData.volatility === 'high' && riskLevel === 'low' ? -1 : 0;
  const momentum = (pairData.change > 0 ? 1 : -1) + trendWeight + rsiWeight + volatilityPenalty;

  if (momentum >= 2) return 'BUY';
  if (momentum <= -1) return 'SELL';
  return 'WAIT';
};

const getRiskPlan = (price, signal, riskLevel, timeframe) => {
  const factor = TIMEFRAME_FACTOR[timeframe] || 1;
  const riskMultiplier = riskLevel === 'high' ? 1.4 : riskLevel === 'medium' ? 1 : 0.7;
  const distance = Number((price * 0.003 * factor * riskMultiplier).toFixed(4));

  if (signal === 'BUY') {
    return {
      entry: price,
      stopLoss: Number((price - distance).toFixed(4)),
      takeProfit: Number((price + distance * 1.8).toFixed(4)),
    };
  }

  if (signal === 'SELL') {
    return {
      entry: price,
      stopLoss: Number((price + distance).toFixed(4)),
      takeProfit: Number((price - distance * 1.8).toFixed(4)),
    };
  }

  return { entry: price, stopLoss: '-', takeProfit: '-' };
};

function App() {
  const [pair, setPair] = useState('EURUSD');
  const [timeframe, setTimeframe] = useState('1h');
  const [riskLevel, setRiskLevel] = useState('medium');

  const pairData = MARKET_DATA[pair];

  const analysis = useMemo(() => {
    const signal = getSignal(pairData, riskLevel, timeframe);
    const plan = getRiskPlan(pairData.price, signal, riskLevel, timeframe);

    return {
      signal,
      confidence:
        signal === 'WAIT'
          ? 58
          : Math.min(
              89,
              Math.round(62 + Math.abs(pairData.change) * 30 + TIMEFRAME_FACTOR[timeframe] * 4)
            ),
      plan,
    };
  }, [pairData, riskLevel, timeframe]);

  return (
    <main className="app-shell">
      <section className="panel">
        <h1>Forex Signal Assistant</h1>
        <p className="subtitle">
          Demo software that generates trade ideas from simple momentum + RSI + trend rules.
        </p>

        <div className="controls">
          <label>
            Currency Pair
            <select value={pair} onChange={(event) => setPair(event.target.value)}>
              {Object.keys(MARKET_DATA).map((marketPair) => (
                <option key={marketPair} value={marketPair}>
                  {marketPair}
                </option>
              ))}
            </select>
          </label>

          <label>
            Timeframe
            <select value={timeframe} onChange={(event) => setTimeframe(event.target.value)}>
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
              <option value="1d">1d</option>
            </select>
          </label>

          <label>
            Risk Level
            <select value={riskLevel} onChange={(event) => setRiskLevel(event.target.value)}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </label>
        </div>

        <article className="signal-card">
          <div>
            <p className="label">Live price</p>
            <p className="value">{pairData.price}</p>
          </div>
          <div>
            <p className="label">Daily change</p>
            <p className={`value ${pairData.change >= 0 ? 'up' : 'down'}`}>
              {pairData.change >= 0 ? '+' : ''}
              {pairData.change}%
            </p>
          </div>
          <div>
            <p className="label">Signal</p>
            <p className={`value signal ${analysis.signal.toLowerCase()}`}>{analysis.signal}</p>
          </div>
          <div>
            <p className="label">Confidence</p>
            <p className="value">{analysis.confidence}%</p>
          </div>
        </article>

        <article className="trade-plan">
          <h2>Trade plan</h2>
          <ul>
            <li>
              <strong>Entry:</strong> {analysis.plan.entry}
            </li>
            <li>
              <strong>Stop Loss:</strong> {analysis.plan.stopLoss}
            </li>
            <li>
              <strong>Take Profit:</strong> {analysis.plan.takeProfit}
            </li>
            <li>
              <strong>RSI:</strong> {pairData.rsi}
            </li>
            <li>
              <strong>Trend:</strong> {pairData.trend}
            </li>
          </ul>
        </article>

        <p className="disclaimer">
          Educational demo only. This does not guarantee profit and is not financial advice.
        </p>
      </section>
    </main>
  );
}

export default App;
