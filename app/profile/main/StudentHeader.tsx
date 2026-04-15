/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
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
  Menu,
  LogOut,
  BarChart3,
  ChevronRight,
  UserCircle,
  Bell,
  Trophy,
  MessageCircle,
  HelpCircle,
  Home
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { ModeToggle } from '@/components/theme-toggle'
import useContextData from '@/app/default/custom-component/useContextData'
import { Badge } from '@/components/ui/badge'

interface UserData {
  email: string
  exp: number
  iat: number
  id: string
  image: string
  name: string
  role: string
  userId: string
}

export default function StudentHeader() {
  const { UserData , handleLogout, callLogout } = useContextData() as { UserData: UserData | null ; handleLogout :any ; callLogout : any}
  const pathname = usePathname()
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    
    return () => {
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Navigation items
  const navItems = [
    { name: 'Home', path: '/profile', icon: Home, active: pathname === '/profile' },
    { name: 'My Courses', path: '/profile/courses', icon: BookOpen, active: pathname === '/profile/courses' },
    { name: 'Live Classes', path: '/profile/classes', icon: Video, active: pathname === '/profile/classes' },
    { name: 'Recordings', path: '/profile/recordings', icon: Clock, active: pathname === '/profile/recordings' },
    { name: 'Attendance', path: '/profile/attendance', icon: Calendar, active: pathname === '/profile/attendance' },
    { name: 'Progress', path: '/profile/progress', icon: BarChart3, active: pathname === '/profile/progress' },
    { name: 'Certificates', path: '/profile/certificates', icon: Award, active: pathname === '/profile/certificates' },
    { name: 'Exams', path: '/profile/exams', icon: FileText, active: pathname === '/profile/exams' },
    // { name: 'Achievements', path: '/profile/achievements', icon: Trophy, active: pathname === '/profile/achievements' },
    { name: 'Reviews', path: '/profile/reviews', icon: Star, active: pathname === '/profile/reviews' },
    // { name: 'Messages', path: '/profile/messages', icon: MessageCircle, active: pathname === '/profile/messages' },
    { name: 'Profile', path: '/profile/user-profile', icon: User, active: pathname === '/profile/user-profile' },
    { name: 'Settings', path: '/profile/settings', icon: Settings, active: pathname === '/profile/settings' },
    { name: 'Change Password', path: '/profile/change-password', icon: Lock, active: pathname === '/profile/change-password' },
    { name: 'Fees Receipt', path: '/profile/fees', icon: CreditCard, active: pathname === '/profile/fees' },
    { name: 'Help & Support', path: '/profile/support', icon: HelpCircle, active: pathname === '/profile/support' },
  ]

  // First 5 items to show directly
  const mainNavItems = navItems.slice(0, 5)
  const moreNavItems = navItems.slice(5)

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  

  // Mobile Bottom Navigation
  if (isMobile) {
    return (
      <>
        {/* Top Header for Mobile */}
        <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg'
            : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl'
        }  border-b border-gray-200 dark:border-gray-800 px-4 py-2`}>
          <div className="flex items-center justify-between">
            <Link href="/profile" className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-60 blur-lg rounded-full group-hover:scale-150 transition-transform" />
                <Image
                  src="/logo1.png"
                  alt="Quranic Verse"
                  width={70}
                  height={46}
                  className="relative z-10 transition-transform group-hover:scale-110"
            />
              </div>
             
            </Link>

            <div className="flex items-center gap-2">
              <ModeToggle />
              
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              </Button>
              
              <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full bg-linear-to-r from-blue-500/10 to-purple-500/10">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0">
                  <SheetHeader className="p-4 bg-linear-to-r from-blue-500/5 to-purple-500/5 border-b">
                    <SheetTitle className="flex items-center gap-3">
                      <Avatar className="w-12 h-12 ring-2 ring-blue-500/20">
                        <AvatarImage src={UserData?.image} />
                        <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-500 text-white">
                          {UserData?.name ? getInitials(UserData.name) : 'ST'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{UserData?.name || 'Student'}</p>
                        <p className="text-xs text-gray-500">{UserData?.email}</p>
                        <Badge variant="outline" className="mt-1 text-[10px] capitalize">
                          {UserData?.role}
                        </Badge>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="p-4">
                    

                    <div className="space-y-1 max-h-[60vh] overflow-y-auto">
                      {navItems.map((item) => (
                        <SheetClose asChild key={item.path}>
                          <Link
                            href={item.path}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                              item.active
                                ? 'bg-linear-to-r from-blue-500/10 to-purple-500/10 text-blue-600 border-l-4 border-blue-600'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                            }`}
                          >
                            <item.icon className="w-4 h-4" />
                            <span className="text-sm font-medium">{item.name}</span>
                          </Link>
                        </SheetClose>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/50 rounded-xl"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Logout
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="fixed bottom-4 left-4 right-4 z-40 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 px-2 py-2">
          <div className="flex justify-around items-center">
            {mainNavItems.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all relative ${
                    item.active
                      ? 'text-blue-600 dark:text-blue-400 bg-linear-to-r from-blue-500/10 to-purple-500/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-[10px] font-medium">{item.name}</span>
                  {item.active && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-blue-600" />
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* Content Padding for Mobile */}
        <div className="pt-20 pb-0" />
      </>
    )
  }

  // Desktop Navigation
  return (
    <>
      {/* Desktop Header */}
      <div className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-lg '
          : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl '
      } border-b border-gray-200 dark:border-gray-800`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/profile" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 opacity-60 blur-xl rounded-full group-hover:scale-150 transition-transform duration-500" />
                <Image
                  src="/logo1.png"
                  alt="Quranic Verse"
                  width={100}
                  height={45}
                  className="relative z-10 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                />
              </div>
              
            </Link>

            
             {/* Navigation Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-800 mt-2">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
              {mainNavItems.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`group flex items-center gap-2 px-5 py-3 text-sm font-medium transition-all relative whitespace-nowrap rounded-t-xl ${
                      item.active
                        ? 'text-blue-600 dark:text-blue-400'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                      item.active ? 'text-blue-600' : ''
                    }`} />
                    {item.name}
                    {item.active && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full" />
                    )}
                  </Link>
                )
              })}

              {/* More Items Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 px-5 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all group">
                    <span>More</span>
                    <ChevronRight className="w-4 h-4 rotate-90 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-72 max-h-96 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-1 p-2">
                    {moreNavItems.map((item) => {
                      const Icon = item.icon
                      return (
                        <DropdownMenuItem key={item.path} asChild className="cursor-pointer">
                          <Link href={item.path} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-linear-to-r hover:from-blue-500/10 hover:to-purple-500/10">
                            <Icon className="w-4 h-4 text-gray-500" />
                            <span className="text-sm">{item.name}</span>
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>



            {/* Right Section */}
            <div className="flex items-center gap-2">
              <ModeToggle />
              
             

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-3 hover:bg-linear-to-r hover:from-blue-500/10 hover:to-purple-500/10 rounded-full px-3 py-1.5 transition-all duration-300">
                    <Avatar className="w-10 h-10 ring-2 ring-blue-500/20 ring-offset-2 ring-offset-white dark:ring-offset-gray-900">
                      <AvatarImage src={UserData?.image} />
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-purple-500 text-white font-semibold">
                        {UserData?.name ? getInitials(UserData.name) : 'ST'}
                      </AvatarFallback>
                    </Avatar>

                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 mt-2">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="font-semibold">{UserData?.name}</p>
                      <p className="text-xs text-gray-500">{UserData?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile/user-profile')} className="cursor-pointer">
                    <UserCircle className="w-4 h-4 mr-2" />
                    My Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile/courses')} className="cursor-pointer">
                    <BookOpen className="w-4 h-4 mr-2" />
                    My Courses
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile/progress')} className="cursor-pointer">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Learning Progress
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push('/profile/certificates')} className="cursor-pointer">
                    <Award className="w-4 h-4 mr-2" />
                    Certificates
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push('/profile/settings')} className="cursor-pointer">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleLogout(!callLogout)} className="text-red-600 cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

       
      </div>

      {/* Content Padding */}
      <div className="pt-12" />
    </>
  )
}