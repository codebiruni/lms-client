/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Users } from 'lucide-react'
import React from 'react'

export default function WhyChooseUsSection({ data }: any) {
  const cards = data?.cards || []

    if (!data) {
    return null
  }
  
  return (
    <section className="py-16 md:py-24 bg-[#F8FAF8] dark:bg-[#071E1A]">

      <div className="container mx-auto px-4">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-14">

          <Badge
            variant="outline"
            className="mb-4 rounded-full border-emerald-200 text-emerald-700 dark:border-emerald-800 dark:text-emerald-400"
          >
            কেন আমাদের বেছে নিবেন
          </Badge>

          <h2 className="text-3xl md:text-5xl font-bold mb-5">

            <span className="text-emerald-800 dark:text-emerald-200">
              {data?.title?.highlightText || "কুরআনের আলোয়"}
            </span>

            <span className="text-[#12372A] dark:text-white block mt-2">
              {data?.title?.blackText || "আধুনিক শিক্ষার বিশ্বস্ত প্ল্যাটফর্ম"}
            </span>

          </h2>

          <p className="text-gray-600 dark:text-gray-300 text-lg">
            {data?.description ||
              "শিশুদের দ্বীনি ও আধুনিক শিক্ষার সমন্বয়ে নিরাপদ, মানসম্মত এবং ভবিষ্যতমুখী শিক্ষার পরিবেশ"}
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {cards.map((card: any, idx: number) => (

            <Card
              key={card._id || idx}
              className="border border-gray-100 dark:border-emerald-900/30 bg-white dark:bg-[#0D2A24] rounded-2xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >

              <CardContent className="p-8 text-center">

                <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#EAF7F5] dark:bg-[#12372A] flex items-center justify-center">

                  <Users className="w-8 h-8 text-emerald-700 dark:text-emerald-400" />

                </div>

                <h3 className="text-xl font-bold text-[#12372A] dark:text-white mb-3">
                  {card.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
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
