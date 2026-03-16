'use client'

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { ModeToggle } from "@/components/theme-toggle"
import useContextData from "./custom-component/useContextData"
import { Menu, LogIn } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile") || pathname.startsWith("/pages") ) return null


  const navItems = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "Course", path: "/course" },
    { name: "Scholars", path: "/scholars" },
    { name: "Support Hub", path: "/faq" },
    { name: "Contact", path: "/contact" },
  ]


  const getDashboardPath = () => {
    if (!UserData) return "/login"
    if (UserData.role === "student") return "/profile"
    return "/dashboard"
  }

  const getDashboardText = () => {
    if (!UserData) return "Login"
    if (UserData.role === "student") return "Profile"
    return "Dashboard"
  }



  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm py-3"
            : "py-5"
        }`}
      >

        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">


          {/* ================= Logo1 ================= */}

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
              <span className="font-bold text-gray-900 dark:text-white text-lg">
                Quranic
              </span>
              <span className="text-[10px] text-blue-600 font-semibold uppercase tracking-widest">
                Verse Academy
              </span>
            </div>

          </Link>



          {/* ================= Desktop Nav ================= */}

          <div className="hidden md:flex items-center gap-8">

            {navItems.map(item => (

              <Link
                key={item.path}
                href={item.path}
                className={`relative font-medium text-sm transition ${
                  pathname === item.path
                    ? "text-blue-600"
                    : "text-gray-600 dark:text-gray-300 hover:text-blue-600"
                }`}
              >

                {item.name}

                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                  pathname === item.path ? "w-full" : "w-0 group-hover:w-full"
                }`} />

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
                className="group flex items-center gap-2 bg-gray-100 dark:bg-gray-800 px-2 py-2 rounded-full transition hover:bg-blue-600"
              >

                <LogIn className="w-5 h-5 text-gray-700 dark:text-gray-300 group-hover:text-white transition"/>

                <span className="max-w-0 overflow-hidden group-hover:max-w-15 transition-all duration-300 text-sm font-semibold text-white whitespace-nowrap">
                  Login
                </span>

              </Link>
            )}



            {/* Signup glowing button */}

            {!UserData && (

              <Link href="/signup" className="relative btn-wrapper">

                <button className="btn relative overflow-hidden rounded-full px-6 py-2">

                  <span className="txt-wrapper">

                    {"Signup".split("").map((letter, index) => (

                      <span key={index} className="btn-letter">
                        {letter}
                      </span>

                    ))}

                  </span>

                </button>

              </Link>

            )}



            {/* Dashboard button */}

            {UserData && (

              <Link
                href={getDashboardPath()}
                className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition active:scale-95"
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

                <button className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <Menu className="w-6 h-6"/>
                </button>

              </SheetTrigger>



              <SheetContent side="left" className="w-80">

                <SheetHeader>

                  <SheetTitle className="flex items-center gap-3">

                    <Image src="/logo1.png" alt="logo1" width={30} height={30}/>

                    Quranic Verse Academy

                  </SheetTitle>

                </SheetHeader>



                <div className="mt-6 flex flex-col gap-2">

                  {navItems.map(item => (

                    <Link
                      key={item.path}
                      href={item.path}
                      onClick={() => setIsOpen(false)}
                      className={`px-4 py-3 rounded-lg font-semibold ${
                        pathname === item.path
                          ? "bg-blue-600 text-white"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {item.name}
                    </Link>

                  ))}

                </div>



                {/* Mobile bottom buttons */}

                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3">

                  {!UserData && (

                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-center py-3 rounded-xl bg-gray-900 text-white font-semibold"
                      >
                        Login
                      </Link>

                      <Link
                        href="/signup"
                        onClick={() => setIsOpen(false)}
                        className="text-center py-3 rounded-xl bg-blue-600 text-white font-semibold"
                      >
                        Signup
                      </Link>
                    </>

                  )}



                  {UserData && (

                    <Link
                      href={getDashboardPath()}
                      onClick={() => setIsOpen(false)}
                      className="text-center py-3 rounded-xl bg-blue-600 text-white font-semibold"
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

      <div className="h-20"/>

    </>
  )
}