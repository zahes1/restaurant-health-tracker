"use client"

import React, { useState } from "react"
import { Search, MapPin, ChevronRight, Apple, Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  const [address, setAddress] = useState("")

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would navigate to the results page with the address
    console.log("Address submitted:", address)
    // router.push(`/restaurants?address=${encodeURIComponent(address)}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-red-500">FoodFinder</div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              Sign In
            </Button>
            <Button size="sm" className="bg-red-500 hover:bg-red-600">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

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
              Enter your address to find restaurants that deliver to you
            </p>

            <form onSubmit={handleAddressSubmit} className="w-full max-w-xl">
              <Card className="shadow-lg">
                <CardContent className="p-4 px-">
                  <div className="flex flex-col md:flex-row gap-2">
                    <div className="relative flex-1">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        placeholder="Enter your address"
                        className="pl-10 h-12 text-black"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="h-12 bg-red-500 hover:bg-red-600 px-6">
                      Find Food
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
