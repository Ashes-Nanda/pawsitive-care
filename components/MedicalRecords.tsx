"use client"

import { useState, useEffect } from "react"
import { Upload, File, Trash2, Download, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"
import { db, storage } from "@/lib/firebase"
import { ref, uploadBytes, getDownloadURL, deleteObject, listAll } from "firebase/storage"
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore"

// Hardcoded user ID (since there's only one user)
const USER_ID = "single-user"

interface MedicalRecord {
  id: string
  name: string
  url: string
}

export default function MedicalRecords() {
  const [records, setRecords] = useState<MedicalRecord[]>([])

  // Firestore document reference
  const recordRef = doc(db, "record", "medrec")

  // Fetch uploaded files from both Firebase Storage & Firestore
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const storageRef = ref(storage, `medical-records/${USER_ID}`)
        const storageFiles = await listAll(storageRef)

        const fileMetadata = await Promise.all(
          storageFiles.items.map(async (item) => ({
            id: item.name,
            name: item.name,
            url: await getDownloadURL(item),
          }))
        )

        // Fetch Firestore records
        const docSnap = await getDoc(recordRef)
        const firestoreRecords: MedicalRecord[] = docSnap.exists() ? docSnap.data().records || [] : []

        // Merge both Storage & Firestore data (avoid duplicates)
        const mergedRecords = [...firestoreRecords, ...fileMetadata].filter(
          (v, i, a) => a.findIndex(t => t.id === v.id) === i
        )

        setRecords(mergedRecords)

        // Save merged data to Firestore (if needed)
        if (docSnap.exists()) {
          await updateDoc(recordRef, { records: mergedRecords })
        } else {
          await setDoc(recordRef, { records: mergedRecords })
        }
      } catch (error) {
        console.error("Error fetching records:", error)
      }
    }

    fetchRecords()
  }, [])

  // Handle File Upload to Firebase Storage & Firestore
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const fileRef = ref(storage, `medical-records/${USER_ID}/${file.name}`)
    await uploadBytes(fileRef, file)
    const url = await getDownloadURL(fileRef)

    const newRecord: MedicalRecord = { id: file.name, name: file.name, url }
    const updatedRecords = [...records, newRecord]
    setRecords(updatedRecords)

    // Save to Firestore
    await setDoc(recordRef, { records: updatedRecords }, { merge: true })

    toast({
      title: "File Uploaded",
      description: `${file.name} has been successfully uploaded.`,
    })
  }

  // Handle File Deletion from Firebase Storage & Firestore
  const handleDelete = async (id: string) => {
    try {
      // Delete from Storage
      const fileRef = ref(storage, `medical-records/${USER_ID}/${id}`)
      await deleteObject(fileRef)

      // Delete from Firestore
      const updatedRecords = records.filter(record => record.id !== id)
      setRecords(updatedRecords)
      await updateDoc(recordRef, { records: updatedRecords })

      toast({
        title: "File Deleted",
        description: "The file has been removed from your records.",
        variant: "destructive",
      })
    } catch (error) {
      console.error("Error deleting file:", error)
    }
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
                <Button variant="outline" size="sm" onClick={() => handleDelete(record.id)}>
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
