/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect } from 'react'
import { 
  User, 
  Calendar,
  Clock,
  Sparkles
} from 'lucide-react'
import { format } from 'date-fns'
import { bn } from 'date-fns/locale'

// Shadcn/ui imports
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import useContextData from '@/app/default/custom-component/useContextData'

export default function ProfileHeader() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [greeting, setGreeting] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  const { UserData } = useContextData()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const now = new Date()
    const formattedDate = format(now, 'dd MMMM, yyyy', { locale: bn })
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentDate(formattedDate)

    const hour = now.getHours()
    if (hour < 12) setGreeting('শুভ সকাল')
    else if (hour < 18) setGreeting('শুভ বিকাল')
    else setGreeting('শুভ সন্ধ্যা')
  }, [])

  const formattedTime = format(currentTime, 'hh:mm:ss a')

  const getInitials = (name: string) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const userName = UserData?.name || UserData?.user?.name || 'User'
  const userAvatar = UserData?.avatar || UserData?.user?.image || ''

  return (
    <div className="w-full py-6">
      <div className="container mx-auto px-2">
        <div className="relative w-full h-50 rounded-xl overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-600 shadow-lg">
          
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />
          
          {/* Dots Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 2px, transparent 2px)`,
            backgroundSize: '30px 30px'
          }} />

          {/* Content */}
          <div className="relative h-full flex items-center justify-between px-8 md:px-12">
            <div className="flex items-center gap-5">
              {/* Avatar */}
              <Avatar className="w-16 h-16 border-2 border-white/30 shadow-lg">
                {userAvatar ? (
                  <AvatarImage src={userAvatar} alt={userName} />
                ) : (
                  <AvatarFallback className="bg-white/20 backdrop-blur-sm text-white text-xl font-bold">
                    {getInitials(userName)}
                  </AvatarFallback>
                )}
              </Avatar>
              
              {/* Text */}
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                  {userName}
                </h1>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm">{currentDate}</span>
                  </div>
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm">{formattedTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Greeting */}
            <div className="hidden md:flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span className="text-white/90 text-sm">{greeting}!</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}