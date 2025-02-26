import { GoogleGenerativeAI } from '@google/generative-ai'

// Replace with your actual API key
const GEMINI_API_KEY = "your-api-key-here"

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

const generationConfig = {
  temperature: 0.7,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
}

let chatSession: any = null

export async function initializeChatSession() {
  try {
    console.log("Initializing chat session...")
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      generationConfig,
    })

    chatSession = model.startChat({
      history: [
        {
          role: "user",
          parts: [{text: "Act like a dedicated virtual assistant for my project PawPal, a personalized pet health management system. make answers short and to the point .Each time a pet logs in, tailor the responses based on their profile, including pet name, breed, age, and medical history. Core Features: Personalized Pet Profile, Vaccination Tracker, Health & Breed Guidance, Symptom-Based Disease Detection. Maintain a warm and caring tone, prioritize vet-approved guidelines, and always include the pet's name in responses when available. For medical emergencies, recommend consulting a veterinarian."}],
        },
        {
          role: "model", 
          parts: [{text: "I'm ready to be your dedicated PawPal assistant! I'll provide personalized pet care advice while keeping each pet's unique profile in mind. I'll maintain a friendly tone and always prioritize veterinary-approved guidelines. How can I help you care for your furry friend today?"}],
        },
      ],
    })

    console.log("Chat session initialized successfully")
    return chatSession
  } catch (error) {
    console.error('Error initializing chat session:', error)
    throw error
  }
}

export async function getChatResponse(input: string, petProfile?: any) {
  try {
    if (!chatSession) {
      console.log("No chat session found, initializing...")
      await initializeChatSession()
    }

    // Format input with pet profile if available
    let formattedInput = input
    if (petProfile && petProfile.name) {
      formattedInput = `[Context: Speaking about ${petProfile.name}, a ${petProfile.age} old ${petProfile.breed}] ${input}`
    }

    console.log("Sending message:", formattedInput)
    const result = await chatSession.sendMessage(formattedInput)
    const response = await result.response
    
    let responseText = response.text()
    
    // Ensure the response includes the pet's name if available
    if (petProfile && petProfile.name && !responseText.includes(petProfile.name)) {
      responseText = `Regarding ${petProfile.name}, ${responseText.toLowerCase()}`
    }

    return responseText
  } catch (error) {
    console.error('Error getting chat response:', error)
    throw error
  }
}

// Test function - useful for verifying the connection
export async function testGeminiConnection() {
  try {
    console.log("Testing Gemini connection...")
    const testProfile = {
      name: "Max",
      breed: "Golden Retriever",
      age: "2 years"
    }
    const response = await getChatResponse("What are some good exercises for my dog?", testProfile)
    console.log("Test response:", response)
    return response
  } catch (error) {
    console.error("Connection test failed:", error)
    throw error
  }
}