import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
}

export default function Medications() {
  const [medications, setMedications] = useState<Medication[]>([
    { id: '1', name: 'Amoxicillin', dosage: '500mg', frequency: 'Twice daily' },
    { id: '2', name: 'Rimadyl', dosage: '75mg', frequency: 'Once daily' },
    { id: '3', name: 'Heartgard Plus', dosage: '1 chewable', frequency: 'Monthly' },
  ])
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '' })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddMedication = () => {
    if (newMedication.name && newMedication.dosage && newMedication.frequency) {
      setMedications([...medications, { id: Date.now().toString(), ...newMedication }])
      setNewMedication({ name: '', dosage: '', frequency: '' })
      setShowAddForm(false)
    }
  }

  return (
    <div>
      <ul className="space-y-2 mb-4">
        {medications.map((med) => (
          <li key={med.id} className="border-b border-zinc-200 dark:border-zinc-700 pb-2">
            <p className="font-medium text-zinc-800 dark:text-zinc-100">{med.name}</p>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {med.dosage} - {med.frequency}
            </p>
          </li>
        ))}
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

