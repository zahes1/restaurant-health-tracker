import React, { useState, useEffect } from "react"
import { MapPin } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const SearchComponent: React.FC = () => {
  const [address, setAddress] = useState("")
  const router = useRouter()

  useEffect(() => {
    const storedLocation = localStorage.getItem("searchLocation")
    if (storedLocation) {
      const { address } = JSON.parse(storedLocation)
      setAddress(address)
    }
  }, [])

  const handleChangeLocation = () => {
    router.push("/")
  }

  return (
    <div className="bg-gray-50 py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4">
          {/* Search and Location Bar */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-red-500" />
              <Input
                value={address}
                className="pl-10"
                disabled
              />
            </div>
            <Button 
              variant="link" 
              size="sm" 
              className="text-red-500 p-0"
              onClick={handleChangeLocation}
            >
              Change
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchComponent
