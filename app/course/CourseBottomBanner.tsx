'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  GraduationCap,
  Sparkles,
  ArrowRight
} from 'lucide-react'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'

export default function CourseBottomBanner() {
  const router = useRouter()

  const handleExplore = () => {
    router.push('/courses')
  }

  return (
    <div className="w-full py-8 md:py-6 lg:py-0 my-5 bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Banner with fixed height on large screens */}
        <div className="relative h-auto lg:h-37.5 w-full overflow-hidden rounded-2xl bg-linear-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 shadow-lg">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-linear(circle at 2px 2px, white 1px, transparent 1px)`,
              backgroundSize: '24px 24px'
            }} />
          </div>

          <div className="relative h-full flex flex-col lg:flex-row items-center justify-between gap-4 p-6 lg:p-0 lg:px-8">
            {/* Left Section - Icon & Text */}
            <div className="flex items-center gap-4 lg:gap-6">
              {/* Icon */}
              <div className="hidden sm:flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              
              {/* Text Content */}
              <div className="text-center lg:text-left">
                <h3 className="text-white text-lg md:text-xl font-semibold mb-1">
                  Ready to advance your career?
                </h3>
                <p className="text-white/70 text-sm md:text-base">
                  Join 50,000+ students learning new skills today
                </p>
              </div>
            </div>

            {/* Right Section - CTA Button */}
            <div className="flex items-center gap-3">
              <Button
                onClick={handleExplore}
                className="bg-white text-slate-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-md group px-6"
              >
                <Sparkles className="w-4 h-4 mr-2 text-yellow-500" />
                Explore Courses
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}