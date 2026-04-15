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
            backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Top Accent Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-orange-500" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-8 relative z-10">

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Brand Section - Featured Column */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500/20 dark:bg-blue-400/20 blur-xl rounded-full" />
                  <Image
                    src={footerData.logo || "/logo1.png"}
                    alt={footerData.name || "Quranic Verse Academy"}
                    width={50}
                    height={50}
                    className="relative z-10 object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = "/logo1.png"
                    }}
                  />
                </div>
                <div>
                  <h2 className="text-2xl font-bold bg-linear-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {footerData.name || "Quranic Verse Academy"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm tracking-wide">Empower Your Future</p>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {footerData.description || "Transform your potential into expertise with industry-leading courses, expert mentors, and a supportive community. Join thousands of successful learners who've accelerated their careers with us."}
              </p>

              {/* Trust Badge */}
              <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-950/30 rounded-full px-4 py-2 w-fit border border-blue-200 dark:border-blue-800">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-linear-to-br from-blue-400 to-purple-400 border-2 border-white dark:border-gray-900 flex items-center justify-center text-white text-xs font-bold">
                      <Sparkles className="w-3 h-3" />
                    </div>
                  ))}
                </div>
                <span className="text-sm text-gray-700 dark:text-gray-300">Trusted by 50K+ learners</span>
              </div>

              {/* App Buttons */}
              <PwaInstaller>
                <div className="flex flex-wrap gap-3 pt-2">
                  <button className="flex items-center rounded-xl transition-all hover:scale-105 shadow-md group">
                    <Image
                      src="/playstore.png"
                      alt="Google Play"
                      width={100}
                      height={30}
                      className="h-9 rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </button>
                  <button className="flex items-center rounded-xl transition-all hover:scale-105 shadow-md group">
                    <Image
                      src="/appstore.png"
                      alt="App Store"
                      width={100}
                      height={30}
                      className="h-9 rounded-md"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                      }}
                    />
                  </button>
                </div>
              </PwaInstaller>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 relative inline-block">
                Quick Links
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {footerData.quickLinks?.map((item: any, idx: number) => (
                  <li key={item._id || idx}>
                    <Link 
                      href={item.link}
                      className="group flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-300 text-sm"
                    >
                      {getQuickLinkIcon(item.name)}
                      <span className="group-hover:translate-x-1 transition-transform">{item.name}</span>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Featured Badge */}
              {footerData.boxText && (
                <div className="mt-6 p-4 bg-linear-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium">{footerData.boxText}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Popular Categories */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 relative inline-block">
                Popular Categories
                <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></span>
              </h3>
              <div className="space-y-3">
                {footerData.popularCategories?.map((category: any, idx: number) => {
                  const gradients = [
                    'from-blue-500 to-cyan-500',
                    'from-purple-500 to-pink-500',
                    'from-orange-500 to-red-500',
                    'from-green-500 to-emerald-500',
                    'from-indigo-500 to-purple-500'
                  ]
                  const gradient = gradients[idx % gradients.length]
                  return (
                    <Link 
                      key={category._id || idx}
                      href={category.link || '#'}
                      className="block p-3 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all group"
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-linear-to-r ${gradient}`} />
                          <h4 className="font-medium text-sm group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                            {category.name}
                          </h4>
                        </div>
                        <span className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full font-medium">
                          {category.sels}+
                        </span>
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Contact & Info */}
            <div className="lg:col-span-3 space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold mb-6 text-blue-600 dark:text-blue-400 relative inline-block">
                  Get in Touch
                  <span className="absolute -bottom-2 left-0 w-12 h-0.5 bg-linear-to-r from-blue-500 to-purple-500 rounded-full"></span>
                </h3>
                <ul className="space-y-4">
                  {contactInfo.email && (
                    <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Mail className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span className="break-all">{contactInfo.email}</span>
                    </li>
                  )}
                  {contactInfo.phone && (
                    <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400 group hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Phone className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{contactInfo.phone}</span>
                    </li>
                  )}
                  {contactInfo.address && (
                    <li className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" />
                      <span>{contactInfo.address}</span>
                    </li>
                  )}
                </ul>
              </div>

              {/* Support Hours */}
              {officeHours && officeHours.length > 0 && officeHours[0]?.name !== "test" && (
                <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <h4 className="font-semibold text-sm">Support Hours</h4>
                  </div>
                  <div className="space-y-2 text-xs">
                    {officeHours.map((hour: any, idx: number) => (
                      <div key={hour._id || idx} className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">{hour.name}:</span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium">{hour.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Security Badge */}
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Shield className="w-4 h-4 text-blue-500" />
                <span>SSL Secure & GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Newsletter Section */}
          <Subescrive />

          {/* Bottom Bar */}
          <div className="mt-12 pt-6 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              {/* Social Icons */}
              <div className="flex gap-3">
                {footerData.facebookLink && footerData.facebookLink !== "https://www.quranic-verse.com/" && (
                  <Link 
                    href={footerData.facebookLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-600 hover:text-white transition-all group"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition" />
                  </Link>
                )}
                {footerData.instagramLink && footerData.instagramLink !== "https://www.quranic-verse.com/" && (
                  <Link 
                    href={footerData.instagramLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-pink-600 dark:hover:bg-pink-600 hover:text-white transition-all group"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition" />
                  </Link>
                )}
                {footerData.youtubeLink && footerData.youtubeLink !== "https://www.quranic-verse.com/" && (
                  <Link 
                    href={footerData.youtubeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-red-600 dark:hover:bg-red-600 hover:text-white transition-all group"
                    aria-label="YouTube"
                  >
                    <Youtube className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition" />
                  </Link>
                )}
                {footerData.twitterLink && footerData.twitterLink !== "https://www.quranic-verse.com/" && (
                  <Link 
                    href={footerData.twitterLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-sky-500 dark:hover:bg-sky-500 hover:text-white transition-all group"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition" />
                  </Link>
                )}
                {footerData.linkedinLink && footerData.linkedinLink !== "https://www.quranic-verse.com/" && (
                  <Link 
                    href={footerData.linkedinLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-700 hover:text-white transition-all group"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-4 h-4 text-gray-600 dark:text-gray-400 group-hover:text-white transition" />
                  </Link>
                )}
              </div>

              {/* Copyright */}
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                © {new Date().getFullYear()} {footerData.name || "Quranic Verse Academy"}. All rights reserved.
                <br className="sm:hidden" /> 
                <span className="hidden sm:inline"> | </span>
                Empowering learners worldwide
              </p>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-orange-400 fill-orange-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">4.9 (10K+ reviews)</span>
              </div>
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center gap-4 mt-4 text-xs text-gray-500 dark:text-gray-400">
              <Link href="/privacy" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Terms of Service</Link>
              <span>•</span>
              <Link href="/cancel" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Cookie Policy</Link>
              <span>•</span>
              <Link href="/sitemap.xml" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Sitemap</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}