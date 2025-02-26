"use client"

import { useEffect, useState } from "react"
import { User, Calendar, Weight, Ruler } from "lucide-react"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

interface UserProfile {
  name: string
  age: string
  weight: string
  height: string
}

export default function PatientOverview() {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const userRef = doc(db, "users", "user1") // Hardcoded user ID "user1"
      const userSnap = await getDoc(userRef)

      if (userSnap.exists()) {
        setProfile(userSnap.data() as UserProfile)
      } else {
        console.error("User profile not found")
      }
    }

    fetchUserProfile()
  }, [])

  if (!profile) {
    return <p className="text-zinc-500 dark:text-zinc-400">Loading user data...</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="flex items-center space-x-2">
        <User className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Name</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">{profile.name}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Age</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">{profile.age}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Weight className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Weight</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">{profile.weight}</p>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <Ruler className="w-5 h-5 text-emerald-500" />
        <div>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Height</p>
          <p className="font-medium text-zinc-800 dark:text-zinc-100">{profile.height}</p>
        </div>
      </div>
    </div>
  )
}
