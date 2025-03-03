"use client"

import { useState, useEffect } from "react"
import { useQuery, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import axios from "axios"
import { Moon, Sun, RefreshCw, Search } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

interface Crypto {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  price_change_percentage_24h: number
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
        price_change_percentage: "24h",
      },
    })

    return res.data
  } catch (error) {
    console.error("Error fetching crypto data:", error)
    return []
  }
}


const queryClient = new QueryClient()


export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <CryptoTracker />
    </QueryClientProvider>
  )
}


function CryptoTracker() {
  const [search, setSearch] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    // Check for user's preferred color scheme
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["cryptoPrices"],
    queryFn: fetchCryptoPrices,
    staleTime: 1000 * 60, // Cache for 1 min
  })

  const filteredData = data?.filter((crypto) => crypto.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className={isDarkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200">
        <div className="container mx-auto p-6 max-w-3xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Crypto Price Tracker</h1>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>
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
            <div className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <Card key={i} className="border border-gray-200 dark:border-gray-800">
                  <CardContent className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                    <Skeleton className="h-4 w-20" />
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {isError && (
            <Card className="border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-900/20">
              <CardContent className="p-4 text-center text-red-600 dark:text-red-400">
                <p>Error fetching data. Please try again later.</p>
              </CardContent>
            </Card>
          )}

          {!isLoading && !isError && (
            <div className="space-y-3">
              {filteredData && filteredData.length > 0 ? (
                filteredData.map((crypto) => (
                  <Card
                    key={crypto.id}
                    className="border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow"
                    onClick={() => window.location.href = `/coin/${crypto.id}`}
                  >
                    <CardContent className="p-4 flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                          <img src={crypto.image || "/placeholder.svg"} alt={crypto.name} className="w-8 h-8" />
                        </div>
                        <div>
                          <p className="font-semibold">{crypto.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{crypto.symbol.toUpperCase()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">${crypto.current_price.toLocaleString()}</p>
                        <p
                          className={`text-xs ${
                            crypto.price_change_percentage_24h >= 0
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                          {crypto.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-8">
                  No cryptocurrencies found matching your search.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

