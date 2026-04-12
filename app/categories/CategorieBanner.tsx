import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  FolderTree, 
  Sparkles
} from 'lucide-react'

export default function CategorieBanner() {
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
            backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg transition-all duration-300">
              <FolderTree className="w-4 h-4 mr-1" />
              Browse Categories
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
            Explore Courses by
            <span className="block mt-2">
              <span className="bg-linear-to-r from-blue-600 via-purple-500 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                Category
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Find the perfect course for your goals. Browse through our diverse categories 
            and start your learning journey today with expert-led instruction.
          </p>

         
        </div>

        {/* Floating decorative elements */}
        <div className="absolute bottom-10 left-10 animate-bounce opacity-20 pointer-events-none">
          <Sparkles className="w-8 h-8 text-purple-500" />
        </div>
      </div>
    </section>
  )
}