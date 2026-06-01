'use client'
import React from 'react'
import {  CheckCircle, Clock, Facebook, Star, GraduationCap, Users } from 'lucide-react'

export default function About() {
  return (
    <section id="about" className="py-16 bg-[#F8FAFC]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Main Grid: Left (Info) & Right (Features) */}
        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Heading & Identity (5 Columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-green-600 font-bold text-sm mb-3">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-ping" />
                কোরআনিক ভার্স বাংলাদেশ
              </div>
              <h2 className="serif-font text-3xl md:text-4xl font-bold text-[#0A1E5E] leading-tight">
                আরবি ভাষা ও দ্বীনি ইলম <br /> শিক্ষার শক্তিশালী প্ল্যাটফর্ম
              </h2>
              <p className="mt-4 text-gray-600 font-medium">
                সব শ্রেণীর মানুষের জন্য ঘরে বসেই আলেম হওয়ার একটি সুসংগঠিত মাদানী নেসাব পদ্ধতি।
              </p>
            </div>

            {/* Questions Section - Compact List */}
            <div className="bg-white p-6 rounded-2xl border border-blue-50 shadow-sm">
              <h4 className="font-bold text-[#0A1E5E] mb-4 flex items-center gap-2">
                <span className="text-xl">💡</span> আপনি কি জানেন?
              </h4>
              <ul className="space-y-3">
                {[
                  "চাকরি বা ব্যবসার পাশাপাশি আলেম হওয়া সম্ভব",
                  "বিশ্ববিদ্যালয়ের পাশাপাশি দ্বীনি ইলম অর্জন সম্ভব",
                  "নতুন করে মাদরাসা শিক্ষা শুরু করা সম্ভব"
                ].map((text, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500 shrink-0" /> {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* Facebook CTA - Minimal */}
            <a href="https://facebook.com/groups/quranicversebd" target="_blank" className="flex items-center gap-4 bg-[#1877F2] p-4 rounded-2xl text-white hover:opacity-90 transition-all shadow-md">
              <Facebook className="w-8 h-8 fill-white" />
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80">ফেসবুক গ্রুপে যুক্ত হোন</p>
                <p className="text-sm font-bold">facebook.com/groups/quranicversebd</p>
              </div>
            </a>
          </div>

          {/* Right Column: Key Highlights (7 Columns) */}
          <div className="lg:col-span-7 bg-[#0A1E5E] rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10 rotate-12">
               <GraduationCap size={150} />
            </div>
            
            <h3 className="serif-font text-2xl font-bold mb-6 flex items-center gap-2">
              <Star className="text-yellow-400 fill-yellow-400 w-5 h-5" /> কেন আমাদের প্ল্যাটফর্ম সেরা?
            </h3>
            
            {/* Feature List Grid */}
            <div className="grid md:grid-cols-2 gap-4 relative z-10">
              {[
                "৫ মাসে আরবিতে কথা বলার দক্ষতা",
                "১ম বছরে কোরআন ও হাদিস বুঝুন (৩০%)",
                "বেফাক ও হাইয়াতুল উলিয়া বোর্ড পরীক্ষা",
                "মেশকাত ও দাওরায়ে হাদিস ফাইনাল",
                "পূর্ণ শরীয়াহ ও ফিকাহর দক্ষতা",
                "সহীহ কোরআন ও ফরজে আইন শিক্ষা"
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl hover:bg-white/10 transition-colors">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full shrink-0" />
                  <span className="text-xs md:text-sm font-medium">{item}</span>
                </div>
              ))}
            </div>

            {/* Schedule Section - Integrated Bottom Row */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl">
                  <Clock className="w-5 h-5 text-blue-300" />
                  <div>
                    <p className="text-[10px] uppercase opacity-60">রাত ব্যাচ</p>
                    <p className="text-xs font-bold">৯:০০ – ১১:০০</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl border border-green-500/30">
                  <Users className="w-5 h-5 text-green-400" />
                  <div>
                    <p className="text-[10px] uppercase opacity-60">স্পেশাল ব্যাচ</p>
                    <p className="text-xs font-bold">বিকাল ৩:০০ (৮ জন)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-2xl">
                  <Clock className="w-5 h-5 text-yellow-300" />
                  <div>
                    <p className="text-[10px] uppercase opacity-60">সকাল ব্যাচ</p>
                    <p className="text-xs font-bold">৭:০০ – ৯:০০</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}