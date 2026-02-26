import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  Headphones,

} from 'lucide-react'

export default function SupportHubBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Soft linear orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200 dark:bg-sky-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        {/* Communication pattern - chat bubbles */}
        <div 
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-8.3 0-15 5.4-15 12 0 4.2 2.7 7.9 6.8 10.2L18 40l8.2-4.8c1.2.3 2.5.5 3.8.5 8.3 0 15-5.4 15-12s-6.7-12-15-12zm0 2c7.2 0 13 4.5 13 10s-5.8 10-13 10c-1.1 0-2.2-.1-3.2-.4l-1.1-.3-5.7 3.4 1.7-5.3-.5-.4C18.8 27.6 17 25 17 22c0-5.5 5.8-10 13-10z' fill='%234B5563' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        ></div>

        {/* Connection lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
          <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#4B5563" />
            <line x1="20" y1="20" x2="40" y2="20" stroke="#4B5563" strokeWidth="0.5" strokeDasharray="2,2" />
          </pattern>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-sky-500 to-indigo-500 dark:from-sky-600 dark:to-indigo-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-sky-900/30 transition-all duration-300">
              <Headphones className="w-4 h-4 mr-1" />
              24/7 Support Hub
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
            We`re Here to Help You
            <span className="block mt-2">
              <span className="bg-linear-to-r from-sky-600 via-blue-500 to-indigo-600 dark:from-sky-500 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
                Succeed Every Step of the Way
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Get the support you need, when you need it. Our dedicated team is available around the clock 
            to answer questions, solve problems, and ensure your success.
          </p>

          
        </div>

   
      </div>
    </section>
  )
}