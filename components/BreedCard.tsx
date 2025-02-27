import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface BreedCardProps {
  breed: {
    id: number
    name: string
    image: string
    description: string
    temperament: string
    size: string
    weight: string
    coatType: string
    lifespan: string
    healthIssues: string[]
    careRequirements: string
  }
}

const BreedCard: React.FC<BreedCardProps> = ({ breed }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isEnlarged, setIsEnlarged] = useState(false)

  const handleClick = () => {
    if (!isEnlarged) {
      setIsEnlarged(true)
    }
    setIsFlipped(!isFlipped)
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsFlipped(false)
    setIsEnlarged(false)
  }

  return (
    <div
      className={`${
        isEnlarged
          ? 'fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4'
          : 'h-64 w-full'
      }`}
      onClick={handleClick}
    >
      <div
        className={`relative ${
          isEnlarged ? 'max-w-2xl h-[80vh]' : 'h-64'
        } w-full rounded-xl shadow-2xl`}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="w-full h-full relative preserve-3d"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front of card */}
          <div
            className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${breed.image})` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent rounded-xl" />
              <h3 className="absolute bottom-4 left-4 text-white text-3xl font-lora font-bold">
                {breed.name}
              </h3>
            </div>
          </div>

          {/* Back of card */}
          <div
            className="absolute w-full h-full rounded-xl overflow-y-auto bg-gradient-to-br from-teal-600 to-teal-700 p-6 shadow-lg"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <div className="space-y-4 text-white font-nunito">
              <h3 className="text-3xl font-bold font-lora">{breed.name}</h3>

              <div>
                <h4 className="font-semibold text-lg mb-1 font-lora">Description</h4>
                <p>{breed.description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1 font-lora">Temperament</h4>
                <p>{breed.temperament}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="font-semibold text-lg mb-1 font-lora">Size</h4>
                  <p>{breed.size}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-lg mb-1 font-lora">Weight</h4>
                  <p>{breed.weight}</p>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1 font-lora">Coat Type</h4>
                <p>{breed.coatType}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1 font-lora">Lifespan</h4>
                <p>{breed.lifespan}</p>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1 font-lora">Common Health Issues</h4>
                <ul className="list-disc list-inside space-y-1">
                  {breed.healthIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-lg mb-1 font-lora">Care Requirements</h4>
                <p>{breed.careRequirements}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {isEnlarged && (
        <button
          className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors"
          onClick={handleClose}
        >
          <X size={24} />
        </button>
      )}
    </div>
  )
}

export default BreedCard

