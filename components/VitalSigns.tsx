'use client'

import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"

const mockData = [
  { date: '2023-06-01', heartRate: 72, bloodPressure: 120, temperature: 98.6 },
  { date: '2023-06-02', heartRate: 75, bloodPressure: 118, temperature: 98.4 },
  { date: '2023-06-03', heartRate: 70, bloodPressure: 122, temperature: 98.7 },
  { date: '2023-06-04', heartRate: 73, bloodPressure: 119, temperature: 98.5 },
  { date: '2023-06-05', heartRate: 71, bloodPressure: 121, temperature: 98.8 },
]

export default function VitalSigns() {
  const [selectedVital, setSelectedVital] = useState('heartRate')

  return (
    <div className="space-y-4">
      <div className="flex space-x-2">
        <Button
          variant={selectedVital === 'heartRate' ? 'default' : 'outline'}
          onClick={() => setSelectedVital('heartRate')}
        >
          Heart Rate
        </Button>
        <Button
          variant={selectedVital === 'bloodPressure' ? 'default' : 'outline'}
          onClick={() => setSelectedVital('bloodPressure')}
        >
          Blood Pressure
        </Button>
        <Button
          variant={selectedVital === 'temperature' ? 'default' : 'outline'}
          onClick={() => setSelectedVital('temperature')}
        >
          Temperature
        </Button>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={mockData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis dataKey="date" stroke="#9CA3AF" />
          <YAxis stroke="#9CA3AF" />
          <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
          <Line type="monotone" dataKey={selectedVital} stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

