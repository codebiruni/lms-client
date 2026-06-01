'use client'
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  return (
    <nav className="fixed  top-0 left-0 right-0 z-50 px-4 py-4">
      <div className="max-w-6xl mx-auto glass rounded-2xl px-6 py-4 flex justify-between items-center shadow-lg transition-all duration-300">
        
        {/* লোগো সেকশন */}
        <Link 
          href="#home" 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-auto h-10 flex items-center justify-center transition-transform group-hover:scale-105 rotate-3 overflow-hidden drop-shadow-md">
             <Image 
               src="/logo1.png" 
               alt="Quranic Verse Logo" 
               width={160} 
               height={40} 
               className="w-auto h-full object-contain"
               priority
             />
          </div>
        </Link>

        {/* নেভিগেশন মেনু (Desktop) */}
        {/* global.css এর scroll-behavior: smooth এর কারণে সাধারণ লিঙ্কেই কাজ করবে */}
        <div className="hidden md:flex gap-8 text-[15px] font-bold text-[#0A1E5E] serif-font">
          <Link 
            href="#home" 
            className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 hover:after:w-full after:transition-all"
          >
            হোম
          </Link>
          <Link 
            href="#about" 
            className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 hover:after:w-full after:transition-all"
          >
            তথ্য সমূহ 
          </Link>
          <Link 
            href="#classes" 
            className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 hover:after:w-full after:transition-all"
          >
            নমুনা ক্লাস
          </Link>
          <Link 
            href="#apply" 
            className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 hover:after:w-full after:transition-all"
          >
            আবেদন করুন
          </Link>
          <Link 
            href="#contact" 
            className="hover:text-green-600 transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-green-600 hover:after:w-full after:transition-all"
          >
            যোগাযোগ
          </Link>
        </div>

        {/* কল টু অ্যাকশন বাটন - আপনার global.css এর glow-button ক্লাস ব্যবহার করা হয়েছে */}
        <div className="flex items-center">
            <Link 
              href="#apply" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#22C55E] text-white px-6 py-2.5 rounded-xl font-bold text-sm glow-button active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <span className="serif-font">আবেদন করুন</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
              </svg>
            </Link>
        </div>
      </div>
    </nav>
  );
}