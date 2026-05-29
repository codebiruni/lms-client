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
      <section className="relative w-full overflow-hidden bg-emerald-50 dark:bg-emerald-950 transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-amber-200/70 dark:bg-amber-900/20 rounded-full filter blur-3xl opacity-50"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-200/70 dark:bg-emerald-900/20 rounded-full filter blur-3xl opacity-50"></div>

          <div
            className="absolute inset-0 opacity-10 dark:opacity-10"
            style={{
              backgroundImage:
                `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10L10 22v16l20 12 20-12V22L30 10zm0 4l14 8-14 8-14-8 14-8zM14 28l12 7v8l-12-7v-8zm32 0v8l-12 7v-8l12-7z' fill='%23059669' fill-opacity='0.12' fill-rule='evenodd'/%3E%3C/svg%3E")`,
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
              <Badge className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-emerald-950/30 transition-all duration-300">
                <Award className="w-4 h-4 mr-1" />
                {scholarsData.baseText || "বিশিষ্ট আলেম ও স্কলার প্রোগ্রাম"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-950 dark:text-emerald-50 mb-6 transition-colors duration-300">
              {scholarsData.bannerText?.blackText || "জ্ঞান, আদব ও নৈতিকতার পথে"}
              <span className="block mt-2 text-emerald-800 dark:text-emerald-200">
                {scholarsData.bannerText?.colorText || "আমাদের সম্মানিত আলেম ও উপদেষ্টা"}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-emerald-900/70 dark:text-emerald-100/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              {scholarsData.shortDescription || "দ্বীনি শিক্ষা ও আধুনিক দক্ষতার সমন্বয়ে গঠিত একটি নির্ভরযোগ্য শিক্ষাপথ—যেখানে অভিজ্ঞ আলেম, শিক্ষক ও উপদেষ্টাদের দিকনির্দেশনায় শিশুরা শিখবে নিরাপদ পরিবেশে।"}
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
                <Card
                  key={idx}
                  className="border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="text-3xl md:text-4xl font-bold text-emerald-800 dark:text-emerald-200 mb-2">
                      {stat.value || ''}
                    </div>
                    <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
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
      <section className="relative w-full overflow-hidden bg-emerald-50 dark:bg-emerald-950/60 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <Card className="border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900 flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-amber-700 dark:text-amber-300" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
                  {scholarsData.missionTitle || "আমাদের মিশন"}
                </h3>
                <p className="text-emerald-900/70 dark:text-emerald-100/70 leading-relaxed">
                  {scholarsData.missionDescription || "কুরআন-সুন্নাহভিত্তিক দ্বীনি শিক্ষা এবং প্রয়োজনীয় আধুনিক দক্ষতা—দুটোকে একসাথে শিশুদের কাছে সহজ, সুন্দর ও বাস্তবসম্মতভাবে পৌঁছে দেওয়া।"}
                </p>
              </CardContent>
            </Card>

            {/* Vision Card */}
            <Card className="border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 shadow-sm hover:shadow-lg transition-all duration-300 rounded-2xl">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-900 flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-emerald-700 dark:text-emerald-300" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
                  {scholarsData.visionTitle || "আমাদের ভিশন"}
                </h3>
                <p className="text-emerald-900/70 dark:text-emerald-100/70 leading-relaxed">
                  {scholarsData.visionDescription || "বাংলাদেশের পরিবারগুলোর জন্য এমন একটি বিশ্বস্ত ইসলামিক লার্নিং প্ল্যাটফর্ম গড়ে তোলা—যেখানে শিশুদের ভবিষ্যৎ হবে দ্বীন ও দুনিয়ার ভারসাম্যে আলোকিত।"}
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
                <Badge className="bg-emerald-700 text-white rounded-full border-0 px-4 py-1 text-sm">
                  <Users className="w-3 h-3 mr-1" />
                  আমাদের আলেমগণ
                </Badge>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
                {scholarsData.scholarSectionTitle || "সম্মানিত আলেম ও উপদেষ্টামণ্ডলী"}
              </h2>
              <div className="w-20 h-1 bg-emerald-700 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {scholarsData.scholars.map((scholar: any, idx: number) => (
                <Card
                  key={idx}
                  className="border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center mx-auto mb-4 shadow-sm group-hover:scale-105 transition-transform duration-300">
                      <GraduationCap className="w-10 h-10 text-emerald-700 dark:text-emerald-300" />
                    </div>
                    <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-50 text-center mb-2 transition-all">
                      {scholar.name || ''}
                    </h3>
                    <p className="text-sm font-semibold text-amber-700 dark:text-amber-300 text-center mb-3">
                      {scholar.title || ''}
                    </p>
                    <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70 text-center leading-relaxed">
                      {scholar.description || ''}
                    </p>

                    {/* Decorative stars */}
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
            className="w-full relative overflow-hidden rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900"
            style={{ height: '220px' }}
          >
            {/* Background Blobs (no gradient, no blue/purple) */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-200/60 dark:bg-amber-900/15 rounded-full filter blur-xl opacity-70 dark:opacity-30"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-200/60 dark:bg-emerald-900/20 rounded-full filter blur-xl opacity-70 dark:opacity-30"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-100/70 dark:bg-emerald-900/15 rounded-full filter blur-xl opacity-70 dark:opacity-30"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <Badge className="bg-white dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900 rounded-full px-3 py-1 text-xs font-medium">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    আজই শুরু করুন
                  </Badge>
                </div>

                {/* Heading */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
                  আপনার শেখার যাত্রা শুরু করতে প্রস্তুত?
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-emerald-900/70 dark:text-emerald-100/70 max-w-2xl mx-auto mb-4 leading-relaxed">
                  হাজারো শিক্ষার্থীর সাথে যুক্ত হয়ে দ্বীনি ও আধুনিক শিক্ষার সুন্দর সমন্বয়ে এগিয়ে যান—আপনার সময় ও গতিতে।
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-emerald-900/70 dark:text-emerald-100/70">
                    <Award className="w-3 h-3" />
                    <span className="text-xs">অভিজ্ঞ শিক্ষক</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-900/70 dark:text-emerald-100/70">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">লাইফটাইম এক্সেস</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-900/70 dark:text-emerald-100/70">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">নিজের গতিতে শিখুন</span>
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