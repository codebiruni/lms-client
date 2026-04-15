/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card,  CardFooter, CardHeader } from '@/components/ui/card'
import { 
  ArrowRight, 
  BookOpen, 
  Star, 
  Bookmark, 
  BookmarkCheck,
  Eye,
  GraduationCap,
  Sparkles
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'

export default function CourseSection({ data }: any) {



  const courses = data?.courseList || []
  const [bookmarkedCourses, setBookmarkedCourses] = useState<Set<string>>(new Set())

  const toggleBookmark = (courseId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const isBookmarked = bookmarkedCourses.has(courseId)
    if (isBookmarked) {
      bookmarkedCourses.delete(courseId)
      toast.success('Removed from bookmarks')
    } else {
      bookmarkedCourses.add(courseId)
      toast.success('Added to bookmarks')
    }
    setBookmarkedCourses(new Set(bookmarkedCourses))
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
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
    }
  }

  const calculateDiscount = (price: number, discountPrice: number) => {
    if (!discountPrice || !price) return 0
    return Math.round(((price - discountPrice) / price) * 100)
  }

    if (!data) {
    return null
  }
  
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            {data?.badgeText || "Courses"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "Popular"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Courses"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "Explore our most popular courses and start your learning journey today"}
          </p>
        </div>
        
        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((item: any, idx: number) => {
            const course = item.courseId
            if (!course) return null
            
            const discountPercentage = calculateDiscount(course.price, course.discountPrice)
            const isBookmarked = bookmarkedCourses.has(course._id || item._id)
            
            return (
              <Card 
                key={course._id || idx} 
                className="group py-0 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-0 bg-white dark:bg-gray-900/50 backdrop-blur-sm cursor-pointer"
              >
                {/* Thumbnail Section */}
                <div className="relative h-48 overflow-hidden">
                  {course.thumbnail ? (
                    <Image 
                      src={course.thumbnail} 
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  
                  {/* Discount Badge */}
                  {discountPercentage > 0 && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-red-500 text-white border-0">
                        -{discountPercentage}%
                      </Badge>
                    </div>
                  )}
                  
                  {/* Free Badge */}
                  {course.isFree && (
                    <div className="absolute top-2 left-2">
                      <Badge className="bg-green-500 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Free
                      </Badge>
                    </div>
                  )}
                  
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => toggleBookmark(course._id || item._id, e)}
                    className="absolute top-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full backdrop-blur-sm transition-all hover:scale-110 z-10"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-blue-500" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>

                  {/* Level Badge */}
                  {course.level && (
                    <div className="absolute bottom-2 left-2">
                      <Badge className={`${getLevelColor(course.level)} capitalize border-0`}>
                        {course.level}
                      </Badge>
                    </div>
                  )}

                  {/* Price Tag */}
                  <div className="absolute bottom-2 right-2">
                    <Badge className="bg-white/90 dark:bg-gray-800/90 text-gray-900 dark:text-white backdrop-blur-sm border-0">
                      {course.isFree ? (
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Free
                        </span>
                      ) : (
                        <div className="flex items-center gap-1">
                          {course.discountPrice ? (
                            <>
                              <span className="line-through text-xs text-gray-500">
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

                <CardHeader className="p-4 pb-2">
                  {/* Rating Section */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({course.totalStudents || 0} students)</span>
                  </div>

                  {/* Category */}
                  {course.category?.name && (
                    <Badge variant="secondary" className="text-xs mb-2 w-fit">
                      {course.category.name}
                    </Badge>
                  )}

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {course.description?.replace(/<[^>]*>/g, '').substring(0, 100)}
                    {course.description?.replace(/<[^>]*>/g, '').length > 100 ? '...' : ''}
                  </p>
                </CardHeader>

                <CardFooter className="p-4 pt-2 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 gap-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30"
                    asChild
                  >
                    <Link href={`/course/details/${course._id}`}>
                      <Eye className="w-4 h-4" />
                      Details
                    </Link>
                  </Button>
                  <Button 
                    className="flex-1 gap-2 rounded-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    asChild
                  >
                    <Link href={`/course/enroll/${course._id}`}>
                      <GraduationCap className="w-4 h-4" />
                      Enroll
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
        
        {/* View All Button */}
        <div className="flex justify-center items-center mt-12">
          <Link href="/course">
            <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8">
              View All Courses
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}