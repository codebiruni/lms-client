/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Badge } from '@/components/ui/badge'
import { Quote, Star, ChevronLeft, ChevronRight, User, Sparkles } from 'lucide-react'
import React, { useState, useCallback, useEffect } from 'react'

export default function TestimonialSection({ data }: any) {
  const testimonials = data?.testimonials || []
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const totalTestimonials = testimonials.length

  const nextSlide = useCallback(() => {
    if (isAnimating || totalTestimonials === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev + 1) % totalTestimonials)
    setTimeout(() => setIsAnimating(false), 500)
  }, [totalTestimonials, isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating || totalTestimonials === 0) return
    setIsAnimating(true)
    setCurrentIndex((prev) => (prev - 1 + totalTestimonials) % totalTestimonials)
    setTimeout(() => setIsAnimating(false), 500)
  }, [totalTestimonials, isAnimating])

  // Auto-play carousel
  useEffect(() => {
    if (totalTestimonials === 0) return
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)
    return () => clearInterval(interval)
  }, [nextSlide, totalTestimonials])

  if (totalTestimonials === 0) return null

  const currentTestimonial = testimonials[currentIndex]

    if (!data) {
    return null
  }

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400 px-4 py-1">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            Testimonials
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "What Our"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Students Say"}</span>
          </h2>
          <div className="w-20 h-1 bg-linear-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-4" />
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            {data?.description || "Don't just take our word for it - hear from our successful learners"}
          </p>
        </div>

        {/* Main Testimonial Content */}
        <div className="max-w-4xl mx-auto">
          <div className="relative px-12">
            {/* Navigation Buttons */}
            {totalTestimonials > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  disabled={isAnimating}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/80 dark:bg-gray-800/80 hover:bg-white dark:hover:bg-gray-800 shadow-lg transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </>
            )}

            {/* Testimonial Content with Animation */}
            <div
              className={`transition-all duration-500 ease-in-out text-center ${
                isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
              }`}
            >
              {/* Large Quote Icon */}
              <div className="flex justify-center mb-8">
                <Quote className="w-16 h-16 text-blue-400 dark:text-blue-500 opacity-50" />
              </div>
              
              {/* Feedback Text */}
              <p className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
                ``{currentTestimonial.feedback}``
              </p>
              
              {/* Stars */}
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 transition-all duration-300 ${
                      i < currentTestimonial.stars
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                    }`}
                  />
                ))}
              </div>
              
              {/* Divider */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-0.5 bg-linear-to-r from-transparent via-blue-400 to-transparent" />
              </div>
              
              {/* User Info */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-gray-800 dark:text-white">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Student
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            {totalTestimonials > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: totalTestimonials }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (isAnimating) return
                      setIsAnimating(true)
                      setCurrentIndex(idx)
                      setTimeout(() => setIsAnimating(false), 500)
                    }}
                    className={`
                      transition-all duration-300 rounded-full
                      ${currentIndex === idx
                        ? 'w-8 h-2 bg-blue-600 dark:bg-blue-400'
                        : 'w-2 h-2 bg-gray-300 dark:bg-gray-600 hover:bg-blue-400 dark:hover:bg-blue-500'
                      }
                    `}
                    aria-label={`Go to testimonial ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}