import React from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

interface SearchResult {
  id: number
  name: string
  address: string
  phone: string
  rating: number
  description: string
}

interface SearchResultsProps {
  results: SearchResult[]
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

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <motion.div 
      className="space-y-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-bold"
        variants={itemVariants}
      >
        Search Results
      </motion.h2>
      {results.map((result) => (
        <motion.div key={result.id} variants={itemVariants}>
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{result.name}</span>
                <span className="flex items-center text-yellow-400">
                  <Star className="w-4 h-4 mr-1 fill-current" />
                  {result.rating}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <motion.p 
                className="text-sm text-gray-500 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {result.address}
              </motion.p>
              <motion.p 
                className="text-sm text-gray-500 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {result.phone}
              </motion.p>
              <motion.p 
                className="text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {result.description}
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  )
}

