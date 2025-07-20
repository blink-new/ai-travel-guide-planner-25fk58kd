import { useState, useEffect } from 'react'
import { Plane, Sparkles } from 'lucide-react'
import { blink } from '@/blink/client'
import { SearchBar } from '@/components/SearchBar'
import { PlaceCard } from '@/components/PlaceCard'
import { PlaceDetails } from '@/components/PlaceDetails'
import { AttractionsGrid } from '@/components/AttractionsGrid'
import { FoodRecommendations } from '@/components/FoodRecommendations'
import { TripPlanSummary } from '@/components/TripPlanSummary'
import { Place, Attraction, FoodRecommendation, TripPlan } from '@/types/travel'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [searchResults, setSearchResults] = useState<Place[]>([])
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null)
  const [attractions, setAttractions] = useState<Attraction[]>([])
  const [foodRecommendations, setFoodRecommendations] = useState<FoodRecommendation[]>([])
  const [tripPlan, setTripPlan] = useState<TripPlan | null>(null)
  const [searchLoading, setSearchLoading] = useState(false)
  const [detailsLoading, setDetailsLoading] = useState(false)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  const handleSearch = async (query: string) => {
    setSearchLoading(true)
    setSelectedPlace(null)
    setSearchResults([])
    
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Search for travel destinations matching "${query}". Generate 6 diverse and interesting places that match the search query. Use real Unsplash photo URLs that match each destination. Make the descriptions engaging and informative.`,
        schema: {
          type: 'object',
          properties: {
            places: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                  description: { type: 'string' },
                  location: {
                    type: 'object',
                    properties: {
                      lat: { type: 'number' },
                      lng: { type: 'number' },
                      address: { type: 'string' }
                    },
                    required: ['lat', 'lng', 'address']
                  },
                  photos: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  rating: { type: 'number' },
                  category: { type: 'string' }
                },
                required: ['id', 'name', 'description', 'location', 'photos', 'rating', 'category']
              }
            }
          },
          required: ['places']
        },
        model: 'gpt-4o-mini'
      })
      
      setSearchResults(object.places)
    } catch (error) {
      console.error('Search error:', error)
      // Fallback mock data
      setSearchResults([
        {
          id: '1',
          name: 'Santorini, Greece',
          description: 'A stunning Greek island known for its white-washed buildings, blue domes, and breathtaking sunsets over the Aegean Sea.',
          location: {
            lat: 36.3932,
            lng: 25.4615,
            address: 'Santorini, Greece'
          },
          photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'],
          rating: 4.8,
          category: 'Island'
        }
      ])
    } finally {
      setSearchLoading(false)
    }
  }

  const handlePlaceSelect = async (place: Place) => {
    setSelectedPlace(place)
    setDetailsLoading(true)
    setAttractions([])
    setFoodRecommendations([])
    setTripPlan(null)

    try {
      // Generate attractions, food recommendations, and trip plan in parallel
      const [attractionsResponse, foodResponse, tripPlanResponse] = await Promise.all([
        blink.ai.generateObject({
          prompt: `Generate 6 nearby attractions for ${place.name}. Include diverse types like museums, parks, historic sites, viewpoints, etc. Use real Unsplash photo URLs that match each attraction.`,
          schema: {
            type: 'object',
            properties: {
              attractions: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    description: { type: 'string' },
                    distance: { type: 'string' },
                    rating: { type: 'number' },
                    photo: { type: 'string' },
                    category: { type: 'string' }
                  },
                  required: ['id', 'name', 'description', 'distance', 'rating', 'photo', 'category']
                }
              }
            },
            required: ['attractions']
          },
          model: 'gpt-4o-mini'
        }),
        blink.ai.generateObject({
          prompt: `Generate 4 food recommendations for ${place.name}. Include diverse cuisine types and price ranges. Use real Unsplash food/restaurant photo URLs.`,
          schema: {
            type: 'object',
            properties: {
              restaurants: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    cuisine: { type: 'string' },
                    description: { type: 'string' },
                    rating: { type: 'number' },
                    priceRange: { type: 'string' },
                    photo: { type: 'string' },
                    distance: { type: 'string' }
                  },
                  required: ['id', 'name', 'cuisine', 'description', 'rating', 'priceRange', 'photo', 'distance']
                }
              }
            },
            required: ['restaurants']
          },
          model: 'gpt-4o-mini'
        }),
        blink.ai.generateObject({
          prompt: `Create a detailed trip plan for ${place.name}. Include a realistic duration, key highlights, day-by-day itinerary, and practical travel tips.`,
          schema: {
            type: 'object',
            properties: {
              destination: { type: 'string' },
              duration: { type: 'string' },
              highlights: {
                type: 'array',
                items: { type: 'string' }
              },
              itinerary: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    day: { type: 'number' },
                    activities: {
                      type: 'array',
                      items: { type: 'string' }
                    }
                  },
                  required: ['day', 'activities']
                }
              },
              tips: {
                type: 'array',
                items: { type: 'string' }
              }
            },
            required: ['destination', 'duration', 'highlights', 'itinerary', 'tips']
          },
          model: 'gpt-4o-mini'
        })
      ])

      setAttractions(attractionsResponse.object.attractions)
      setFoodRecommendations(foodResponse.object.restaurants)
      setTripPlan(tripPlanResponse.object)
    } catch (error) {
      console.error('Details error:', error)
      // Fallback mock data
      setAttractions([
        {
          id: '1',
          name: 'Local Museum',
          description: 'A fascinating museum showcasing local history and culture.',
          distance: '0.5 km',
          rating: 4.3,
          photo: 'https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=400',
          category: 'Museum'
        }
      ])
      setFoodRecommendations([
        {
          id: '1',
          name: 'Local Taverna',
          cuisine: 'Mediterranean',
          description: 'Authentic local cuisine with fresh ingredients.',
          rating: 4.6,
          priceRange: '$$',
          photo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400',
          distance: '0.3 km'
        }
      ])
      setTripPlan({
        destination: place.name,
        duration: '3-4 days',
        highlights: ['Scenic views', 'Local culture', 'Historic sites'],
        itinerary: [
          {
            day: 1,
            activities: ['Arrival and check-in', 'Explore city center', 'Welcome dinner']
          }
        ],
        tips: ['Book accommodations early', 'Try local specialties', 'Bring comfortable shoes']
      })
    } finally {
      setDetailsLoading(false)
    }
  }

  const handleBack = () => {
    setSelectedPlace(null)
    setAttractions([])
    setFoodRecommendations([])
    setTripPlan(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Plane className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">AI Travel Guide</h1>
          <p className="text-gray-600">Please sign in to start planning your trip</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Plane className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AI Travel Guide</h1>
                <p className="text-sm text-gray-600">Discover amazing destinations with AI</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedPlace ? (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-6">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Plan Your Perfect Trip
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover amazing destinations, find nearby attractions, get food recommendations, 
                  and receive AI-powered trip planning summaries.
                </p>
              </div>
              <SearchBar onSearch={handleSearch} loading={searchLoading} />
            </div>

            {/* Search Results */}
            {searchLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md">
                    <div className="h-48 bg-gray-200 animate-pulse rounded-t-lg" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded" />
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-semibold text-gray-900">Search Results</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {searchResults.map((place) => (
                    <PlaceCard
                      key={place.id}
                      place={place}
                      onClick={() => handlePlaceSelect(place)}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-8">
            <PlaceDetails place={selectedPlace} onBack={handleBack} />
            <AttractionsGrid attractions={attractions} loading={detailsLoading} />
            <FoodRecommendations recommendations={foodRecommendations} loading={detailsLoading} />
            <TripPlanSummary tripPlan={tripPlan} loading={detailsLoading} />
          </div>
        )}
      </main>
    </div>
  )
}

export default App