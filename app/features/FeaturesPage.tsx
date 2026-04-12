/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Sparkles, 
  TrendingUp, 
  Brain, 
  BarChart, 
  Code2, 
  ClipboardCheck, 
  Briefcase, 
  MessageSquare, 
  Users, 
  FileCheck,
  CheckCircle2
} from 'lucide-react'

export default function FeaturesPage({ data }: any) {
  const featuresData = data || {}
  
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      TrendingUp: <TrendingUp className="w-6 h-6" />,
      Brain: <Brain className="w-6 h-6" />,
      BarChart: <BarChart className="w-6 h-6" />,
      Code2: <Code2 className="w-6 h-6" />,
      ClipboardCheck: <ClipboardCheck className="w-6 h-6" />,
      Briefcase: <Briefcase className="w-6 h-6" />,
      MessagesSquare: <MessageSquare className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      FileCheck: <FileCheck className="w-6 h-6" />
    }
    return icons[iconName] || <CheckCircle2 className="w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
        {/* Static background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          
          <div 
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 dark:opacity-10 dark:invert"
          ></div>
          
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50 dark:to-gray-950/50 pointer-events-none"></div>
        </div>

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-linear-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full border-0 px-4 py-1 text-sm font-medium shadow-lg dark:shadow-purple-900/30">
                <Sparkles className="w-4 h-4 mr-1" />
                {featuresData.baseText || "Discover Features"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
              {featuresData.bannerText?.blackText || "Everything You Need to"}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-yellow-600 via-pink-500 to-purple-500 dark:from-yellow-500 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {featuresData.bannerText?.colorText || "Illuminate Learning"}
                </span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
              {featuresData.shortDescription || "Empower educators, engage students, and streamline administration with our comprehensive Learning Management System."}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {featuresData.overviewTitle || "A Complete Learning Ecosystem"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {featuresData.overviewDescription || "Our platform brings together cutting-edge technology, expert instruction, and engaging content to create an unparalleled learning experience for everyone."}
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to succeed in one powerful platform
            </p>
          </div>

          <div className="space-y-16">
            {featuresData.platformFeatures?.map((feature: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {feature.features?.map((item: any, itemIdx: number) => (
                    <Card key={itemIdx} className="border-0 bg-gray-50 dark:bg-gray-900/50 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                          <div className="text-white">
                            {getIcon(item.icon)}
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


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
                         {featuresData.ctaTitle || "Ready to Transform Your Future?"}
                      </Badge>
                    </div>
      
                    {/* Heading */}
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                      {featuresData.ctaButtonText || "Start Learning Now"}
                    </h2>
                    
                    {/* Description */}
                    <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
                       {featuresData.ctaDescription || "Join millions of learners already advancing their careers with our platform. Start your free trial today!"}
                    </p>
      
                   
                  </div>
                </div>
              </div>
            </div>
          </section>

      {/* CTA Section */}

    </div>
  )
}