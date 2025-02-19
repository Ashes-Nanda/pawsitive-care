import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PawPrint, MapPin } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="container mx-auto p-6 h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold text-emerald-400 neon mb-10">Welcome to Pet Care Hub</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <Link href="/pawsitive/dashboard" passHref>
          <Card className="hover:bg-zinc-800 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <PawPrint className="mr-2" />
                Pawsitive Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Manage your pet's health, vaccinations, and medical records.</p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/tail-tracker/dashboard" passHref>
          <Card className="hover:bg-zinc-800 transition-colors cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" />
                TailTracker
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Track your pet's location, activity, and set up geofences.</p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

