/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Video, 
  Clock, 
  Calendar, 
  MapPin,
  ExternalLink,
  Users,
  PlayCircle,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Sparkles,
  Monitor,
  Headphones
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import GETDATA from '@/app/default/functions/GetData'

interface LiveClass {
  _id: string
  courseId: {
    _id: string
    title: string
    slug: string
    thumbnail: string
  }
  sectionId: {
    _id: string
    title: string
  }
  instructorId: string
  title: string
  description: string
  meetingLink: string
  meetingPlatform: string
  startTime: string
  endTime: string
  isRecorded: boolean
  recordingUrl: string
  isCancelled: boolean
  createdAt: string
}

interface JoinedClass {
  courseId: string
  liveClassId: string
  joinedAt: string
}

export default function StudentClasses() {
  const router = useRouter()
  const [classes, setClasses] = useState<LiveClass[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming')
  const [joinedClasses, setJoinedClasses] = useState<JoinedClass[]>([])

  useEffect(() => {
    // Load joined classes from localStorage
    const storedJoined = localStorage.getItem('joinedClasses')
    if (storedJoined) {
      try {
        const parsed = JSON.parse(storedJoined)
        // Filter out expired entries (older than 4 hours)
        const now = Date.now()
        const validJoined = parsed.filter((item: JoinedClass) => {
          const joinedTime = new Date(item.joinedAt).getTime()
          return now - joinedTime < 4 * 60 * 60 * 1000 // 4 hours
        })
        setJoinedClasses(validJoined)
        localStorage.setItem('joinedClasses', JSON.stringify(validJoined))
      } catch (error) {
        console.error('Error parsing joined classes:', error)
      }
    }

    loadClasses()
  }, [])

  const loadClasses = async () => {
    // Check localStorage for cached data
    const cachedData = localStorage.getItem('studentClasses')
    const cachedTimestamp = localStorage.getItem('studentClassesTimestamp')
    
    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp)
      const now = Date.now()
      const cacheAge = now - timestamp
      
      // Use cached data if less than 5 minutes old
      if (cacheAge < 5 * 60 * 1000) {
        setClasses(JSON.parse(cachedData))
        setIsLoading(false)
      }
    }

    try {
      const response = await GETDATA('/v1/live-class/student/classes')
      
      if (response.success && response.data) {
        setClasses(response.data)
        // Store in localStorage
        localStorage.setItem('studentClasses', JSON.stringify(response.data))
        localStorage.setItem('studentClassesTimestamp', Date.now().toString())
      } else {
        toast.error(response.message || 'Failed to load classes')
      }
    } catch (error) {
      console.error('Error loading classes:', error)
      toast.error('An error occurred while loading classes')
    } finally {
      setIsLoading(false)
    }
  }

  const handleJoinClass = (liveClass: LiveClass) => {
    // Store joined class info in localStorage
    const joinedInfo: JoinedClass = {
      courseId: liveClass.courseId._id,
      liveClassId: liveClass._id,
      joinedAt: new Date().toISOString()
    }

    const existingJoined = localStorage.getItem('joinedClasses')
    let joinedList: JoinedClass[] = existingJoined ? JSON.parse(existingJoined) : []
    
    // Add new joined class
    joinedList.push(joinedInfo)
    
    // Remove entries older than 4 hours
    const now = Date.now()
    joinedList = joinedList.filter(item => {
      const joinedTime = new Date(item.joinedAt).getTime()
      return now - joinedTime < 4 * 60 * 60 * 1000
    })
    
    localStorage.setItem('joinedClasses', JSON.stringify(joinedList))
    setJoinedClasses(joinedList)

    // Open meeting link
    if (liveClass.meetingLink) {
      window.open(liveClass.meetingLink, '_blank')
      toast.success('Joining class...', {
        description: `You are joining ${liveClass.title}`,
      })
    } else {
      toast.error('Meeting link not available')
    }
  }

  const hasJoinedClass = (liveClassId: string): boolean => {
    return joinedClasses.some(item => item.liveClassId === liveClassId)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isClassLive = (startTime: string, endTime: string): boolean => {
    const now = new Date()
    const start = new Date(startTime)
    const end = new Date(endTime)
    return now >= start && now <= end
  }

  const isClassUpcoming = (startTime: string): boolean => {
    return new Date(startTime) > new Date()
  }

  const isClassPast = (endTime: string): boolean => {
    return new Date(endTime) < new Date()
  }

  const getClassStatus = (liveClass: LiveClass) => {
    if (liveClass.isCancelled) {
      return { text: 'Cancelled', color: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', icon: AlertCircle }
    }
    if (isClassLive(liveClass.startTime, liveClass.endTime)) {
      return { text: 'Live Now', color: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', icon: PlayCircle }
    }
    if (isClassUpcoming(liveClass.startTime)) {
      return { text: 'Upcoming', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', icon: Clock }
    }
    return { text: 'Completed', color: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', icon: CheckCircle }
  }

  const upcomingClasses = classes.filter(c => !c.isCancelled && isClassUpcoming(c.startTime))
  const pastClasses = classes.filter(c => !c.isCancelled && isClassPast(c.endTime))
  const liveClasses = classes.filter(c => !c.isCancelled && isClassLive(c.startTime, c.endTime))

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="px-4 py-6">
          {/* Header Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>

          {/* Live Classes Banner Skeleton */}
          <Skeleton className="h-24 rounded-xl mb-6" />

          {/* Tabs Skeleton */}
          <div className="flex gap-2 mb-6">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </div>

          {/* Cards Skeleton */}
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="p-4">
                  <div className="flex gap-3">
                    <Skeleton className="w-16 h-16 rounded-lg shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="px-4 py-6 pb-20">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
            Live Classes
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Join your scheduled live sessions
          </p>
        </div>

        {/* Live Now Banner */}
        {liveClasses.length > 0 && (
          <div className="mb-6 bg-linear-to-r from-red-500 to-orange-500 rounded-xl p-4 shadow-lg animate-pulse">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <PlayCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white/80 text-xs">Live Now</p>
                  <p className="text-white font-semibold">{liveClasses.length} class{liveClasses.length > 1 ? 'es' : ''} in progress</p>
                </div>
              </div>
              <Badge className="bg-white text-red-600 animate-pulse">
                LIVE
              </Badge>
            </div>
          </div>
        )}

        {/* Tabs */}
        <Tabs defaultValue="upcoming" className="w-full" onValueChange={(v) => setActiveTab(v as 'upcoming' | 'past')}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Upcoming ({upcomingClasses.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Past ({pastClasses.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingClasses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Upcoming Classes
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  You don`t have any scheduled classes at the moment.
                </p>
              </div>
            ) : (
              upcomingClasses.map((liveClass) => (
                <ClassCard
                  key={liveClass._id}
                  liveClass={liveClass}
                  onJoin={handleJoinClass}
                  hasJoined={hasJoinedClass(liveClass._id)}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  getClassStatus={getClassStatus}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastClasses.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Video className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No Past Classes
                </h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Your completed classes will appear here.
                </p>
              </div>
            ) : (
              pastClasses.map((liveClass) => (
                <ClassCard
                  key={liveClass._id}
                  liveClass={liveClass}
                  onJoin={handleJoinClass}
                  hasJoined={hasJoinedClass(liveClass._id)}
                  formatDate={formatDate}
                  formatTime={formatTime}
                  getClassStatus={getClassStatus}
                  isPast={true}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

// Class Card Component
function ClassCard({ 
  liveClass, 
  onJoin, 
  hasJoined, 
  formatDate, 
  formatTime, 
  getClassStatus,
  isPast = false
}: { 
  liveClass: LiveClass
  onJoin: (liveClass: LiveClass) => void
  hasJoined: boolean
  formatDate: (date: string) => string
  formatTime: (date: string) => string
  getClassStatus: (liveClass: LiveClass) => { text: string; color: string; icon: any }
  isPast?: boolean
}) {
  const status = getClassStatus(liveClass)
  const StatusIcon = status.icon
  const isLive = status.text === 'Live Now'

  return (
    <Card className={`overflow-hidden border-0 shadow-md transition-all duration-300 ${isLive ? 'ring-2 ring-red-500' : ''}`}>
      <div className="flex flex-col sm:flex-row gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-24 h-32 sm:h-24 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600">
          {liveClass.courseId.thumbnail ? (
            <Image
              src={liveClass.courseId.thumbnail}
              alt={liveClass.courseId.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Video className="w-8 h-8 text-white/50" />
            </div>
          )}
          {isLive && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
              <div className="absolute top-2 right-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 flex-wrap">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-1">
                {liveClass.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                {liveClass.courseId.title}
              </p>
            </div>
            <Badge className={status.color}>
              <StatusIcon className="w-3 h-3 mr-1" />
              {status.text}
            </Badge>
          </div>

          {/* Date & Time */}
          <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{formatDate(liveClass.startTime)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{formatTime(liveClass.startTime)} - {formatTime(liveClass.endTime)}</span>
            </div>
          </div>

          {/* Description */}
          {liveClass.description && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
              {liveClass.description}
            </p>
          )}

          {/* Meeting Platform */}
          <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
            <Monitor className="w-3 h-3" />
            <span className="capitalize">{liveClass.meetingPlatform}</span>
          </div>
        </div>

        {/* Action Button */}
        <div className="shrink-0">
          {!isPast && !liveClass.isCancelled && (
            <Button
              onClick={() => onJoin(liveClass)}
              className={`w-full sm:w-auto ${
                isLive 
                  ? 'bg-linear-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 animate-pulse'
                  : 'bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
              } text-white`}
            >
              {hasJoined ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Joined
                </>
              ) : (
                <>
                  <PlayCircle className="w-4 h-4 mr-2" />
                  {isLive ? 'Join Now' : 'Join Class'}
                </>
              )}
            </Button>
          )}
          {isPast && liveClass.recordingUrl && (
            <Button
              variant="outline"
              onClick={() => window.open(liveClass.recordingUrl, '_blank')}
              className="w-full sm:w-auto"
            >
              <Video className="w-4 h-4 mr-2" />
              Watch Recording
            </Button>
          )}
          {liveClass.isCancelled && (
            <Button disabled variant="outline" className="w-full sm:w-auto opacity-50">
              <AlertCircle className="w-4 h-4 mr-2" />
              Cancelled
            </Button>
          )}
        </div>
      </div>
    </Card>
  )
}