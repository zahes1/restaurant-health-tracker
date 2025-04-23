import { Button } from "@/components/ui/button"
import { NutritionDialog } from "@/components/dialogs/NutritionDialog"

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  imageUrl?: string
}

interface MenuItemProps {
  item: MenuItem
}

export function MenuItem({ item }: MenuItemProps) {
  return (
    <div className="flex overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-1 flex-col p-4">
        <div className="flex justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-gray-500">{item.description}</p>
          </div>
          <div className="ml-4">
            <img
              src={item.imageUrl || "/placeholder.svg"}
              alt={item.name}
              className="h-20 w-20 rounded-md object-cover"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
          <NutritionDialog 
            itemName={item.name}
            trigger={
              <Button variant="ghost" size="sm" className="text-red-500">
                View
              </Button>
            }
          />
        </div>
      </div>
    </div>
  )
}