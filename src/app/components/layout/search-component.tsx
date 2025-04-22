import { Search, MapPin, Filter, Clock, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function Home() {
  const hardcodedCuisineTypes = ["all", "italian", "chinese", "mexican", "indian"]
  const hardcodedSelectedCuisine = "all"
  const hardcodedPriceRange = [30]
  const hardcodedDeliveryTime = "30"
  const hardcodedSortBy = "recommended"
  const hardcodedSortedRestaurants = [
    { id: 1, name: "Restaurant 1" },
    { id: 2, name: "Restaurant 2" },
    { id: 3, name: "Restaurant 3" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container px-4 py-4 mx-auto">
          <div className="flex items-center justify-between">
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
        </div>
      </header>

      <main className="container px-4 py-6 mx-auto">
        <div className="flex flex-col gap-6">
          {/* Search and Location Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for food, cuisines, restaurants..."
                className="pl-10"
                defaultValue=""
              />
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-red-500" />
              <span className="font-medium">New York, NY</span>
              <Button variant="link" size="sm" className="text-red-500 p-0">
                Change
              </Button>
            </div>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Refine your restaurant search</SheetDescription>
                  </SheetHeader>
                  <div className="grid gap-6 py-6">
                    <div>
                      <h3 className="mb-4 text-sm font-medium">Cuisine</h3>
                      <div className="flex flex-wrap gap-2">
                        {hardcodedCuisineTypes.map((cuisine) => (
                          <Badge
                            key={cuisine}
                            variant={hardcodedSelectedCuisine === cuisine ? "default" : "outline"}
                            className={
                              hardcodedSelectedCuisine === cuisine
                                ? "bg-red-500 hover:bg-red-600 cursor-pointer"
                                : "cursor-pointer"
                            }
                          >
                            {cuisine === "all" ? "All Cuisines" : cuisine.charAt(0).toUpperCase() + cuisine.slice(1)}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-4 text-sm font-medium">Price Range (1-5)</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[50]}
                          max={50}
                          step={10}
                          value={hardcodedPriceRange}
                          className="py-4"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>$</span>
                          <span>$$$$$</span>
                        </div>
                        <div className="mt-2 text-sm">Max Price Level: {hardcodedPriceRange[0] / 10}</div>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-4 text-sm font-medium">Max Delivery Time</h3>
                      <Select defaultValue={hardcodedDeliveryTime}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select delivery time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">Any time</SelectItem>
                          <SelectItem value="15">15 minutes</SelectItem>
                          <SelectItem value="30">30 minutes</SelectItem>
                          <SelectItem value="45">45 minutes</SelectItem>
                          <SelectItem value="60">60 minutes</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button
                      className="mt-4 bg-red-500 hover:bg-red-600"
                    >
                      Reset Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>

              <Select defaultValue={hardcodedSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="deliveryTime">Fastest Delivery</SelectItem>
                  <SelectItem value="priceAsc">Price: Low to High</SelectItem>
                  <SelectItem value="priceDesc">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2">
                <Badge variant="outline" className="gap-1">
                  <Clock className="h-3 w-3" /> Under 30 min
                </Badge>
                <Badge variant="outline" className="gap-1">
                  <Star className="h-3 w-3" /> 4.5+
                </Badge>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-500">{hardcodedSortedRestaurants.length} restaurants found</div>

          {/* Restaurant Grid
          {hardcodedSortedRestaurants.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {hardcodedSortedRestaurants.map((restaurant) => (
                <RestaurantCard key={restaurant.id} restaurant={restaurant} />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="text-lg font-medium">No restaurants found</div>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )} */}
        </div>
      </main>
    </div>
  )
}
