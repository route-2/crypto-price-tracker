---
id: challenges
title: Challenges & Solutions
---

# Challenges & Solutions

## Tailwind CSS Breaking
**Problem** Tailwind V4 no longer requires @tailwind base; or @tailwind utilities; explicitely in globals.css.

**Solution** Removed @tailwind base; and tailwind @utilities; The new version automatically includes those styles when I import @tailwindcss; in globals.css.

## API Rate Limits
**Problem:** CoinGecko has rate limits that **restricted frequent requests**, especially when refreshing data manually.

**Solution:** Used React Query caching to minimise redundant API Calls.

```ts
useQuery({
  queryKey: ["cryptoPrices"],
  queryFn: fetchCryptoPrices,
  staleTime: 60000, // Cache for 1 min
});



