import { User, Calendar, Weight, Ruler } from 'lucide-react'

export default function PatientOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Name</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">Max Johnson</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Age</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">5 years</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Weight className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Weight</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">30 lbs</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Ruler className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Height</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">20 inches</p>
        </div>
      </div>
    </div>
  )
}

