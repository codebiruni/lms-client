'use client'
import React from 'react'
import { Youtube, MapPin, MessageCircle, Users, ExternalLink } from 'lucide-react'

export default function DemuClasses() {
  const videos = [
    {
      id: "HyZciYKYsIo",
      title: "এসো আরবী শিখি থেকে নাহু শিখি",
      desc: "আরবী ভাষা-মাওলানা বিভাগ"
    },
    {
      id: "be6CXgNzFeA",
      title: "সহজে কোরআন থেকে ফেয়েল বের করা",
      desc: "Arabic Saraf Practice with Quran"
    },
    {
      id: "2sk4FmllhnM",
      title: "মওসুফ সিফত আলোচনা",
      desc: "এসো আরবী শিখি দরস"
    }
  ]

  return (
    <section id='classes' className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header Section */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-2xl">
              <Youtube className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-[#0A1E5E] mb-4">🎥 অনলাইন ক্লাসের নমুনা</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            আমাদের অভিজ্ঞ উস্তাদদের পাঠদান পদ্ধতি সরাসরি দেখে নিন। কোরআনিক ভার্স বাংলাদেশের বিশেষায়িত অনলাইন ক্লাসগুলো এভাবেই পরিচালিত হয়।
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-3 gap-4 mb-10">
          {videos.map((video, index) => (
            <div key={index} className="bg-white rounded-md overflow-hidden shadow-lg border border-gray-100 group hover:shadow-2xl transition-all">
              <div className="aspect-video w-full">
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${video.id}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-3">
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-widest bg-red-50 px-2 py-1 rounded">Sample Class {index + 1}</span>
                <h3 className="text-lg font-bold text-[#0A1E5E] mt-3 mb-1 line-clamp-1">{video.title}</h3>
                <p className="text-sm text-gray-500 font-medium">{video.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact & Location Footer Card */}
        <div id='contact' className="bg-[#0A1E5E] rounded-md p-3 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 rotate-12 pointer-events-none">
            <MapPin size={200} />
          </div>

          <div className="grid lg:grid-cols-2 gap-12 relative z-10">
            {/* Left: Address */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold border-b border-white/10 pb-4">আমাদের ঠিকানা</h4>
              <div className="flex items-start gap-5">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin className="text-green-400" />
                </div>
                <div>
                  <p className="text-lg font-bold">মাদরাসাতু কোরআনিক ভার্স বাংলাদেশ</p>
                  <p className="text-white/70 leading-relaxed mt-1">
                    বাসা #৭০, রোড #০৪, ডি.আই.টি প্রজেক্ট, <br /> 
                    মেরুল বাড্ডা, ঢাকা-১২১২
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Connect */}
            <div className="space-y-6">
              <h4 className="text-2xl font-bold border-b border-white/10 pb-4">ভর্তি ও তথ্যের জন্য</h4>
              <div className="grid gap-4">
                <a 
                  href="tel:01835411107" 
                  className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl hover:bg-white/10 transition-all border border-white/10"
                >
                  <MessageCircle className="text-green-400" />
                  <div>
                    <p className="text-xs opacity-60">হোয়াটসঅ্যাপ মেসেজ</p>
                    <p className="text-lg font-bold tracking-wider">01835-411107</p>
                  </div>
                </a>
                
                <a 
                  href="https://chat.whatsapp.com/Beiwxy0IdBIHjPErXhXqeT" 
                  target="_blank"
                  className="flex items-center justify-between bg-green-600 p-4 rounded-2xl hover:bg-green-700 transition-all shadow-lg group"
                >
                  <div className="flex items-center gap-4">
                    <Users />
                    <span className="font-bold">হোয়াটসঅ্যাপ গ্রুপে যুক্ত হোন</span>
                  </div>
                  <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}