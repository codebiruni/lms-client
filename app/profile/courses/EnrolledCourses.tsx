'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  BookOpen, 
  Clock, 
  ChevronRight,
  PlayCircle,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Progress } from '@/components/ui/progress'

import GETDATA from '@/app/default/functions/GetData'

interface EnrolledCourse {
  _id: string
  course: {
    _id: string
    title: string
    slug: string
    description: string
    thumbnail: string
    price: number
    discountPrice: number
    isFree: boolean
    durationInHours: number
    totalLessons: number
    level: string
    status: string
  }
  enrollmentStatus: string
  paymentStatus: string
  totalAmount: number
  paidAmount: number
  dueAmount: number
  progress: number
  enrollmentDate: string
}

export default function EnrolledCourses() {
  const router = useRouter()
  const [courses, setCourses] = useState<EnrolledCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async (refresh = false) => {
    if (refresh) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      // Check localStorage first
      const cachedData = localStorage.getItem('enrolledCourses')
      const cachedTimestamp = localStorage.getItem('enrolledCoursesTimestamp')
      
      if (!refresh && cachedData && cachedTimestamp) {
        const timestamp = parseInt(cachedTimestamp)
        const now = Date.now()
        const cacheAge = now - timestamp
        const cacheDuration = 5 * 60 * 1000 // 5 minutes cache
        
        if (cacheAge < cacheDuration) {
          setCourses(JSON.parse(cachedData))
          if (!refresh) {
            setIsLoading(false)
            setIsRefreshing(false)
            return
          }
        }
      }

      // Fetch from API
      const response = await GETDATA('/v1/course/enrolled/courses')
      
      if (response.success && response.data) {
        setCourses(response.data)
        // Store in localStorage
        localStorage.setItem('enrolledCourses', JSON.stringify(response.data))
        localStorage.setItem('enrolledCoursesTimestamp', Date.now().toString())
      } else {
        toast.error(response.message || 'Failed to load enrolled courses')
      }
    } catch (error) {
      console.error('Error loading enrolled courses:', error)
      toast.error('An error occurred while loading your courses')
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  const handleCourseClick = (courseId: string) => {
    router.push(`/profile/courses/${courseId}`)
  }

  const handleRefresh = () => {
    loadCourses(true)
  }

  const getLevelColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'advanced':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'partial':
        return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'pending':
        return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Paid'
      case 'partial': return 'Partial'
      case 'pending': return 'Pending'
      default: return status
    }
  }

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 pb-20">
        <div className="px-4 py-6">
          {/* Header Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-8 w-40 mb-2" />
            <Skeleton className="h-4 w-56" />
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <Skeleton className="h-20 rounded-xl" />
            <Skeleton className="h-20 rounded-xl" />
          </div>

          {/* Course Cards Skeleton */}
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="flex gap-3 p-4">
                  <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="px-4 py-6">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Enrolled Courses
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              You haven`t enrolled in any courses yet.
            </p>
            <Button 
              onClick={() => router.push('/profile/all-courses')}
              className="bg-linear-to-r from-blue-600 to-indigo-600 text-white"
            >
              Browse Courses
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Calculate stats
  const totalCourses = courses.length
  const completedCourses = courses.filter(c => c.progress === 100).length
  const inProgressCourses = courses.filter(c => c.progress > 0 && c.progress < 100).length

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="px-4 py-6 pb-20">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                My Courses
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Continue your learning journey
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="text-gray-500"
            >
              {isRefreshing ? (
                <div className="w-4 h-4 border-2 border-gray-500 border-t-transparent rounded-full animate-spin" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Stats Cards grid */}
        <div className="hidden grid-cols-3 gap-3 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {totalCourses}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Total</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {inProgressCourses}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">In Progress</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-3 text-center shadow-sm">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {completedCourses}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Completed</div>
          </div>
        </div>

        {/* Course List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {courses.map((enrollment) => (
            <Card 
              key={enrollment._id}
              className="overflow-hidden active:scale-[0.98] transition-transform duration-200 cursor-pointer border-0 shadow-md"
              onClick={() => handleCourseClick(enrollment.course._id)}
            >
              <div className="flex gap-3 p-4">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600">
                  {enrollment.course.thumbnail ? (
                    <Image
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <BookOpen className="w-8 h-8 text-white/50" />
                    </div>
                  )}
                  {enrollment.progress === 100 && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-green-400" />
                    </div>
                  )}
                </div>

                {/* Course Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white text-base line-clamp-1">
                        {enrollment.course.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge className={getLevelColor(enrollment.course.level)}>
                          {enrollment.course.level}
                        </Badge>
                        <Badge className={getPaymentStatusColor(enrollment.paymentStatus)}>
                          {getPaymentStatusText(enrollment.paymentStatus)}
                        </Badge>
                        {enrollment.course.isFree && (
                          <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            Free
                          </Badge>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400 shrink-0" />
                  </div>

                  {/* Course Meta */}
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{enrollment.course.durationInHours} hrs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-3 h-3" />
                      <span>{enrollment.course.totalLessons} lessons</span>
                    </div>
                  </div>

                  

                  {/* Payment Info (if partial payment) */}
                  {enrollment.paymentStatus === 'partial' && enrollment.dueAmount > 0 && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                      <AlertCircle className="w-3 h-3" />
                      <span>Due: ৳{enrollment.dueAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Continue Learning Button */}
        {inProgressCourses > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800">
            <Button 
              onClick={() => {
                const firstInProgress = courses.find(c => c.progress > 0 && c.progress < 100)
                if (firstInProgress) {
                  handleCourseClick(firstInProgress.course._id)
                }
              }}
              className="w-full bg-linear-to-r from-blue-600 to-indigo-600 text-white"
            >
              <PlayCircle className="w-4 h-4 mr-2" />
              Continue Learning
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}