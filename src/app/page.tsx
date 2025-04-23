"use client"

import React, { useState } from "react"
import { Search, MapPin, ChevronRight, Apple, Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/Navbar"

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
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
          <div className="relative h-[1000px] md:h-[600px]">
            <Image src="/01.png" alt="Delicious food spread" fill priority className="object-cover" />
          </div>
          <div className="absolute inset-0 z-20 flex flex-col items-start ml-10 justify-center text-white px-4">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 max-w-2xl">
              Explore Healthy food from your favorite restaurants
            </h1>
            <p className="text-lg md:text-xl mb-8 max-w-2xl">
              Enter your address to find restaurants in your area
            </p>

            <form onSubmit={handleAddressSubmit} className="w-full max-w-xl">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-4">
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

        {/* Health Importance Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">The Importance of Healthy Eating</h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <p className="text-lg mb-4 text-gray-700">
                  In today's fast-paced world, it's easy to overlook the importance of maintaining a healthy diet. However, the food choices we make every day have a profound impact on our overall well-being and quality of life.
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  Eating a balanced diet rich in fruits, vegetables, whole grains, and lean proteins can:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  <li>Boost your energy levels and productivity</li>
                  <li>Improve your mental health and reduce stress</li>
                  <li>Strengthen your immune system</li>
                  <li>Help maintain a healthy weight</li>
                  <li>Reduce the risk of chronic diseases</li>
                </ul>
              </div>
              <div className="md:w-1/2">
                <p className="text-lg mb-4 text-gray-700">
                  A healthy diet is not just about losing weight or looking good. It's about nourishing your body with the right nutrients to function optimally. When you eat well, you feel better, think clearer, and have more energy to tackle your daily tasks.
                </p>
                <p className="text-lg mb-4 text-gray-700">
                  Moreover, good nutrition plays a crucial role in preventing various health issues. From heart disease to diabetes, many chronic conditions can be managed or even prevented through proper diet and lifestyle choices.
                </p>
                <p className="text-lg mt-4 text-gray-700">
                  With Nutri Checker, you can easily find nutritious options from your favorite local restaurants, making it simpler than ever to maintain a healthy lifestyle without sacrificing taste or convenience. Our app empowers you to make informed decisions about your meals, helping you stay on track with your health goals even when dining out.
                </p>
              </div>
            </div>
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
