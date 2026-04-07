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
  Home,
  Search,
  Bell,
  Sparkles,
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
    { name: 'Achievements', path: '/profile/achievements', icon: Trophy },
    { name: 'Reviews', path: '/profile/reviews', icon: Star },
    { name: 'Messages', path: '/profile/messages', icon: MessageCircle },
    { name: 'Community', path: '/profile/community', icon: Users },
    { name: 'Profile', path: '/profile/user-profile', icon: User },
    { name: 'Settings', path: '/profile/settings', icon: Settings },
    { name: 'Change Password', path: '/profile/change-password', icon: Lock },
    { name: 'Fees Receipt', path: '/profile/fees', icon: CreditCard },
    { name: 'Help & Support', path: '/profile/support', icon: HelpCircle },
  ]

  // Mobile Design - 4 column grid, minimal colors, unique card design
  if (isMobile) {
    return (
      <div className="min-h-screen  pb-4">
       

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
                      ? 'bg-white dark:bg-gray-800 shadow-md scale-[0.98] ring-1 ring-gray-200 dark:ring-gray-700'
                      : 'bg-transparent active:scale-95'
                  }`}
                >
                  {/* Icon Circle */}
                  <div
                    className={`relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-200 ${
                      isActive
                        ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-lg'
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
                  <div className="absolute inset-x-2 bottom-0 h-0.5 bg-gray-900 dark:bg-white rounded-full scale-x-0 group-hover:scale-x-100 transition-transform origin-center" />
                </Link>
              )
            })}
          </div>
        </div>

        {/* Bottom Navigation Bar - Minimal
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-4 py-2">
          <div className="flex justify-around items-center">
            <Link href="/profile" className="flex flex-col items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <Home className="w-5 h-5" />
              <span className="text-[10px] font-medium">Home</span>
            </Link>
            <Link href="/profile/courses" className="flex flex-col items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <Search className="w-5 h-5" />
              <span className="text-[10px] font-medium">Explore</span>
            </Link>
            <Link href="/profile/messages" className="flex flex-col items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <Bell className="w-5 h-5" />
              <span className="text-[10px] font-medium">Alerts</span>
            </Link>
            <Link href="/profile/user-profile" className="flex flex-col items-center gap-0.5 text-gray-500 dark:text-gray-400">
              <User className="w-5 h-5" />
              <span className="text-[10px] font-medium">Profile</span>
            </Link>
          </div>
        </div> */}

      </div>
    )
  }

  // Desktop Design - Super awesome hover effects, name outside the box
  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="max-w-7xl mx-auto px-6 py-8 lg:py-12">
       

        {/* Grid Layout - Responsive Desktop */}
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
                {/* Card Container - Name outside the box effect */}
                <div className="relative flex flex-col items-center">
                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-0.5 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition duration-500 group-hover:duration-200" />
                  
                  {/* Icon Box */}
                  <div
                    className={`relative w-20 h-20 lg:w-24 lg:h-24 flex items-center justify-center rounded-2xl transition-all duration-300 ${
                      isActive
                        ? 'bg-gray-900 dark:bg-white shadow-xl scale-105'
                        : 'bg-white dark:bg-gray-800 shadow-md group-hover:shadow-xl group-hover:scale-105 group-hover:bg-gray-50 dark:group-hover:bg-gray-750'
                    }`}
                  >
                    {/* Animated Border on Hover */}
                    <div className={`absolute inset-0 rounded-2xl transition-all duration-300 ${
                      isActive ? 'ring-2 ring-gray-900 dark:ring-white' : 'ring-1 ring-gray-100 dark:ring-gray-700 group-hover:ring-gray-300 dark:group-hover:ring-gray-600'
                    }`} />
                    
                    {/* Icon */}
                    <Icon
                      className={`w-8 h-8 lg:w-9 lg:h-9 transition-all duration-300 ${
                        isActive
                          ? 'text-white dark:text-gray-900'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                      strokeWidth={1.5}
                    />

                    {/* Active Dot */}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full ring-2 ring-white dark:ring-gray-900 animate-pulse" />
                    )}

                    {/* Subtle Shine Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-linear-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Name - Outside the box, positioned below with unique style */}
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
                    
                    {/* Animated Underline for Active/Hover */}
                    <div className={`h-0.5 bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 rounded-full transition-all duration-300 mt-1 ${
                      isActive ? 'w-6 opacity-100' : 'w-0 opacity-0 group-hover:w-6 group-hover:opacity-100'
                    } mx-auto`} />
                  </div>

                  {/* Hover Arrow Indicator */}
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0 translate-x-2">
                    <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        {/* Footer Decoration */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 text-center">
          <p className="text-xs text-gray-400 dark:text-gray-600">
            Navigate through your learning experience
          </p>
        </div>
      </div>
    </div>
  )
}