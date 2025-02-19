import { useState } from 'react'
import { X, Heart, Activity, Scissors, Award } from 'lucide-react'

// Mock function to fetch breed details - replace with actual API call in production
const fetchBreedDetails = async (breedId) => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Mock data
  return {
    id: breedId,
    name: 'Labrador Retriever',
    images: ['/placeholder.svg?height=300&width=300'],
    description: 'The Labrador Retriever is one of the most popular dog breeds in the world. Known for their friendly and outgoing personality, Labs are great family dogs and excellent with children.',
    origin: 'Newfoundland, Canada',
    lifeSpan: '10-12 years',
    temperament: ['Friendly', 'Active', 'Outgoing', 'Even Tempered', 'Intelligent'],
    healthIssues: ['Hip dysplasia', 'Elbow dysplasia', 'Progressive Retinal Atrophy (PRA)'],
    careInstructions: {
      exercise: 'High exercise needs. At least 1 hour of activity per day.',
      grooming: 'Regular brushing, occasional baths. Moderate shedding.',
      diet: 'High-quality dog food appropriate for age and activity level. Watch for obesity.',
    },
  }
}

export default function BreedProfile({ breed, onClose }) {
  const [breedDetails, setBreedDetails] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userRating, setUserRating] = useState(0)
  const [userReview, setUserReview] = useState('')

  useState(() => {
    const loadBreedDetails = async () => {
      const details = await fetchBreedDetails(breed.id)
      setBreedDetails(details)
      setLoading(false)
    }
    loadBreedDetails()
  }, [breed.id])

  const handleRatingChange = (rating) => {
    setUserRating(rating)
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    // TODO: Implement review submission logic
    console.log('Submitted review:', { rating: userRating, review: userReview })
    // Reset form
    setUserRating(0)
    setUserReview('')
  }

  if (loading) {
    return <div className="text-emerald-400">Loading breed details...</div>
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="glass p-6 rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-semibold text-emerald-400 neon">{breedDetails.name}</h3>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-zinc-200 transition-colors"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Image Gallery */}
        <div className="mb-4">
          <img src={breedDetails.images[0]} alt={breedDetails.name} className="w-full h-64 object-cover rounded-md" />
        </div>

        {/* Description */}
        <p className="text-zinc-300 mb-4">{breedDetails.description}</p>

        {/* Quick Facts */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-zinc-800 p-3 rounded-md">
            <p className="text-emerald-400 font-semibold">Origin</p>
            <p className="text-zinc-300">{breedDetails.origin}</p>
          </div>
          <div className="bg-zinc-800 p-3 rounded-md">
            <p className="text-emerald-400 font-semibold">Life Span</p>
            <p className="text-zinc-300">{breedDetails.lifeSpan}</p>
          </div>
        </div>

        {/* Temperament */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-2">Temperament</h4>
          <div className="flex flex-wrap gap-2">
            {breedDetails.temperament.map((trait, index) => (
              <span key={index} className="bg-emerald-500 bg-opacity-20 text-emerald-400 px-2 py-1 rounded-full text-sm">
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Health Issues */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center">
            <Activity className="w-5 h-5 mr-2" />
            Health Concerns
          </h4>
          <ul className="list-disc list-inside text-zinc-300">
            {breedDetails.healthIssues.map((issue, index) => (
              <li key={index}>{issue}</li>
            ))}
          </ul>
        </div>

        {/* Care Instructions */}
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center">
            <Heart className="w-5 h-5 mr-2" />
            Care Instructions
          </h4>
          <div className="space-y-2">
            <p className="text-zinc-300"><strong className="text-emerald-400">Exercise:</strong> {breedDetails.careInstructions.exercise}</p>
            <p className="text-zinc-300"><strong className="text-emerald-400">Grooming:</strong> {breedDetails.careInstructions.grooming}</p>
            <p className="text-zinc-300"><strong className="text-emerald-400">Diet:</strong> {breedDetails.careInstructions.diet}</p>
          </div>
        </div>

        {/* User Reviews */}
        <div className="mt-6">
          <h4 className="text-lg font-semibold text-emerald-400 mb-2 flex items-center">
            <Award className="w-5 h-5 mr-2" />
            User Reviews
          </h4>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-zinc-300 mb-1">Your Rating</label>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={`text-2xl ${star <= userRating ? 'text-yellow-400' : 'text-zinc-600'}`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label htmlFor="review" className="block text-zinc-300 mb-1">Your Review</label>
              <textarea
                id="review"
                className="w-full p-2 bg-zinc-800 text-zinc-100 rounded-md border border-zinc-700 focus:border-emerald-500 focus:ring focus:ring-emerald-500 focus:ring-opacity-50"
                rows={3}
                value={userReview}
                onChange={(e) => setUserReview(e.target.value)}
              ></textarea>
            </div>
            <button
              type="submit"
              className="glass-button text-emerald-400 py-2 px-4 rounded-md flex items-center justify-center hover:bg-emerald-500 hover:bg-opacity-20 transition-colors"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

