import { Calendar } from 'lucide-react'

const mockAppointments = [
  { date: '2023-06-15', time: '10:00 AM', type: 'Annual Checkup' },
  { date: '2023-06-22', time: '2:30 PM', type: 'Vaccination' },
  { date: '2023-07-05', time: '11:15 AM', type: 'Dental Cleaning' },
]

export default function UpcomingAppointments() {
  return (
    <ul className="space-y-4">
      {mockAppointments.map((appointment, index) => (
        <li key={index} className="flex items-start space-x-4">
          <Calendar className="w-5 h-5 text-emerald-500 mt-1" />
          <div>
            <p className="font-medium text-zinc-800 dark:text-zinc-100">{appointment.type}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {appointment.date} at {appointment.time}
            </p>
          </div>
        </li>
      ))}
    </ul>
  )
}

