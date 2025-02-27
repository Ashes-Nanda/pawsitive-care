'use client'

import React, { useState } from 'react'
import { AlertCircle, ArrowLeft, ArrowRight, RotateCcw, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"

interface Symptom {
  id: string
  question: string
  type: 'select' | 'slider'
  options?: string[]
  range?: [number, number]
}

const symptoms: Symptom[] = [
  {
    id: 'appetite',
    question: 'How is your pet\'s appetite?',
    type: 'select',
    options: ['Normal', 'Increased', 'Decreased', 'No appetite']
  },
  {
    id: 'energy',
    question: 'How is your pet\'s energy level?',
    type: 'select',
    options: ['Normal', 'Hyperactive', 'Lethargic']
  },
  {
    id: 'water',
    question: 'How much water is your pet drinking?',
    type: 'select',
    options: ['Normal amount', 'Drinking more than usual', 'Drinking less than usual']
  },
  {
    id: 'vomiting',
    question: 'Is your pet vomiting?',
    type: 'select',
    options: ['No', 'Occasionally', 'Frequently']
  },
  {
    id: 'diarrhea',
    question: 'Does your pet have diarrhea?',
    type: 'select',
    options: ['No', 'Mild', 'Severe']
  },
  {
    id: 'coughing',
    question: 'Is your pet coughing?',
    type: 'select',
    options: ['No', 'Occasionally', 'Frequently']
  },
  {
    id: 'breathing',
    question: 'How is your pet\'s breathing?',
    type: 'select',
    options: ['Normal', 'Rapid', 'Labored']
  },
  {
    id: 'skin',
    question: 'Are there any changes in your pet\'s skin or coat?',
    type: 'select',
    options: ['No changes', 'Dry/flaky skin', 'Rash or redness', 'Hair loss']
  },
  {
    id: 'urination',
    question: 'Has there been any change in your pet\'s urination habits?',
    type: 'select',
    options: ['No changes', 'Increased frequency', 'Decreased frequency', 'Blood in urine']
  },
  {
    id: 'behavior',
    question: 'Have you noticed any changes in your pet\'s behavior?',
    type: 'select',
    options: ['No changes', 'More aggressive', 'More withdrawn', 'Confused or disoriented']
  },
  {
    id: 'temperature',
    question: 'What is your pet\'s body temperature?',
    type: 'slider',
    range: [35, 42]
  }
]

async function detectDisease(answers: Record<string, string | number>): Promise<string[]> {
  // Simulate an API call to a server-side ML model
  await new Promise(resolve => setTimeout(resolve, 1500))

  // This is a placeholder for the ML model's decision logic
  // In a real-world scenario, this would be replaced with actual ML model predictions
  const detectedDiseases: string[] = []
  const symptoms = Object.values(answers)

  if (symptoms.includes('No appetite') || symptoms.includes('Lethargic')) {
    detectedDiseases.push('Canine Parvovirus')
  }
  if (symptoms.includes('Lethargic') && symptoms.includes('Weight loss')) {
    detectedDiseases.push('Feline Leukemia Virus (FeLV)')
  }
  if (symptoms.includes('Frequently') && answers.coughing === 'Frequently') {
    detectedDiseases.push('Kennel Cough')
  }
  if (symptoms.includes('Drinking more than usual') && symptoms.includes('Increased frequency')) {
    detectedDiseases.push('Diabetes Mellitus')
  }
  if (symptoms.includes('Rash or redness') || symptoms.includes('Hair loss')) {
    detectedDiseases.push('Allergies')
  }
  // Remove the weight change condition

  return detectedDiseases.length > 0 ? detectedDiseases : ['No specific disease detected']
}

export default function DiseaseDetection() {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [results, setResults] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState<File | null>(null)
  const [showResults, setShowResults] = useState(false)

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
    const detectedDiseases = await detectDisease(answers)
    setResults(detectedDiseases)
    setIsLoading(false)
    setTimeout(() => setShowResults(true), 100) // Delay to allow for smooth transition
  }

  const handleReset = () => {
    setAnswers({})
    setCurrentStep(0)
    setResults([])
    setImage(null)
    setShowResults(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const progress = ((currentStep + 1) / symptoms.length) * 100

  return (
    <div className="glass p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-emerald-400 neon">Disease Detection</h2>
      {!results.length && (
        <>
          <Progress value={progress} className="mb-4" />
          <form onSubmit={handleSubmit} className="space-y-4">
            <div key={symptoms[currentStep].id} className="space-y-2">
              <Label className="text-emerald-400">{symptoms[currentStep].question}</Label>
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
                      <span className="text-zinc-300">{option}</span>
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
                disabled={!answers[symptoms[currentStep].id]}
                variant="outline"
                className="text-var(--color-secondary)"
              >
                <ArrowRight className="mr-2" /> Previous
              </Button>
              {currentStep < symptoms.length - 1 ? (
                <Button
                  type="submit"
                  onClick={handleNext}
                  disabled={Object.keys(answers).length !== symptoms.length || isLoading}
                  className="w-full mt-4 bg-var(--color-dark) text-white hover:bg-var(--color-dark)/85"
                >
                  Next <ArrowRight className="ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={Object.keys(answers).length !== symptoms.length || isLoading}
                  className="w-full mt-4 bg-black text-white hover:bg-gray-800"
                >
                  {isLoading ? 'Analyzing...' : 'Analyze Results'}
                </Button>
              )}
            </div>
          </form>
        </>
      )}
      {results.length > 0 && (
        <div className={`mt-4 p-4 bg-zinc-800 rounded-md transition-opacity duration-500 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
          <h3 className="text-lg font-semibold text-var(--color-accent) mb-2">Results:</h3>
          <ul className="list-disc list-inside space-y-1">
            {results.map((disease, index) => (
              <li key={index} className="text-var(--color-secondary)">{disease}</li>
            ))}
          </ul>
          <Button
            onClick={handleReset}
            className="mt-4 bg-var(--color-dark) text-white hover:bg-var(--color-dark)/85"
          >
            <RotateCcw className="mr-2" /> Start Over
          </Button>
        </div>
      )}
      <div className="mt-4 flex items-center text-var(--color-info)">
        <AlertCircle className="w-5 h-5 mr-2" />
        <span className="text-sm">This is a preliminary assessment. Always consult a veterinarian for accurate diagnosis.</span>
      </div>
    </div>
  )
}

