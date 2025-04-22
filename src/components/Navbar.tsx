import { Button } from "@/components/ui/button"

export function Navbar() {
  return (
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
  )
} 