/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { 
  Home,
  GraduationCap,
  BookOpen,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  ChevronRight,
  Star,
  Clock,
  Heart,
  Sparkles,
  Shield,
  Award,
  Sun,
  Moon,
  ChevronUp
} from "lucide-react"
import PwaInstaller from "./PwaInstaller"

export default function HomeFooter() {
  const pathname = usePathname()
  const [showScrollTop, setShowScrollTop] = useState(false)

 

  // Return null if on dashboard or profile pages
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/pages") ) return null


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }


  return (
    <>
      {/* Scroll to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 dark:bg-blue-500 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <footer className="relative bg-white dark:bg-gray-900 text-gray-900 dark:text-white overflow-hidden border-t border-gray-200 dark:border-gray-800">
        
        {/* Modern linear Background */}
        <div className="absolute inset-0 bg-linear-to-br from-blue-50/50 via-transparent to-purple-50/50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20 pointer-events-none" />

        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `radial-linear(circle at 1px 1px, 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Top Accent Bar */}
        <div className={`absolute top-0 left-0 right-0 h-1  from-blue-500 via-purple-500 to-orange-500`} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 relative z-10">

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Brand Section - Featured Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-xl rounded-full" />
                  <Image
<<<<<<< HEAD
                    src="/logo.png"
                    alt="Bright Path Academy"
=======
                    src="/logo1.png"
                    alt="Quranic Verse Academy"
>>>>>>> 278fa469d45ab202208f501214f5ce6204cc883d
                    width={50}
                    height={50}
                    className="relative z-10"
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold  ">
<<<<<<< HEAD
                    Bright Path Academy
=======
                    Quranic Verse Academy
>>>>>>> 278fa469d45ab202208f501214f5ce6204cc883d
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm tracking-wide">Empower Your Future</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                Transform your potential into expertise with industry-leading courses, 
                expert mentors, and a supportive community. Join thousands of successful 
                learners who`ve accelerated their careers with us.
              </p>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 rounded-full px-4 py-2 w-fit border border-blue-200 dark:border-blue-800">
                <div className="flex -space-x-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-linear-to-br from-blue-400 to-purple-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Trusted by 50K+ learners</span>
              </div>

              {/* App Buttons */}
              <PwaInstaller >
                <div className="flex flex-wrap gap-3 pt-2">
                <button className="flex items-center  rounded-xl transition-all hover:scale-105 shadow-md group">
                  <Image
                    src="/playstore.png"
                    alt="Google Play"
                    width={100}
                    height={30}
                    className="h-9 rounded-md"
                  />
                 
                </button>
                <button className="flex items-center   rounded-xl transition-all hover:scale-105 shadow-md group">
                  <Image
                    src="/appstore.png"
                    alt="App Store"
                    width={100}
                    height={30}
                    className="h-9 rounded-md"
                  />
                  
                </button>
              </div>
              </PwaInstaller>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5  from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {[
                  { name: 'Home', icon: Home, href: '/' },
                  { name: 'Courses', icon: BookOpen, href: '/courses' },
                  { name: 'Mentors', icon: GraduationCap, href: '/mentors' },
                  { name: 'Community', icon: Heart, href: '/community' },
                  { name: 'Resources', icon: Sparkles, href: '/resources' }
                ].map((item) => {
                  const Icon = item.icon
                  return (
                    <li key={item.name}>
                      <Link 
                        href={item.href}
                        className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm"
                      >
                        <Icon className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2 transition-all" />
                        <span>{item.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </li>
                  )
                })}
              </ul>

              {/* Featured Badge */}
              <div className="mt-6 p-4 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium">New: AI Course Bundle</span>
                </div>
              </div>
            </div>

            {/* Popular Categories */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 relative inline-block">
                Popular Categories
                <span className="absolute -bottom-2 left-0 w-12 h-0.5  from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <div className="space-y-3">
                {[
                  { title: 'Web Development', students: '12.5K', color: 'from-blue-500 to-cyan-500' },
                  { title: 'Data Science', students: '8.2K', color: 'from-purple-500 to-pink-500' },
                  { title: 'UI/UX Design', students: '6.8K', color: 'from-orange-500 to-red-500' },
                  { title: 'Business & Marketing', students: '5.4K', color: 'from-green-500 to-emerald-500' },
                  { title: 'Mobile Development', students: '4.9K', color: 'from-blue-500 to-purple-500' }
                ].map((category, idx) => (
                  <Link 
                    key={idx}
                    href="#"
                    className="block p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all group"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full  ${category.color}`} />
                        <h4 className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                          {category.title}
                        </h4>
                      </div>
                      <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full">
                        {category.students}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact & Info */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 relative inline-block">
                  Get in Touch
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5  from-blue-500 to-purple-500 rounded-full"></span>
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Mail className="w-4 h-4 text-blue-500 mt-0.5" />
<<<<<<< HEAD
                    <span>hello@brightpathacademy.com</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>+1 (800) 123-4567</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>123 Education Ave, Silicon Valley, CA</span>
=======
                    <span>quranicverse21@gmail.com</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <Phone className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>+8801835-411107</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                    <span>Hous-70, Rd-4, DIT Project, middle Badda, Dhaka--01212, Badda, Bangladesh, 1212</span>
>>>>>>> 278fa469d45ab202208f501214f5ce6204cc883d
                  </li>
                </ul>
              </div>

              {/* Support Hours */}
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <h4 className="font-semibold text-sm">Support Hours</h4>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Mon - Fri:</span>
                    <span className="text-blue-600 dark:text-blue-400 font-medium">24/7 Support</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Saturday:</span>
                    <span className="text-blue-600 dark:text-blue-400">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 dark:text-gray-500">Sunday:</span>
                    <span className="text-blue-600 dark:text-blue-400">10:00 AM - 4:00 PM</span>
                  </div>
                </div>
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>SSL Secure & GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <div className="mt-12 p-6  from-blue-500/5 via-purple-500/5 to-orange-500/5 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Subscribe for updates, new courses, and exclusive offers
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-64"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-lg transition text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Icons */}
              <div className="flex gap-3">
                {[
                  { icon: Facebook, href: '#', label: 'Facebook' },
                  { icon: Instagram, href: '#', label: 'Instagram' },
                  { icon: Youtube, href: '#', label: 'YouTube' },
                  { icon: Twitter, href: '#', label: 'Twitter' }
                ].map((Social, idx) => {
                  const Icon = Social.icon
                  return (
                    <Link 
                      key={idx}
                      href={Social.href}
                      className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all group"
                      aria-label={Social.label}
                    >
                      <Icon className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition" />
                    </Link>
                  )
                })}
              </div>

              {/* Copyright */}
              <p className="text-sm text-gray-500 dark:text-gray-500 text-center">
<<<<<<< HEAD
                © {new Date().getFullYear()} Bright Path Academy. All rights reserved.
=======
                © {new Date().getFullYear()} Quranic Verse Academy. All rights reserved.
>>>>>>> 278fa469d45ab202208f501214f5ce6204cc883d
                <br className="sm:hidden" /> 
                <span className="hidden sm:inline"> | </span>
                Empowering learners worldwide
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1,2,3,4,5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">4.9 (10K+ reviews)</span>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-500">
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link>
              <span>•</span>
              <Link href="/cookies" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cookie Policy</Link>
              <span>•</span>
              <Link href="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}