'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Loader2, MapPin, Search } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"
import SearchResults from './SearchResults'
import MapComponent from './MapComponent'

// Mock data for service types
const serviceTypes = [
  { id: 'vet', label: 'Veterinarian' },
  { id: 'groomer', label: 'Groomer' },
  { id: 'park', label: 'Dog Park' },
  { id: 'emergency', label: 'Emergency Service' },
]

// Mock function for location autocomplete
const getLocationSuggestions = async (input: string): Promise<string[]> => {
  await new Promise(resolve => setTimeout(resolve, 500)) // Simulate API delay
  return [
    `${input} Street, City`,
    `${input} Avenue, Town`,
    `${input} Road, Village`,
  ]
}

// Mock function for geolocation
const getCurrentLocation = (): Promise<{ lat: number; lng: number }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ lat: 40.7128, lng: -74.0060 }) // New York City coordinates
    }, 1000)
  })
}

// Mock function for search results
const searchServices = async (location: string, services: string[]): Promise<any[]> => {
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate API delay
  return [
    { id: 1, name: 'Happy Paws Vet', address: '123 Pet St, Dogtown', phone: '(555) 123-4567', rating: 4.5, description: 'Caring veterinary services for all pets.' },
    { id: 2, name: 'Fluffy Groomers', address: '456 Groom Ave, Catville', phone: '(555) 987-6543', rating: 4.2, description: 'Professional grooming for dogs and cats.' },
    { id: 3, name: 'Central Bark', address: '789 Park Rd, Puppyville', phone: 'N/A', rating: 4.8, description: 'Large off-leash dog park with agility equipment.' },
  ]
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100
    }
  }
}

export default function SearchFeature() {
  const [location, setLocation] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [selectedServices, setSelectedServices] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (location.length > 2) {
        const newSuggestions = await getLocationSuggestions(location)
        setSuggestions(newSuggestions)
      } else {
        setSuggestions([])
      }
    }
    fetchSuggestions()
  }, [location])

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev =>
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    )
  }

  const handleSearch = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const results = await searchServices(location, selectedServices)
      setSearchResults(results)
      if (results.length === 0) {
        setError('No services found in your area.')
      }
    } catch (err) {
      setError('Unable to retrieve data. Please try again.')
      toast({
        title: "Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleUseMyLocation = async () => {
    try {
      const { lat, lng } = await getCurrentLocation()
      setLocation(`Lat: ${lat.toFixed(4)}, Lng: ${lng.toFixed(4)}`)
      toast({
        title: "Location Set",
        description: "Using your current location for search.",
      })
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to get your current location. Please enter manually.",
        variant: "destructive",
      })
    }
  }

  return (
    <motion.div 
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="space-y-2" variants={itemVariants}>
        <Label htmlFor="location">Location</Label>
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
              className="pr-10"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <Button onClick={handleUseMyLocation} variant="outline">
            <MapPin className="mr-2 h-4 w-4" /> Use My Location
          </Button>
        </div>
        <AnimatePresence>
          {suggestions.length > 0 && (
            <motion.ul
              className="mt-2 bg-white border border-gray-300 rounded-md shadow-sm"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {suggestions.map((suggestion, index) => (
                <motion.li
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLocation(suggestion)}
                  variants={itemVariants}
                >
                  {suggestion}
                </motion.li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div className="space-y-2" variants={itemVariants}>
        <Label>Service Types</Label>
        <div className="flex flex-wrap gap-4">
          {serviceTypes.map((service) => (
            <motion.div 
              key={service.id} 
              className="flex items-center space-x-2"
              variants={itemVariants}
            >
              <Checkbox
                id={service.id}
                checked={selectedServices.includes(service.id)}
                onCheckedChange={() => handleServiceToggle(service.id)}
              />
              <Label htmlFor={service.id}>{service.label}</Label>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div variants={itemVariants}>
        <Button onClick={handleSearch} disabled={isLoading} className="bg-black text-white hover:bg-gray-800">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            'Search'
          )}
        </Button>
      </motion.div>

      <AnimatePresence>
        {error && (
          <motion.div
            className="text-red-500"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {searchResults.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <SearchResults results={searchResults} />
            <MapComponent locations={searchResults} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

