/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Play } from 'lucide-react'
import React from 'react'

export default function WelcomeSection({ data }: any) {
    if (!data) {
    return null
  }
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Left Content */}
          <div className="flex-1 space-y-6">
            <Badge variant="outline" className="inline-flex rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
              Welcome
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
                {data?.title?.highlightText || "Welcome to"}
              </span>
              <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Our Academy"}</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {data?.description || "We're dedicated to providing world-class education accessible to everyone, everywhere."}
            </p>
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Quality Education</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-gray-600 dark:text-gray-400">Expert Instructors</span>
              </div>
            </div>
          </div>
          
          {/* Right Video */}
          <div className="flex-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              {data?.video ? (
                <iframe
                  src={data.video}
                  title="Welcome Video"
                  className="w-full h-75 md:h-100"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="w-full h-75 md:h-100 bg-linear-to-br from-blue-400 to-purple-600 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-20 h-20 text-white opacity-80 mx-auto mb-4" />
                    <p className="text-white">Watch Introduction Video</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
