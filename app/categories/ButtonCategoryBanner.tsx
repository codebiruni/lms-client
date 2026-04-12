import React from 'react'
import { Badge } from '@/components/ui/badge'
import { 
  Sparkles, 
  TrendingUp, 
  Award, 
  Clock,
} from 'lucide-react'

export default function ButtonCategoryBanner() {
  return (
    <section className="w-full py-5">
      <div className="container mx-auto p-4">
        <div 
          className="w-full relative overflow-hidden rounded-2xl bg-blue-50 dark:bg-gray-800"
          style={{ height: '220px' }}
        >
          {/* Background Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="flex justify-center mb-3">
                <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-0 rounded-full px-3 py-1 text-xs font-medium">
                  <Sparkles className="w-3 h-3 mr-1 inline" />
                  Start Your Journey Today
                </Badge>
              </div>

              {/* Heading */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Ready to Begin Your Learning Journey?
              </h2>
              
              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
                Join thousands of learners worldwide and expand your knowledge with our comprehensive courses
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Award className="w-3 h-3" />
                  <span className="text-xs">Expert Instructors</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">Learn at Your Pace</span>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}