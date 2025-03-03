"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


interface Crypto {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
}


const fetchCryptoPrices = async (): Promise<Crypto[]> => {
  try {
    const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
      params: {
        vs_currency: "usd",
        ids: "bitcoin,ethereum,cardano,dogecoin,solana",
        order: "market_cap_desc",
        per_page: 5,
        page: 1,
        sparkline: false,
      },
    });

    return res.data; 
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    return [];
  }
};

export default function Home() {
  const [search, setSearch] = useState("");
  
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 1000 * 60, // Cache for 1 min
  });

  if (isLoading) return <div className="flex justify-center mt-10">Loading...</div>;
  if (isError) return <div className="flex justify-center mt-10 text-red-500">Error fetching data</div>;

  const filteredData = data?.filter((crypto: any) =>
    crypto.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-4">Crypto Price Tracker</h1>


      <input
        type="text"
        placeholder="Search Cryptocurrency..."
        className="border p-2 rounded-md w-full max-w-md block mx-auto"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

  
      <button
        onClick={() => refetch()}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition block mx-auto"
      >
        Refresh
      </button>

    
      <div className="mt-6">
        {filteredData.map((crypto: any) => (
          <div key={crypto.id} className="border p-4 rounded-md flex justify-between items-center mb-2">
            <div className="flex items-center gap-4">
              <img src={crypto.image} alt={crypto.name} className="w-8 h-8" />
              <span className="font-semibold">{crypto.name} ({crypto.symbol.toUpperCase()})</span>
            </div>
            <span className="text-green-600 font-bold">${crypto.current_price.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}