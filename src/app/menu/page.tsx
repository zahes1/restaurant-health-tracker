"use client"

import { useState } from "react"
import { Navbar } from "@/components/Navbar"
import { MenuItem as MenuItemComponent } from "@/components/MenuItem"

// Sample menu items data
const sampleMenuItems = [
  {
    id: "1",
    name: "Classic Burger",
    description: "Juicy beef patty with lettuce, tomato, and special sauce",
    price: 12.99,
    imageUrl: "/menu/burger.jpg"
  },
  {
    id: "2",
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on our house-made crust",
    price: 15.99,
    imageUrl: "/menu/pizza.jpg"
  },
  {
    id: "3",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing",
    price: 9.99,
    imageUrl: "/menu/salad.jpg"
  },
  {
    id: "4",
    name: "Grilled Salmon",
    description: "Fresh Atlantic salmon with lemon herb butter",
    price: 24.99,
    imageUrl: "/menu/salmon.jpg"
  }
]

export default function MenuPage() {



  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Menu Options</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleMenuItems.map((item) => (
            <MenuItemComponent
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </main>
    </div>
  )
}