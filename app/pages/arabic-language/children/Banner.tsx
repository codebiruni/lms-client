'use client'
import React from 'react'
import Image from 'next/image'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function Banner() {
  return (
    <header id='home' className="relative pt-36 pb-5 px-6 overflow-hidden">
      {/* Background Decorative Blur */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-100 bg-green-400/10 blur-[120px] rounded-full -z-10"></div>
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content */}
        <div className="text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-green-100/80 backdrop-blur-sm px-4 py-2 rounded-full mb-8 shadow-sm border border-green-200">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-600"></span>
            </span>
            <span className="text-xs font-bold text-green-700 tracking-wider uppercase">
              নতুন ব্যাচে ভর্তি চলছে
            </span>
          </div>

          <h1 className="serif-font text-5xl md:text-7xl font-bold text-[#0A1E5E] leading-[1.1] mb-6">
            ঘরে বসেই হয়ে উঠুন <br />
            <span className="text-green-600 drop-shadow-sm">একজন আলেম</span>
          </h1>

          <p className="text-lg text-gray-700 leading-relaxed mb-10 max-w-lg mx-auto md:mx-0 font-medium">
            চাকরি কিংবা ব্যবসার পাশাপাশি মাদানী নেসাব পদ্ধতিতে আরবি ভাষা ও দ্বীনি ইলমে পারদর্শী হওয়ার শক্তিশালী ডিজিটাল প্ল্যাটফর্ম।
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center md:justify-start">
            <button className="bg-[#0A1E5E] text-white px-10 py-5 rounded-2xl font-bold flex items-center justify-center glow-button text-lg shadow-xl active:scale-95 transition-all">
              ক্লাস শুরু করুন <ArrowRight className="ml-2 w-6 h-6" />
            </button>
            
            <a 
              href="https://chat.whatsapp.com/Beiwxy0IdBIHjPErXhXqeT" 
              target="_blank" 
              className="bg-white border-2 border-[#0A1E5E] text-[#0A1E5E] px-10 py-5 rounded-2xl font-bold flex items-center justify-center hover:bg-blue-50 transition-all text-lg shadow-md active:scale-95"
            >
              <MessageCircle className="mr-2 w-6 h-6 text-green-600 fill-green-50" /> 
              হোয়াটসঅ্যাপ গ্রুপ
            </a>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative mt-12 md:mt-0">
          <div className="bg-blue-900/10 absolute inset-0 blur-3xl rounded-full"></div>
          
          <div className="grid grid-cols-2 gap-6 p-2 relative z-10">
            {/* Image 1 - Modern Islamic Architecture/Study */}
            <div className="transform translate-y-12 transition-transform hover:translate-y-8 duration-500">
              <Image 
                src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=800&auto=format&fit=crop" 
                alt="Quran Study"
                width={400}
                height={600}
                className="rounded-[2.5rem] shadow-2xl border-4 border-white aspect-3/4 object-cover"
              />
            </div>
            
            {/* Image 2 - Spiritual Environment */}
            <div className="transition-transform hover:-translate-y-4 duration-500">
              <Image 
                src="https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop" 
                alt="Islamic Learning"
                width={400}
                height={600}
                className="rounded-[2.5rem] shadow-2xl border-4 border-white aspect-3/4 object-cover"
              />
            </div>
          </div>

          {/* Floating Badge */}
          {/* <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-gray-100 z-20 flex items-center gap-3 animate-bounce-slow">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-tighter">রেজিস্ট্রেশন</p>
              <p className="text-sm font-bold text-[#0A1E5E]">৮০+ ছাত্র ইতিমধ্যে যুক্ত</p>
            </div>
          </div> */}
        </div>
      </div>

      {/* Stats Section Overlay */}
      <div className="max-w-5xl mx-auto px-6 mt-7  relative z-20">
  <div className="bg-[#0A1E5E] rounded-2xl p-4 md:p-6 shadow-xl border border-white/10 overflow-hidden">
    {/* Subtle Islamic Pattern Overlay */}
    <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]"></div>
    
    <div className="flex flex-wrap md:flex-nowrap justify-between items-center divide-y md:divide-y-0 md:divide-x divide-white/10 relative z-10">
      
      {/* Stat 1 */}
      <div className="w-1/2 md:w-full py-2 md:py-0 text-center flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-bold text-green-400">০৫ মাস</h3>
        <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider font-semibold">আরবি কথোপকথন</p>
      </div>
      
      {/* Stat 2 */}
      <div className="w-1/2 md:w-full py-2 md:py-0 text-center flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-bold text-green-400">৩০%</h3>
        <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider font-semibold">কোরআন বোধগম্যতা</p>
      </div>
      
      {/* Stat 3 */}
      <div className="w-1/2 md:w-full py-2 md:py-0 text-center flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-bold text-green-400">০৬ বছর</h3>
        <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider font-semibold">মাওলানা কোর্স</p>
      </div>
      
      {/* Stat 4 */}
      <div className="w-1/2 md:w-full py-2 md:py-0 text-center flex flex-col items-center">
        <h3 className="text-xl md:text-2xl font-bold text-green-400">৮ জন</h3>
        <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-wider font-semibold">সীমিত সিট</p>
      </div>

    </div>
  </div>
</div>

      {/* <style jsx>{`
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); }
          50% { transform: translateY(0); }
        }
      `}</style> */}
    </header>
  )
}