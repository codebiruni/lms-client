/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState, useEffect } from 'react'
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Sparkles,
  ChevronRight,
  CalendarDays,
  TrendingUp,
  Loader2
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from '@/components/ui/tooltip'

import GETDATA from '@/app/default/functions/GetData'
import POSTDATA from '@/app/default/functions/Post'

interface Attendance {
  _id: string
  courseId: {
    _id: string
    title: string
    slug: string
    thumbnail: string
  }
  liveClassId: {
    _id: string
    title: string
    meetingPlatform: string
    startTime: string
    endTime: string
  }
  studentId: string
  status: 'present' | 'absent' | 'late'
  joinedAt: string
  leftAt?: string
  createdAt: string
}

interface JoinedClass {
  courseId: string
  liveClassId: string
  joinedAt: string
}

interface GroupedAttendance {
  date: string
  records: Attendance[]
  presentCount: number
  absentCount: number
  lateCount: number
  totalCount: number
}

export default function StudentAttendance() {
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [groupedData, setGroupedData] = useState<GroupedAttendance[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [joinedClasses, setJoinedClasses] = useState<JoinedClass[]>([])
  const [stats, setStats] = useState({
    total: 0,
    present: 0,
    absent: 0,
    late: 0,
    attendanceRate: 0
  })

  useEffect(() => {
    // Load joined classes from localStorage (from StudentClasses component)
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

    loadAttendances()
  }, [])

  const loadAttendances = async () => {
    // Check localStorage for cached data
    const cachedData = localStorage.getItem('attendances')
    const cachedTimestamp = localStorage.getItem('attendancesTimestamp')
    
    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp)
      const now = Date.now()
      const cacheAge = now - timestamp
      
      // Use cached data if less than 5 minutes old
      if (cacheAge < 5 * 60 * 1000) {
        const parsedData = JSON.parse(cachedData)
        setAttendances(parsedData)
        processAttendanceData(parsedData)
        setIsLoading(false)
      }
    }

    try {
      const response = await GETDATA('/v1/attendance/student/attendance')
      
      if (response.success && response.data) {
        setAttendances(response.data)
        processAttendanceData(response.data)
        // Store in localStorage
        localStorage.setItem('attendances', JSON.stringify(response.data))
        localStorage.setItem('attendancesTimestamp', Date.now().toString())
      } else {
        toast.error(response.message || 'Failed to load attendance')
      }
    } catch (error) {
      console.error('Error loading attendance:', error)
      toast.error('An error occurred while loading attendance')
    } finally {
      setIsLoading(false)
    }
  }

  const syncAttendanceFromJoinedClasses = async () => {
    if (joinedClasses.length === 0) {
      toast.info('No joined classes found to sync')
      return
    }

    setIsSyncing(true)
    let syncedCount = 0
    let errorCount = 0

    for (const joinedClass of joinedClasses) {
      // Check if attendance already exists
      const existingAttendance = attendances.find(
        att => att.liveClassId._id === joinedClass.liveClassId
      )

      if (!existingAttendance) {
        try {
          const attendanceData = {
            courseId: joinedClass.courseId,
            liveClassId: joinedClass.liveClassId,
            joinedAt: joinedClass.joinedAt,
            status: 'present'
          }

          const response = await POSTDATA('/v1/attendance/student', attendanceData)
          
          if (response.success) {
            syncedCount++
          } else {
            errorCount++
            console.error('Failed to sync attendance:', response.message)
          }
        } catch (error) {
          errorCount++
          console.error('Error syncing attendance:', error)
        }
      }
    }

    if (syncedCount > 0) {
      toast.success(`Successfully synced ${syncedCount} attendance records`)
      // Reload attendance data
      await loadAttendances()
      // Clear synced joined classes from localStorage
      const remainingJoined = joinedClasses.filter(jc => {
        const hasAttendance = attendances.some(att => att.liveClassId._id === jc.liveClassId)
        return !hasAttendance
      })
      localStorage.setItem('joinedClasses', JSON.stringify(remainingJoined))
      setJoinedClasses(remainingJoined)
    } else if (errorCount > 0) {
      toast.error(`Failed to sync ${errorCount} records. Please try again.`)
    } else {
      toast.info('All attendance records are already synced')
    }

    setIsSyncing(false)
  }

  const processAttendanceData = (data: Attendance[]) => {
    // Group by date
    const grouped: { [key: string]: Attendance[] } = {}
    
    data.forEach(record => {
      const date = format(new Date(record.joinedAt), 'yyyy-MM-dd')
      if (!grouped[date]) {
        grouped[date] = []
      }
      grouped[date].push(record)
    })

    const groupedArray: GroupedAttendance[] = Object.entries(grouped).map(([date, records]) => {
      const presentCount = records.filter(r => r.status === 'present').length
      const absentCount = records.filter(r => r.status === 'absent').length
      const lateCount = records.filter(r => r.status === 'late').length
      
      return {
        date,
        records,
        presentCount,
        absentCount,
        lateCount,
        totalCount: records.length
      }
    }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    setGroupedData(groupedArray)

    // Calculate overall stats
    const total = data.length
    const present = data.filter(r => r.status === 'present').length
    const absent = data.filter(r => r.status === 'absent').length
    const late = data.filter(r => r.status === 'late').length
    const attendanceRate = total > 0 ? Math.round((present / total) * 100) : 0

    setStats({
      total,
      present,
      absent,
      late,
      attendanceRate
    })
  }

  const formatDateDisplay = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'EEEE, MMMM d, yyyy')
  }

  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return format(date, 'h:mm a')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'absent':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'late':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Present</Badge>
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">Absent</Badge>
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">Late</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>

          <Skeleton className="h-20 rounded-xl mb-6" />

          <div className="space-y-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6 pb-20">
        {/* Header with Sync Button */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              My Attendance
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Track your class attendance history
            </p>
          </div>
          
          {joinedClasses.length > 0 && (
            <Button
              onClick={syncAttendanceFromJoinedClasses}
              disabled={isSyncing}
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white"
            >
              {isSyncing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Sync Attendance ({joinedClasses.length})
                </>
              )}
            </Button>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className=" py-0 bg-linear-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Total Classes</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <CalendarDays className="w-8 h-8 text-white/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className=" py-0 bg-linear-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Present</p>
                  <p className="text-2xl font-bold">{stats.present}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-white/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className=" py-0 bg-linear-to-br from-red-500 to-red-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Absent</p>
                  <p className="text-2xl font-bold">{stats.absent}</p>
                </div>
                <XCircle className="w-8 h-8 text-white/50" />
              </div>
            </CardContent>
          </Card>
          
          <Card className=" py-0 bg-linear-to-br from-yellow-500 to-yellow-600 text-white">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm">Late</p>
                  <p className="text-2xl font-bold">{stats.late}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-white/50" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Attendance Rate */}
        <Card className=" py-0 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Attendance Rate</span>
              </div>
              <span className="text-lg font-bold text-gray-900 dark:text-white">{stats.attendanceRate}%</span>
            </div>
            <Progress value={stats.attendanceRate} className="h-2" />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              {stats.attendanceRate >= 75 
                ? '🎉 Great job! Keep up the good attendance!' 
                : stats.attendanceRate >= 50 
                ? '📚 Good attendance. Try to attend more classes!'
                : '⚠️ Your attendance needs improvement. Please attend more classes!'}
            </p>
          </CardContent>
        </Card>

        {/* Pending Sync Notice */}
        {joinedClasses.length > 0 && !isSyncing && (
          <Card className=" py-0 mb-6 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                    Pending Attendance Sync
                  </p>
                  <p className="text-xs text-yellow-700 dark:text-yellow-400">
                    You have {joinedClasses.length} class{joinedClasses.length !== 1 ? 'es' : ''} that need to be synced. Click the sync button above to mark your attendance.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Attendance List */}
        {groupedData.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No Attendance Records
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Your attendance history will appear here after you join classes and sync attendance.
            </p>
            {joinedClasses.length > 0 && (
              <Button
                onClick={syncAttendanceFromJoinedClasses}
                className="mt-4 bg-linear-to-r from-blue-600 to-indigo-600 text-white"
              >
                Sync Now
              </Button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {groupedData.map((group) => (
              <Card key={group.date} className="py-0 overflow-hidden">
                {/* Date Header */}
                <div 
                  className="bg-gray-50 dark:bg-gray-800/50 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setSelectedDate(selectedDate === group.date ? null : group.date)}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {formatDateDisplay(group.date)}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {group.totalCount} class{group.totalCount !== 1 ? 'es' : ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {group.presentCount > 0 && (
                        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          {group.presentCount} Present
                        </Badge>
                      )}
                      {group.absentCount > 0 && (
                        <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          {group.absentCount} Absent
                        </Badge>
                      )}
                      {group.lateCount > 0 && (
                        <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                          {group.lateCount} Late
                        </Badge>
                      )}
                      <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${selectedDate === group.date ? 'rotate-90' : ''}`} />
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedDate === group.date && (
                  <CardContent className="p-4 space-y-3 border-t border-gray-100 dark:border-gray-800">
                    {group.records.map((record) => (
                      <TooltipProvider key={record._id}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/30 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {getStatusIcon(record.status)}
                                <div className="flex-1 min-w-0">
                                  <p className="font-medium text-gray-900 dark:text-white text-sm">
                                    {record.liveClassId.title}
                                  </p>
                                  <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {record.courseId.title}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                                    <Clock className="w-3 h-3" />
                                    <span>{formatTime(record.joinedAt)}</span>
                                  </div>
                                </div>
                              </div>
                              {getStatusBadge(record.status)}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent side="left" className="max-w-sm">
                            <div className="space-y-2">
                              <p className="font-semibold">{record.liveClassId.title}</p>
                              <p className="text-sm">Course: {record.courseId.title}</p>
                              <p className="text-sm">Status: {record.status}</p>
                              <p className="text-sm">Joined at: {format(new Date(record.joinedAt), 'PPP p')}</p>
                              {record.leftAt && (
                                <p className="text-sm">Left at: {format(new Date(record.leftAt), 'PPP p')}</p>
                              )}
                              <p className="text-sm">Platform: {record.liveClassId.meetingPlatform}</p>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}