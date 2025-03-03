---
id: state-management
title: State Management
---

# State Management Approach

I use **React Query** for API data fetching, caching, and re-fetching.

## Why React Query?
- **Automatic caching** of API responses, Prevents unnecessary caching.
- **Efficient re-fetching** on demand, Fetches fresh Data only when needed.
- **Built-in error handling** Provides automatic retry mechanisms.

## How It Works

When the page loads, **React Query**:
- Checks if cached data exists and is still valid.
- If not, it fetches fresh data from **CoinGecko API**.
- Stores the response in cache for **future use**.

## Refetching Strategy

**React Query** automatically refetches data:

- When the user clicks the "Refresh" button.
- When the app detects a network reconnection.
- After the cache becomes stale (1 minute in our case).