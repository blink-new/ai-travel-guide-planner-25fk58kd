export interface Place {
  id: string
  name: string
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
  photos: string[]
  rating: number
  category: string
}

export interface Attraction {
  id: string
  name: string
  description: string
  distance: string
  rating: number
  photo: string
  category: string
}

export interface FoodRecommendation {
  id: string
  name: string
  cuisine: string
  description: string
  rating: number
  priceRange: string
  photo: string
  distance: string
}

export interface TripPlan {
  destination: string
  duration: string
  highlights: string[]
  itinerary: {
    day: number
    activities: string[]
  }[]
  tips: string[]
}