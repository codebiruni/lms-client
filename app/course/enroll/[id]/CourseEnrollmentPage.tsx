'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  GraduationCap, 
  CreditCard, 
  Wallet, 
  Shield,
  Sparkles,
  Clock,
  Users,
  Award,
  BookOpen,
  CheckCircle,
  ArrowLeft,
  Lock,
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { Alert, AlertDescription } from '@/components/ui/alert'

import POSTDATA from '@/app/default/functions/Post'
import useContextData from '@/app/default/custom-component/useContextData'

interface CourseData {
  _id: string
  title: string
  description: string
  thumbnail: string
  price: number
  discountPrice: number
  isFree: boolean
  durationInHours: number
  totalLessons: number
  level: string
  category: {
    name: string
  }
  instructor: {
    name: string
    id: string
  }
}



export default function CourseEnrollmentPage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const {UserData} = useContextData()
  const user = UserData 
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'sslcommerz'>('sslcommerz')

  useEffect(() => {
    // Get course from localStorage
    const storedCourse = localStorage.getItem('selectedCourse')
    
    if (!storedCourse) {
      toast.error('No course selected', {
        description: 'Please select a course first.',
      })
      router.push('/courses')
      return
    }

    try {
      const parsedCourse = JSON.parse(storedCourse)
      setCourse(parsedCourse)
    } catch (error) {
      console.error('Error parsing course:', error)
      router.push('/courses')
    }


    setIsLoading(false)
  }, [router])

  const getPrice = () => {
    if (course?.isFree) return 0
    return course?.discountPrice || course?.price || 0
  }

  const getOriginalPrice = () => {
    if (course?.isFree) return 0
    return course?.price || 0
  }

  const getDiscountPercentage = () => {
    if (course?.isFree || !course?.discountPrice) return 0
    return Math.round(((course.price - course.discountPrice) / course.price) * 100)
  }

  const handleEnrollment = async () => {
    if (!course || !user) {
      toast.error('Missing information', {
        description: 'Please refresh the page and try again.',
      })
      return
    }

    setIsProcessing(true)

    const enrollmentData = {
      student: user.id,
      course: course._id,
      totalAmount: getPrice(),
      paidAmount: getPrice(),
      paymentMethod: paymentMethod,
    }

    try {
      let response
      
      if (course.isFree || getPrice() === 0) {
        // Free course enrollment
        response = await POSTDATA('/v1/enrollment', enrollmentData)
      } else {
        // Paid course enrollment with payment
        response = await POSTDATA('/v1/enrollment/with-payment', enrollmentData)
      }


      if (response.success) {
        if (response.data.paymentUrl) {
          // Redirect to payment gateway
          window.location.href = response.data.paymentUrl
        } else {
          // Free course or full payment success
          toast.success('Enrollment successful!', {
            description: 'You have been successfully enrolled in the course.',
          })
          
          // Clear selected course from localStorage
          localStorage.removeItem('selectedCourse')
          
          // Redirect to course details or my courses
          setTimeout(() => {
            router.push(`/course/details/${course._id}`)
          }, 2000)
        }
      } else {
        toast.error(response.message || 'Enrollment failed', {
          description: 'Please try again or contact support.',
        })
      }
    } catch (error) {
      console.error('Enrollment error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleBack = () => {
    router.back()
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-64" />
              <Skeleton className="h-64 w-full rounded-2xl" />
              <Skeleton className="h-48 w-full rounded-2xl" />
            </div>
            <div>
              <Skeleton className="h-96 w-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!course) {
    return null
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="mb-4 -ml-2 text-slate-600 dark:text-slate-400"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Course
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                Complete Your Enrollment
              </h1>
              <p className="text-slate-500 dark:text-slate-400 mt-1">
                Review course details and complete the enrollment process
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Course Preview & Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Course Preview Card */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="relative h-48 bg-linear-to-br from-blue-500 to-indigo-600">
                {course.thumbnail ? (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white/30" />
                  </div>
                )}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge className="bg-white/20 backdrop-blur-sm text-white border-0">
                    {course.category?.name || 'Course'}
                  </Badge>
                  <h2 className="text-white text-xl font-bold mt-2 line-clamp-2">
                    {course.title}
                  </h2>
                </div>
              </div>
              
              <CardContent className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span>{course.durationInHours} hours</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <BookOpen className="w-4 h-4 text-blue-500" />
                    <span>{course.totalLessons} lessons</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Users className="w-4 h-4 text-blue-500" />
                    <span>Self-paced</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Award className="w-4 h-4 text-blue-500" />
                    <span className="capitalize">{course.level}</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <h3 className="font-semibold text-slate-900 dark:text-white">What you`ll get:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Lifetime access to course content</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>24/7 support access</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method Card */}
            {!course.isFree && getPrice() > 0 && (
              <Card className="border-slate-200 dark:border-slate-800 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    Payment Method
                  </CardTitle>
                  <CardDescription>
                    Choose your preferred payment method
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={paymentMethod}
                    onValueChange={(value) => setPaymentMethod(value as 'cash' | 'sslcommerz')}
                    className="space-y-3"
                  >
                    <div className="flex items-center space-x-3 p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="sslcommerz" id="sslcommerz" />
                      <Label htmlFor="sslcommerz" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">SSLCommerz</p>
                            <p className="text-sm text-slate-500">Pay with credit card, mobile banking, or bank transfer</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
                      <RadioGroupItem value="cash" id="cash" />
                      <Label htmlFor="cash" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Wallet className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Cash Payment</p>
                            <p className="text-sm text-slate-500">Pay in person at our office</p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            )}

            {/* Security Notice */}
            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-sm text-blue-700 dark:text-blue-300">
                Your payment information is secure. We use SSL encryption to protect your data.
              </AlertDescription>
            </Alert>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:sticky lg:top-24 h-fit">
            <Card className="border-slate-200 py-0 dark:border-slate-800 shadow-lg overflow-hidden">
              <CardHeader className="bg-linear-to-r pt-3 from-blue-600 to-indigo-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Order Summary
                </CardTitle>
                <CardDescription className="text-white/80">
                  Review your enrollment details
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-400">Course Price</span>
                    <span className="text-slate-900 dark:text-white font-medium">
                      {getOriginalPrice() > 0 ? `৳${getOriginalPrice().toLocaleString()}` : 'Free'}
                    </span>
                  </div>
                  
                  {getDiscountPercentage() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600 dark:text-slate-400">Discount</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">
                        -{getDiscountPercentage()}%
                      </span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-slate-900 dark:text-white">Total Amount</span>
                    <span className="text-blue-600 dark:text-blue-400">
                      {getPrice() > 0 ? `৳${getPrice().toLocaleString()}` : 'Free'}
                    </span>
                  </div>
                </div>

                {getPrice() > 0 && paymentMethod === 'cash' && (
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950/30 rounded-lg">
                    <p className="text-xs text-yellow-700 dark:text-yellow-400">
                      <span className="font-semibold">Note:</span> For cash payment, please visit our office within 7 days to complete your enrollment.
                    </p>
                  </div>
                )}

                {getPrice() > 0 && paymentMethod === 'sslcommerz' && (
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      Secure payment powered by SSLCommerz
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline" className="text-xs">Visa</Badge>
                      <Badge variant="outline" className="text-xs">Mastercard</Badge>
                      <Badge variant="outline" className="text-xs">bKash</Badge>
                      <Badge variant="outline" className="text-xs">Nagad</Badge>
                      <Badge variant="outline" className="text-xs">Rocket</Badge>
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="p-6 pt-0">
                <Button
                  onClick={handleEnrollment}
                  disabled={isProcessing}
                  className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white h-12 text-base font-semibold"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      {course.isFree || getPrice() === 0 ? (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enroll Now (Free)
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Proceed to Payment
                        </>
                      )}
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>

            {/* Money Back Guarantee */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                <Shield className="w-3 h-3" />
                30-day money-back guarantee
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}