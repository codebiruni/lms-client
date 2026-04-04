'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StudentFooter() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  // Don't show footer on these paths
  if (pathname === '/login' || pathname === '/signup') return null

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              © {currentYear} Quranic Verse Academy. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link 
              href="/profile" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link 
              href="/profile/courses" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              My Courses
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link 
              href="/profile/support" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Support
            </Link>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <Link 
              href="/privacy" 
              className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Privacy Policy
            </Link>
          </div>

          
        </div>

        {/* Bottom Bar */}
        <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-2">
              <span>Version 2.0.0</span>
              <span>•</span>
              <span>Last updated: {currentYear}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Need help?</span>
              <Link 
                href="/profile/support" 
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}