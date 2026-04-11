/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Award, 
  Clock, 
  Globe,
  Headphones,
  TrendingUp,
} from 'lucide-react'

export default function FeatureSection({ data }: any) {
  const features = data?.features || []
  
  const getFeatureIcon = (index: number) => {
    const icons = [<Award key={1} />, <Globe key={2} />, <Users key={3} />, <Headphones key={4} />, <Clock key={5} />, <TrendingUp key={6} />]
    return icons[index % icons.length]
  }
  
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            Features
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "Why Learn"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "With Us?"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "Discover what makes us the preferred choice for thousands of students worldwide"}
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature: any, idx: number) => (
            <Card key={feature._id || idx} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white dark:bg-gray-900">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-6 h-6 text-blue-600">
                    {getFeatureIcon(idx)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}