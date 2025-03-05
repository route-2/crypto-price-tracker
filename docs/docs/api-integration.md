---
id: api-integration
title: API Integration Details
---

# API Integration

We use **CoinGecko API** to fetch real-time cryptocurrency prices and historical data.

## 📌 Example API Call

### Fetch Latest Market Prices
```ts
const fetchCryptoPrices = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,dogecoin,solana");
  return res.json();
};

fetchCryptoPrices().then(data => console.log(data));
```

### Fetch 1-Week Price Chart Data
```ts
const fetchCryptoChartData = async (coinId: string) => {
  const res = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=daily`);
  return res.json();
};

fetchCryptoChartData("bitcoin").then(data => console.log(data));
```

## 📊 **Graph Visualization**
- Clicking on a cryptocurrency displays a **Graph of 1 Week's Performance**.
- Built with **react-chartjs-2** for interactive and smooth data visualization.
- Provides insights into **price trends** with real-time updates.
