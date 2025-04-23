import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface NutrientInfo {
  name: string;
  unit: string;
  dailyValue: number;
}

const NUTRIENT_INFO: Record<number, NutrientInfo> = {
  301: { name: 'Calcium', unit: 'mg', dailyValue: 1300 },
  303: { name: 'Iron', unit: 'mg', dailyValue: 18 },
  304: { name: 'Magnesium', unit: 'mg', dailyValue: 420 },
  306: { name: 'Potassium', unit: 'mg', dailyValue: 4700 },
  318: { name: 'Vitamin A', unit: 'IU', dailyValue: 5000 },
  401: { name: 'Vitamin C', unit: 'mg', dailyValue: 90 },
  415: { name: 'Vitamin B6', unit: 'mg', dailyValue: 1.7 },
  418: { name: 'Vitamin B12', unit: 'µg', dailyValue: 2.4 },
  323: { name: 'Vitamin E', unit: 'mg', dailyValue: 15 },
  324: { name: 'Vitamin D', unit: 'IU', dailyValue: 800 },
};

interface NutritionDialogProps {
  itemName: string
  trigger: React.ReactNode
}

export function NutritionDialog({ itemName, trigger }: NutritionDialogProps) {
  const [nutritionData, setNutritionData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const fetchNutritionData = async () => {
    setLoading(true)
    try {
      const response = await fetch(`https://trackapi.nutritionix.com/v2/search/instant/?query=${encodeURIComponent(itemName)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': 'a9e80ada',
          'x-app-key': process.env.NEXT_PUBLIC_NUTRITION_API_KEY || '',
          'x-remote-user-id': '0'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch nutrition data');
      }

      const data = await response.json();
      const firstItem = data.common?.[0] || data.branded?.[0];

      if (!firstItem) {
        throw new Error('No nutrition data found');
      }

      // Get detailed nutrition information for the first item
      const detailsResponse = await fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': 'a9e80ada',
          'x-app-key': process.env.NEXT_PUBLIC_NUTRITION_API_KEY || '',
          'x-remote-user-id': '0'
        },
        body: JSON.stringify({
          query: firstItem.food_name,
        }),
      });

      if (!detailsResponse.ok) {
        throw new Error('Failed to fetch detailed nutrition data');
      }

      const detailsData = await detailsResponse.json();
      const fullNutritionData = detailsData.foods[0];
      
      setNutritionData(fullNutritionData);
    } catch (error) {
      console.error("Error fetching nutrition data:", error);
      setNutritionData(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog onOpenChange={(open) => {
      if (open) {
        fetchNutritionData()
      }
    }}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md md:max-w-2xl max-h-[80vh] overflow-y-auto">
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
                
                {/* Add Alternative Serving Sizes */}
                {nutritionData.alt_measures && (
                  <div className="mt-2">
                    <span className="text-sm text-muted-foreground">Alternative Servings:</span>
                    <div className="grid grid-cols-2 gap-2 text-sm mt-1">
                      {nutritionData.alt_measures.map((measure: any, index: number) => (
                        measure.measure !== nutritionData.serving_unit && (
                          <div key={index} className="flex justify-between">
                            <span>1 {measure.measure}:</span>
                            <span>{measure.serving_weight}g</span>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                )}
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

                  <Separator className="my-2" />

                  {/* Add Vitamins and Minerals Section */}
                  <div className="font-bold mt-4 mb-2">Vitamins and Minerals</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {nutritionData.full_nutrients?.map((nutrient: { attr_id: number; value: number }) => {
                      const nutrientInfo = NUTRIENT_INFO[nutrient.attr_id];
                      const colors = {
                        301: "bg-blue-500", // Calcium
                        303: "bg-red-500",  // Iron
                        304: "bg-green-500", // Magnesium
                        306: "bg-purple-500", // Potassium
                        318: "bg-orange-500", // Vitamin A
                        401: "bg-yellow-500", // Vitamin C
                        415: "bg-pink-500",  // Vitamin B6
                        418: "bg-indigo-500", // Vitamin B12
                        323: "bg-teal-500",  // Vitamin E
                        324: "bg-cyan-500",  // Vitamin D
                      }[nutrient.attr_id] || "bg-gray-500";

                      if (nutrientInfo && nutrient.value > 0) {
                        const percentage = (nutrient.value / nutrientInfo.dailyValue) * 100;
                        return (
                          <div key={nutrient.attr_id} className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>{nutrientInfo.name}</span>
                              <span>
                                {nutrient.value.toFixed(1)}{nutrientInfo.unit} ({percentage.toFixed(1)}% DV)
                              </span>
                            </div>
                            <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${colors} transition-all duration-500 ease-in-out rounded-full`}
                                style={{ width: `${Math.min(percentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                </div>
              </div>

              {/* Add Macronutrient Distribution Pie Chart */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Macronutrient Distribution</h3>
                <div className="w-full max-w-xs mx-auto">
                  <Pie
                    data={{
                      labels: ['Protein', 'Carbohydrates', 'Fat'],
                      datasets: [
                        {
                          data: [
                            nutritionData.nf_protein * 4, // Protein (4 calories per gram)
                            nutritionData.nf_total_carbohydrate * 4, // Carbs (4 calories per gram)
                            nutritionData.nf_total_fat * 9, // Fat (9 calories per gram)
                          ],
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.8)',
                            'rgba(54, 162, 235, 0.8)',
                            'rgba(255, 206, 86, 0.8)',
                          ],
                          borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                          ],
                          borderWidth: 1,
                        },
                      ],
                    }}
                    options={{
                      plugins: {
                        legend: {
                          position: 'bottom' as const,
                        },
                        tooltip: {
                          callbacks: {
                            label: function(context) {
                              const label = context.label || '';
                              const value = Number(context.raw) || 0;
                              const total = (context.dataset.data as number[]).reduce((a, b) => a + b, 0);
                              const percentage = ((value / total) * 100).toFixed(1);
                              return `${label}: ${percentage}% (${Math.round(value)} cal)`;
                            }
                          }
                        }
                      },
                    }}
                  />
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
            </div>
          ) : (
            <div className="text-center py-8 text-red-500">Failed to load nutrition information</div>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}