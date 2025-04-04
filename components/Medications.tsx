"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { db } from "@/lib/firebase"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"
import { useResponsive, getResponsiveValue } from "@/lib/responsive"

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
  const { isMobile, isTablet } = useResponsive();

  // Get responsive container width
  const containerWidth = getResponsiveValue({
    mobile: "w-full px-4",
    tablet: "w-3/4 mx-auto px-6",
    desktop: "w-1/2 mx-auto px-8",
    default: "w-full px-4"
  });

  // Get responsive grid columns
  const gridColumns = getResponsiveValue({
    mobile: "grid-cols-1",
    tablet: "grid-cols-2",
    desktop: "grid-cols-3",
    default: "grid-cols-1"
  });

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
    <div className={containerWidth}>
      <ul className="space-y-2 mb-4">
        {medications.length > 0 ? (
          <div className={`grid gap-4 ${gridColumns}`}>
            {medications.map((med) => (
              <li key={med.id} className="border-b border-zinc-200 dark:border-zinc-700 pb-2">
                <Input
                  value={med.name}
                  onChange={(e) => handleUpdateMedication(med.id, "name", e.target.value)}
                  placeholder="Medicine Name"
                  className={isMobile ? "text-sm" : ""}
                />
                <Input
                  value={med.dosage}
                  onChange={(e) => handleUpdateMedication(med.id, "dosage", e.target.value)}
                  placeholder="Dosage"
                  className={isMobile ? "text-sm" : ""}
                />
                <Input
                  value={med.frequency}
                  onChange={(e) => handleUpdateMedication(med.id, "frequency", e.target.value)}
                  placeholder="Frequency"
                  className={isMobile ? "text-sm" : ""}
                />
              </li>
            ))}
          </div>
        ) : (
          <p className={`text-zinc-500 dark:text-zinc-400 ${isMobile ? "text-sm" : "text-base"}`}>
            No medications available.
          </p>
        )}
      </ul>

      {!showAddForm ? (
        <Button 
          onClick={() => setShowAddForm(true)} 
          variant="outline" 
          className={`w-full ${isMobile ? "text-sm py-1" : "py-2"}`}
        >
          Add Medicine
        </Button>
      ) : (
        <div className="space-y-2">
          <Input
            placeholder="Medicine Name"
            value={newMedication.name}
            onChange={(e) => setNewMedication({ ...newMedication, name: e.target.value })}
            className={isMobile ? "text-sm" : ""}
          />
          <Input
            placeholder="Dosage"
            value={newMedication.dosage}
            onChange={(e) => setNewMedication({ ...newMedication, dosage: e.target.value })}
            className={isMobile ? "text-sm" : ""}
          />
          <Input
            placeholder="Frequency"
            value={newMedication.frequency}
            onChange={(e) => setNewMedication({ ...newMedication, frequency: e.target.value })}
            className={isMobile ? "text-sm" : ""}
          />
          <div className="flex space-x-2">
            <Button 
              onClick={handleAddMedication} 
              className={`flex-1 ${isMobile ? "text-sm py-1" : "py-2"}`}
            >
              Add
            </Button>
            <Button 
              onClick={() => setShowAddForm(false)} 
              variant="outline" 
              className={`flex-1 ${isMobile ? "text-sm py-1" : "py-2"}`}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
