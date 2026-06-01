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
    <div className="min-h-screen bg-linear-to-b   dark:from-white-950 dark:via-gray-950 dark:to-white-950/80">
      <div className="px-4 py-8 pb-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
                Enrolled Courses
              </h1>
              <p className="text-emerald-900/70 dark:text-emerald-100/70 text-base sm:text-md">
                {totalCourses} Courses Enrolled
              </p>
            </div>
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-900/20 dark:hover:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900 rounded-xl transition-all"
            >
              {isRefreshing ? (
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <TrendingUp className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Course Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-white dark:bg-emerald-950 border-2 border-emerald-100 dark:border-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-10 h-10 text-emerald-700/40 dark:text-emerald-300/40" />
            </div>
            <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50 mb-2">
              কোনো কোর্স নেই
            </h3>
            <p className="text-emerald-900/70 dark:text-emerald-100/70">
              এখন একটি কোর্সে ভর্তি হতে শুরু করুন
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((enrollment) => (
              <Card
                key={enrollment._id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-2xl"
              >
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950 flex items-center justify-center group">
                  {enrollment.course.thumbnail ? (
                    <Image
                      src={enrollment.course.thumbnail}
                      alt={enrollment.course.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <BookOpen className="w-12 h-12 text-emerald-700/30 dark:text-emerald-300/20 group-hover:scale-110 transition-transform duration-300" />
                      {/* <p className="text-xs text-emerald-900/40 dark:text-emerald-100/30 font-medium">
                        {enrollment.course.category?.name || 'কোর্স'}
                      </p> */}
                    </div>
                  )}

                  {/* Completion Badge */}
                  {enrollment.progress === 100 && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center">
                        <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                        <p className="text-white text-sm font-bold">সম্পন্ন</p>
                      </div>
                    </div>
                  )}

                  {/* Progress Badge */}
                  {enrollment.progress > 0 && enrollment.progress < 100 && (
                    <div className="absolute top-3 right-3 bg-white/95 dark:bg-emerald-950/90 backdrop-blur-sm px-3 py-1 rounded-full border border-emerald-100 dark:border-emerald-900">
                      <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                        {Math.round(enrollment.progress)}%
                      </p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  {/* Title */}
                  <div>
                    <h3 className="font-bold text-emerald-950 dark:text-emerald-50 text-base line-clamp-2 mb-2">
                      {enrollment.course.title}
                    </h3>

                    {/* Badges */}
                    <div className="flex flex-wrap gap-2">
                      <Badge className={getLevelColor(enrollment.course.level)}>
                        {enrollment.course.level}
                      </Badge>
                      <Badge className={getPaymentStatusColor(enrollment.paymentStatus)}>
                        {getPaymentStatusText(enrollment.paymentStatus)}
                      </Badge>
                      {enrollment.course.isFree && (
                        <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-lg text-xs font-semibold">
                          ফ্রি
                        </Badge>
                      )}
                    </div>
                  </div>

                  {/* Progress Bar */}
                  {enrollment.progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-emerald-900/70 dark:text-emerald-100/70 font-medium">
                          অগ্রগতি
                        </span>
                        <span className="text-emerald-700 dark:text-emerald-300 font-bold">
                          {Math.round(enrollment.progress)}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden border border-emerald-200 dark:border-emerald-900">
                        <div
                          className="h-full bg-linear-to-r from-emerald-600 to-emerald-500 dark:from-emerald-500 dark:to-emerald-400 transition-all duration-500"
                          style={{ width: `${enrollment.progress}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Course Meta */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-emerald-900/70 dark:text-emerald-100/70 pt-2 border-t border-emerald-100 dark:border-emerald-900">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                      <span className="font-medium">{enrollment.course.durationInHours} ঘন্টা</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <PlayCircle className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                      <span className="font-medium">{enrollment.course.totalLessons} পাঠ</span>
                    </div>
                  </div>

                  {/* Due Amount Warning */}
                  {enrollment.paymentStatus === 'partial' && enrollment.dueAmount > 0 && (
                    <div className="bg-amber-50 dark:bg-amber-900/15 border border-amber-200 dark:border-amber-900/40 rounded-lg p-3 flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-amber-700 dark:text-amber-300">
                          বকেয়া টাকা
                        </p>
                        <p className="text-sm font-bold text-amber-900 dark:text-amber-200">
                          ৳{enrollment.dueAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Continue Learning Button */}
        {inProgressCourses > 0 && (
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/95 dark:bg-emerald-950/95 backdrop-blur-xl border-t border-emerald-100 dark:border-emerald-900">
            <div className="max-w-7xl mx-auto">
              <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold py-6 shadow-lg hover:shadow-xl transition-all">
                <PlayCircle className="w-5 h-5 mr-2" />
                শেখা চালিয়ে যান
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}