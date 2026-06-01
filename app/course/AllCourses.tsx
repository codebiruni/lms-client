/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  Search,
  BookOpen,
  Filter,
  ChevronDown,
  Bookmark,
  BookmarkCheck,
  Eye,
  GraduationCap,
  Tag,
  Sparkles,
  AlertCircle,
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import useFetchCourses from '../default/custom-component/useFeatchCourse'

export default function AllCourses() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [selectedLevel, setSelectedLevel] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilters, setShowFilters] = useState(false)

  // Debounce search
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      setCurrentPage(1)
    }, 500)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { courses, meta, isLoading, isFetching, error } = useFetchCourses({
    page: currentPage,
    limit: 30,
    search: debouncedSearch || undefined,
    level: selectedLevel || undefined,
    status: selectedStatus || undefined,
  })

  const handleCourseDetails = (courseId: string) => {
    router.push(`/course/details/${courseId}`)
  }

  const handleEnroll = (course: any) => {
    localStorage.setItem('selectedCourse', JSON.stringify(course))
    router.push(`/course/enroll/${course._id}`)
  }

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          {/* Header Skeleton */}
          <div className="mb-12">
            <Skeleton className="h-10 w-64 mb-2 rounded-lg" />
            <Skeleton className="h-5 w-96 rounded-lg" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-12 w-full rounded-2xl" />
          </div>

          {/* Filters Skeleton */}
          <div className="flex gap-3 mb-8">
            <Skeleton className="h-10 w-28 rounded-xl" />
            <Skeleton className="h-10 w-28 rounded-xl" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, i) => (
              <Card
                key={i}
                className="overflow-hidden border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-2xl"
              >
                <Skeleton className="h-40 w-full" />
                <CardHeader>
                  <Skeleton className="h-5 w-3/4 mb-2 rounded-lg" />
                  <Skeleton className="h-4 w-full rounded-lg mb-2" />
                  <Skeleton className="h-4 w-2/3 rounded-lg" />
                </CardHeader>
                <CardFooter className="gap-2">
                  <Skeleton className="h-10 w-full rounded-xl" />
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center px-4">
        <Card className="max-w-md w-full text-center p-8 border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-3xl">
          <div className="text-rose-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
            কোর্স লোড করা যায়নি
          </h3>
          <p className="text-emerald-900/70 dark:text-emerald-100/70 mb-6">
            {error.message || 'কোর্স আনতে সমস্যা হয়েছে'}
          </p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold"
          >
            আবার চেষ্টা করুন
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50 via-white to-emerald-50/80 dark:from-emerald-950 dark:via-gray-950 dark:to-emerald-950/80">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
                সকল কোর্স
              </h1>
              <p className="text-emerald-900/70 dark:text-emerald-100/70 text-base sm:text-lg">
                আপনার সন্তানের জন্য সেরা কোর্স খুঁজে নিন
              </p>
            </div>
            <Badge className="px-4 py-2 bg-white text-emerald-900 border border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-50 dark:border-emerald-900 rounded-full font-semibold w-fit">
              <BookOpen className="w-4 h-4 mr-2" />
              {meta.total} কোর্স
            </Badge>
          </div>

          {/* Search Section */}
          <div className="relative group">
            <div className="absolute inset-0 bg-emerald-100/20 dark:bg-emerald-900/20 rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />
            <div className="relative flex items-center bg-white dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-900 rounded-2xl focus-within:ring-2 focus-within:ring-emerald-600 focus-within:border-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md">
              <Search className="w-5 h-5 text-emerald-700/60 dark:text-emerald-300/60 ml-4" />
              <Input
                placeholder="কোর্স সার্চ করুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 h-12 bg-transparent border-0 focus:ring-0 text-emerald-950 dark:text-emerald-50 placeholder-emerald-900/40 dark:placeholder-emerald-100/40 rounded-r-2xl"
              />
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="border-emerald-200 dark:border-emerald-900 bg-white hover:bg-emerald-50 dark:bg-emerald-950 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-50 rounded-xl font-medium transition-colors">
                <Filter className="w-4 h-4 mr-2" />
                লেভেল
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl">
              <DropdownMenuItem onClick={() => setSelectedLevel('')}>
                সব লেভেল
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLevel('beginner')}>
                বিগিনার
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLevel('intermediate')}>
                ইন্টারমিডিয়েট
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedLevel('advanced')}>
                অ্যাডভান্সড
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="border-emerald-200 dark:border-emerald-900 bg-white hover:bg-emerald-50 dark:bg-emerald-950 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-50 rounded-xl font-medium transition-colors">
                <Tag className="w-4 h-4 mr-2" />
                স্ট্যাটাস
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="rounded-xl">
              <DropdownMenuItem onClick={() => setSelectedStatus('')}>
                সব স্ট্যাটাস
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('published')}>
                প্রকাশিত
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedStatus('draft')}>
                ড্রাফট
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {(selectedLevel || selectedStatus) && (
            <Button
              onClick={() => {
                setSelectedLevel('')
                setSelectedStatus('')
              }}
              className="bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 text-rose-700 dark:text-rose-400 rounded-xl font-medium transition-colors"
            >
              ফিল্টার রিসেট
            </Button>
          )}

          {isFetching && (
            <div className="flex items-center gap-2 text-sm text-emerald-900/60 dark:text-emerald-100/60 ml-auto">
              <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              আপডেট হচ্ছে...
            </div>
          )}
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-28 h-28 bg-white dark:bg-emerald-950 border-2 border-emerald-100 dark:border-emerald-900 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
              <BookOpen className="w-14 h-14 text-emerald-700/40 dark:text-emerald-300/40" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
              কোনো কোর্স পাওয়া যায়নি
            </h3>
            <p className="text-emerald-900/70 dark:text-emerald-100/70 text-base">
              আপনার অনুসন্ধান মানদণ্ড অনুযায়ী কোর্স পাওয়া যায়নি
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
              {courses.map((course: any) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onDetails={handleCourseDetails}
                  onEnroll={handleEnroll}
                />
              ))}
            </div>

            {/* Pagination */}
            {meta.total > meta.limit && (
              <div className="flex justify-center items-center gap-2 mt-12">
                <Button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-emerald-200 dark:border-emerald-900 bg-white hover:bg-emerald-50 dark:bg-emerald-950 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-50 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  পূর্ববর্তী
                </Button>

                <div className="flex items-center gap-1">
                  {[...Array(Math.min(5, Math.ceil(meta.total / meta.limit)))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={i}
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          currentPage === pageNum
                            ? 'w-10 h-10 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-semibold'
                            : 'w-10 h-10 border-emerald-200 dark:border-emerald-900 bg-white hover:bg-emerald-50 dark:bg-emerald-950 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-50 rounded-lg font-medium'
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage >= Math.ceil(meta.total / meta.limit)}
                  className="border-emerald-200 dark:border-emerald-900 bg-white hover:bg-emerald-50 dark:bg-emerald-950 dark:hover:bg-emerald-900/50 text-emerald-950 dark:text-emerald-50 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  পরবর্তী
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

// Course Card Component
function CourseCard({
  course,
  onDetails,
  onEnroll,
}: {
  course: any
  onDetails: (id: string) => void
  onEnroll: (id: string) => void
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-emerald-50 text-emerald-800 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-200 dark:border-emerald-900'
      case 'intermediate':
        return 'bg-amber-50 text-amber-800 border border-amber-100 dark:bg-amber-900/15 dark:text-amber-200 dark:border-amber-900/40'
      case 'advanced':
        return 'bg-rose-50 text-rose-800 border border-rose-100 dark:bg-rose-900/15 dark:text-rose-200 dark:border-rose-900/40'
      default:
        return 'bg-slate-50 text-slate-700 border border-slate-100 dark:bg-slate-900/20 dark:text-slate-200 dark:border-slate-800'
    }
  }

  const discountPercentage = course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0

  return (
    <Card
      className="group overflow-hidden py-0 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer bg-white dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail area - solid color instead of image */}
      <div className="relative h-40 overflow-hidden bg-linear-to-br from-emerald-100 to-emerald-50 dark:from-emerald-900/30 dark:to-emerald-950 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-100 dark:group-hover:from-emerald-800/40 dark:group-hover:to-emerald-900 transition-all duration-300">
        <div className="text-center">
          <BookOpen className="w-12 h-12 text-emerald-700/30 dark:text-emerald-300/20 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
          <p className="text-xs text-emerald-900/40 dark:text-emerald-100/30 font-medium">
            {course.category?.name || 'কোর্স'}
          </p>
        </div>

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-3 left-3">
            <Badge className="bg-rose-600 text-white border-0 font-bold">
              -{discountPercentage}%
            </Badge>
          </div>
        )}

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsBookmarked(!isBookmarked)
            toast.success(isBookmarked ? 'বুকমার্ক থেকে সরানো হয়েছে' : 'বুকমার্কে যোগ হয়েছে')
          }}
          className="absolute top-3 right-3 p-2.5 bg-white/95 dark:bg-emerald-950/90 rounded-xl border border-emerald-100 dark:border-emerald-900 backdrop-blur-sm transition-all hover:scale-110 hover:shadow-lg"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 text-emerald-700 dark:text-emerald-300" />
          ) : (
            <Bookmark className="w-5 h-5 text-emerald-900/60 dark:text-emerald-100/60" />
          )}
        </button>
      </div>

      <CardHeader className="p-4 pb-2">
        {/* Category Badge */}
        {course.category?.name && (
          <div className="flex items-center justify-between gap-2 mb-2">
            <Badge className="text-xs bg-emerald-50 text-emerald-900 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-50 dark:border-emerald-900 rounded-lg font-medium">
              {course.category.name}
            </Badge>
            {course.level && (
              <Badge className={`${getLevelColor(course.level)} text-xs font-semibold rounded-lg`}>
                {course.level}
              </Badge>
            )}
          </div>
        )}

        {/* Title */}
        <h3 className="text-base font-bold text-emerald-950 dark:text-emerald-50 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors mb-2">
          {course.title}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          {course.isFree ? (
            <Badge className="bg-emerald-700 text-white text-xs font-semibold rounded-lg">
              <Sparkles className="w-3 h-3 mr-1" />
              ফ্রি
            </Badge>
          ) : (
            <div className="flex items-center gap-1 text-sm">
              {course.discountPrice ? (
                <>
                  <span className="line-through text-emerald-900/50 dark:text-emerald-100/50 text-xs font-medium">
                    ৳{course.price}
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-300">
                    ৳{course.discountPrice}
                  </span>
                </>
              ) : (
                <span className="font-bold text-emerald-700 dark:text-emerald-300">
                  ৳{course.price}
                </span>
              )}
            </div>
          )}
        </div>
      </CardHeader>

      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button
          onClick={() => onDetails(course._id)}
          className="flex-1 gap-2 border-emerald-200 dark:border-emerald-900 bg-white hover:bg-emerald-50 dark:bg-emerald-950 dark:hover:bg-emerald-900/30 text-emerald-950 dark:text-emerald-50 rounded-xl font-medium transition-all"
        >
          <Eye className="w-4 h-4" />
          বিস্তারিত
        </Button>

        <Button
          onClick={() => onEnroll(course)}
          className="flex-1 gap-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-medium transition-all shadow-sm hover:shadow-md"
        >
          <GraduationCap className="w-4 h-4" />
          ভর্তি হন
        </Button>
      </CardFooter>

      {/* Hover effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-black/5 dark:bg-white/5 pointer-events-none rounded-2xl" />
      )}
    </Card>
  )
}