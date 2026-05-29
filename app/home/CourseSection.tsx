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
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-emerald-200 text-emerald-800 dark:border-emerald-900 dark:text-emerald-200"
          >
            {data?.badgeText || "কোর্সসমূহ"}
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-emerald-800 dark:text-emerald-200">
              {data?.title?.highlightText || "জনপ্রিয়"}
            </span>
            <span className="text-emerald-950 dark:text-emerald-50">
              {" "}
              {data?.title?.blackText || "কোর্স"}
            </span>
          </h2>

          <p className="text-emerald-900/70 dark:text-emerald-100/70">
            {data?.description || "আমাদের জনপ্রিয় কোর্সগুলো দেখুন এবং আজই শেখা শুরু করুন"}
          </p>
        </div>

        {/* Courses Grid (no course image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.slice(0, 3).map((item: any, idx: number) => {
            const course = item.courseId
            if (!course) return null

            const discountPercentage = calculateDiscount(course.price, course.discountPrice)
            const isBookmarked = bookmarkedCourses.has(course._id || item._id)

            return (
              <Card
                key={course._id || idx}
                className="group py-0 overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 cursor-pointer rounded-2xl"
              >
                {/* Top area (no thumbnail) */}
                <div className="relative p-4 pb-0">
                  {/* left: category */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      {course.category?.name && (
                        <Badge
                          variant="secondary"
                          className="text-xs mb-3 w-fit bg-emerald-50 text-emerald-900 border border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-50 dark:border-emerald-900"
                        >
                          {course.category.name}
                        </Badge>
                      )}
                    </div>

                    {/* Bookmark Button */}
                    <button
                      onClick={(e) => toggleBookmark(course._id || item._id, e)}
                      className="shrink-0 p-2 bg-white dark:bg-emerald-950 rounded-full border border-emerald-100 dark:border-emerald-900 transition-all hover:scale-110"
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                      ) : (
                        <Bookmark className="w-4 h-4 text-emerald-900/60 dark:text-emerald-100/60" />
                      )}
                    </button>
                  </div>

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    {/* Discount Badge */}
                    {discountPercentage > 0 && !course.isFree && (
                      <Badge className="bg-rose-600 text-white border-0">
                        -{discountPercentage}%
                      </Badge>
                    )}

                    {/* Free Badge */}
                    {course.isFree && (
                      <Badge className="bg-emerald-700 text-white border-0">
                        <Sparkles className="w-3 h-3 mr-1" />
                        ফ্রি
                      </Badge>
                    )}

                    {/* Level Badge */}
                    {course.level && (
                      <Badge className={`${getLevelColor(course.level)} capitalize`}>
                        {course.level}
                      </Badge>
                    )}

                    {/* Price Tag */}
                    <Badge className="bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 border border-emerald-100 dark:border-emerald-900">
                      {course.isFree ? (
                        <span className="flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          ফ্রি
                        </span>
                      ) : (
                        <span className="flex items-center gap-1">
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
                        </span>
                      )}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="p-4 pt-2 pb-2">
                  {/* Rating Section */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm text-emerald-900/60 dark:text-emerald-100/60">
                      ({course.totalStudents || 0} জন শিক্ষার্থী)
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 mb-2 line-clamp-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {course.title}
                  </h3>

                  {/* Description */}
                  <p className="text-emerald-900/70 dark:text-emerald-100/70 text-sm line-clamp-2">
                    {course.description?.replace(/<[^>]*>/g, '').substring(0, 100)}
                    {course.description?.replace(/<[^>]*>/g, '').length > 100 ? '...' : ''}
                  </p>
                </CardHeader>

                <CardFooter className="p-4 pt-2 flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 gap-2 rounded-full border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 hover:bg-emerald-50 dark:hover:bg-emerald-900/20"
                    asChild
                  >
                    <Link href={`/course/details/${course._id}`}>
                      <Eye className="w-4 h-4" />
                      বিস্তারিত
                    </Link>
                  </Button>

                  <Button
                    className="flex-1 gap-2 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white"
                    asChild
                  >
                    <Link href={`/course/enroll/${course._id}`}>
                      <GraduationCap className="w-4 h-4" />
                      ভর্তি হন
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
            <Button className="rounded-full bg-emerald-700 hover:bg-emerald-800 px-8 text-white">
              সব কোর্স দেখুন
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}