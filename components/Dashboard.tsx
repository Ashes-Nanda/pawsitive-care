'use client'

import { useState } from 'react'
import { Search, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import VitalSigns from './VitalSigns'
import PatientOverview from './PatientOverview'
import RecentTests from './RecentTests'
import Medications from './Medications'
import UpcomingAppointments from './UpcomingAppointments'
import MedicalRecords from './MedicalRecords'

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="space-y-6 p-6 bg-zinc-100 dark:bg-zinc-900 min-h-screen">
      
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <h2 className="text-3xl font-bold text-white">Patient Dashboard</h2>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
        <Input
          type="text"
          placeholder="Search patient records..."
          className="pl-10 bg-white dark:bg-zinc-800 text-white placeholder-gray-300 border border-gray-600"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Patient Overview */}
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Patient Overview</CardTitle>
            <AlertCircle className="text-red-500" />
          </CardHeader>
          <CardContent>
            <PatientOverview />
          </CardContent>
        </Card>

        {/* Medical Records */}
        <Card className="col-span-full">
          <CardContent>
            <MedicalRecords />
          </CardContent>
        </Card>

        {/* Vital Signs */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Vital Signs</CardTitle>
          </CardHeader>
          <CardContent>
            <VitalSigns />
          </CardContent>
        </Card>

        {/* Recent Tests */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Recent Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTests />
          </CardContent>
        </Card>

        {/* Medications */}
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="text-white">Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <Medications />
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-white">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

