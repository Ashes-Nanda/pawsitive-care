import * as z from "zod"

// User validation schema
export const userSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
})

// Pet validation schema
export const petSchema = z.object({
  petName: z.string().min(2, "Pet name must be at least 2 characters"),
  species: z.string().min(2, "Species is required"),
  breed: z.string().min(2, "Breed is required"),
  age: z.number().min(0, "Age must be a positive number"),
  weight: z.number().min(0, "Weight must be a positive number"),
  medicalConditions: z.array(z.string()).optional(),
  medications: z.array(z.string()).optional(),
  allergies: z.array(z.string()).optional(),
})

// Medication validation schema
export const medicationSchema = z.object({
  name: z.string().min(2, "Medicine name is required"),
  dosage: z.string().min(1, "Dosage is required"),
  frequency: z.string().min(1, "Frequency is required"),
})

// Vaccination validation schema
export const vaccinationSchema = z.object({
  name: z.string().min(2, "Vaccination name is required"),
  date: z.string().min(1, "Date is required"),
  dueDate: z.string().min(1, "Due date is required"),
})

// Test validation schema
export const testSchema = z.object({
  name: z.string().min(2, "Test name is required"),
  status: z.enum(["Pending", "Completed"]),
  date: z.string().optional(),
})

// Geofence validation schema
export const geofenceSchema = z.object({
  radius: z.number().min(50, "Radius must be at least 50 meters").max(1000, "Radius cannot exceed 1000 meters"),
}) 