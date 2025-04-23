import { Button } from "@/components/ui/button"
import { NutritionDialog } from "@/components/dialogs/NutritionDialog"

export interface MenuItem {
  "Food Name": string
  "Category": string
  "Details": string
  "Price": string
  "Photo": string
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
            <div className="mb-1">
              <span className="text-xs font-medium text-gray-500">{item.Category}</span>
            </div>
            <h3 className="font-medium text-gray-900">{item["Food Name"]}</h3>
            {item.Details && (
              <p className="mt-1 line-clamp-2 text-sm text-gray-500">{item.Details}</p>
            )}
          </div>
          <div className="ml-4">
            <img
              src={item.Photo || "/placeholder.svg"}
              alt={item["Food Name"]}
              className="h-20 w-20 rounded-md object-cover"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <span className="font-medium text-gray-900">{item.Price}</span>
          <NutritionDialog 
            itemName={item["Food Name"]}
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