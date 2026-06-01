import React from 'react'
import { Badge } from "@/components/ui/badge"
import { 
  FolderTree, 
  Sparkles
} from 'lucide-react'

export default function CategorieBanner() {
  return (
    <section className="relative w-full overflow-hidden bg-linear-to-b from-emerald-50 via-white to-emerald-50/80 dark:from-emerald-950 dark:via-gray-950 dark:to-emerald-950/80 transition-colors duration-300">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        {/* Abstract shapes (no mix-blend-multiply gradients) */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-emerald-200/60 dark:bg-emerald-900/20 rounded-full filter blur-3xl opacity-40 dark:opacity-25"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-200/60 dark:bg-amber-900/15 rounded-full filter blur-3xl opacity-40 dark:opacity-25"></div>

        {/* Dotted pattern */}
        <div
          className="absolute inset-0 opacity-[0.08] dark:opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(circle, #059669 1px, transparent 1px)',
            backgroundSize: '30px 30px',
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <Badge className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-emerald-950/30 transition-all duration-300">
              <FolderTree className="w-4 h-4 mr-1" />
              ক্যাটাগরি ব্রাউজ করুন
            </Badge>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-950 dark:text-emerald-50 mb-6 transition-colors duration-300">
            কোর্স অন্বেষণ করুন
            <span className="block mt-2 text-emerald-800 dark:text-emerald-200">
              ক্যাটাগরি অনুযায়ী
            </span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-emerald-900/70 dark:text-emerald-100/70 max-w-3xl mx-auto mb-10 leading-relaxed">
            আপনার লক্ষ্যের জন্য নিখুঁত কোর্স খুঁজে নিন। আমাদের বৈচিত্র্যময় ক্যাটাগরিগুলির মধ্য দিয়ে ব্রাউজ করুন এবং আজই বিশেষজ্ঞদের সাথে শেখা শুরু করুন।
          </p>
        </div>

        {/* Floating decorative elements */}
        <div className="absolute bottom-10 left-10 animate-bounce opacity-20 pointer-events-none">
          <Sparkles className="w-8 h-8 text-emerald-700 dark:text-emerald-300" />
        </div>
      </div>
    </section>
  )
}