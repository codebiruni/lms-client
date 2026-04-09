'use client'


import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export default function LoginSkeleton() {
  return (
    <Card className="w-full max-w-md rounded-lg overflow-hidden border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl">
      <CardHeader className="space-y-4 text-center">
        {/* Logo Placeholder */}
        <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-2xl bg-gray-200 dark:bg-gray-800 animate-pulse">
          <Shield className="h-8 w-8 text-gray-300 dark:text-gray-700" />
        </div>

        {/* Title and Description Placeholders */}
        <div className="space-y-2 flex flex-col items-center">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Tabs Placeholder */}
        <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
          <div className="flex-1 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
          <div className="flex-1 h-9 bg-transparent rounded-lg" />
        </div>

        {/* Input Field Placeholders */}
        <div className="space-y-5">
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            <div className="h-12 w-full bg-gray-100 dark:bg-gray-900/50 rounded-lg animate-pulse" />
          </div>
          <div className="space-y-2">
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
            <div className="h-12 w-full bg-gray-100 dark:bg-gray-900/50 rounded-lg animate-pulse" />
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="h-12 w-full bg-gray-200 dark:bg-gray-800 rounded-xl animate-pulse" />

        {/* Footer Placeholders */}
        <div className="flex flex-col items-center space-y-2">
          <div className="h-4 w-40 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse" />
          <div className="h-3 w-56 bg-gray-100 dark:bg-gray-800 rounded-md animate-pulse" />
        </div>
      </CardContent>
    </Card>
  )
}