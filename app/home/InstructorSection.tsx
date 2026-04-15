/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Award, Shield, UserCheck } from 'lucide-react'
import React from 'react'

export default function InstructorSection({ data }: any) {
  const list = data?.list || []

    if (!data) {
    return null
  }
  
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            Instructors
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "Meet Our"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Expert Instructors"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "Learn from industry leaders who bring years of practical experience"}
          </p>
        </div>
        
        {/* Lists Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {list.map((item: any, idx: number) => (
            <Card key={item._id || idx} className="border-0 bg-white dark:bg-gray-900 shadow-lg">
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">{item.firstList}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">{item.secondList}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 dark:text-gray-300">{item.thirdList}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
