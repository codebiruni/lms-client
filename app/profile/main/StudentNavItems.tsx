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
} from 'lucide-react'

interface NavItem {
  name: string
  path: string
  icon: React.ElementType
  color: string
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
    { name: 'Dashboard', path: '/profile', icon: LayoutDashboard, color: 'from-blue-500 to-cyan-500' },
    { name: 'My Courses', path: '/profile/courses', icon: BookOpen, color: 'from-purple-500 to-pink-500' },
    { name: 'Live Classes', path: '/profile/classes', icon: Video, color: 'from-red-500 to-orange-500' },
    { name: 'Recordings', path: '/profile/recordings', icon: Clock, color: 'from-green-500 to-emerald-500' },
    { name: 'Attendance', path: '/profile/attendance', icon: Calendar, color: 'from-yellow-500 to-orange-500' },
    { name: 'Progress', path: '/profile/progress', icon: TrendingUp, color: 'from-indigo-500 to-blue-500' },
    { name: 'Certificates', path: '/profile/certificates', icon: Award, color: 'from-amber-500 to-yellow-500' },
    { name: 'Exams', path: '/profile/exams', icon: FileText, color: 'from-rose-500 to-pink-500' },
    { name: 'Achievements', path: '/profile/achievements', icon: Trophy, color: 'from-yellow-500 to-amber-500' },
    { name: 'Reviews', path: '/profile/reviews', icon: Star, color: 'from-orange-500 to-red-500' },
    { name: 'Messages', path: '/profile/messages', icon: MessageCircle, color: 'from-teal-500 to-cyan-500' },
    { name: 'Community', path: '/profile/community', icon: Users, color: 'from-sky-500 to-blue-500' },
    { name: 'Profile', path: '/profile/user-profile', icon: User, color: 'from-gray-500 to-gray-600' },
    { name: 'Settings', path: '/profile/settings', icon: Settings, color: 'from-slate-500 to-gray-500' },
    { name: 'Change Password', path: '/profile/change-password', icon: Lock, color: 'from-red-500 to-rose-500' },
    { name: 'Fees Receipt', path: '/profile/fees', icon: CreditCard, color: 'from-emerald-500 to-green-500' },
    { name: 'Help & Support', path: '/profile/support', icon: HelpCircle, color: 'from-blue-500 to-indigo-500' },
  ]

  // Mobile Design
  if (isMobile) {
    return (
      <div className="min-h-screen  pb-0">
        

        

        {/* Section Title */}
        <div className="px-4 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Main Menu</h3>
        </div>

        {/* Grid Menu - 2 columns for mobile */}
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            {navItems.slice(0, 8).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`bg-white dark:bg-gray-900 rounded-xl p-4 transition-all active:scale-95 shadow-sm border ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-linear-to-br ${item.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Tap to open</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* More Section */}
        <div className="px-4 mt-6 mb-3">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">More Options</h3>
        </div>
        <div className="px-4">
          <div className="grid grid-cols-2 gap-3">
            {navItems.slice(8).map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.path
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`bg-white dark:bg-gray-900 rounded-xl p-4 transition-all active:scale-95 shadow-sm border ${
                    isActive
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                      : 'border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-xl bg-linear-to-br ${item.color} text-white`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5">Tap to open</p>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200 dark:border-gray-800 px-4 py-2">
          <div className="flex justify-around items-center">
            <Link href="/profile" className="flex flex-col items-center gap-1 text-gray-500">
              <Home className="w-5 h-5" />
              <span className="text-[10px]">Home</span>
            </Link>
            <Link href="/profile/courses" className="flex flex-col items-center gap-1 text-gray-500">
              <Search className="w-5 h-5" />
              <span className="text-[10px]">Explore</span>
            </Link>
            <Link href="/profile/messages" className="flex flex-col items-center gap-1 text-gray-500">
              <Bell className="w-5 h-5" />
              <span className="text-[10px]">Alerts</span>
            </Link>
            <Link href="/profile/user-profile" className="flex flex-col items-center gap-1 text-gray-500">
              <User className="w-5 h-5" />
              <span className="text-[10px]">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  
  return (
    <div className="min-h-screen  py-6 px-4 sm:py-8 sm:px-6 lg:py-10 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid Layout - Responsive */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.path
            
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`group relative overflow-hidden rounded-xl sm:rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'ring-2 ring-blue-500 shadow-lg scale-95' 
                    : 'hover:scale-105 hover:shadow-xl active:scale-95'
                }`}
              >
                {/* Card Background */}
                <div className={`absolute inset-0 bg-linear-to-br ${item.color} opacity-5 group-hover:opacity-10 transition-opacity`} />
                <div className="absolute inset-0 bg-white dark:bg-gray-900" />
                
                {/* Card Content */}
                <div className="relative p-4 sm:p-5 flex flex-col items-center text-center">
                  {/* Icon Container */}
                  <div className={`inline-flex p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-linear-to-br ${item.color} text-white mb-3 shadow-md group-hover:shadow-lg transition-all`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-xs sm:text-sm font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1">
                    {item.name}
                  </h3>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
                  )}
                  
                  {/* Hover Arrow */}
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 group-hover:text-blue-500" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}