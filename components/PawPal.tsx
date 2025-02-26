'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Search, ThumbsUp, ThumbsDown, PawPrint, Check, CheckCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PawPalLogo } from './PawPalLogo'
import { motion } from 'framer-motion'
import { getChatResponse } from '@/utils/geminiService'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
  status: 'sent' | 'delivered' | 'read'
  quickReplies?: string[]
}

const initialMessages: Message[] = [
  {
    id: '1',
    text: "Hi there! I'm PawPal, your friendly dog care assistant. How can I help you today? 🐾",
    sender: 'bot',
    timestamp: new Date(),
    status: 'read',
    quickReplies: ['Health tips', 'Nutrition advice', 'Training help']
  }
]

const dogKnowledgeBase = {
  'health tips': "Regular check-ups, exercise, and a balanced diet are key to keeping your dog healthy. Don't forget about dental care and parasite prevention! 🏥🦷🦠",
  'nutrition advice': "A balanced diet is crucial for your dog's health. The right food depends on their age, size, and activity level. Always provide fresh water! 🍖💧",
  'training help': "Consistency is key in dog training. Use positive reinforcement and be patient. Start with basic commands like 'sit', 'stay', and 'come'. 🎓🐕",
  'vaccinations': "Core vaccinations for dogs include rabies, distemper, parvovirus, and adenovirus. Your vet can provide a tailored vaccination schedule. 💉",
  'weight management': "To help your dog lose weight, increase exercise, reduce portion sizes, and avoid table scraps. Consult your vet for a safe weight loss plan. ⚖️🏃‍♂️",
  'activities': "Dogs love walks, fetch, agility training, and puzzle toys. Swimming can be great exercise too, if your dog enjoys water! 🎾🏊‍♂️🧩",
}

export default function PawPal() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState('')
  const [dogProfile, setDogProfile] = useState({ name: '', breed: '', age: '' })
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMessage, sender: 'user', timestamp: new Date(), status: 'sent' }])
    setIsLoading(true)

    try {
      const response = await getChatResponse(userMessage, dogProfile)
      setMessages(prev => [...prev, { id: Date.now().toString(), text: response, sender: 'bot', timestamp: new Date(), status: 'delivered' }])
    } catch (error) {
      console.error('Error getting response:', error)
      setMessages(prev => [...prev, { id: Date.now().toString(), text: "I'm sorry, I couldn't process that request. Please try again.", sender: 'bot', timestamp: new Date(), status: 'delivered' }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
    handleSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const handleFeedback = (positive: boolean) => {
    // In a real app, you would send this feedback to your server
    console.log(`User gave ${positive ? 'positive' : 'negative'} feedback`)
  }

  const handleSetDogProfile = () => {
    // In a real app, you would probably use a form or modal for this
    const name = prompt('What\'s your dog\'s name?') || ''
    const breed = prompt('What breed is your dog?') || ''
    const age = prompt('How old is your dog?') || ''
    setDogProfile({ name, breed, age })
    if (name) {
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Great to meet ${name}! I'll keep their info in mind when giving advice. How can I help you and ${name} today? 🐶`,
        sender: 'bot',
        timestamp: new Date(),
        status: 'delivered',
        quickReplies: ['Health tips', 'Nutrition advice', 'Training help']
      }
      setMessages(prevMessages => [...prevMessages, welcomeMessage])
    }
  }

  const filteredMessages = messages.filter(message =>
    message.text.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-zinc-800 shadow-lg">
      <CardHeader className="bg-emerald-600 dark:bg-emerald-700 text-white p-4 flex justify-between items-center">
        <CardTitle className="flex items-center text-2xl">
          <PawPalLogo className="w-8 h-8 mr-2" />
          PawPal
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400" />
          <Input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 rounded-full bg-emerald-500 dark:bg-emerald-600 text-white placeholder-emerald-200 focus:outline-none focus:ring-2 focus:ring-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto p-4 space-y-4">
        {filteredMessages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[70%] ${
                message.sender === 'user'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200'
              } rounded-lg p-3 shadow-md mb-2`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' && (
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src="/pawpal-avatar.png" alt="PawPal" />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                )}
                <span className={`text-xs ${message.sender === 'user' ? 'text-teal-100' : 'text-zinc-500 dark:text-zinc-400'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === 'user' && (
                  <span className="ml-2">
                    {message.status === 'sent' && <Check className="w-4 h-4 text-zinc-400" />}
                    {message.status === 'delivered' && <CheckCheck className="w-4 h-4 text-zinc-400" />}
                    {message.status === 'read' && <CheckCheck className="w-4 h-4 text-teal-500" />}
                  </span>
                )}
              </div>
              <p className={`text-sm ${message.sender === 'user' ? 'text-white' : 'text-zinc-800 dark:text-white'}`}>
                {message.text}
              </p>
              {message.quickReplies && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {message.quickReplies.map((reply, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs bg-emerald-100 text-emerald-700 hover:bg-emerald-200 dark:bg-emerald-700 dark:text-emerald-100 dark:hover:bg-emerald-600 transition-colors"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              )}
              {message.sender === 'bot' && (
                <div className="mt-2 space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleFeedback(true)}>
                    <ThumbsUp className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleFeedback(false)}>
                    <ThumbsDown className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        ))}
        {isLoading && (
          <div className="text-center text-zinc-400">
            Thinking...
          </div>
        )}
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="bg-zinc-100 dark:bg-zinc-800 p-4">
        <form onSubmit={handleSubmit} className="flex w-full space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-white dark:bg-zinc-700 resize-none rounded-md border-emerald-300 dark:border-emerald-600 focus:ring-emerald-500 focus:border-emerald-500"
            rows={1}
          />
          <Button type="submit" className="bg-black hover:bg-gray-800 text-white" disabled={isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
      <div className="px-4 pb-4 bg-zinc-100 dark:bg-zinc-800">
        <Button variant="outline" onClick={handleSetDogProfile} className="w-full bg-black hover:bg-gray-800 text-white border-emerald-300 dark:border-emerald-600">
          {dogProfile.name ? `Update ${dogProfile.name}'s Profile` : 'Set Dog Profile'}
        </Button>
      </div>
    </Card>
  )
}

