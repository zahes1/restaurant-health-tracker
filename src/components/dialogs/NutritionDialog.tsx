import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface NutritionDialogProps {
  itemName: string
  trigger: React.ReactNode
}

export function NutritionDialog({ itemName, trigger }: NutritionDialogProps) {
  const [nutritionData, setNutritionData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  // TODO: Replace this with actual API call
  const fetchNutritionData = async () => {
    setLoading(true)
    try {
      // Mock data for now - replace with API call
      const mockData = {
        food_name: itemName,
        brand_name: "Restaurant Brand",
        serving_qty: 1,
        serving_unit: "serving",
        serving_weight_grams: 250,
        nf_metric_qty: 250,
        nf_metric_uom: "g",
        nf_calories: 500,
        nf_total_fat: 20,
        nf_saturated_fat: 8,
        nf_cholesterol: 50,
        nf_sodium: 800,
        nf_total_carbohydrate: 45,
        nf_dietary_fiber: 3,
        nf_sugars: 12,
        nf_protein: 25,
        nf_potassium: 400,
        nix_item_id: "mock_id",
        nix_brand_id: "restaurant_brand",
        updated_at: new Date().toISOString(),
        nf_ingredient_statement: "Sample ingredients list",
        photo: {
          thumb: "https://example.com/thumb.jpg",
          highres: "https://example.com/highres.jpg",
          is_user_uploaded: false
        }
      }
      setNutritionData(mockData)
    } catch (error) {
      console.error("Error fetching nutrition data:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog onOpenChange={(open) => {
      if (open) {
        fetchNutritionData()
      }
    }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-4">
            {nutritionData?.photo?.thumb && (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                <img
                  src={nutritionData.photo.thumb}
                  alt={itemName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div>
              {itemName}
              {nutritionData?.brand_name && (
                <div className="text-sm text-muted-foreground mt-1">
                  {nutritionData.brand_name}
                </div>
              )}
            </div>
          </DialogTitle>
          {loading ? (
            <div className="text-center py-8">Loading nutrition information...</div>
          ) : nutritionData ? (
            <div className="grid gap-6">
              <div>
                <h3 className="font-semibold mb-2">Serving Information</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Serving Size:</span>
                    <span>
                      {nutritionData.serving_qty} {nutritionData.serving_unit} ({nutritionData.serving_weight_grams}g)
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Metric:</span>
                    <span>
                      {nutritionData.nf_metric_qty} {nutritionData.nf_metric_uom}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Nutrition Facts</h3>
                <div className="border rounded-md p-4 bg-card">
                  <div className="text-xl font-bold mb-1">Nutrition Facts</div>
                  <div className="text-sm mb-2">
                    Serving Size {nutritionData.serving_qty} {nutritionData.serving_unit} ({nutritionData.serving_weight_grams}g)
                  </div>
                  <Separator className="my-2" />

                  <div className="font-bold">Amount Per Serving</div>
                  <div className="flex justify-between py-1 font-bold text-lg">
                    <span>Calories</span>
                    <span>{nutritionData.nf_calories}</span>
                  </div>

                  <Separator className="my-2" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-bold">Total Fat</span>
                      <span>{nutritionData.nf_total_fat}g</span>
                    </div>

                    {nutritionData.nf_saturated_fat !== null && (
                      <div className="flex justify-between pl-4">
                        <span>Saturated Fat</span>
                        <span>{nutritionData.nf_saturated_fat}g</span>
                      </div>
                    )}

                    {nutritionData.nf_cholesterol !== null && (
                      <div className="flex justify-between">
                        <span className="font-bold">Cholesterol</span>
                        <span>{nutritionData.nf_cholesterol}mg</span>
                      </div>
                    )}

                    {nutritionData.nf_sodium !== null && (
                      <div className="flex justify-between">
                        <span className="font-bold">Sodium</span>
                        <span>{nutritionData.nf_sodium}mg</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="font-bold">Total Carbohydrate</span>
                      <span>{nutritionData.nf_total_carbohydrate}g</span>
                    </div>

                    {nutritionData.nf_dietary_fiber !== null && (
                      <div className="flex justify-between pl-4">
                        <span>Dietary Fiber</span>
                        <span>{nutritionData.nf_dietary_fiber}g</span>
                      </div>
                    )}

                    {nutritionData.nf_sugars !== null && (
                      <div className="flex justify-between pl-4">
                        <span>Sugars</span>
                        <span>{nutritionData.nf_sugars}g</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span className="font-bold">Protein</span>
                      <span>{nutritionData.nf_protein}g</span>
                    </div>

                    {nutritionData.nf_potassium !== null && (
                      <div className="flex justify-between">
                        <span className="font-bold">Potassium</span>
                        <span>{nutritionData.nf_potassium}mg</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {nutritionData.nf_ingredient_statement && (
                <div>
                  <h3 className="font-semibold mb-2">Ingredients</h3>
                  <p className="text-sm text-muted-foreground">
                    {nutritionData.nf_ingredient_statement}
                  </p>
                </div>
              )}

              <div className="text-xs text-muted-foreground">
                Last updated: {new Date(nutritionData.updated_at).toLocaleDateString()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-red-500">Failed to load nutrition information</div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}