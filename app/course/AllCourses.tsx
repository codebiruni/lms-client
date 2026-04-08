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
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card,  CardFooter, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
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
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
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
              <Card key={i} className="overflow-hidden">
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
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center">
        <Card className="max-w-md text-center p-8">
          <div className="text-red-500 mb-4">
            <AlertCircle className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Failed to Load Courses</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {error.message || 'An error occurred while fetching courses'}
          </p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 text-center lg:text-left">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                All Courses
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-2">
                Discover your next learning adventure
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="px-3 py-1">
                <BookOpen className="w-3 h-3 mr-1" />
                {meta.total} Courses
              </Badge>
            </div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search courses by title, instructor, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 h-12 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 rounded-xl"
            />
          </div>

          <div className="flex flex-wrap gap-3 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="w-4 h-4" />
                    Level
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedLevel('')}>
                    All Levels
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLevel('beginner')}>
                    Beginner
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLevel('intermediate')}>
                    Intermediate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedLevel('advanced')}>
                    Advanced
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Tag className="w-4 h-4" />
                    Status
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedStatus('')}>
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('published')}>
                    Published
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus('draft')}>
                    Draft
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
                  className="text-red-500"
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {isFetching && (
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                Updating...
              </div>
            )}
          </div>
        </div>

        {/* Courses Grid */}
        {courses.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No courses found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {courses.map((course:any) => (
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
                >
                  Previous
                </Button>
                <div className="flex items-center gap-2">
                  {[...Array(Math.min(5, Math.ceil(meta.total / meta.limit)))].map((_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={i}
                        variant={currentPage === pageNum ? 'default' : 'outline'}
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10"
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
                >
                  Next
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
  onEnroll 
}: { 
  course: any, 
  onDetails: (id: string) => void, 
  onEnroll: (id: string) => void 
}) {
  const [isHovered, setIsHovered] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const getLevelColor = (level: string) => {
    switch (level) {
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

  const discountPercentage = course.discountPrice 
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0

  return (
    <Card 
      className="group overflow-hidden transition-all py-0 duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border-0 bg-white dark:bg-slate-800/50 backdrop-blur-sm"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white/20" />
          </div>
        )}
        
        {/* Discount Badge */}
        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-red-500 text-white">
              -{discountPercentage}%
            </Badge>
          </div>
        )}
        
        {/* Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            setIsBookmarked(!isBookmarked)
            toast.success(isBookmarked ? 'Removed from bookmarks' : 'Added to bookmarks')
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-slate-800/90 rounded-full backdrop-blur-sm transition-all hover:scale-110"
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 text-blue-500" />
          ) : (
            <Bookmark className="w-4 h-4 text-slate-600 dark:text-slate-400" />
          )}
        </button>

        {/* Level Badge */}
        <div className="absolute bottom-2 left-2">
          <Badge className={`${getLevelColor(course.level)} capitalize`}>
            {course.level}
          </Badge>
        </div>

        {/* Price Tag */}
        <div className="absolute bottom-2 right-2">
          <Badge className="bg-white/90 dark:bg-slate-800/90 text-slate-900 dark:text-white backdrop-blur-sm">
            {course.isFree ? (
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Free
              </span>
            ) : (
              <div className="flex items-center gap-1">
                {course.discountPrice ? (
                  <>
                    <span className="line-through text-xs text-slate-500">
                      ${course.price}
                    </span>
                    <span className="font-bold">${course.discountPrice}</span>
                  </>
                ) : (
                  <span className="font-bold">${course.price}</span>
                )}
              </div>
            )}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-1 px-3">
        {/* Category & Instructor */}
        <div className="flex items-center gap-2 mb-2 text-xs text-slate-500 dark:text-slate-400">
          <Badge variant="secondary" className="text-xs">
            {course.category?.name || 'Uncategorized'}
          </Badge>
          <span>•</span>
          {/* <span className="truncate">{course.instructor?.name || 'Unknown Instructor'}</span> */}
        </div>

        {/* Title */}
        <h3 className="font-semibold text-lg line-clamp-2 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
          {course.description?.replace(/<[^>]*>/g, '').substring(0, 100)}...
        </p>
      </CardHeader>

      <CardFooter className="p-1 px-3 pb-4 pt-0 flex gap-2">
        <Button
          onClick={() => onDetails(course._id)}
          variant="outline"
          className="flex-1 gap-2 hover:bg-blue-50 dark:hover:bg-blue-950/30"
        >
          <Eye className="w-4 h-4" />
          Details
        </Button>
        <Button
          onClick={() => onEnroll(course)}
          className="flex-1 gap-2 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          <GraduationCap className="w-4 h-4" />
          Enroll
        </Button>
      </CardFooter>

      {/* Hover Overlay Effect */}
      {isHovered && (
        <div className="absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
      )}
    </Card>
  )
}

// Import AlertCircle for error state
