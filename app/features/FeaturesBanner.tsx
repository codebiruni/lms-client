import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  Sparkles, 
} from 'lucide-react'

export default function FeaturesBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-white dark:bg-[#071E1A] transition-colors duration-300">
      {/* Islamic background elements */}
      <div className="absolute inset-0">

        ```
        {/* Soft Islamic gradient orbs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-200 dark:bg-emerald-900 rounded-full mix-blend-multiply filter blur-xl opacity-60 dark:opacity-20"></div>

        <div className="absolute top-0 -right-4 w-72 h-72 bg-amber-100 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-60 dark:opacity-20"></div>

        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-teal-200 dark:bg-teal-900 rounded-full mix-blend-multiply filter blur-xl opacity-60 dark:opacity-20"></div>

        {/* Islamic pattern overlay */}
        <div
          className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230f766e' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 dark:opacity-10"
        ></div>

        {/* Soft overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/60 dark:to-[#071E1A]/60 pointer-events-none"></div>
        ```

      </div>

      {/* Main content */}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

        ```
        <div className="text-center">

          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-linear-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 text-white rounded-full border-0 px-5 py-1 text-sm font-medium shadow-lg">

              <Sparkles className="w-4 h-4 mr-1" />

              কুরআনের আলোয় আধুনিক শিক্ষা
            </Badge>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#12372A] dark:text-white mb-6 leading-tight transition-colors duration-300">

            দ্বীনি ও আধুনিক শিক্ষার
            <span className="block mt-2">

              <span className="bg-linear-to-r from-emerald-700 via-teal-600 to-amber-500 dark:from-emerald-400 dark:via-teal-300 dark:to-yellow-300 bg-clip-text text-transparent">
                পূর্ণাঙ্গ অনলাইন প্ল্যাটফর্ম
              </span>
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300">

            শিশুদের কুরআন শিক্ষা, আরবি ভাষা, ফোনিক্স ইংরেজি ও আবাকাস গণিত শেখাতে
            নিরাপদ, আধুনিক ও ইসলামিক পরিবেশে গড়ে উঠুক আগামী প্রজন্ম।
          </p>

        </div>
        ```

      </div>
    </section>

  )
}