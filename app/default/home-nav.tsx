'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/theme-toggle"
import useContextData from "./custom-component/useContextData"
import { Menu, X } from "lucide-react"

export default function HomeNav() {
  const { UserData } = useContextData()
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])



  // Hide navbar in dashboard & profile
  if (pathname === "/dashboard" || pathname === "/profile") {
    return null
  }

  // Role based route
  const getButtonPath = () => {
    if (!UserData) return "/login"
    if (UserData.role === "student") return "/profile"
    return "/dashboard"
  }

  const getButtonText = () => {
    if (!UserData) return "Login"
    if (UserData.role === "student") return "Profile"
    return "Dashboard"
  }

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Course", path: "/course" },
    { name: "Scholars", path: "/scholars" },
    { name: "FAQ", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white dark:bg-gray-800 shadow-md py-3"
            : "dark:bg-gray-800 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">

          {/* Logo */}
         <Link href="/" className="flex items-center gap-3">
  <Image
    src="/logo.png"
    alt="Bright Path Academy"
    width={40}
    height={40}
    priority
    className="w-10 h-10"
  />
  <div className="flex flex-col">
    <span className="text-xl font-bold tracking-wide text-gray-800 dark:text-white leading-tight">
      Bright 
    </span>
    <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">
      Path Academy
    </span>
  </div>
</Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`text-sm font-medium transition-colors duration-200 ${
                  pathname === item.path
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={getButtonPath()}
              className="px-5 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {getButtonText()}
            </Link>
            <ModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-3 md:hidden">
            <Link
              href={getButtonPath()}
              className="px-4 py-2 rounded-full bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              {getButtonText()}
            </Link>
            <ModeToggle />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname === item.path
                        ? "bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from hiding under fixed navbar */}
      <div className="h-18.25" />
    </>
  )
}