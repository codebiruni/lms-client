import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 

  MessageSquare,

} from 'lucide-react'

export default function ContactBanner() {

 
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* linear orbs */}
        <div className="absolute top-20 left-20 w-96 h-96 bg-violet-200 dark:bg-violet-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-200 dark:bg-fuchsia-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
        
        {/* Contact pattern - message bubbles and dots */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10c-4.4 0-8 3.1-8 7 0 2.4 1.2 4.5 3.2 5.9L12 28l6.3-3.7c.5.1 1.1.2 1.7.2 4.4 0 8-3.1 8-7s-3.6-7-8-7z' fill='%236b21ce' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px'
          }}
        ></div>

        {/* World map silhouette */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
            <path 
              d="M400,50 C250,50 120,150 120,200 C120,250 250,350 400,350 C550,350 680,250 680,200 C680,150 550,50 400,50 Z" 
              fill="none" 
              stroke="currentColor" 
              className="text-gray-400 dark:text-gray-600"
              strokeWidth="0.5"
            />
            <circle cx="400" cy="200" r="3" fill="currentColor" className="text-violet-400 dark:text-violet-600" />
          </svg>
        </div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-violet-900/30 transition-all duration-300">
              <MessageSquare className="w-4 h-4 mr-1" />
              Get in Touch
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
            Let`s Start a
            <span className="block mt-2">
              <span className="bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-600 dark:from-violet-500 dark:via-fuchsia-400 dark:to-pink-500 bg-clip-text text-transparent">
                Conversation
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Have questions about Bright Path Academy? We`re here to help. Reach out to us through any of 
            our channels and we`ll respond as soon as possible.
          </p>
        </div>

      </div>
    </section>
  )
}