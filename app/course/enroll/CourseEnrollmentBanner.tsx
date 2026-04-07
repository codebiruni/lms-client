'use client'

import React from 'react'
import { 
  Target, 
  CheckCircle,
  TrendingUp,
  Users
} from 'lucide-react'

export default function CourseEnrollmentBanner() {
  return (
    <div className="w-full py-6">
      <div className="container mx-auto px-2">
        {/* Banner with 200px height */}
        <div className="relative w-full h-50 rounded-xl overflow-hidden bg-linear-to-r from-blue-600 to-cyan-600 shadow-lg">
          
          {/* Decorative Circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full" />
          
          {/* Dots Pattern */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `radial-linear(circle at 2px 2px, white 2px, transparent 2px)`,
            backgroundSize: '30px 30px'
          }} />

          {/* Content */}
          <div className="relative h-full flex items-center px-8 md:px-12">
            <div className="flex items-center gap-5">
              {/* Icon Box */}
              <div className="w-16 h-16 bg-white/15 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              
              {/* Text */}
              <div>
                <h1 className="text-white text-2xl md:text-3xl font-bold">
                  Don`t Miss This Opportunity!
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-white/90 text-sm">Instant Access</span>
                  </div>
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm">Career Growth</span>
                  </div>
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-white/80" />
                    <span className="text-white/90 text-sm">Community Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}