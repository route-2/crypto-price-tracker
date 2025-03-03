---
id: api-integration
title: API Integration Details
---

# API Integration

We use **CoinGecko API** to fetch real-time cryptocurrency prices.

## 📌 Example API Call

```ts
const fetchCryptoPrices = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,dogecoin,solana");
  return res.json();
};

fetchCryptoPrices().then(data => console.log(data));
