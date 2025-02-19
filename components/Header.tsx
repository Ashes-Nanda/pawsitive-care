'use client'

import { useState } from 'react'
import { Bell, MessageCircle } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { Notification, Message } from '@/types/user'

// Mock data - replace with actual API calls
const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Vaccination Due',
    message: 'Max\'s rabies vaccination is due next week',
    timestamp: '2024-01-15T10:00:00Z',
    read: false,
    type: 'reminder'
  },
  {
    id: '2',
    title: 'Appointment Confirmed',
    message: 'Your appointment with Dr. Smith is confirmed for tomorrow',
    timestamp: '2024-01-14T15:30:00Z',
    read: false,
    type: 'appointment'
  }
]

const mockMessages: Message[] = [
  {
    id: '1',
    sender: 'Dr. Smith',
    content: 'Your pet\'s test results are ready',
    timestamp: '2024-01-15T09:00:00Z',
    read: false
  },
  {
    id: '2',
    sender: 'Reception',
    content: 'Reminder: Don\'t forget to bring Max\'s vaccination record',
    timestamp: '2024-01-14T14:00:00Z',
    read: true
  }
]

export default function Header() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
  const [messages, setMessages] = useState<Message[]>(mockMessages)

  const unreadNotifications = notifications.filter(n => !n.read).length
  const unreadMessages = messages.filter(m => !m.read).length

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    ))
  }

  const markMessageAsRead = (id: string) => {
    setMessages(messages.map(message =>
      message.id === id ? { ...message, read: true } : message
    ))
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    return new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)),
      'day'
    )
  }

  return (
    <header className="bg-zinc-800 p-4 flex justify-between items-center border-b border-zinc-700">
      <h1 className="text-2xl font-bold text-emerald-400 neon">Pawsitive Care Hub</h1>
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-zinc-700 transition-colors"
            >
              <Bell className="text-zinc-300" />
              {unreadNotifications > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <ScrollArea className="h-[400px] p-4">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`mb-4 p-3 rounded-lg ${
                      notification.read ? 'bg-zinc-800' : 'bg-zinc-700'
                    }`}
                    onClick={() => markNotificationAsRead(notification.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-emerald-400">{notification.title}</h3>
                      <span className="text-xs text-zinc-400">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 mt-1">{notification.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400 text-center">No notifications</p>
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-full hover:bg-zinc-700 transition-colors"
            >
              <MessageCircle className="text-zinc-300" />
              {unreadMessages > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-emerald-500 rounded-full" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <ScrollArea className="h-[400px] p-4">
              {messages.length > 0 ? (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`mb-4 p-3 rounded-lg ${
                      message.read ? 'bg-zinc-800' : 'bg-zinc-700'
                    }`}
                    onClick={() => markMessageAsRead(message.id)}
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-emerald-400">{message.sender}</h3>
                      <span className="text-xs text-zinc-400">
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-300 mt-1">{message.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-zinc-400 text-center">No messages</p>
              )}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>

        <Avatar className="h-8 w-8 hover:ring-2 hover:ring-emerald-500 transition-all">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Profile" />
          <AvatarFallback className="bg-emerald-500 bg-opacity-20 text-emerald-400">
            JD
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  )
}

