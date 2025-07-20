import { Calendar, Clock, Lightbulb, CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { TripPlan } from '@/types/travel'

interface TripPlanSummaryProps {
  tripPlan: TripPlan | null
  loading?: boolean
}

export function TripPlanSummary({ tripPlan, loading }: TripPlanSummaryProps) {
  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">AI Trip Planning Summary</h3>
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!tripPlan) {
    return null
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">AI Trip Planning Summary</h3>
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Calendar className="h-5 w-5 text-blue-600" />
            {tripPlan.destination}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-600">
              Recommended duration: {tripPlan.duration}
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Highlights */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-600" />
              Must-See Highlights
            </h4>
            <div className="flex flex-wrap gap-2">
              {tripPlan.highlights.map((highlight, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                  {highlight}
                </Badge>
              ))}
            </div>
          </div>

          {/* Itinerary */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Suggested Itinerary</h4>
            <div className="space-y-3">
              {tripPlan.itinerary.map((day) => (
                <div key={day.day} className="border-l-2 border-blue-200 pl-4">
                  <h5 className="font-medium text-gray-900 mb-2">Day {day.day}</h5>
                  <ul className="space-y-1">
                    {day.activities.map((activity, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        {activity}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-500" />
              Travel Tips
            </h4>
            <ul className="space-y-2">
              {tripPlan.tips.map((tip, index) => (
                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="w-1 h-1 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}