import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Download, Sparkles, Star } from 'lucide-react'

export default function Banner() {
  return (
    <section className="relative py-12 md:py-20 overflow-hidden bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      
      {/* Background Decoration */}
      <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 mask-[radial-gradient(ellipse_at_center,white,transparent)] opacity-20" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left space-y-6">
            
            {/* Badge */}
            <Badge variant="outline" className="inline-flex items-center rounded-full gap-2 px-4 py-1.5 text-sm border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-blue-600 dark:text-blue-400 font-medium">Trusted by 50,000+ learners</span>
            </Badge>
            
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-purple-400 dark:to-blue-400">
                Welcome to Bright Path
              </span>
              <span className="text-gray-800 dark:text-white"> Academy</span>
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl lg:mx-0 mx-auto">
              Empowering learners with quality education and resources to build 
              <span className="text-blue-600 dark:text-blue-400 font-semibold"> brighter futures</span>
            </p>
            
            {/* Stats */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 border-2 border-white dark:border-gray-900 flex items-center justify-center">
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">✨</span>
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Join 50K+ learners</span>
              </div>
              
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map((star) => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.9 (10K+ reviews)</span>
              </div>
            </div>
            
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <Button 
                size="lg" 
                className="group bg-blue-600 rounded-full hover:bg-blue-700 text-white px-8  text-base shadow-lg shadow-blue-600/25"
              >
                Explore Courses
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="group px-8  text-base border-2 rounded-full hover:bg-blue-50 dark:hover:bg-blue-950/30"
              >
                <Download className="mr-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                Install App
              </Button>
            </div>
            
            {/* Trust Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-gray-500 dark:text-gray-500">
              <span>✓ No credit card required</span>
              <span>✓ 14-day free trial</span>
              <span>✓ Cancel anytime</span>
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
                  src="/mobile.webp"
                  alt="Bright Path Academy Mobile App"
                  width={500}
                  height={500}
                  priority
                  className="w-full h-auto object-contain drop-shadow-2xl"
                />
                
                {/* Floating Badges */}
                <div className="absolute -top-6 -right-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 animate-bounce">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">New</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">AI Features</p>
                    </div>
                  </div>
                </div>
                
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl shadow-xl p-3 animate-bounce delay-300">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">📱</div>
                    <div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">Download</p>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white">2M+ Active</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* App Store Badges */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <Image
                  src="/playstore.png"
                  alt="Google Play"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
                <Image
                  src="/appstore.png"
                  alt="App Store"
                  width={120}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}