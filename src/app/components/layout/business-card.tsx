import { Star, MapPin, Phone, DollarSign } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface BusinessCardProps {
  business: any
}

export function BusinessCard({ business }: BusinessCardProps) {
  // Function to render price indicators based on price level
  const renderPrice = (price: number | null) => {
    if (price === null) return "Price not available"

    return Array(price)
      .fill(0)
      .map((_, i) => <DollarSign key={i} className="h-4 w-4 inline-block text-green-600" />)
  }

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        <div className="flex mr-1">
          {Array(Math.floor(rating))
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            ))}
          {rating % 1 > 0 && <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 fill-[50%]" />}
          {Array(5 - Math.ceil(rating))
            .fill(0)
            .map((_, i) => (
              <Star key={i} className="h-4 w-4 text-gray-300" />
            ))}
        </div>
        <span className="text-sm text-gray-600">({rating})</span>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-auto relative">
          <img
            src={`${business.primary_photo.url_prefix}l${business.primary_photo.url_suffix}`}
            alt={business.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-bold">{business.name}</h3>
              <div className="flex items-center mt-1">
                {renderStars(business.avg_rating)}
                <span className="ml-2 text-sm text-gray-600">{business.review_count} reviews</span>
              </div>
              <div className="mt-1 text-sm text-gray-600">
                {business.price !== null && <span className="mr-2">{renderPrice(business.price)}</span>}
                {business.categories.map((cat: any, i: number) => (
                  <span key={i}>
                    {cat.name}
                    {i < business.categories.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
              <span>{business.addresses.primary_language.long_form}</span>
            </div>
            {business.phone && (
              <div className="flex items-center gap-2 mt-1">
                <Phone className="h-4 w-4 text-gray-500" />
                <span>{business.localized_phone}</span>
              </div>
            )}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {business.photos.slice(0, 4).map((photo: any, i: number) => (
              <div key={i} className="w-16 h-16 rounded overflow-hidden">
                <img
                  src={`${photo.url_prefix}s${photo.url_suffix}`}
                  alt={`${business.name} photo ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
            {business.photo_count > 4 && (
              <div className="w-16 h-16 rounded overflow-hidden bg-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-600">+{business.photo_count - 4}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
