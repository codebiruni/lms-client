import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
} from 'lucide-react'

export default function FeaturesBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      {/* Static background elements with dark mode adjustments */}
      <div className="absolute inset-0">
        {/* linear orbs - static with dark mode opacity adjustments */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
        
        {/* Grid pattern - adjusted for dark mode */}
        <div 
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 dark:opacity-10 dark:invert"
        ></div>
        
        {/* Optional: Add subtle dark mode linear overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50 dark:to-gray-950/50 pointer-events-none"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        <div className="text-center">
          {/* Badge - enhanced for dark mode */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full border-0 px-4 py-1 text-sm font-medium shadow-lg dark:shadow-purple-900/30">
              <Sparkles className="w-4 h-4 mr-1" />
              Discover Bright Path Academy Features
            </Badge>
          </div>

          {/* Main heading - enhanced for dark mode */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
            Everything You Need to
            <span className="block mt-2">
              <span className="bg-linear-to-r from-yellow-600 via-pink-500 to-purple-500 dark:from-yellow-500 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                Illuminate Learning
              </span>
            </span>
          </h1>

          {/* Description - enhanced for dark mode */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
            Empower educators, engage students, and streamline administration with our 
            comprehensive Learning Management System. Discover powerful features designed 
            for modern education.
          </p>
        </div>
      </div>
    </section>
  )
}