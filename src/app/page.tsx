"use client"

import React, { useState, useEffect } from "react"
import { MapPin, Crosshair } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { Navbar } from "@/components/Navbar"
import { useRouter } from "next/navigation"

declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

export default function Home() {
  const [address, setAddress] = useState("")
  const [autocomplete, setAutocomplete] = useState<any>(null)
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Define the callback function that will be called when the API loads
    window.initMap = () => {
      console.log("Google Places API loaded successfully")
      const input = document.getElementById("address-input") as HTMLInputElement
      if (input) {
        const autocomplete = new window.google.maps.places.Autocomplete(input, {
          types: ["geocode"], // This allows both cities and addresses
          componentRestrictions: { country: "us" }
        })
        setAutocomplete(autocomplete)

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace()
          console.log("Selected place:", place)
          if (place.geometry) {
            setSelectedPlace(place)
            setAddress(place.formatted_address)
          }
        })
      }
    }

    // Load Google Places API
    const script = document.createElement("script")
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`
    script.async = true
    script.defer = true
    document.head.appendChild(script)

    return () => {
      // Clean up
      document.head.removeChild(script)
      delete window.initMap
    }
  }, [])

  const handleUseMyLocation = () => {
    setIsLoadingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            console.log("Got user location:", { latitude, longitude })
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`
            )
            const data = await response.json()
            console.log("Geocoding response:", data)
            if (data.results && data.results[0]) {
              const formattedAddress = data.results[0].formatted_address
              setAddress(formattedAddress)
              setSelectedPlace({
                formatted_address: formattedAddress,
                geometry: {
                  location: {
                    lat: () => latitude,
                    lng: () => longitude
                  }
                }
              })
            }
          } catch (error) {
            console.error("Error getting address:", error)
            alert("Error getting your location. Please enter your address manually.")
          } finally {
            setIsLoadingLocation(false)
          }
        },
        (error) => {
          console.error("Error getting location:", error)
          alert("Error getting your location. Please enter your address manually.")
          setIsLoadingLocation(false)
        }
      )
    } else {
      alert("Geolocation is not supported by your browser. Please enter your address manually.")
      setIsLoadingLocation(false)
    }
  }

  const handleAddressSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedPlace) {
      alert("Please select a valid address from the suggestions")
      return
    }

    const location = {
      lat: selectedPlace.geometry.location.lat(),
      lng: selectedPlace.geometry.location.lng(),
      address: selectedPlace.formatted_address
    }
    console.log("Submitting location:", location)

    // Store the location in localStorage for the results page
    localStorage.setItem("searchLocation", JSON.stringify(location))
    
    // Navigate to results page instead of restaurants
    router.push("/results")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
          <div className="relative h-[500px] md:h-[600px]">
            <Image src="/hero-food-image.png" alt="Delicious food spread" fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-center mb-6">
              Food delivery and takeout from your favorite restaurants
            </h1>
            <p className="text-lg md:text-xl text-center mb-8 max-w-2xl">
              Enter your city or address to find restaurants that deliver to you
            </p>

            <form onSubmit={handleAddressSubmit} className="w-full max-w-xl">
              <Card className="shadow-lg">
                <CardContent className="p-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="address-input"
                          placeholder="Enter your city or address"
                          className="pl-10 h-12 text-black"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                      <Button type="submit" className="h-12 bg-red-500 hover:bg-red-600 px-6">
                        Find Food
                      </Button>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="h-12 border-white text-white hover:bg-white/10"
                      onClick={handleUseMyLocation}
                      disabled={isLoadingLocation}
                    >
                      <Crosshair className="mr-2 h-5 w-5" />
                      {isLoadingLocation ? "Getting Location..." : "Use My Location"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </section>
      </main>
    </div>
  )
}

// Sample cuisine data
const cuisines = [
  { name: "Pizza", image: "/cuisine-pizza.png" },
  { name: "Burgers", image: "/cuisine-burger.png" },
  { name: "Chinese", image: "/cuisine-chinese.png" },
  { name: "Italian", image: "/cuisine-italian.jpg" },
  { name: "Mexican", image: "/cuisine-mexican.jpg" },
  { name: "Sushi", image: "/cuisine-sushi.jpg" },
  { name: "Indian", image: "/cuisine-indian.jpg" },
  { name: "Thai", image: "/cuisine-thai.jpg" },
  { name: "Dessert", image: "/cuisine-dessert.jpg" },
  { name: "Healthy", image: "/cuisine-healthy.jpg" },
  { name: "Breakfast", image: "/cuisine-breakfast.jpg" },
  { name: "Vegan", image: "/cuisine-vegan.jpg" },
]
