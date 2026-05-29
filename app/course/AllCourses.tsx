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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          <div className="mb-8">
            <Skeleton className="h-10 w-64 mb-2" />
            <Skeleton className="h-5 w-96" />
          </div>

          {/* Search Bar Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>

          {/* Filters Skeleton */}
          <div className="flex gap-3 mb-8">
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
            <Skeleton className="h-10 w-28 rounded-lg" />
          </div>

          {/* Cards Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950">
                <Skeleton className="h-48 w-full" />
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardHeader>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
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
      <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center">
        <Card className="max-w-md text-center p-8 border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">কোর্স লোড করা যায়নি</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {error.message || 'কোর্স আনতে সমস্যা হয়েছে'}
          </p>
          <Button onClick={() => window.location.reload()}>আবার চেষ্টা করুন</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-950">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section (Bangla + no gradient) */}
        <div className="mb-8 text-center lg:text-left">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold text-emerald-950 dark:text-emerald-50">
                সকল কোর্স
              </h1>
              <p className="text-emerald-900/70 dark:text-emerald-100/70 mt-2">
                আপনার সন্তানের জন্য দ্বীনি ও আধুনিক শিক্ষার সেরা কোর্সগুলো খুঁজে নিন
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1 bg-white text-emerald-900 border border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-50 dark:border-emerald-900">
                <BookOpen className="w-3 h-3 mr-1" />
                {meta.total} টি কোর্স
              </Badge>
            </div>
          </div>
        </div>

        {/* Search and Filter Section (Bangla + no gradient) */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-emerald-700/60 dark:text-emerald-200/60 w-4 h-4" />
            <Input
              placeholder="কোর্সের নাম, ক্যাটাগরি দিয়ে সার্চ করুন..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white dark:bg-emerald-950 border-emerald-200 dark:border-emerald-900 focus:ring-2 focus:ring-emerald-600 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2 border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-900 dark:text-emerald-50">
                    <Filter className="w-4 h-4" />
                    লেভেল
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
                  <Button variant="outline" className="gap-2 border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-900 dark:text-emerald-50">
                    <Tag className="w-4 h-4" />
                    স্ট্যাটাস
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
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
                  variant="ghost"
                  onClick={() => {
                    setSelectedLevel('')
                    setSelectedStatus('')
                  }}
                  className="text-red-600"
                >
                  ফিল্টার মুছুন
                </Button>
              )}
            </div>

            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-emerald-900/60 dark:text-emerald-100/60">
                <div className="w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                আপডেট হচ্ছে...
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-white dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-emerald-700/40 dark:text-emerald-200/40" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-emerald-950 dark:text-emerald-50">
              কোনো কোর্স পাওয়া যায়নি
            </h3>
            <p className="text-emerald-900/70 dark:text-emerald-100/70">
              সার্চ বা ফিল্টার পরিবর্তন করে দেখুন
            </p>
          </div>
        ) : (
          <>
            {/* tighter spacing like your example */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
              <div className="mt-8 flex justify-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950"
                >
                  আগের পৃষ্ঠা
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(Math.min(5, Math.ceil(meta.total / meta.limit)))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(pageNum)}
                        className={
                          currentPage === pageNum
                            ? 'w-10 bg-emerald-700 hover:bg-emerald-800 text-white'
                            : 'w-10 border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50'
                        }
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage((p) => p + 1)}
                  disabled={currentPage >= Math.ceil(meta.total / meta.limit)}
                  className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950"
                >
                  পরের পৃষ্ঠা
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
      className="group overflow-hidden transition-all py-0 duration-300 hover:shadow-lg hover:-translate-y-[2px] cursor-pointer bg-white dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900 rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail / Top banner like example (soft) */}
      <div className="relative h-40 overflow-hidden bg-emerald-50 dark:bg-emerald-900/15">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-emerald-100 dark:bg-emerald-900/25 flex items-center justify-center">
            <BookOpen className="w-14 h-14 text-emerald-800/15 dark:text-emerald-200/10" />
          </div>
        )}

        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-rose-600 text-white border-0">-{discountPercentage}%</Badge>
          </div>
        )}

        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsBookmarked(!isBookmarked)
            toast.success(isBookmarked ? 'বুকমার্ক থেকে সরানো হয়েছে' : 'বুকমার্কে যোগ হয়েছে')
          }}
          className="absolute top-2 right-2 p-2 bg-white/95 dark:bg-emerald-950/90 rounded-full border border-emerald-100 dark:border-emerald-900 backdrop-blur-sm transition-all hover:scale-110"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-emerald-700" />
          ) : (
            <Bookmark className="w-4 h-4 text-emerald-900/60 dark:text-emerald-100/60" />
          )}
        </button>

        {/* Level Badge */}
        <div className="absolute bottom-2 left-2">
          <Badge className={`${getLevelColor(course.level)} capitalize`}>{course.level}</Badge>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-white/95 dark:bg-emerald-950/90 text-emerald-950 dark:text-emerald-50 border border-emerald-100 dark:border-emerald-900 backdrop-blur-sm">
            {course.isFree ? (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                ফ্রি
              </span>
            ) : (
              <div className="flex items-center gap-1">
                {course.discountPrice ? (
                  <>
                    <span className="line-through text-xs text-emerald-900/50 dark:text-emerald-100/50">
                      ৳{course.price}
                    </span>
                    <span className="font-bold">৳{course.discountPrice}</span>
                  </>
                ) : (
                  <span className="font-bold">৳{course.price}</span>
                )}
              </div>
            )}
          </Badge>
        </div>
      </div>

      {/* Body like your screenshot: icon-ish area + centered title + green enroll button */}
      <CardHeader className="p-4 pb-2">
        {/* Category row (small pill) */}
        <div className="flex items-center justify-center mb-3">
          <Badge
            variant="secondary"
            className="text-xs bg-emerald-50 text-emerald-900 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-50 dark:border-emerald-900"
          >
            {course.category?.name || 'ক্যাটাগরি নেই'}
          </Badge>
        </div>

        {/* Title (Bangla-ready style, centered) */}
        <h3 className="text-center font-semibold text-lg leading-snug line-clamp-2 text-emerald-950 dark:text-emerald-50">
          {course.title}
        </h3>

        {/* Description (short, subtle) */}
        <p className="mt-2 text-center text-sm text-emerald-900/65 dark:text-emerald-100/65 line-clamp-2">
          {course.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
        </p>
      </CardHeader>

      <CardFooter className="p-4 pt-2 flex gap-2">
        {/* Details (secondary) */}
        <Button
          onClick={() => onDetails(course._id)}
          variant="outline"
          className="flex-1 gap-2 border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
        >
          <Eye className="w-4 h-4" />
          বিস্তারিত
        </Button>

        {/* Enroll (primary green, no gradient) */}
        <Button
          onClick={() => onEnroll(course)}
          className="flex-1 gap-2 bg-emerald-700 hover:bg-emerald-800 text-white"
        >
          <GraduationCap className="w-4 h-4" />
          ভর্তি হন
        </Button>
      </CardFooter>

      {/* Hover Overlay Effect (no gradient) */}
      {isHovered && <div className="absolute inset-0 bg-black/5 dark:bg-white/5 pointer-events-none" />}
    </Card>
  )
}


