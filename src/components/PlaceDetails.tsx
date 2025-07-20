import { Star, MapPin, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Place } from '@/types/travel'

interface PlaceDetailsProps {
  place: Place
  onBack: () => void
}

export function PlaceDetails({ place, onBack }: PlaceDetailsProps) {
  return (
    <div className="space-y-6">
      <Button
        variant="ghost"
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to search
      </Button>

      <Card className="border-0 shadow-lg">
        <div className="relative h-64 md:h-80 overflow-hidden rounded-t-lg">
          <img
            src={place.photos[0] || '/api/placeholder/800/400'}
            alt={place.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge variant="secondary" className="bg-white/90 text-gray-800">
              {place.category}
            </Badge>
          </div>
        </div>
        
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {place.name}
              </CardTitle>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-medium text-gray-700">
                    {place.rating}
                  </span>
                </div>
                <span className="text-gray-400">•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    {place.location.address}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {place.description}
          </p>
          
          {place.photos.length > 1 && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-900 mb-3">More Photos</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {place.photos.slice(1, 4).map((photo, index) => (
                  <div key={index} className="relative h-24 overflow-hidden rounded-lg">
                    <img
                      src={photo}
                      alt={`${place.name} ${index + 2}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}