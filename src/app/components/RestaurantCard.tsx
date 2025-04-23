import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

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
  menu_photos?: Array<{
    id: string
    business_id: string
  }>
  categories: Array<{
    name: string
    category_filter: string
    is_restaurant: boolean
  }>
}

interface RestaurantCardProps {
  restaurant: Restaurant
}

export function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const router = useRouter()
  console.log("Restaurant:", restaurant)
  const businessId = restaurant.menu_photos?.[0]?.business_id || restaurant.id

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img
          src={restaurant.photo_url || "/placeholder-restaurant.jpg"}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-yellow-500">★</span>
          <span>{restaurant.avg_rating} ({restaurant.review_count} reviews)</span>
        </div>
        <p className="text-gray-600 mb-2">{restaurant.localized_price || "Price not available"}</p>
        <p className="text-gray-600">
          {restaurant.address1}, {restaurant.city}, {restaurant.state} {restaurant.zip}
        </p>
        <div className="flex flex-wrap gap-2 mt-2">
          {restaurant.categories.map((category) => (
            <span
              key={category.name}
              className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm"
            >
              {category.name}
            </span>
          ))}
        </div>
        <Button 
          variant="outline" 
          className="mt-4 text-red-500 border-red-500 hover:bg-red-50"
          onClick={() => router.push(`/menu?business_id=${businessId}`)}
        >
          View Menu
        </Button>
      </CardContent>
    </Card>
  )
} 