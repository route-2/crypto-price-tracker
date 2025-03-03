"use client";

import { useState } from "react";
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Search, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const queryClient = new QueryClient();

const fetchCryptoData = async (filter: string) => {
  try {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        order: filter,
        per_page: 5,
        page: 1,
        sparkline: false,
        price_change_percentage: "24h",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};

function CryptoTracker() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("market_cap_desc");
  
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["cryptoData", filter],
    queryFn: () => fetchCryptoData(filter),
    staleTime: 60000,
  });

  const filteredData = data?.filter((crypto: any) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
      <div className="container mx-auto p-6 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Crypto Price Tracker</h1>
        
        <div className="flex gap-4 mb-6">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 p-2 rounded"
          >
            <option value="market_cap_desc">Market Cap</option>
            <option value="volume_desc">Trades (24h Volume)</option>
            <option value="ath">All-Time High (ATH)</option>
          </select>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search cryptocurrency..."
            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <Button
            onClick={() => refetch()}
            className="w-full mb-8 bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Prices
              </>
            )}
          </Button>

        {isLoading && (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
        )}

        {isError && <p className="text-red-600 text-center">Error fetching data. Try again later.</p>}

        {!isLoading && !isError && (
          <div className="space-y-3">
            {filteredData?.length ? (
              filteredData.map((crypto: any) => (
                <Card key={crypto.id} className="border border-gray-200 dark:border-gray-800 hover:scale-105 transition-transform"
                onClick={() => window.location.href = `/coin/${crypto.id}`}>
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <img src={crypto.image} alt={crypto.name} className="w-8 h-8 rounded-full" />
                      <div>
                        <p className="font-semibold">{crypto.name}</p>
                        <p className="text-xs text-gray-500">{crypto.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">${crypto.current_price.toLocaleString()}</p>
                      <p className={`text-xs ${crypto.price_change_percentage_24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {crypto.price_change_percentage_24h?.toFixed(2)}%
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <p className="text-center text-gray-500">No cryptocurrencies found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CryptoTracker />
    </QueryClientProvider>
  );
}
