import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  BookOpen, 
} from 'lucide-react'

export default function CoursesBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-emerald-50 dark:bg-emerald-950 transition-colors duration-300">
      {/* Background decorative elements (no gradient, calm, Islamic + soft premium BD aesthetic) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Soft blobs (no mix-blend / no gradient) */}
        <div className="absolute top-16 right-[-3rem] w-72 h-72 bg-emerald-200/60 dark:bg-emerald-800/25 rounded-full blur-3xl opacity-60 dark:opacity-35" />
        <div className="absolute bottom-[-4rem] left-[-3rem] w-96 h-96 bg-amber-100/70 dark:bg-amber-700/15 rounded-full blur-3xl opacity-60 dark:opacity-30" />

        {/* Simple dotted pattern (no gradient) */}
        <div
          className="absolute inset-0 opacity-[0.18] dark:opacity-[0.08]"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(5,150,105,0.35) 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        {/* Soft overlay for readability (no gradient) */}
        <div className="absolute inset-0 bg-white/35 dark:bg-black/20" />
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg shadow-emerald-900/10 dark:shadow-emerald-950/25 transition-all duration-300">
              <BookOpen className="w-4 h-4 mr-1" />
              আমাদের কোর্সসমূহ
            </Badge>
          </div>

          {/* Main heading (Bangla, no gradient text) */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-950 dark:text-emerald-50 mb-6 transition-colors duration-300 tracking-tight">
            কুরআনের আলোয়
            <span className="block mt-2 text-emerald-800 dark:text-emerald-200">
              আধুনিক শিক্ষার যাত্রা
            </span>
          </h1>

          {/* Description (Bangla) */}
          <p className="text-lg md:text-xl text-emerald-900/70 dark:text-emerald-100/75 max-w-3xl mx-auto mb-10 leading-relaxed">
            বাংলাদেশের শিশু ও অভিভাবকদের জন্য নিরাপদ, শান্ত ও বিশ্বাসযোগ্য শেখার পরিবেশ। দ্বীনি
            শিক্ষার সাথে আধুনিক স্কিল—সবকিছু এক প্ল্যাটফর্মে।
          </p>
        </div>
      </div>
    </section>
  )
}