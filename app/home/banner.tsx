/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Sparkles, Star } from 'lucide-react'
import PwaInstaller from '../default/PwaInstaller'

// Banner Component
export default function Banner({ data }: any) {
  // Default data structure
  const defaultData = {
    baseText: "Trusted by 50,000+ learners",
    title: {
      highlightText: "Welcome to",
      blackText: "Academy"
    },
    descRiption: "Empowering learners with quality education and resources to build brighter futures",
    bottomBaseText: {
      firstText: "Join 50K+ learners",
      secondText: "4.9 (10K+ reviews)"
    },
    list: {
      firstList: "No credit card required",
      secondList: "14-day free trial",
      thirdList: "Cancel anytime"
    },
    buttons: {
      primaryButton: "Explore Courses",
      secondaryButton: "Install App"
    },
    images: {
      mainImage: "/mobile.webp",
      playStoreImage: "/playstore.png",
      appStoreImage: "/appstore.png"
    },
    floatingBadges: {
      firstBadge: {
        title: "New",
        description: "AI Features"
      },
      secondBadge: {
        title: "Download",
        description: "2M+ Active"
      }
    }
  }

  // Merge provided data with defaults
  const bannerData = { ...defaultData, ...data }

  return (
    <section className="relative overflow-hidden bg-white dark:bg-[#071E1A]">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-100 dark:bg-emerald-900/10 rounded-full blur-3xl opacity-50" />

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-100 dark:bg-amber-900/10 rounded-full blur-3xl opacity-50" />

      </div>

      <div className="relative">

        <div className="grid lg:grid-cols-2 min-h-[650px]">

          {/* LEFT SIDE */}
          <div className="bg-[#EAF7F5] dark:bg-[#0D2A24] flex items-center">

            <div className="p-8 lg:p-16 w-full text-center lg:text-left">

              <Badge className="mb-5 bg-emerald-100 text-emerald-700 border-0">
                শিশুদের শিক্ষা
              </Badge>

              <h1 className="text-4xl lg:text-6xl font-bold text-[#12372A] dark:text-white leading-tight">

                শিশুদের জন্য

                <span className="block mt-3">
                  কুরআন, ফোনিক্স
                </span>

                <span className="block">
                  ইংরেজি ও আবাকাস
                </span>

              </h1>

              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">

                প্রাক-প্রাথমিক থেকে স্কুল পর্যায়ের শিশুদের জন্য
                আধুনিক ও ইসলামিক পরিবেশে মানসম্মত শিক্ষা।

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <Link
                  href="/course"
                  className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-emerald-700 to-teal-700 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:from-emerald-800 hover:to-teal-800"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />

                  কোর্স শুরু করি

                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="bg-linear-to-r from-[#0D5C4F] to-[#0A6A66] flex items-center">

            <div className="p-8 lg:p-16 w-full text-center lg:text-left">

              <Badge className="mb-5 bg-white/15 text-white border-0">
                দ্বীনি শিক্ষা
              </Badge>

              <h2 className="text-4xl lg:text-6xl font-bold text-white leading-tight">

                মাওলানা কোর্স

                <span className="block mt-3">
                  ও আরবি ভাষা
                </span>

                <span className="block">
                  শিক্ষা
                </span>

              </h2>

              <p className="mt-6 text-lg text-emerald-50 leading-relaxed">

                ঘরে বসেই কুরআন, তাজবিদ, আরবি ভাষা এবং
                ইসলামিক জ্ঞান অর্জনের সুযোগ।

              </p>

              <div className="flex flex-col sm:flex-row gap-4 mt-8">

                <Link
                  href="/course"
                  className="group inline-flex items-center gap-2 rounded-full border-2 border-emerald-600 bg-white px-7 py-3.5 text-sm font-semibold text-[#0A6A66] shadow-sm transition-all duration-300 hover:bg-emerald-50 hover:shadow-lg"
                >
                  আপনার যাত্রা শুরু করুন

                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>

              </div>

              <div className="mt-10 text-emerald-100 text-2xl opacity-70">
                قُلْ رَبِّ زِدْنِي عِلْمًا
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}