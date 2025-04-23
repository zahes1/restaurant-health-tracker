"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Navbar } from "@/components/Navbar"
import { MenuItem as MenuItemComponent } from "@/components/MenuItem"

interface MenuItem {
  "Food Name": string;
  Category: string;
  Details: string;
  Price: string;
  Photo: string;
}

interface MenuResponse {
  searched_id: string;
  response_code: number;
  menus: MenuItem[];
}

export default function MenuPage() {
  const searchParams = useSearchParams();
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      const businessId = searchParams.get('business_id');
      
      if (!businessId) {
        setError('Business ID is required');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`https://yelp-business-api.p.rapidapi.com/get_menus?business_id=${businessId}`, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY || "",
            "x-rapidapi-host": "yelp-business-api.p.rapidapi.com"
          }
        });
        if (!response.ok) {
          throw new Error('Failed to fetch menu items');
        }
        const data: MenuResponse = await response.json();
        setMenuItems(data.menus);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [searchParams]);

  // Group menu items by category
  const menuByCategory = menuItems.reduce((acc, item) => {
    if (!acc[item.Category]) {
      acc[item.Category] = [];
    }
    acc[item.Category].push(item);
    return acc;
  }, {} as Record<string, MenuItem[]>);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Menu Options</h1>
        {loading && (
          <div className="text-center">Loading menu items...</div>
        )}
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        {!loading && !error && (
          <div className="space-y-8">
            {Object.entries(menuByCategory).map(([category, items]) => (
              <div key={category}>
                <h2 className="text-2xl font-semibold mb-4">{category}</h2>
                <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {items.map((item, index) => (
                    <MenuItemComponent
                      key={`${category}-${index}`}
                      item={item}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}