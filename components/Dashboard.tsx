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
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
        <h2 className="text-3xl font-bold text-zinc-800 dark:text-zinc-100">Patient Dashboard</h2>
      </div>

      <div className="relative max-w-md w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
        <Input
          type="text"
          placeholder="Search patient records..."
          className="pl-10 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-zinc-800 dark:text-zinc-100">Patient Overview</CardTitle>
            <AlertCircle className="text-red-500" />
          </CardHeader>
          <CardContent>
            <PatientOverview />
          </CardContent>
        </Card>

        <Card className="col-span-full">
          <CardContent>
            <MedicalRecords />
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-zinc-800 dark:text-zinc-100">Vital Signs</CardTitle>
          </CardHeader>
          <CardContent>
            <VitalSigns />
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="text-zinc-800 dark:text-zinc-100">Recent Tests</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentTests />
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle className="text-zinc-800 dark:text-zinc-100">Medications</CardTitle>
          </CardHeader>
          <CardContent>
            <Medications />
          </CardContent>
        </Card>

        <Card className="col-span-full lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-zinc-800 dark:text-zinc-100">Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <UpcomingAppointments />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

