import { Star, MapPin } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Place } from '@/types/travel'

interface PlaceCardProps {
  place: Place
  onClick: () => void
}

export function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] border-0 shadow-md"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <img
          src={place.photos[0] || '/api/placeholder/400/300'}
          alt={place.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-gray-800">
            {place.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">
            {place.name}
          </h3>
          <div className="flex items-center gap-1 ml-2">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700">
              {place.rating}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <MapPin className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-600 line-clamp-1">
            {place.location.address}
          </span>
        </div>
        <p className="text-sm text-gray-600 line-clamp-2">
          {place.description}
        </p>
      </CardContent>
    </Card>
  )
}