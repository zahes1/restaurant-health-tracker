"use client"

import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import SearchComponent from "@/app/components/layout/search-component"
import { RestaurantCard } from "@/app/components/RestaurantCard"

interface Restaurant {
  id: string
  name: string
  alias: string
  address1: string
  address2: string
  address3: string
  city: string
  state: string
  zip: string
  country: string
  phone: string
  latitude: number
  longitude: number
  review_count: number
  avg_rating: number
  price: number
  localized_price: string
  photo_url?: string
  categories: Array<{
    name: string
    category_filter: string
    is_restaurant: boolean
  }>
}

interface Location {
  lat: number
  lng: number
  address: string
}

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export default function ResultsPage() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const locationData = localStorage.getItem("searchLocation")
        if (!locationData) {
          router.push("/")
          return
        }

        const location: Location = JSON.parse(locationData)
        console.log("Fetching restaurants for location:", location)

        // Build the URL with query parameters according to the RapidAPI format
        const baseUrl = "https://yelp-business-api.p.rapidapi.com/search"
        const queryParams = new URLSearchParams({
          location: location.address,
          search_term: "restaurants",
          limit: "10",
          offset: "0",
          business_details_type: "basic"
        }).toString()

        console.log("API Request Parameters:", {
          url: `${baseUrl}?${queryParams}`,
          location: location.address
        })

        const response = await fetch(`${baseUrl}?${queryParams}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
            "x-rapidapi-host": "yelp-business-api.p.rapidapi.com"
          }
        })

        if (response.status === 403) {
          throw new Error("Please subscribe to the Yelp Business API on RapidAPI before using this feature.")
        }

        if (response.status === 429) {
          throw new Error("Rate limit exceeded. Please try again in a few moments.")
        }

        if (!response.ok) {
          const errorText = await response.text()
          console.error("API Error Response:", errorText)
          throw new Error(`Failed to fetch restaurants (${response.status}): ${errorText}`)
        }

        const data = await response.json()
        console.log("API Response:", data)
        
        if (!data.business_search_result) {
          throw new Error(`No results returned from API for location: ${location.address}`)
        }

        setRestaurants(data.business_search_result)
        console.log("Restaurants data:", data.business_search_result)
      } catch (err) {
        console.error("Error fetching restaurants:", err)
        setError(err instanceof Error ? err.message : "An error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchRestaurants()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="mb-4">Loading restaurants...</div>
            <div className="text-sm text-gray-500">This might take a few seconds</div>
          </div>
        </main>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              {error.includes("subscribe") ? (
                <>
                  <div className="mb-2">{error}</div>
                  <a 
                    href="https://rapidapi.com/oneapiproject/api/yelp-business-api/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Click here to subscribe
                  </a>
                </>
              ) : (
                error
              )}
            </div>
            <button 
              onClick={() => router.push("/")}
              className="text-blue-500 hover:underline"
            >
              Try another location
            </button>
          </div>
        </main>
      </div>
    )
  }

  console.log("Rendering restaurants:", restaurants)

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <SearchComponent />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Restaurants Near {JSON.parse(localStorage.getItem("searchLocation") || "{}").address}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </main>
    </div>
  )
}
