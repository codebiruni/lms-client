/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'

export default function WhyChooseUsSection({ data }: any) {
  const cards = data?.cards || []
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "Why Students"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Choose Us"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "We're committed to providing an exceptional learning experience"}
          </p>
        </div>
        
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card: any, idx: number) => (
            <Card key={card._id || idx} className="hover:shadow-xl transition-all duration-300 border-0 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
