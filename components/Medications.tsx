"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

interface Medication {
  id: string
  name: string
  dosage: string
  frequency: string
}

export default function Medications() {
  const [medications, setMedications] = useState<Medication[]>([])
  const [newMedication, setNewMedication] = useState({ name: "", dosage: "", frequency: "" })
  const [showAddForm, setShowAddForm] = useState(false)

  // Firestore document reference
  const medicationRef = doc(db, "addmed", "newmed")

  // Fetch medications from Firestore & update local state
  useEffect(() => {
    const fetchMedications = async () => {
      try {
        const docSnap = await getDoc(medicationRef)
        if (docSnap.exists()) {
          setMedications(docSnap.data().medications || [])
        } else {
          console.warn("No medications found in Firestore. Initializing document...")
          await setDoc(medicationRef, { medications: [] }) // Create empty document if not found
          setMedications([])
        }
      } catch (error) {
        console.error("Error fetching medications:", error)
      }
    }

    fetchMedications()
  }, [])

  // Handle adding a new medication & save to Firestore
  const handleAddMedication = async () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      const newMed: Medication = { id: Date.now().toString(), ...newMedication }
      const updatedMedications = [...medications, newMed]

      setMedications(updatedMedications)
      setNewMedication({ name: "", dosage: "", frequency: "" })
      setShowAddForm(false)

      try {
        await setDoc(medicationRef, { medications: updatedMedications }, { merge: true })
      } catch (error) {
        console.error("Error saving new medication to Firestore:", error)
      }
    }
  }

  // Handle updating a medication & sync with Firestore
  const handleUpdateMedication = async (id: string, field: keyof Medication, value: string) => {
    const updatedMedications = medications.map((med) =>
      med.id === id ? { ...med, [field]: value } : med
    )
    setMedications(updatedMedications)

    try {
      await setDoc(medicationRef, { medications: updatedMedications }, { merge: true })
    } catch (error) {
      console.error("Error updating medication in Firestore:", error)
    }
  }

  return (
    <div>
      <ul className="space-y-2 mb-4">
        {medications.length > 0 ? (
          medications.map((med) => (
            <li key={med.id} className="border-b border-zinc-200 dark:border-zinc-700 pb-2">
              <Input
                value={med.name}
                onChange={(e) => handleUpdateMedication(med.id, "name", e.target.value)}
                placeholder="Medicine Name"
              />
              <Input
                value={med.dosage}
                onChange={(e) => handleUpdateMedication(med.id, "dosage", e.target.value)}
                placeholder="Dosage"
              />
              <Input
                value={med.frequency}
                onChange={(e) => handleUpdateMedication(med.id, "frequency", e.target.value)}
                placeholder="Frequency"
              />
            </li>
          ))
        ) : (
          <p className="text-sm text-zinc-500 dark:text-zinc-400">No medications available.</p>
        )}
      </ul>

      {!showAddForm ? (
        <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full">
          Add Medicine
        </Button>
      ) : (
        <div className="space-y-2">
          <Input
            placeholder="Medicine Name"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
          />
          <Input
            placeholder="Dosage"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
          />
          <Input
            placeholder="Frequency"
            value={newMedication.frequency}
            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
          />
          <div className="flex space-x-2">
            <Button onClick={handleAddMedication} className="flex-1">Add</Button>
            <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  )
}
