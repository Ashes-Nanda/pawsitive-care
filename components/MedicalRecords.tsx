"use client"

import { useState, useEffect } from "react"
import { Upload, File, Trash2, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"

// Hardcoded user ID (since there's only one user)
const USER_ID = "single-user"

interface MedicalRecord {
  id: string
  name: string
  url: string
}

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([])

  // Fetch uploaded files from Firebase Storage
  useEffect(() => {
    const fetchRecords = async () => {
      const storageRef = ref(storage, `medical-records/${USER_ID}`)
      const result = await listAll(storageRef)

      const files = await Promise.all(
        result.items.map(async (item) => ({
          id: item.name,
          name: item.name,
          url: await getDownloadURL(item),
        }))
      )

      setRecords(files)
    }

    fetchRecords()
  }, [])

  // Handle File Upload to Firebase Storage
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileRef = ref(storage, `medical-records/${USER_ID}/${file.name}`)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)

    const newRecord: MedicalRecord = { id: file.name, name: file.name, url }
    setRecords([...records, newRecord])

    toast({
      title: "File Uploaded",
      description: `${file.name} has been successfully uploaded.`,
    })
  }

  // Handle File Deletion from Firebase Storage
  const handleDelete = async (id: string) => {
    const fileRef = ref(storage, `medical-records/${USER_ID}/${id}`)
    await deleteObject(fileRef)
    setRecords(records.filter(record => record.id !== id))

    toast({
      title: "File Deleted",
      description: "The file has been removed from your records.",
      variant: "destructive",
    })
  }

  // Handle File Download
  const handleDownload = (record: MedicalRecord) => {
    const link = document.createElement("a")
    link.href = record.url
    link.download = record.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle Print
  const handlePrint = (record: MedicalRecord) => {
    const printWindow = window.open(record.url, "_blank")
    printWindow?.print()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-zinc-800 dark:text-zinc-100">Medical Records</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="file-upload" className="cursor-pointer">
              <div className="flex items-center justify-center w-full p-4 border-2 border-dashed border-zinc-300 dark:border-zinc-700 rounded-md hover:border-emerald-500 transition-colors">
                <Upload className="w-6 h-6 text-zinc-500 dark:text-zinc-400 mr-2" />
                <span className="text-zinc-500 dark:text-zinc-400">Upload new record (PDF or Image)</span>
              </div>
            </Label>
            <Input
              id="file-upload"
              type="file"
              className="hidden"
              onChange={handleFileUpload}
              accept=".pdf,image/*"
            />
          </div>

          {/* List of uploaded medical records */}
          {records.map(record => (
            <div key={record.id} className="flex items-center justify-between p-3 bg-zinc-100 dark:bg-zinc-800 rounded-md">
              <div className="flex items-center">
                <File className="w-5 h-5 text-emerald-500 mr-2" />
                <span className="text-zinc-700 dark:text-zinc-300">{record.name}</span>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => handleDownload(record)}>
                  <Download className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => handlePrint(record)}>
                  <Printer className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm" >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

