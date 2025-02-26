"use client"

import { useState, useEffect } from "react"
import { Camera, Plus, Trash2, ArrowLeft } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import type { User, Pet } from "@/types/user"

const USER_ID = "user1" // Hardcoded user ID

export default function ProfileForm() {
  const [user, setUser] = useState<User | null>(null)
  const [newPet, setNewPet] = useState<Partial<Pet>>({})
  const [showAddPet, setShowAddPet] = useState(false)
  const router = useRouter()

  // Fetch user data from Firestore
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", USER_ID)
        const userSnap = await getDoc(userRef)

        if (userSnap.exists()) {
          setUser(userSnap.data() as User)
        } else {
          console.error("User not found in Firestore")
          await setDoc(userRef, { id: USER_ID, name: "", email: "", pets: [] }) // Initialize user if not found
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    }

    fetchUserData()
  }, [])

  // Handle profile updates
  const handleUserUpdate = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!user) return

    const updatedUser = { ...user, [e.target.name]: e.target.value }
    setUser(updatedUser)

    const userRef = doc(db, "users", USER_ID)
    await updateDoc(userRef, { [e.target.name]: e.target.value })
  }

  // Handle pet updates
  const handlePetUpdate = async (petId: string, field: keyof Pet, value: string | number) => {
    if (!user) return

    const updatedPets = user.pets.map(pet =>
      pet.id === petId ? { ...pet, [field]: value } : pet
    )

    setUser({ ...user, pets: updatedPets })

    const userRef = doc(db, "users", USER_ID)
    await updateDoc(userRef, { pets: updatedPets })
  }

  // Handle adding a new pet
  const handleAddPet = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    const pet: Pet = {
      id: (user.pets.length + 1).toString(),
      ...newPet as Pet,
    }

    const updatedPets = [...user.pets, pet]
    setUser({ ...user, pets: updatedPets })
    setNewPet({})
    setShowAddPet(false)

    const userRef = doc(db, "users", USER_ID)
    await updateDoc(userRef, { pets: updatedPets })
  }

  // Handle pet deletion
  const handleDeletePet = async (petId: string) => {
    if (!user) return

    const updatedPets = user.pets.filter(pet => pet.id !== petId)
    setUser({ ...user, pets: updatedPets })

    const userRef = doc(db, "users", USER_ID)
    await updateDoc(userRef, { pets: updatedPets })
  }

  if (!user) {
    return <p className="text-zinc-500 dark:text-zinc-400">Loading user data...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push("/")}
          className="mb-4 bg-black text-white hover:bg-gray-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      {/* User Profile */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src="/placeholder.svg?height=80&width=80" alt="Profile" />
                <AvatarFallback className="bg-emerald-500 text-emerald-400 text-xl">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
            <div className="grid gap-4">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" value={user.name} onChange={handleUserUpdate} />

              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={user.email} onChange={handleUserUpdate} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pets */}
      <Card>
        <CardHeader>
          <CardTitle>My Pets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {user.pets.map(pet => (
              <div key={pet.id} className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-emerald-400">{pet.name}</h3>
                  <Button variant="ghost" size="sm" className="text-red-400" onClick={() => handleDeletePet(pet.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Label>Species</Label>
                <Input value={pet.species} onChange={(e) => handlePetUpdate(pet.id, "species", e.target.value)} />
                <Label>Breed</Label>
                <Input value={pet.breed} onChange={(e) => handlePetUpdate(pet.id, "breed", e.target.value)} />
                <Label>Age</Label>
                <Input type="number" value={pet.age} onChange={(e) => handlePetUpdate(pet.id, "age", parseInt(e.target.value))} />
                <Label>Weight</Label>
                <Input type="number" value={pet.weight} onChange={(e) => handlePetUpdate(pet.id, "weight", parseInt(e.target.value))} />
                <Separator />
              </div>
            ))}

            {!showAddPet ? (
              <Button onClick={() => setShowAddPet(true)} className="w-full bg-black text-white">
                <Plus className="mr-2 h-4 w-4" /> Add Pet
              </Button>
            ) : (
              <form onSubmit={handleAddPet}>
                <Label>Pet Name</Label>
                <Input value={newPet.name || ""} onChange={(e) => setNewPet({ ...newPet, name: e.target.value })} required />
                <Button type="submit" className="bg-black text-white">Add Pet</Button>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
