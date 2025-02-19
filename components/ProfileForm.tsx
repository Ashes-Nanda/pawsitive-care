'use client'

import { useState } from 'react'
import { Camera, Plus, Trash2, ArrowLeft } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useRouter } from 'next/navigation'
import type { User, Pet } from '@/types/user'

// Mock user data - replace with actual API call
const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  pets: [
    {
      id: '1',
      name: 'Max',
      species: 'Dog',
      breed: 'Labrador Retriever',
      age: 3,
      weight: 30,
      medicalConditions: ['Allergies'],
      medications: ['Antihistamines'],
      allergies: ['Chicken']
    }
  ]
}

export default function ProfileForm() {
  const [user, setUser] = useState<User>(mockUser)
  const [newPet, setNewPet] = useState<Partial<Pet>>({})
  const [showAddPet, setShowAddPet] = useState(false)
  const router = useRouter()

  const handleUserUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handlePetUpdate = (petId: string, field: keyof Pet, value: string | number) => {
    setUser({
      ...user,
      pets: user.pets.map(pet =>
        pet.id === petId ? { ...pet, [field]: value } : pet
      )
    })
  }

  const handleAddPet = (e: React.FormEvent) => {
    e.preventDefault()
    const pet: Pet = {
      id: (user.pets.length + 1).toString(),
      ...newPet as Pet
    }
    setUser({
      ...user,
      pets: [...user.pets, pet]
    })
    setNewPet({})
    setShowAddPet(false)
  }

  const handleDeletePet = (petId: string) => {
    setUser({
      ...user,
      pets: user.pets.filter(pet => pet.id !== petId)
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={() => router.push('/')}
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
                <AvatarFallback className="bg-emerald-500 bg-opacity-20 text-emerald-400 text-xl">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <Button variant="outline" size="sm">
                <Camera className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={user.name}
                  onChange={handleUserUpdate}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={user.email}
                  onChange={handleUserUpdate}
                />
              </div>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    onClick={() => handleDeletePet(pet.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor={`pet-species-${pet.id}`}>Species</Label>
                    <Input
                      id={`pet-species-${pet.id}`}
                      value={pet.species}
                      onChange={(e) => handlePetUpdate(pet.id, 'species', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`pet-breed-${pet.id}`}>Breed</Label>
                    <Input
                      id={`pet-breed-${pet.id}`}
                      value={pet.breed}
                      onChange={(e) => handlePetUpdate(pet.id, 'breed', e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`pet-age-${pet.id}`}>Age</Label>
                    <Input
                      id={`pet-age-${pet.id}`}
                      type="number"
                      value={pet.age}
                      onChange={(e) => handlePetUpdate(pet.id, 'age', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`pet-weight-${pet.id}`}>Weight (kg)</Label>
                    <Input
                      id={`pet-weight-${pet.id}`}
                      type="number"
                      value={pet.weight}
                      onChange={(e) => handlePetUpdate(pet.id, 'weight', parseInt(e.target.value))}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label>Medical Conditions</Label>
                  <Input
                    value={pet.medicalConditions?.join(', ')}
                    onChange={(e) => handlePetUpdate(pet.id, 'medicalConditions', e.target.value.split(', '))}
                    placeholder="Enter conditions separated by commas"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Medications</Label>
                  <Input
                    value={pet.medications?.join(', ')}
                    onChange={(e) => handlePetUpdate(pet.id, 'medications', e.target.value.split(', '))}
                    placeholder="Enter medications separated by commas"
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Allergies</Label>
                  <Input
                    value={pet.allergies?.join(', ')}
                    onChange={(e) => handlePetUpdate(pet.id, 'allergies', e.target.value.split(', '))}
                    placeholder="Enter allergies separated by commas"
                  />
                </div>
                <Separator />
              </div>
            ))}

            {!showAddPet ? (
              <Button
                onClick={() => setShowAddPet(true)}
                className="w-full bg-black text-white hover:bg-gray-800"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Pet
              </Button>
            ) : (
              <form onSubmit={handleAddPet} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="grid gap-2">
                    <Label htmlFor="new-pet-name">Name</Label>
                    <Input
                      id="new-pet-name"
                      required
                      value={newPet.name || ''}
                      onChange={(e) => setNewPet({ ...newPet, name: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-pet-species">Species</Label>
                    <Input
                      id="new-pet-species"
                      required
                      value={newPet.species || ''}
                      onChange={(e) => setNewPet({ ...newPet, species: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-pet-breed">Breed</Label>
                    <Input
                      id="new-pet-breed"
                      required
                      value={newPet.breed || ''}
                      onChange={(e) => setNewPet({ ...newPet, breed: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-pet-age">Age</Label>
                    <Input
                      id="new-pet-age"
                      type="number"
                      required
                      value={newPet.age || ''}
                      onChange={(e) => setNewPet({ ...newPet, age: parseInt(e.target.value) })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-pet-weight">Weight (kg)</Label>
                    <Input
                      id="new-pet-weight"
                      type="number"
                      required
                      value={newPet.weight || ''}
                      onChange={(e) => setNewPet({ ...newPet, weight: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="ghost" onClick={() => setShowAddPet(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-black text-white hover:bg-gray-800">
                    Add Pet
                  </Button>
                </div>
              </form>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

