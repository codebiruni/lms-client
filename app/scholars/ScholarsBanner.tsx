import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  Award, 
} from 'lucide-react'

export default function ScholarsBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#071E1A] transition-colors duration-300">

      {/* Background Elements */}
      <div className="absolute inset-0">

        {/* Soft Islamic Gradient Blobs */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-emerald-200 dark:bg-emerald-900/20 rounded-full blur-3xl opacity-40"></div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 dark:bg-amber-900/20 rounded-full blur-3xl opacity-40"></div>

        {/* Islamic Pattern */}
        <div
          className="absolute inset-0 opacity-5 dark:opacity-10"
          style={{
            backgroundImage:
              `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%230A6A66' fill-opacity='0.12'%3E%3Cpath d='M30 8l4 10h10l-8 6 3 10-9-6-9 6 3-10-8-6h10z'/%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "80px 80px",
          }}
        />

        {/* Decorative Dots */}
        <div className="absolute top-20 right-1/4 w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>

      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <div className="text-center">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-full border-0 px-5 py-1.5 text-sm font-medium shadow-lg">
              <Award className="w-4 h-4 mr-1" />
              কুরআনের আলোয় আধুনিক শিক্ষা
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#12372A] dark:text-white mb-6 leading-tight">

            আপনার জন্য উপযুক্ত

            <span className="block mt-2 bg-linear-to-r from-emerald-700 via-teal-600 to-amber-500 bg-clip-text text-transparent">
              কোর্স নির্বাচন করুন
            </span>

          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">

            কুরআন শিক্ষা, আরবি ভাষা, ফোনিক্স ইংরেজি, আবাকাস গণিত এবং আরও অনেক
            কোর্সের মাধ্যমে গড়ে তুলুন দ্বীনি ও আধুনিক জ্ঞানে সমৃদ্ধ আগামী প্রজন্ম।

          </p>

        </div>

      </div>

    </section>
  )
}