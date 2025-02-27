'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Send, Search, ThumbsUp, ThumbsDown, Check, CheckCheck } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { PawPalLogo } from './PawPalLogo'
import { motion } from 'framer-motion'

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      const newMessage: Message = { 
        id: Date.now().toString(), 
        text: input, 
        sender: 'user',
        timestamp: new Date(),
        status: 'sent'
      }
      setMessages([...messages, newMessage])
      setInput('')
      setTimeout(() => handleBotResponse(input), 500)
    }
  }

  const handleBotResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase()
    let botResponse = "I'm not sure about that. Can you ask me something else about dog care? 🤔"
    let quickReplies: string[] = []

    if (lowerInput.includes('health') || lowerInput.includes('healthy')) {
      botResponse = dogKnowledgeBase['health tips']
      quickReplies = ['Vaccinations', 'Weight management', 'Nutrition advice']
    } else if (lowerInput.includes('food') || lowerInput.includes('eat') || lowerInput.includes('nutrition')) {
      botResponse = dogKnowledgeBase['nutrition advice']
      quickReplies = ['Health tips', 'Weight management']
    } else if (lowerInput.includes('train') || lowerInput.includes('training')) {
      botResponse = dogKnowledgeBase['training help']
      quickReplies = ['Activities', 'Behavior advice']
    } else if (lowerInput.includes('vaccine') || lowerInput.includes('shot')) {
      botResponse = dogKnowledgeBase['vaccinations']
      quickReplies = ['Health tips', 'Vet visit frequency']
    } else if (lowerInput.includes('weight') || lowerInput.includes('diet')) {
      botResponse = dogKnowledgeBase['weight management']
      quickReplies = ['Nutrition advice', 'Activities']
    } else if (lowerInput.includes('play') || lowerInput.includes('activity')) {
      botResponse = dogKnowledgeBase['activities']
      quickReplies = ['Training help', 'Health tips']
    }

    if (dogProfile.name) {
      botResponse = `Regarding ${dogProfile.name}, ${botResponse.toLowerCase()}`
    }

    const newMessage: Message = { 
      id: Date.now().toString(), 
      text: botResponse, 
      sender: 'bot',
      timestamp: new Date(),
      status: 'delivered',
      quickReplies
    }
    setMessages(prevMessages => [...prevMessages, newMessage])

    // Simulate message being read after 2 seconds
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
        )
      )
    }, 2000)
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
    handleSend({ preventDefault: () => {} } as React.FormEvent)
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
    <Card className="w-full max-w-md mx-auto bg-background text-foreground shadow-lg">
      <CardHeader className="bg-dark text-heading p-4 flex justify-between items-center">
        <CardTitle className="flex items-center text-2xl font-playfair">
          <PawPalLogo className="w-8 h-8 mr-2" />
          PawPal
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground" />
          <Input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 rounded-full bg-primary text-foreground placeholder-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="h-[400px] overflow-y-auto p-4 space-y-4 font-lora">
        {filteredMessages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-[70%] ${
                message.sender === 'user'
                  ? 'bg-primary text-foreground'
                  : 'bg-secondary text-accent'
              } rounded-lg p-3 shadow-md mb-2`}
            >
              <div className="flex items-center mb-1">
                {message.sender === 'bot' && (
                  <Avatar className="w-6 h-6 mr-2">
                    <AvatarImage src="/pawpal-avatar.png" alt="PawPal" />
                    <AvatarFallback>PP</AvatarFallback>
                  </Avatar>
                )}
                <span className={`text-xs ${message.sender === 'user' ? 'text-accent' : 'text-foreground'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                {message.sender === 'user' && (
                  <span className="ml-2">
                    {message.status === 'sent' && <Check className="w-4 h-4 text-foreground" />}
                    {message.status === 'delivered' && <CheckCheck className="w-4 h-4 text-foreground" />}
                    {message.status === 'read' && <CheckCheck className="w-4 h-4 text-accent" />}
                  </span>
                )}
              </div>
              <p className={`text-sm ${message.sender === 'user' ? 'text-foreground' : 'text-accent'}`}>
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
                      className="text-xs bg-accent text-dark hover:bg-accent/90 transition-colors"
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
        <div ref={messagesEndRef} />
      </CardContent>
      <CardFooter className="bg-secondary p-4">
        <form onSubmit={handleSend} className="flex w-full space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow bg-secondary resize-none rounded-md border-accent focus:ring-accent focus:border-accent"
            rows={1}
          />
          <Button type="submit" className="bg-primary hover:bg-primary/85 text-foreground">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardFooter>
      <div className="px-4 pb-4 bg-secondary">
        <Button variant="outline" onClick={handleSetDogProfile} className="w-full bg-primary hover:bg-primary/85 text-foreground border-accent">
          {dogProfile.name ? `Update ${dogProfile.name}'s Profile` : 'Set Dog Profile'}
        </Button>
      </div>
    </Card>
  )
}

