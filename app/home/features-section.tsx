/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Award, 
  Clock, 
  Globe,
  Headphones,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react'

export default function FeatureSection({ data }: any) {
  const features = data?.features || []
  const [currentIndex, setCurrentIndex] = useState(0)
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

  const getFeatureIcon = (index: number) => {
    const icons = [
      <Award key={1} className="w-6 h-6" />, 
      <Globe key={2} className="w-6 h-6" />, 
      <Users key={3} className="w-6 h-6" />, 
      <Headphones key={4} className="w-6 h-6" />, 
      <Clock key={5} className="w-6 h-6" />, 
      <TrendingUp key={6} className="w-6 h-6" />
    ]
    return icons[index % icons.length]
  }

  const nextSlide = () => {
    if (currentIndex + itemsPerView < features.length) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const visibleFeatures = features.slice(currentIndex, currentIndex + itemsPerView)

  if (features.length === 0) return null

  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            <Sparkles className="w-3 h-3 mr-1 inline" />
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "Why Learn"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "With Us?"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "Discover what makes us the preferred choice for thousands of students worldwide"}
          </p>
        </div>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          {features.length > itemsPerView && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-950 disabled:opacity-50"
                onClick={prevSlide}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white dark:bg-gray-900 shadow-lg hover:bg-blue-50 dark:hover:bg-blue-950 disabled:opacity-50"
                onClick={nextSlide}
                disabled={currentIndex + itemsPerView >= features.length}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Carousel Items */}
          <div className="overflow-hidden">
            <div 
              className="flex gap-6 transition-transform duration-500 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)`,
              }}
            >
              {features.map((feature: any, idx: number) => (
                <div 
                  key={feature._id || idx} 
                  className="shrink-0 transition-all duration-300"
                  style={{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }}
                >
                  <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white dark:bg-gray-900 h-full">
                    <CardContent className="p-6">
                      <div className="w-14 h-14 rounded-xl bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md">
                        <div className="w-7 h-7 text-white">
                          {getFeatureIcon(idx)}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                        {feature.description}
                      </p>
                      
                      {/* Decorative dot indicator */}
                      <div className="mt-4 flex gap-1">
                        <div className="w-8 h-1 bg-linear-to-r from-blue-500 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          {features.length > itemsPerView && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(features.length / itemsPerView) }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx * itemsPerView)}
                  className={`
                    h-2 rounded-full transition-all duration-300
                    ${Math.floor(currentIndex / itemsPerView) === idx 
                      ? 'w-8 bg-blue-600' 
                      : 'w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                    }
                  `}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}