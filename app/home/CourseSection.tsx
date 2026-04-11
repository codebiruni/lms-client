/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowRight, BookOpen, Star } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

export default function CourseSection({ data }: any) {
  const courses = data?.courseList || []
  
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            Courses
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
            
            return (
              <Card key={item._id || idx} className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white dark:bg-gray-900">
                <div className="relative h-48">
                  {course.thumbnail ? (
                    <Image 
                      src={course.thumbnail} 
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                      <BookOpen className="w-16 h-16 text-white opacity-50" />
                    </div>
                  )}
                  {course.isFree && (
                    <Badge className="absolute top-4 right-4 bg-green-500 hover:bg-green-600">
                      Free
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({course.totalStudents || 0} students)</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      {course.discountPrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-blue-600">${course.discountPrice}</span>
                          <span className="text-sm text-gray-400 line-through">${course.price}</span>
                        </div>
                      ) : (
                        <span className="text-2xl font-bold text-blue-600">${course.price}</span>
                      )}
                    </div>
                    <Button variant="outline" className="rounded-full group">
                      Enroll Now
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        {/* View All Button */}
        <div className="text-center mt-12">
          <Button size="lg" className="rounded-full bg-blue-600 hover:bg-blue-700">
            View All Courses
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
