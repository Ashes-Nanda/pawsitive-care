'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronLeft, ChevronRight, LayoutDashboard, Stethoscope, Calendar, PawPrint, MessageSquare, User, MapPin, Fence, ActivitySquare, Home, Info, Heart, Settings, Map } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const pawsitiveItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/pawsitive/dashboard' },
  { icon: Stethoscope, label: 'Disease Detection', path: '/pawsitive/disease-detection' },
  { icon: Calendar, label: 'Vaccinations', path: '/pawsitive/vaccinations' },
  { icon: PawPrint, label: 'Breed Info', path: '/pawsitive/breed-info' },
  { icon: MessageSquare, label: 'PawPal', path: '/pawsitive/pawpal' },
  { icon: User, label: 'Profile', path: '/pawsitive/profile' },
]

const tailTrackerItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/tail-tracker/dashboard' },
  { icon: Fence, label: 'Geofence', path: '/tail-tracker/geofence' },
  { icon: ActivitySquare, label: 'Activity', path: '/tail-tracker/activity' },
]

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const pathname = usePathname()
  const isPawsitiveCare = pathname.startsWith('/pawsitive')
  const isTailTracker = pathname.startsWith('/tail-tracker')

  const menuItems = isPawsitiveCare ? pawsitiveItems : tailTrackerItems

  return (
    <div className={cn(
      "flex flex-col h-screen bg-zinc-800 text-zinc-100 transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h2 className="text-xl font-semibold text-emerald-400 neon">
            {isPawsitiveCare ? 'Pawsitive Care' : 'TailTracker'}
          </h2>
        )}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2 p-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.label}>
                <Link href={item.path} passHref>
                  <Button
                    variant={isActive ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "px-2" : "px-4",
                      isActive && "bg-emerald-500 text-zinc-900 hover:bg-emerald-600 hover:text-zinc-900"
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
                    {!collapsed && <span>{item.label}</span>}
                  </Button>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="p-4">
        <Link href="/" passHref>
          <Button variant="outline" className="w-full">
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="p-4">
        <Link href="/" passHref>
        <Button 
          variant="outline" 
          className="w-full mt-2 bg-green-500 text-white hover:bg-green-600" // Green button styling
          onClick={() => console.log('Sign Out clicked')} // Placeholder for sign out action
        >
          Sign Out
        </Button>
        </Link>
      </div>
    </div>
  )
}

