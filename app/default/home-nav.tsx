'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/theme-toggle"
import useContextData from "./custom-component/useContextData"
import { Menu, LogIn, X } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export default function HomeNav() {

  const { UserData } = useContextData()
  const pathname = usePathname()

  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close sheet when pathname changes (navigation occurs)
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(false), 0)
    return () => clearTimeout(timer)
  }, [pathname])

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/pages")) return null

  const navItems = [
    { name: "হোম", path: "/" },
    { name: "ফিচার", path: "/features" },
    { name: "কোর্স", path: "/course" },
    { name: "স্কলার", path: "/scholars" },
    { name: "প্রশ্ন", path: "/faq" },
    { name: "যোগাযোগ", path: "/contact" },
  ]

  const getDashboardPath = () => {
    if (!UserData) return "/login"
    if (UserData?.role === "student") return "/profile"
    return "/dashboard"
  }

  const getDashboardText = () => {
    if (!UserData) return "Login"
    if (UserData?.role === "student") return "Profile"
    return "Dashboard"
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
            ? "bg-white/80 dark:bg-emerald-950/80 backdrop-blur-xl shadow-sm py-3 border-b border-emerald-100/70 dark:border-emerald-900/60"
            : "py-5"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* ================= Logo ================= */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/logo1.png"
              alt="Quranic Verse"
              width={40}
              height={40}
              priority
              className="transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-bold text-emerald-950 dark:text-white text-md">
                Quranic Verse Bangladesh
              </span>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold uppercase tracking-widest">
                কোরানিক ভার্স বাংলাদেশ
              </span>
            </div>
          </Link>

          {/* ================= Desktop Nav ================= */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`relative font-medium text-sm transition group ${pathname === item.path
                    ? "text-emerald-700 dark:text-emerald-300"
                    : "text-emerald-900/70 dark:text-emerald-100/70 hover:text-emerald-700 dark:hover:text-emerald-300"
                  }`}
              >
                {item.name ?? item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-700 dark:bg-emerald-300 transition-all duration-300 ${pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </Link>
            ))}
          </div>

          {/* ================= Desktop Right ================= */}
          <div className="hidden md:flex items-center gap-2">
            <ModeToggle />

            {/* Login icon button */}
            {!UserData && (
              <Link
                href="/login"
                className="group flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 px-3 py-2 rounded-full transition hover:bg-emerald-700 dark:hover:bg-emerald-600"
              >
                <LogIn className="w-5 h-5 text-emerald-900/70 dark:text-emerald-100/70 group-hover:text-white transition" />
                <span className="max-w-0 overflow-hidden group-hover:max-w-16 transition-all duration-300 text-sm font-semibold text-white whitespace-nowrap">
                  লগইন
                </span>
              </Link>
            )}

            {/* Signup button with animation */}
            {!UserData && (
              <Link href="/signup" className="relative btn-wrapper">
                <button className="btn relative overflow-hidden rounded-full px-6 py-2 bg-amber-400 hover:bg-amber-500 text-emerald-950 font-semibold transition active:scale-95 shadow-sm">
                  <span className="txt-wrapper text-white">সাইন আপ</span>
                </button>
              </Link>
            )}

            {/* Dashboard button */}
            {UserData && (
              <Link
                href={getDashboardPath()}
                className="px-6 py-2 rounded-full bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition active:scale-95 shadow-sm"
              >
                {getDashboardText()}
              </Link>
            )}
          </div>

          {/* ================= Mobile ================= */}
          <div className="md:hidden flex items-center gap-2">
            <ModeToggle />

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <button className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition">
                  <Menu className="w-6 h-6 text-emerald-950 dark:text-emerald-50" />
                </button>
              </SheetTrigger>

              <SheetContent
                side="left"
                className="w-80 p-0 bg-white dark:bg-emerald-950 border-r border-emerald-100 dark:border-emerald-900"
              >
                <SheetHeader className="p-4 border-b border-emerald-100 dark:border-emerald-900">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image src="/logo1.png" alt="logo" width={30} height={30} />
                      <SheetTitle className="text-sm text-emerald-950 dark:text-emerald-50">
                        Quranic Verse Bangladesh
                      </SheetTitle>
                    </div>
                  </div>
                </SheetHeader>

                <div className="flex flex-col gap-1 p-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.path}
                      href={item.path}
                      className={`px-4 py-3 rounded-xl font-semibold transition ${pathname === item.path
                          ? "bg-emerald-700 text-white"
                          : "hover:bg-emerald-50 dark:hover:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50"
                        }`}
                    >
                      {item.name ?? item.name}
                    </Link>
                  ))}
                </div>

                {/* Mobile bottom buttons */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">
                  {!UserData && (
                    <>
                      <Link
                        href="/login"
                        className="text-center py-3 rounded-xl bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 font-semibold border border-emerald-100 dark:border-emerald-900 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition"
                      >
                        লগইন
                      </Link>
                      <Link
                        href="/signup"
                        className="text-center py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
                      >
                        সাইনআপ
                      </Link>
                    </>
                  )}

                  {UserData && (
                    <Link
                      href={getDashboardPath()}
                      className="text-center py-3 rounded-xl bg-emerald-700 text-white font-semibold hover:bg-emerald-800 transition"
                    >
                      {getDashboardText()}
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
      <div className="h-20" />
    </>
  )
}