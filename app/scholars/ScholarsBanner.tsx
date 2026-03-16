import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
} from 'lucide-react'

export default function ScholarsBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* linear orbs */}
        <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
        
        {/* Academic pattern - subtle grid with graduation caps */}
        <div 
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10L10 22v16l20 12 20-12V22L30 10zm0 4l14 8-14 8-14-8 14-8zM14 28l12 7v8l-12-7v-8zm32 0v8l-12 7v-8l12-7z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        
        {/* Shining stars effect */}
        <div className="absolute top-20 right-1/4 w-1 h-1 bg-amber-300 dark:bg-amber-500 rounded-full animate-ping"></div>
        <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-emerald-300 dark:bg-emerald-500 rounded-full animate-ping delay-300"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-amber-500 to-emerald-500 dark:from-amber-600 dark:to-emerald-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-amber-900/30 transition-all duration-300">
              <Award className="w-4 h-4 mr-1" />
              Distinguished Scholars Program
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
            Recognizing Excellence in
            <span className="block mt-2">
              <span className="bg-linear-to-r from-amber-600 via-orange-500 to-emerald-600 dark:from-amber-500 dark:via-orange-400 dark:to-emerald-500 bg-clip-text text-transparent">
                Academic Achievement
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Join our community of outstanding scholars who are shaping the future of education. 
            Access exclusive opportunities, mentorship, and recognition for your academic excellence.
          </p>

          
        </div>

       
      </div>
    </section>
  )
}