'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { 
  ShoppingCart, 
  ArrowRight,
  GraduationCap,
  Trophy,
  Users,
} from 'lucide-react'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function NoCourseSelected() {
  const router = useRouter()

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto text-center border-0 shadow-xl bg-linear-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-950">
        <CardHeader>
          <div className="mx-auto w-20 h-20 bg-blue-100 dark:bg-blue-950 rounded-full flex items-center justify-center mb-4">
            <ShoppingCart className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl">No Course Selected</CardTitle>
          <CardDescription>
            You haven`t selected any courses yet. Start your learning journey today!
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <GraduationCap className="w-6 h-6 text-blue-500 mb-2" />
              <span className="text-sm font-medium">Expert Instructors</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
              <span className="text-sm font-medium">Certified Courses</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <Users className="w-6 h-6 text-green-500 mb-2" />
              <span className="text-sm font-medium">Community Support</span>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3">
          <Button 
            onClick={() => router.push('/courses')}
            className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
          >
            Browse All Courses
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
          <Button 
            onClick={() => router.push('/')}
            variant="outline"
            className="w-full"
          >
            Go to Homepage
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}