'use client'

import React, { useState, useEffect } from 'react'
import { AlertCircle, ArrowLeft, ArrowRight, RotateCcw, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useResponsive, getResponsiveValue } from "@/lib/responsive";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

interface Symptom {
  id: string
  question: string
  type: 'select' | 'slider'
  options?: string[]
  range?: [number, number]
  modelIndices?: number[] // Indices in the model's 86 binary inputs
}

// Define the mapping between our UI symptoms and the model's binary inputs
const symptoms: Symptom[] = [
  {
    id: 'fever',
    question: 'Does your pet have a fever? (Temperature above 39°C/102°F)',
    type: 'select',
    options: ['No', 'Yes'],
    modelIndices: [0] // fever
  },
  {
    id: 'appetite',
    question: 'Has your pet\'s appetite changed recently?',
    type: 'select',
    options: ['Normal appetite', 'Decreased appetite', 'No appetite'],
    modelIndices: [2] // loss_of_appetite
  },
  {
    id: 'energy',
    question: 'How is your pet\'s energy level?',
    type: 'select',
    options: ['Normal energy', 'Lethargic', 'Very lethargic'],
    modelIndices: [7] // lethargy
  },
  {
    id: 'water',
    question: 'Has your pet\'s water intake changed?',
    type: 'select',
    options: ['Normal amount', 'Drinking more than usual'],
    modelIndices: [9] // increased_drinking
  },
  {
    id: 'urination',
    question: 'Has your pet\'s urination frequency changed?',
    type: 'select',
    options: ['Normal frequency', 'Increased frequency'],
    modelIndices: [10] // increased_urination
  },
  {
    id: 'vomiting',
    question: 'Is your pet vomiting?',
    type: 'select',
    options: ['No', 'Occasionally', 'Frequently'],
    modelIndices: [11] // vomiting
  },
  {
    id: 'diarrhea',
    question: 'Does your pet have diarrhea?',
    type: 'select',
    options: ['No', 'Mild', 'Severe'],
    modelIndices: [12] // diarrhea
  },
  {
    id: 'breathing',
    question: 'Is your pet experiencing breathing difficulties?',
    type: 'select',
    options: ['Normal breathing', 'Labored breathing', 'Very labored breathing'],
    modelIndices: [5] // breathing_difficulty
  },
  {
    id: 'skin',
    question: 'Does your pet have any skin rashes or abnormalities?',
    type: 'select',
    options: ['No', 'Yes'],
    modelIndices: [15] // skin_rashes
  }
]

interface PredictionResult {
  disease_name: string
  confidence: number
  status: string
}

async function detectDisease(answers: Record<string, string | number>): Promise<PredictionResult> {
  try {
    // Create a binary array of 86 zeros (model expects 86 binary inputs)
    const binarySymptoms = new Array(86).fill(0)
    
    // Map our UI answers to the model's binary inputs
    Object.entries(answers).forEach(([symptomId, answer]) => {
      const symptom = symptoms.find(s => s.id === symptomId)
      if (symptom && symptom.modelIndices) {
        // For each model index associated with this symptom
        symptom.modelIndices.forEach(index => {
          if (index < 86) { // Ensure index is within bounds
            // Set the binary value based on the answer
            if (symptom.type === 'select') {
              // For select inputs, set to 1 if not "Normal" or "No" or "No changes"
              if (answer !== 'Normal' && answer !== 'No' && answer !== 'No changes') {
                binarySymptoms[index] = 1
              }
            } else if (symptom.type === 'slider') {
              // For slider inputs, set to 1 if temperature is above normal (38.5°C for dogs)
              if (typeof answer === 'number' && answer > 38.5) {
                binarySymptoms[index] = 1
              }
            }
          }
        })
      }
    })
    
    // Call the API
    const response = await fetch('http://localhost:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ symptoms: binarySymptoms }),
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(errorData.message || `API error: ${response.status}`)
    }
    
    const data = await response.json()
    
    if (data.status === 'success') {
      return {
        disease_name: data.disease_name,
        confidence: data.confidence,
        status: data.status
      }
    } else {
      throw new Error(data.message || 'Unknown error')
    }
  } catch (error) {
    console.error('Error detecting disease:', error)
    throw error
  }
}

