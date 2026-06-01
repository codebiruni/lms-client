'use client'
import React from 'react'
import { Facebook, Youtube, Globe } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-4 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-gray-500">
        
        {/* Copyright Part */}
        <div className="flex items-center gap-1">
          <span>© {currentYear}</span>
          <span className="text-[#0A1E5E] font-bold">কোরআনিক ভার্স বাংলাদেশ</span>
          <span className="hidden md:inline">| All Rights Reserved.</span>
        </div>

        {/* Social & Links Part */}
        <div className="flex items-center gap-6">
          <a href="https://www.codebiruni.com" target="_blank" className="hover:text-[#0A1E5E] transition-colors flex items-center gap-1">
            <Globe className="w-4 h-4" /> 
            <span>Developed by Code Biruni</span>
          </a>
          
          <div className="flex items-center gap-4 border-l pl-6 border-gray-200">
            <a href="https://facebook.com/groups/quranicversebd" target="_blank" className="hover:text-blue-600 transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-red-600 transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}