"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { CategoryScale, Chart as ChartJS, LineElement, LinearScale, PointElement, Tooltip } from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);


interface CoinData {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: { current_price: { usd: number } };
}

export default function CoinPage() {
  const { id } = useParams();
  const [coinData, setCoinData] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<{ labels: string[]; datasets: any[] }>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (!id) return;

    // Fetch Coin Data
    const fetchCoinData = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        setCoinData(res.data);
      } catch (error) {
        console.error("Error fetching coin data:", error);
      }
    };

    // Fetch Chart Data (1-week price)
    const fetchChartData = async () => {
      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: "7", interval: "daily" },
        });

        const prices = res.data.prices;
        const labels = prices.map((price: any) => new Date(price[0]).toLocaleDateString());
        const data = prices.map((price: any) => price[1]);

        setChartData({
          labels,
          datasets: [
            {
              label: "Price (USD)",
              data,
              borderColor: "rgba(59, 130, 246, 1)", // Blue
              backgroundColor: "rgba(59, 130, 246, 0.2)",
              borderWidth: 2,
              pointRadius: 3,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchCoinData();
    fetchChartData();
  }, [id]);

  if (!coinData) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-900 text-white">
      <div className="flex items-center gap-4 mb-6">
        <img src={coinData.image.large} alt={coinData.name} className="w-16 h-16" />
        <h1 className="text-3xl font-bold">{coinData.name} ({coinData.symbol.toUpperCase()})</h1>
      </div>

      <p className="text-xl font-semibold mb-4">Current Price: ${coinData.market_data.current_price.usd.toLocaleString()}</p>

      <div className="bg-gray-800 p-6 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-3">📈 1-Week Price Chart</h2>
        <Line data={chartData} />
      </div>
    </div>
  );
}
