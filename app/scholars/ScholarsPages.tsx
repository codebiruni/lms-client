/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Award, 
  GraduationCap, 
  Users, 
  Target, 
  Eye,
  Star,
  Sparkles,
  Clock,
  TrendingUp
} from 'lucide-react'

export default function ScholarsPages({ data }: any) {
  const scholarsData = data || {}

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200 dark:bg-amber-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200 dark:bg-emerald-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-40"></div>
          
          <div 
            className="absolute inset-0 opacity-5 dark:opacity-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10L10 22v16l20 12 20-12V22L30 10zm0 4l14 8-14 8-14-8 14-8zM14 28l12 7v8l-12-7v-8zm32 0v8l-12 7v-8l12-7z' fill='%239C92AC' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
          
          <div className="absolute top-20 right-1/4 w-1 h-1 bg-amber-300 dark:bg-amber-500 rounded-full animate-ping"></div>
          <div className="absolute bottom-40 left-1/3 w-1.5 h-1.5 bg-emerald-300 dark:bg-emerald-500 rounded-full animate-ping delay-300"></div>
        </div>

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-linear-to-r from-amber-500 to-emerald-500 dark:from-amber-600 dark:to-emerald-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-amber-900/30 transition-all duration-300">
                <Award className="w-4 h-4 mr-1" />
                {scholarsData.baseText || "Distinguished Scholars Program"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
              {scholarsData.bannerText?.blackText || "Recognizing Excellence in"}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-amber-600 via-orange-500 to-emerald-600 dark:from-amber-500 dark:via-orange-400 dark:to-emerald-500 bg-clip-text text-transparent">
                  {scholarsData.bannerText?.colorText || "Academic Achievement"}
                </span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {scholarsData.shortDescription || "Join our community of outstanding scholars who are shaping the future of education. Access exclusive opportunities, mentorship, and recognition for your academic excellence."}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {scholarsData.stats && scholarsData.stats.length > 0 && (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
              {scholarsData.stats.map((stat: any, idx: number) => (
                <Card key={idx} className="border-0 bg-linear-to-br from-amber-50 to-emerald-50 dark:from-gray-800 dark:to-gray-800/50 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold bg-linear-to-r from-amber-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {stat.value || ''}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.title || ''}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision Section */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-white to-amber-50 dark:from-gray-950 dark:to-gray-900 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <Card className="border-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-amber-500 to-orange-500 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {scholarsData.missionTitle || "Our Mission"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {scholarsData.missionDescription || "To democratize education by making high-quality learning accessible, affordable, and engaging for everyone, everywhere."}
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="border-0 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  {scholarsData.visionTitle || "Our Vision"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {scholarsData.visionDescription || "To create a world where continuous learning is a way of life, and every individual has the opportunity to reach their full potential."}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Scholars Section */}
      {scholarsData.scholars && scholarsData.scholars.length > 0 && (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Badge className="bg-linear-to-r from-amber-500 to-emerald-500 text-white rounded-full border-0 px-4 py-1 text-sm">
                  <Users className="w-3 h-3 mr-1" />
                  Our Scholars
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {scholarsData.scholarSectionTitle || "Our Esteemed Scholars & Advisors"}
              </h2>
              <div className="w-20 h-1 bg-linear-to-r from-amber-500 to-emerald-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarsData.scholars.map((scholar: any, idx: number) => (
                <Card key={idx} className="border-0 bg-linear-to-br from-amber-50/50 to-emerald-50/50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-amber-500 to-emerald-500 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <GraduationCap className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-amber-600 group-hover:to-emerald-600 group-hover:bg-clip-text transition-all">
                      {scholar.name || ''}
                    </h3>
                    <p className="text-sm font-semibold text-amber-600 dark:text-amber-400 text-center mb-3">
                      {scholar.title || ''}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed">
                      {scholar.description || ''}
                    </p>
                    
                    {/* Decorative elements */}
                    <div className="mt-4 flex justify-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}



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
                  Start Your Journey Today
                </Badge>
              </div>

              {/* Heading */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Ready to Begin Your Learning Journey?
              </h2>
              
              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
                Join thousands of learners worldwide and expand your knowledge with our comprehensive courses
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Award className="w-3 h-3" />
                  <span className="text-xs">Expert Instructors</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">Learn at Your Pace</span>
                </div>
              </div>

             
            </div>
          </div>
        </div>
      </div>
    </section>


    
    </div>
  )
}