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
    <div className="w-full py-8 md:py-6 lg:py-0 my-5 bg-linear-to-br from-emerald-50 via-white to-amber-50 dark:from-[#071E1A] dark:via-[#0D2A24] dark:to-[#12372A]">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <div className="relative h-auto lg:h-37.5 w-full overflow-hidden rounded-3xl bg-linear-to-r from-emerald-700 via-teal-700 to-[#12372A] shadow-xl">

          {/* Islamic Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">

            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='white' fill-opacity='0.15'%3E%3Cpath d='M40 10l6 12h12l-10 8 4 12-12-8-12 8 4-12-10-8h12z'/%3E%3C/g%3E%3C/svg%3E")`,
                backgroundSize: "80px 80px"
              }}
            />

          </div>

          {/* Decorative Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

          <div className="relative h-full flex flex-col lg:flex-row items-center justify-between gap-4 p-6 lg:p-0 lg:px-8">

            {/* Left Section */}
            <div className="flex items-center gap-4 lg:gap-6">

              <div className="hidden sm:flex items-center justify-center w-14 h-14 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">

                <GraduationCap className="w-7 h-7 text-white" />

              </div>

              <div className="text-center lg:text-left">

                <h3 className="text-white text-lg md:text-2xl font-bold mb-1">
                  আপনার সন্তানের ভবিষ্যৎ গড়ার যাত্রা শুরু করুন
                </h3>

                <p className="text-emerald-50 text-sm md:text-base">
                  কুরআন শিক্ষা, আরবি ভাষা, ফোনিক্স ইংরেজি ও আবাকাসে হাজারো শিক্ষার্থীর আস্থার প্ল্যাটফর্ম
                </p>

              </div>

            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">

              <Button
                onClick={handleExplore}
                className="bg-white text-[#12372A] hover:bg-emerald-50 hover:scale-105 transition-all duration-300 shadow-lg group px-6 font-semibold"
              >
                <Sparkles className="w-4 h-4 mr-2 text-amber-500" />

                কোর্সসমূহ দেখুন

                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />

              </Button>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}