'use client'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Rocket, 
  Sparkles,
  Code,
  Brain,
  Palette,
  Music,
  Camera,
  PenTool
} from 'lucide-react'
import React from 'react'

export default function IntroductionSection() {
  const features = [
    { icon: <Code className="w-8 h-8" />, title: "Coding", color: "from-blue-500 to-cyan-500", delay: "0s" },
    { icon: <Brain className="w-8 h-8" />, title: "AI/ML", color: "from-purple-500 to-pink-500", delay: "0.2s" },
    { icon: <Palette className="w-8 h-8" />, title: "Design", color: "from-orange-500 to-red-500", delay: "0.4s" },
    { icon: <Music className="w-8 h-8" />, title: "Music", color: "from-green-500 to-emerald-500", delay: "0.6s" },
    { icon: <Camera className="w-8 h-8" />, title: "Photo", color: "from-blue-500 to-purple-500", delay: "0.8s" },
    { icon: <PenTool className="w-8 h-8" />, title: "Writing", color: "from-pink-500 to-rose-500", delay: "1s" }
  ]



  return (
    <div className='py-8 px-3 lg:px-6 min-h-screen flex items-center justify-center '>
      <Card className='rounded-3xl w-full border-0 bg-white/40 dark:bg-gray-900/40 backdrop-blur-xl shadow-2xl overflow-hidden relative'>
        
        {/* Animated Background Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/30 dark:bg-blue-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/30 dark:bg-purple-600/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-400/20 dark:bg-pink-600/10 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 mask-[radial-linear(ellipse_at_center,white,transparent)] opacity-20" />
        
        <CardContent className="relative z-10 p-8 lg:p-12">
          
          {/* Minimal Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="px-4  rounded-full border-blue-200 dark:border-blue-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mr-2" />
<<<<<<< HEAD
              <span className="text-blue-600 dark:text-blue-400">Welcome to Bright Path</span>
=======
              <span className="text-blue-600 dark:text-blue-400">Welcome to Quranic Verce BD</span>
>>>>>>> 278fa469d45ab202208f501214f5ce6204cc883d
            </Badge>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Learn Anything
            </h2>
            
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Master new skills with expert guidance
            </p>
          </div>

          {/* Big Glass Icons Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative animate-fade-in-up"
                style={{ animationDelay: feature.delay }}
              >
                {/* Glass Card */}
                <div className="relative backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 rounded-2xl p-6 border border-white/20 dark:border-gray-700/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  
                  {/* linear Background on Hover */}
                  <div className={`absolute inset-0 bg-linear-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`} />
                  
                  {/* Icon Container */}
                  <div className="relative">
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-linear-to-br ${feature.color} blur-xl opacity-50 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 mx-auto rounded-2xl bg-linear-to-br ${feature.color} p-3 shadow-2xl group-hover:scale-110 transition-transform duration-500 group-hover:rotate-3`}>
                      <div className="w-full h-full text-white">
                        {feature.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Title */}
                  <p className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 mt-4 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {feature.title}
                  </p>
                  
                  {/* Floating Particles */}
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-ping" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity animate-ping delay-300" />
                </div>
              </div>
            ))}
          </div>

        

          {/* Minimal CTA */}
          <div className="flex justify-center gap-4">
            <Button 
              size="lg" 
              className="group rounded-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8  text-base shadow-2xl shadow-blue-600/25"
            >
              <Rocket className="mr-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
              Start Free
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="group px-8 rounded-full text-base border-2 backdrop-blur-sm bg-white/30 dark:bg-gray-900/30 hover:bg-white/50 dark:hover:bg-gray-900/50"
            >
              <Sparkles className="mr-2 w-4 h-4 group-hover:rotate-12 transition-transform" />
              Explore
            </Button>
          </div>

      
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}