export default function DiseaseDetection() {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [prediction, setPrediction] = useState<PredictionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [showResults, setShowResults] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { isMobile, isTablet } = useResponsive();
  const { toast } = useToast()

  // Get responsive container width
  const containerWidth = getResponsiveValue({
    mobile: "w-full px-4",
    tablet: "w-3/4 mx-auto px-6",
    desktop: "w-1/2 mx-auto px-8",
    default: "w-full px-4"
  });

  // Get responsive text size
  const titleSize = getResponsiveValue({
    mobile: "text-xl",
    tablet: "text-2xl",
    desktop: "text-3xl",
    default: "text-xl"
  });

  const handleAnswerChange = (symptomId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [symptomId]: answer }))
  }

  const handleNext = () => {
    if (currentStep < symptoms.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    
    try {
      const result = await detectDisease(answers)
      setPrediction(result)
      
      toast({
        title: "Analysis Complete",
        description: `Detected: ${result.disease_name} (${(result.confidence * 100).toFixed(2)}% confidence)`,
      })
    } catch (err) {
      console.error('Error in handleSubmit:', err)
      setError(err instanceof Error ? err.message : 'An unknown error occurred')
      
      toast({
        title: "Error",
        description: "Failed to analyze symptoms. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
      setTimeout(() => setShowResults(true), 100) // Delay to allow for smooth transition
    }
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStep(0)
    setPrediction(null)
    setImage(null)
    setShowResults(false)
    setError(null)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const progress = ((currentStep + 1) / symptoms.length) * 100

  return (
    <div className={`glass p-6 rounded-lg ${containerWidth}`}>
      <h2 className={`font-semibold mb-4 text-emerald-400 neon ${titleSize}`}>Disease Detection</h2>
      {!prediction && (
        <>
          <Progress value={progress} className="mb-4" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div key={symptoms[currentStep].id} className="space-y-2">
              <Label className={`text-emerald-400 ${isMobile ? "text-sm" : "text-base"}`}>
                {symptoms[currentStep].question}
              </Label>
              {symptoms[currentStep].type === 'select' ? (
                <div className="flex flex-col space-y-2">
                  {symptoms[currentStep].options?.map((option) => (
                    <label key={option} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name={symptoms[currentStep].id}
                        value={option}
                        checked={answers[symptoms[currentStep].id] === option}
                        onChange={() => handleAnswerChange(symptoms[currentStep].id, option)}
                        className="text-emerald-500 focus:ring-emerald-500"
                        required
                      />
                      <span className={`text-zinc-300 ${isMobile ? "text-sm" : "text-base"}`}>{option}</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  <Slider
                    min={symptoms[currentStep].range?.[0]}
                    max={symptoms[currentStep].range?.[1]}
                    step={0.1}
                    value={[answers[symptoms[currentStep].id] as number || symptoms[currentStep].range?.[0] || 0]}
                    onValueChange={(value) => handleAnswerChange(symptoms[currentStep].id, value[0])}
                  />
                  <div className="flex justify-between text-zinc-300 text-sm">
                    <span>{symptoms[currentStep].range?.[0]}</span>
                    <span>{answers[symptoms[currentStep].id] || symptoms[currentStep].range?.[0]}</span>
                    <span>{symptoms[currentStep].range?.[1]}</span>
                  </div>
                </div>
              )}
            </div>
            {currentStep === symptoms.length - 1 && (
              <div className="space-y-2">
                <Label className="text-emerald-400">Upload an image (optional)</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <Label htmlFor="image-upload" className="cursor-pointer flex items-center justify-center w-full p-2 border-2 border-dashed border-zinc-600 rounded-md hover:border-emerald-400 transition-colors">
                  <Upload className="mr-2" />
                  {image ? 'Change Image' : 'Upload Image'}
                </Label>
                {image && <p className="text-sm text-zinc-400">{image.name}</p>}
              </div>
            )}
            <div className="flex justify-between mt-4">
              <Button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                className={`text-var(--color-secondary) ${isMobile ? "text-sm px-2 py-1" : "px-4 py-2"}`}
              >
                <ArrowLeft className={`mr-2 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} /> Previous
              </Button>
              {currentStep < symptoms.length - 1 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={!answers[symptoms[currentStep].id]}
                  className={`w-full mt-4 bg-var(--color-dark) text-white hover:bg-var(--color-dark)/85 ${
                    isMobile ? "text-sm px-2 py-1" : "px-4 py-2"
                  }`}
                >
                  Next <ArrowRight className={`ml-2 ${isMobile ? "w-4 h-4" : "w-5 h-5"}`} />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={Object.keys(answers).length !== symptoms.length || isLoading}
                  className={`w-full mt-4 bg-black text-white hover:bg-gray-800 ${
                    isMobile ? "text-sm px-2 py-1" : "px-4 py-2"
                  }`}
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Results'}
                </Button>
              )}
            </div>
          </form>
        </>
      )}
      {prediction && (
        <div className={`mt-4 p-4 bg-zinc-800 rounded-md transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-lg font-semibold text-emerald-400 mb-4">Analysis Results</h3>
          <Alert>
            <AlertTitle className="text-emerald-400">Detected Condition</AlertTitle>
            <AlertDescription>
              <div className="space-y-2">
                <p className="text-lg font-medium text-white">{prediction.disease_name}</p>
                <div className="flex items-center space-x-2">
                  <div className="w-full bg-zinc-700 rounded-full h-2.5">
                    <div 
                      className="bg-emerald-400 h-2.5 rounded-full" 
                      style={{ width: `${prediction.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-zinc-400">{(prediction.confidence * 100).toFixed(1)}%</span>
                </div>
              </div>
            </AlertDescription>
          </Alert>
          <div className="mt-4 space-y-2">
            <p className="text-sm text-zinc-400">
              This is a preliminary assessment based on the symptoms you've reported. 
              Please consult with a veterinarian for a proper diagnosis and treatment plan.
            </p>
            <Button
              onClick={handleReset}
              className="mt-4 bg-emerald-500 text-white hover:bg-emerald-600"
            >
              <RotateCcw className="mr-2" /> Start New Assessment
            </Button>
          </div>
        </div>
      )}
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            <p>{error}</p>
            <p className="text-sm mt-2">
              Please make sure the API server is running and try again. 
              If the problem persists, contact support.
            </p>
          </AlertDescription>
        </Alert>
      )}
      <div className="mt-4 flex items-center text-var(--color-info)">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="text-sm">This is a preliminary assessment. Always consult a veterinarian for accurate diagnosis.</span>
      </div>
    </div>
  )
}
