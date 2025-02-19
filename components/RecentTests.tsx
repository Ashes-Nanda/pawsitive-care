import { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Update the Test interface to include an id
interface Test {
  id: string;
  name: string;
  date: string;
  status: 'Completed' | 'Pending';
}

export default function RecentTests() {
  const [tests, setTests] = useState<Test[]>([
    { id: '1', name: 'Blood Test', date: '2023-06-01', status: 'Completed' },
    { id: '2', name: 'X-Ray', date: '2023-05-28', status: 'Pending' },
    { id: '3', name: 'Urinalysis', date: '2023-05-25', status: 'Completed' },
  ])
  const [newTest, setNewTest] = useState({ name: '', status: 'Pending' as 'Completed' | 'Pending' })
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddTest = () => {
    if (newTest.name) {
      setTests([...tests, { id: Date.now().toString(), ...newTest, date: new Date().toISOString().split('T')[0] }])
      setNewTest({ name: '', status: 'Pending' })
      setShowAddForm(false)
    }
  }

  return (
    <div>
      <ul className="space-y-2 mb-4">
        {tests.map((test) => (
          <li key={test.id} className="flex justify-between items-center">
            <div>
              <p className="font-medium text-zinc-800 dark:text-zinc-100">{test.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{test.date}</p>
            </div>
            <Badge variant={test.status === 'Completed' ? 'default' : 'secondary'}>
              {test.status}
            </Badge>
          </li>
        ))}
      </ul>
      {!showAddForm ? (
        <Button onClick={() => setShowAddForm(true)} variant="outline" className="w-full">
          Add Test
        </Button>
      ) : (
        <div className="space-y-2">
          <Input
            placeholder="Test Name"
            value={newTest.name}
            onChange={(e) => setNewTest({ ...newTest, name: e.target.value })}
          />
          <Select onValueChange={(value) => setNewTest({ ...newTest, status: value as 'Completed' | 'Pending' })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex space-x-2">
            <Button onClick={handleAddTest} className="flex-1">Add</Button>
            <Button onClick={() => setShowAddForm(false)} variant="outline" className="flex-1">Cancel</Button>
          </div>
        </div>
      )}
    </div>
  )
}

