import React from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  BookOpen, 
  Users, 
  Award, 
  Clock, 
  ChevronRight,
  Sparkles,
  GraduationCap,
  Globe,
  Zap,
  Heart,
} from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Expert-Led Courses",
      description: "Learn from industry professionals with years of real-world experience",
      color: "from-blue-500 to-cyan-500",
      stats: "200+ courses"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Learning",
      description: "Join a vibrant community of learners and mentors from around the globe",
      color: "from-purple-500 to-pink-500",
      stats: "50K+ students"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Certification",
      description: "Earn recognized certificates to showcase your achievements",
      color: "from-orange-500 to-red-500",
      stats: "15+ certifications"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Self-Paced Learning",
      description: "Learn at your own pace with lifetime access to all course materials",
      color: "from-green-500 to-emerald-500",
      stats: "24/7 access"
    }
  ]



  const stats = [
    { icon: <GraduationCap className="w-5 h-5" />, value: "50K+", label: "Students" },
    { icon: <Globe className="w-5 h-5" />, value: "120+", label: "Countries" },
    { icon: <Zap className="w-5 h-5" />, value: "200+", label: "Courses" },
    { icon: <Heart className="w-5 h-5" />, value: "98%", label: "Satisfaction" }
  ]

  return (
    <section className="py-10 px-4 lg:px-7 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-10">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 border-blue-200 dark:border-blue-800">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
            Why Choose Us
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transform Your Future with
            <span className="text-blue-600 dark:text-blue-400">Quranic Verse</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover a learning experience that combines expert guidance, community support, and flexible schedules
          </p>
        </div>

        {/* Stats Row - Line Design */}
        <div className="relative mb-16">
          {/* Line Design */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-px bg-linear-to-r from-transparent via-blue-200 dark:via-blue-800 to-transparent" />
          </div>
          
          <div className="relative flex flex-wrap justify-center gap-8 md:gap-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white dark:bg-gray-800 px-6 py-3 rounded-full shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="text-blue-600 dark:text-blue-400">
                    {stat.icon}
                  </div>
                  <div>
                    <span className="text-xl font-bold text-gray-900 dark:text-white">{stat.value}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">{stat.label}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group relative overflow-hidden rounded-xl border-0 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Top to Bottom linear */}
              <div className={`absolute inset-0 bg-linear-to-b ${feature.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
              
              {/* Bottom Transparent Area */}
              <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-white dark:from-gray-900 to-transparent dark:to-transparent pointer-events-none" />
              
              <CardContent className="relative p-6">
                {/* Icon with linear Background */}
                <div className={`inline-flex p-3 rounded-xl bg-linear-to-br ${feature.color} text-white mb-4 shadow-lg`}>
                  {feature.icon}
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                
                {/* Stats Badge */}
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {feature.stats}
                  </Badge>
                  
                  <Button variant="ghost" size="sm" className="group/btn">
                    Learn more
                    <ChevronRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

       

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Button 
            size="lg" 
            className="bg-blue-600 rounded-full hover:bg-blue-700 text-white px-8  text-base shadow-lg shadow-blue-600/25"
          >
            Explore All Features
            <ChevronRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}