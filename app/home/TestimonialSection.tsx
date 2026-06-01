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
    <section className="py-16 md:py-24 bg-linear-to-b from-emerald-50 via-white to-emerald-50/80 dark:from-emerald-950 dark:via-gray-950 dark:to-emerald-950/8 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-emerald-200 text-emerald-800 dark:border-emerald-900 dark:text-emerald-200 px-4 py-1"
          >
            <Sparkles className="w-3 h-3 mr-1 inline" />
            মতামত
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            <span className="text-emerald-800 dark:text-emerald-200">
              {data?.title?.highlightText || "অভিভাবক ও শিক্ষার্থীদের"}
            </span>
            <span className="text-emerald-950 dark:text-emerald-50">
              {" "}
              {data?.title?.blackText || "অভিজ্ঞতা"}
            </span>
          </h2>

          <div className="w-20 h-1 bg-emerald-700 mx-auto rounded-full mb-4" />

          <p className="text-emerald-900/70 dark:text-emerald-100/70 text-lg">
            {data?.description || "আমাদের প্ল্যাটফর্ম নিয়ে বাস্তব অভিজ্ঞতা থেকে কিছু কথা"}
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
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-emerald-950 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 shadow-sm transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="আগের মতামত"
                >
                  <ChevronLeft className="w-5 h-5 text-emerald-900/60 dark:text-emerald-100/60" />
                </button>
                <button
                  onClick={nextSlide}
                  disabled={isAnimating}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white dark:bg-emerald-950 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 shadow-sm transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="পরের মতামত"
                >
                  <ChevronRight className="w-5 h-5 text-emerald-900/60 dark:text-emerald-100/60" />
                </button>
              </>
            )}

            {/* Testimonial Content with Animation */}
            <div
              className={`transition-all duration-500 ease-in-out text-center ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
                }`}
            >
              {/* Large Quote Icon */}
              <div className="flex justify-center mb-8">
                <Quote className="w-16 h-16 text-emerald-700/40 dark:text-emerald-300/40 opacity-60" />
              </div>

              {/* Feedback Text */}
              <p className="text-emerald-950 dark:text-emerald-50/90 text-xl md:text-2xl leading-relaxed mb-8 max-w-3xl mx-auto">
                ``{currentTestimonial.feedback}``
              </p>

              {/* Stars */}
              <div className="flex justify-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 transition-all duration-300 ${i < currentTestimonial.stars
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-emerald-100 text-emerald-100 dark:fill-emerald-900/60 dark:text-emerald-900/60'
                      }`}
                  />
                ))}
              </div>

              {/* Divider (no gradient) */}
              <div className="flex justify-center mb-6">
                <div className="w-12 h-0.5 bg-emerald-700/40 dark:bg-emerald-300/30" />
              </div>

              {/* User Info */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar (no gradient) */}
                <div className="w-14 h-14 rounded-full bg-emerald-700 dark:bg-emerald-600 flex items-center justify-center shadow-sm border border-emerald-100 dark:border-emerald-900">
                  <User className="w-7 h-7 text-white" />
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-bold text-emerald-950 dark:text-emerald-50">
                    {currentTestimonial.name}
                  </h4>
                  <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60">
                    শিক্ষার্থী
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
                        ? 'w-8 h-2 bg-emerald-700 dark:bg-emerald-300'
                        : 'w-2 h-2 bg-emerald-200 dark:bg-emerald-900 hover:bg-emerald-300 dark:hover:bg-emerald-700'
                      }
                `}
                    aria-label={`মতামত ${idx + 1} দেখুন`}
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