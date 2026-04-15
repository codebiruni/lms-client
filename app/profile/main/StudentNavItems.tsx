'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BookOpen,
  Video,
  Calendar,
  Clock,
  Award,
  FileText,
  Star,
  User,
  Lock,
  Settings,
  CreditCard,
  LayoutDashboard,
  Trophy,
  MessageCircle,
  HelpCircle,
  TrendingUp,
  Users,
  ChevronRight,
  BookAIcon,
} from 'lucide-react'

interface NavItem {
  name: string
  path: string
  icon: React.ElementType
}

export default function StudentNavItems() {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const navItems: NavItem[] = [
    { name: 'Dashboard', path: '/profile', icon: LayoutDashboard },
    { name: 'My Courses', path: '/profile/courses', icon: BookOpen },
    { name: 'Live Classes', path: '/profile/classes', icon: Video },
    { name: 'Recordings', path: '/profile/recordings', icon: Clock },
    { name: 'Attendance', path: '/profile/attendance', icon: Calendar },
    { name: 'All Courses', path: '/profile/all-courses', icon: BookAIcon },
    { name: 'Progress', path: '/profile/progress', icon: TrendingUp },
    { name: 'Certificates', path: '/profile/certificates', icon: Award },
    { name: 'Exams', path: '/profile/exams', icon: FileText },
    // { name: 'Achievements', path: '/profile/achievements', icon: Trophy },
    { name: 'Reviews', path: '/profile/reviews', icon: Star },
    // { name: 'Messages', path: '/profile/messages', icon: MessageCircle },
    { name: 'Community', path: '/profile/community', icon: Users },
    { name: 'Profile', path: '/profile/user-profile', icon: User },
    { name: 'Settings', path: '/profile/settings', icon: Settings },
    { name: 'Change Password', path: '/profile/change-password', icon: Lock },
    { name: 'Fees Receipt', path: '/profile/fees', icon: CreditCard },
    { name: 'Help & Support', path: '/profile/support', icon: HelpCircle },
  ]

  // Mobile Design - 4 column grid
  if (isMobile) {
    return (
      <div className="min-h-screen  pb-20">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
                Student Portal
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Welcome back, Student
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-sm">
              <User className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        </div>

        {/* Grid Menu - 4 columns for mobile */}
        <div className="px-4 py-6">
          <div className="grid grid-cols-4 gap-3">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`group relative flex flex-col items-center rounded-2xl p-3 transition-all duration-200 ${
                    isActive
                      ? 'bg-white dark:bg-gray-800 shadow-md scale-[0.98] ring-1 ring-blue-200 dark:ring-blue-800'
                      : 'bg-transparent active:scale-95'
                  }`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 group-hover:bg-gray-200 dark:group-hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900" />
                    )}
                  </div>
                  
                  {/* Label */}
                  <span
                    className={`mt-2 text-[11px] font-medium text-center leading-tight ${
                      isActive
                        ? 'text-gray-900 dark:text-white'
                        : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                    }`}
                  >
                    {item.name.length > 10 ? item.name.slice(0, 8) + '…' : item.name}
                  </span>

                  {/* Subtle hover indicator */}
                  <div className="absolute inset-x-2 bottom-0 h-0.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  // Desktop Design
  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
        {/* Header Section */}
        <div className="mb-10 text-center lg:text-left lg:flex lg:items-center lg:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Student Dashboard
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your learning journey
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3 mt-4 lg:mt-0">
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">18 achievements</span>
            </div>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 lg:gap-5">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className="group relative block"
              >
                <div className="relative flex flex-col items-center">
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-blue-200 to-indigo-200 dark:from-blue-900/50 dark:to-indigo-900/50 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition duration-500 group-hover:duration-200" />
                  
                  {/* Icon Box */}
                  <div
                    className={`relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-linear-to-br from-blue-500 to-indigo-600 shadow-xl scale-105'
                        : 'bg-white dark:bg-gray-800 shadow-md group-hover:shadow-xl group-hover:scale-105 group-hover:bg-gray-50 dark:group-hover:bg-gray-700'
                    }`}
                  >
                    {/* Animated Border on Hover */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      isActive 
                        ? 'ring-2 ring-blue-500 dark:ring-blue-400' 
                        : 'ring-1 ring-gray-200 dark:ring-gray-700 group-hover:ring-blue-300 dark:group-hover:ring-blue-700'
                    }`} />
                    
                    {/* Icon */}
                    <Icon
                      className={`w-8 h-8 lg:w-9 lg:h-9 transition-all duration-300 ${
                        isActive
                          ? 'text-white'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                      strokeWidth={1.5}
                    />

                    {/* Active Dot */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
                    )}

                    {/* Subtle Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  </div>

                  {/* Name */}
                  <div className="mt-4 text-center">
                    <span
                      className={`text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300'
                      }`}
                    >
                      {item.name}
                    </span>
                    
                    {/* Animated Underline */}
                    <div className={`h-0.5 bg-linear-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-300 mt-1 ${
                      isActive ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
                    } mx-auto`} />
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                    <ChevronRight className="w-4 h-4 text-blue-400 dark:text-blue-500" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Navigate through your learning experience
          </p>
        </div>
      </div>
    </div>
  )
}