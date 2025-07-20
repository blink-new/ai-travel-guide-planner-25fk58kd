import { Star, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Attraction } from '@/types/travel'

interface AttractionsGridProps {
  attractions: Attraction[]
  loading?: boolean
}

export function AttractionsGrid({ attractions, loading }: AttractionsGridProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Nearby Attractions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="border-0 shadow-md">
              <div className="h-32 bg-gray-200 animate-pulse rounded-t-lg" />
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 bg-gray-200 animate-pulse rounded mb-2" />
                <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (attractions.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No nearby attractions found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">Nearby Attractions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attractions.map((attraction) => (
          <Card key={attraction.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
            <div className="relative h-32 overflow-hidden rounded-t-lg">
              <img
                src={attraction.photo || '/api/placeholder/300/200'}
                alt={attraction.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                <Badge variant="secondary" className="bg-white/90 text-gray-800 text-xs">
                  {attraction.category}
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-gray-900 line-clamp-1 text-sm">
                  {attraction.name}
                </h4>
                <div className="flex items-center gap-1 ml-2">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-gray-700">
                    {attraction.rating}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-2">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-600">
                  {attraction.distance}
                </span>
              </div>
              <p className="text-xs text-gray-600 line-clamp-2">
                {attraction.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}