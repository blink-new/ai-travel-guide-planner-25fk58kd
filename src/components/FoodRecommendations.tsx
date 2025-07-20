import { Star, MapPin, DollarSign } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { FoodRecommendation } from '@/types/travel'

interface FoodRecommendationsProps {
  recommendations: FoodRecommendation[]
  loading?: boolean
}

export function FoodRecommendations({ recommendations, loading }: FoodRecommendationsProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Food Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border-0 shadow-md">
              <div className="h-32 bg-gray-200 animate-pulse rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-3/4" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No food recommendations found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Food Recommendations</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((restaurant) => (
          <Card key={restaurant.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-32 overflow-hidden rounded-t-lg">
              <img
                src={restaurant.photo || '/api/placeholder/400/200'}
                alt={restaurant.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                  {restaurant.cuisine}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 line-clamp-1">
                  {restaurant.name}
                </h4>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {restaurant.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {restaurant.distance}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-600">
                    {restaurant.priceRange}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                {restaurant.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}