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
  { id: 'appetite', question: 'How is your pet\'s appetite?', type: 'select', options: ['Normal', 'Increased', 'Decreased', 'No appetite'] },
  { id: 'energy', question: 'How is your pet\'s energy level?', type: 'select', options: ['Normal', 'Hyperactive', 'Lethargic'] },
  { id: 'water', question: 'How much water is your pet drinking?', type: 'select', options: ['Normal amount', 'Drinking more than usual', 'Drinking less than usual'] },
  { id: 'vomiting', question: 'Is your pet vomiting?', type: 'select', options: ['No', 'Occasionally', 'Frequently'] },
  { id: 'diarrhea', question: 'Does your pet have diarrhea?', type: 'select', options: ['No', 'Mild', 'Severe'] },
  { id: 'coughing', question: 'Is your pet coughing?', type: 'select', options: ['No', 'Occasionally', 'Frequently'] },
  { id: 'breathing', question: 'How is your pet\'s breathing?', type: 'select', options: ['Normal', 'Rapid', 'Labored'] },
  { id: 'skin', question: 'Are there any changes in your pet\'s skin or coat?', type: 'select', options: ['No changes', 'Dry/flaky skin', 'Rash or redness', 'Hair loss'] },
  { id: 'urination', question: 'Has there been any change in your pet\'s urination habits?', type: 'select', options: ['No changes', 'Increased frequency', 'Decreased frequency', 'Blood in urine'] },
  { id: 'behavior', question: 'Have you noticed any changes in your pet\'s behavior?', type: 'select', options: ['No changes', 'More aggressive', 'More withdrawn', 'Confused or disoriented'] },]

export default function DiseaseDetection() {
  const [answers, setAnswers] = useState<Record<string, string | number>>({})
  const [currentStep, setCurrentStep] = useState(0)
  const [image, setImage] = useState<File | null>(null)

  const handleAnswerChange = (symptomId: string, answer: string | number) => {
    setAnswers(prev => ({ ...prev, [symptomId]: answer }))
  }

  const handleNext = () => {
    if (answers[symptoms[currentStep].id]) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const progress = ((currentStep + 1) / symptoms.length) * 100

  return (
    <div className="glass p-6 rounded-lg">
      <h2 className="text-3xl font-bold mb-4 text-emerald-400 neon">Disease Detection</h2>
      <Progress value={progress} className="mb-4" />
      <form className="space-y-4">
        <div key={symptoms[currentStep].id} className="space-y-2">
          <Label className="text-emerald-400 text-lg">{symptoms[currentStep].question}</Label>
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
                    required
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>
          ) : null}
        </div>
        <div className="flex justify-between mt-4">
          <Button type="button" onClick={handlePrevious} disabled={currentStep === 0} variant="outline">
            <ArrowLeft className="mr-2" /> Previous
          </Button>
          <Button type="button" onClick={handleNext} disabled={!answers[symptoms[currentStep].id]}>
            Next <ArrowRight className="ml-2" />
          </Button>
        </div>
      </form>
      <div className="mt-6 text-center text-2xl font-bold text-gray-500">OR</div>
      <div className="mt-6 flex flex-col items-start ml-0">
        <Label className="text-emerald-400 text-xl">Upload an Image</Label>
        <input type="file" onChange={handleImageUpload} className="mt-2 w-3/4 text-lg" />
        <Button className="mt-4 px-8 py-4 text-base">Analyze Image</Button>
      </div>
    </div>
  )
}
