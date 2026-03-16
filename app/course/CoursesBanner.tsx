import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
} from 'lucide-react'

export default function CoursesBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Abstract shapes */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 dark:opacity-20"></div>
        
        {/* Dotted pattern */}
        <div 
          className="absolute inset-0 opacity-20 dark:opacity-10"
          style={{
            backgroundImage: 'radial-linear(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-blue-900/30 transition-all duration-300">
              <BookOpen className="w-4 h-4 mr-1" />
              Explore Our Course Catalog
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
            Unlock Your Potential with
            <span className="block mt-2">
              <span className="bg-linear-to-r from-blue-600 via-indigo-500 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                Expert-Led Courses
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            From beginner to advanced, our comprehensive course library offers everything you need 
            to master new skills and advance your career in education technology.
          </p>

         
        </div>

       

      </div>
    </section>
  )
}