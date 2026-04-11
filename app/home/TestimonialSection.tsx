/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Heart, Quote, Star, ChevronLeft, ChevronRight, User } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'

export default function TestimonialSection({ data }: any) {
  const testimonials = data?.testimonials || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [itemsPerView, setItemsPerView] = useState(3)

  // Handle responsive items per view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1)
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2)
      } else {
        setItemsPerView(3)
      }
    }
    
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const totalPages = Math.ceil(testimonials.length / itemsPerView)
  const maxIndex = Math.max(0, totalPages - 1)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [maxIndex, isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [maxIndex, isAnimating])

  // Auto-play carousel
  useEffect(() => {
    if (testimonials.length === 0) return
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)
    return () => clearInterval(interval)
  }, [nextSlide, testimonials.length])

  // Get current visible testimonials
  const getVisibleTestimonials = () => {
    const start = currentIndex * itemsPerView
    const end = start + itemsPerView
    return testimonials.slice(start, end)
  }

  if (testimonials.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "What Our"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Students Say"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "Don't just take our word for it - hear from our successful learners"}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative px-12">
          {/* Navigation Buttons */}
          {testimonials.length > itemsPerView && (
            <>
              <button
                onClick={prevSlide}
                disabled={isAnimating}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/50 group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Previous testimonials"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </button>
              <button
                onClick={nextSlide}
                disabled={isAnimating}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:bg-blue-50 dark:hover:bg-blue-900/50 group disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Next testimonials"
              >
                <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </button>
            </>
          )}

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <div
              className={`transition-all duration-500 ease-in-out ${
                isAnimating ? 'opacity-90' : 'opacity-100'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getVisibleTestimonials().map((testimonial: any, idx: number) => (
                  <Card
                    key={testimonial._id || idx}
                    className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm hover:bg-white dark:hover:bg-gray-900 animate-in fade-in slide-in-from-bottom-5"
                  >
                    <CardContent className="p-6">
                      {/* Quote Icon */}
                      <div className="mb-4">
                        <Quote className="w-10 h-10 text-blue-400 opacity-60 group-hover:opacity-100 transition-opacity" />
                      </div>
                      
                      {/* Feedback Text */}
                      <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed line-clamp-4 min-h-25">
                        {testimonial.feedback}
                      </p>
                      
                      {/* User Info */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}
                          <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {testimonial.name}
                            </h4>
                            <div className="flex mt-1">
                              {[...Array(testimonial.stars)].map((_, i) => (
                                <Star
                                  key={i}
                                  className="w-4 h-4 fill-yellow-400 text-yellow-400 animate-in zoom-in"
                                  style={{ animationDelay: `${i * 50}ms` }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        {/* Heart Icon */}
                        <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-100 to-purple-100 dark:from-blue-900/50 dark:to-purple-900/50 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Heart className="w-5 h-5 text-blue-600 dark:text-blue-400 fill-transparent group-hover:fill-blue-600 dark:group-hover:fill-blue-400 transition-all duration-300" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Dots Navigation */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (isAnimating) return
                    setIsAnimating(true)
                    setCurrentIndex(idx)
                    setTimeout(() => setIsAnimating(false), 500)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentIndex === idx
                      ? 'w-8 h-2 bg-blue-600 dark:bg-blue-400'
                      : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-200 dark:bg-blue-900/20 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-200 dark:bg-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
        </div>
      </div>
    </section>
  )
}