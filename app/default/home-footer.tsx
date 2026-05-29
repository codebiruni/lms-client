/* eslint-disable @typescript-eslint/no-explicit-any */
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
  ChevronUp,
  Linkedin
} from "lucide-react"
import PwaInstaller from "./PwaInstaller"
import Subescrive from "./Subescrive"

// Skeleton Loader Components
const SkeletonText = ({ width = "w-full", height = "h-4", className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${width} ${height} ${className}`} />
)

const SkeletonIcon = ({ size = "w-8 h-8", className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-full ${size} ${className}`} />
)

const SkeletonButton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl ${className}`} />
)

const FooterSkeleton = () => (
  <div className="relative bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">
        
        {/* Brand Section Skeleton */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center gap-3">
            <SkeletonIcon size="w-12 h-12" />
            <div className="space-y-2">
              <SkeletonText width="w-48" height="h-6" />
              <SkeletonText width="w-32" height="h-3" />
            </div>
          </div>
          <div className="space-y-2">
            <SkeletonText width="w-full" height="h-4" />
            <SkeletonText width="w-5/6" height="h-4" />
            <SkeletonText width="w-4/6" height="h-4" />
          </div>
          <div className="flex items-center gap-3">
            <SkeletonIcon size="w-8 h-8" />
            <SkeletonText width="w-40" height="h-4" />
          </div>
          <div className="flex gap-3">
            <SkeletonButton className="w-24 h-10" />
            <SkeletonButton className="w-24 h-10" />
          </div>
        </div>

        {/* Quick Links Skeleton */}
        <div className="lg:col-span-2">
          <SkeletonText width="w-32" height="h-6" className="mb-6" />
          <div className="space-y-3">
            {[1,2,3,4,5,6].map((i) => (
              <SkeletonText key={i} width="w-32" height="h-4" />
            ))}
          </div>
        </div>

        {/* Popular Categories Skeleton */}
        <div className="lg:col-span-3">
          <SkeletonText width="w-40" height="h-6" className="mb-6" />
          <div className="space-y-3">
            {[1,2,3,4].map((i) => (
              <div key={i} className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex justify-between items-center">
                  <SkeletonText width="w-32" height="h-4" />
                  <SkeletonText width="w-12" height="h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Skeleton */}
        <div className="lg:col-span-3 space-y-6">
          <div>
            <SkeletonText width="w-32" height="h-6" className="mb-6" />
            <div className="space-y-4">
              <SkeletonText width="w-48" height="h-4" />
              <SkeletonText width="w-40" height="h-4" />
              <SkeletonText width="w-56" height="h-4" />
            </div>
          </div>
          <SkeletonButton className="w-full h-24" />
        </div>
      </div>

      {/* Newsletter Skeleton */}
      <div className="my-12">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-8">
          <div className="text-center space-y-4">
            <SkeletonText width="w-48" height="h-6" className="mx-auto" />
            <SkeletonText width="w-96" height="h-4" className="mx-auto" />
            <div className="flex justify-center gap-3">
              <SkeletonButton className="w-64 h-12" />
              <SkeletonButton className="w-32 h-12" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar Skeleton */}
      <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-3">
            {[1,2,3,4].map((i) => (
              <SkeletonIcon key={i} size="w-10 h-10" />
            ))}
          </div>
          <SkeletonText width="w-64" height="h-4" />
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1,2,3,4,5].map((i) => (
                <SkeletonIcon key={i} size="w-4 h-4" />
              ))}
            </div>
            <SkeletonText width="w-32" height="h-4" />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default function HomeFooter({ data }: any) {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)

  // Default data structure
  const defaultData = {
    _id: "default",
    logo: "/logo1.png",
    name: "QURANIC VERSE",
    description: "Transform your potential into expertise with industry-leading courses, expert mentors, and a supportive community. Join thousands of successful learners who've accelerated their careers with us.",
    quickLinks: [
      { name: "Home", link: "/", _id: "default1" },
      { name: "Features", link: "/features", _id: "default2" },
      { name: "Course", link: "/course", _id: "default3" },
      { name: "Scholars", link: "/scholars", _id: "default4" },
      { name: "Support Hub", link: "/faq", _id: "default5" },
      { name: "Contact", link: "/contact", _id: "default6" }
    ],
    boxText: "New: AI Course Bundle",
    popularCategories: [
      { name: "Arabic Language", sels: "10k", link: "/courses/arabic", _id: "default7" },
      { name: "Quran Tafseer", sels: "8.5k", link: "/courses/tafseer", _id: "default8" },
      { name: "Islamic Studies", sels: "12k", link: "/courses/islamic-studies", _id: "default9" },
      { name: "Hadith Sciences", sels: "6k", link: "/courses/hadith", _id: "default10" }
    ],
    getInTouch: [
      {
        email: "info@quranicverse.com",
        phone: "+1 (555) 123-4567",
        address: "123 Education Street, Knowledge City, 10001",
        _id: "default11"
      }
    ],
    officeHours: [
      { name: "Monday - Friday", time: "9:00 AM - 6:00 PM", _id: "default12" },
      { name: "Saturday", time: "10:00 AM - 4:00 PM", _id: "default13" },
      { name: "Sunday", time: "Closed", _id: "default14" }
    ],
    facebookLink: "https://facebook.com/quranicverse",
    twitterLink: "https://twitter.com/quranicverse",
    linkedinLink: "https://linkedin.com/company/quranicverse",
    instagramLink: "https://instagram.com/quranicverse",
    youtubeLink: "https://youtube.com/quranicverse",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    __v: 0
  }

  // Merge provided data with defaults
  const footerData = { ...defaultData, ...data }

  // Handle scroll to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Return null if on dashboard or profile pages
  if (pathname?.startsWith("/dashboard") || pathname?.startsWith("/profile") || pathname?.startsWith("/pages")) return null

  // Show skeleton while loading
  if (loading) {
    return <FooterSkeleton />
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Get contact info
  const contactInfo = footerData.getInTouch?.[0] || {
    email: "info@quranicverse.com",
    phone: "+1 (555) 123-4567",
    address: "123 Education Street, Knowledge City"
  }
  
  // Get office hours
  const officeHours = footerData.officeHours?.length > 0 ? footerData.officeHours : defaultData.officeHours

  // Icon mapping for quick links
  const getQuickLinkIcon = (name: string) => {
    const iconMap: { [key: string]: any } = {
      'Home': Home,
      'Features': Sparkles,
      'Course': BookOpen,
      'Scholars': GraduationCap,
      'Support Hub': Heart,
      'Contact': Phone,
      'FAQ': Heart,
      'About': Award
    }
    const Icon = iconMap[name] || ChevronRight
    return <Icon className="w-4 h-4" />
  }

  return (
    <footer className="bg-[#071E1A] text-white">

      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Logo + Mission */}
        <div className="text-center max-w-3xl mx-auto">

          <h2 className="text-3xl font-bold mb-3">
            কোরআনিক ভার্স বাংলাদেশ
          </h2>

          <p className="text-emerald-100 leading-relaxed">
            কুরআনের আলো, আধুনিক শিক্ষার পথ।
            শিশু, কিশোর ও প্রাপ্তবয়স্কদের জন্য
            দ্বীনি ও আধুনিক শিক্ষার সমন্বিত প্ল্যাটফর্ম।
          </p>

        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm">

          <Link href="/">হোম</Link>

          <Link href="/course">কোর্সসমূহ</Link>

          <Link href="/live-class">লাইভ ক্লাস</Link>

          <Link href="/scholars">আমাদের সম্পর্কে</Link>

          <Link href="/contact">যোগাযোগ</Link>

        </div>

        {/* Divider */}
        <div className="h-px bg-white/10 my-8" />

        {/* Quran Verse */}
        <div className="text-center">

          <p className="text-xl text-amber-300 mb-2">
            ﴿ وَقُل رَّبِّ زِدْنِي عِلْمًا ﴾
          </p>

          <p className="text-sm text-emerald-200">
            &quot;হে আমার রব, আমার জ্ঞান বৃদ্ধি করে দিন&quot;
          </p>

        </div>

        {/* Copyright */}
        <div className="text-center mt-8 text-sm text-gray-400">

          © {new Date().getFullYear()} Quranic Verse Bangladesh

          <span className="mx-2">•</span>

          সর্বস্বত্ব সংরক্ষিত

        </div>

      </div>

    </footer>
  )
}