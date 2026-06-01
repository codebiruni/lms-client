'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function StudentFooter() {
  const pathname = usePathname()
  const currentYear = new Date().getFullYear()

  // Don't show footer on these paths
  if (pathname === '/login' || pathname === '/signup') return null

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
    </footer>
  )
}