/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import Image from 'next/image'
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
    <section className="relative py-12 md:py-20 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 mask-[radial-linear(ellipse_at_center,white,transparent)] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <Badge variant="outline" className="inline-flex items-center rounded-full gap-2 px-4 py-1.5 text-sm border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                {bannerData.baseText}
              </span>
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">
                {bannerData.title?.highlightText || "Welcome to"}
              </span>
              <span className="text-gray-800 dark:text-white"> 
                {bannerData.title?.blackText || "Academy"}
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl lg:mx-0 mx-auto">
              {bannerData.descRiption}
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">✨</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {bannerData.bottomBaseText?.firstText || "Join 50K+ learners"}
                </span>
              </div>
              
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                  {bannerData.bottomBaseText?.secondText || "4.9 (10K+ reviews)"}
                </span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button 
                size="lg" 
                className="group bg-blue-600 rounded-full hover:bg-blue-700 text-white px-8 text-base shadow-lg shadow-blue-600/25"
                onClick={() => {
                  // Handle explore courses click
                  window.location.href = '/courses'
                }}
              >
                {bannerData.buttons?.primaryButton || "Explore Courses"}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <PwaInstaller>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="group px-8 text-base border-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30"
                >
                  <Download className="mr-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  {bannerData.buttons?.secondaryButton || "Install App"}
                </Button>
              </PwaInstaller>
            </div>
            
            {/* Trust Badge */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-gray-500 dark:text-gray-500">
              <span>✓ {bannerData.list?.firstList || "No credit card required"}</span>
              <span>✓ {bannerData.list?.secondList || "14-day free trial"}</span>
              <span>✓ {bannerData.list?.thirdList || "Cancel anytime"}</span>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="flex-1 relative">
            <div className="relative w-full max-w-lg mx-auto">
              {/* Decorative Elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-200 dark:bg-blue-900/50 rounded-full blur-3xl opacity-30 animate-pulse" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-200 dark:bg-purple-900/50 rounded-full blur-3xl opacity-30 animate-pulse delay-1000" />
              
              {/* Main Image */}
              <div className="relative z-10">
                <Image
                  src={bannerData.images?.mainImage || "/mobile.webp"}
                  alt="Mobile App"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
                
                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 animate-in">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {bannerData.floatingBadges?.firstBadge?.title || "New"}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {bannerData.floatingBadges?.firstBadge?.description || "AI Features"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 animate-in delay-300">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">📱</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {bannerData.floatingBadges?.secondBadge?.title || "Download"}
                      </p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">
                        {bannerData.floatingBadges?.secondBadge?.description || "2M+ Active"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* App Store Badges */}
              <PwaInstaller>
                <div className="flex items-center justify-center gap-3 mt-6">
                  <div className="cursor-pointer hover:opacity-80 transition-opacity">
                    <Image
                      src={bannerData.images?.playStoreImage || "/playstore.png"}
                      alt="Google Play"
                      width={120}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <div className="cursor-pointer hover:opacity-80 transition-opacity">
                    <Image
                      src={bannerData.images?.appStoreImage || "/appstore.png"}
                      alt="App Store"
                      width={120}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                </div>
              </PwaInstaller>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}