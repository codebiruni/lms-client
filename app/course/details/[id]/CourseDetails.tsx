/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Clock, 
  Users, 
  BookOpen, 
  Award,
  GraduationCap,
  Video,
  FileText,
  Infinity,
  CheckCircle,
  Calendar,
  Target,
  Heart,
  Share2,
  Sparkles,
  Shield,
  Zap,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Facebook,
  Youtube,
  ExternalLink,
  Link2
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import GETDATA from '@/app/default/functions/GetData'

interface CourseData {
  _id: string
  title: string
  slug: string
  description: string
  category: {
    _id: string
    name: string
    image: string
  }
  instructor: {
    _id: string
    userId: string
    id: string
    bio: string
    expertise: string
    totalStudents: number
    totalCourses: number
  }
  thumbnail: string
  price: number
  discountPrice: number
  isFree: boolean
  enrollmentStart: string
  durationInHours: number
  totalLessons: number
  level: string
  requirements: string[]
  whatYouWillLearn: string[]
  totalStudents: number
  rating: number
  status: string
  createdAt: string
  updatedAt: string
  contactInfo?: {
    whatsapp?: string
    phone?: string
    email?: string
    facebook?: string
    youtube?: string
    website?: string
  }
}

export default function CourseDetails() {
  const { id } = useParams()
  const router = useRouter()
  const [course, setCourse] = useState<CourseData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isEnrolling, setIsEnrolling] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    fetchCourseDetails()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const fetchCourseDetails = async () => {
    setIsLoading(true)
    try {
      const response = await GETDATA(`/v1/course/${id}`)
      if (response.success) {
        setCourse(response.data)
      } else {
        toast.error(response.message || 'Failed to load course details')
      }
    } catch (error) {
      console.error('Error fetching course:', error)
      toast.error('An error occurred while loading course details')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnroll = () => {
    if (course) {
      localStorage.setItem('selectedCourse', JSON.stringify(course))
      router.push(`/course/enroll/${course._id}`)
    }
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    } catch (error) {
      toast.error('Failed to copy link')
    }
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    if (!isSaved) {
      toast.success('Course saved to wishlist!')
    } else {
      toast.info('Removed from wishlist')
    }
  }

  const discountPercentage = course?.discountPrice 
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0

  // Function to extract links from description
  const extractLinks = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const matches = text?.match(urlRegex) || []
    return matches
  }

  // Function to render description with clickable links
  const renderDescriptionWithLinks = (text: string) => {
    if (!text) return null
    
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const parts = text.split(urlRegex)
    
    return parts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
          >
            {part}
            <ExternalLink className="w-3 h-3" />
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  // Function to detect and render clickable phone numbers
  const renderPhoneNumbers = (text: string) => {
    const phoneRegex = /(\+?88)?01[3-9]\d{8}/g
    const matches = text?.match(phoneRegex) || []
    
    if (matches.length === 0) return text
    
    const parts = text.split(phoneRegex)
    
    return parts.map((part, index) => {
      if (part.match(phoneRegex)) {
        return (
          <a
            key={index}
            href={`tel:${part}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
          >
            {part}
            <Phone className="w-3 h-3" />
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  // Function to detect and render clickable emails
  const renderEmails = (text: string) => {
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
    const matches = text?.match(emailRegex) || []
    
    if (matches.length === 0) return text
    
    const parts = text.split(emailRegex)
    
    return parts.map((part, index) => {
      if (part.match(emailRegex)) {
        return (
          <a
            key={index}
            href={`mailto:${part}`}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
          >
            {part}
            <Mail className="w-3 h-3" />
          </a>
        )
      }
      return <span key={index}>{part}</span>
    })
  }

  // Combined description rendering
  const renderDescription = (text: string) => {
    if (!text) return null
    
    const processedText = text
    
    // First, replace URLs with links
    const urlRegex = /(https?:\/\/[^\s]+)/g
    const urlParts = processedText.split(urlRegex)
    
    return urlParts.map((part, index) => {
      if (part.match(urlRegex)) {
        return (
          <a
            key={`url-${index}`}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1 break-all"
          >
            {part}
            <ExternalLink className="w-3 h-3 shrink-0" />
          </a>
        )
      }
      
      // Then process phone numbers in text parts
      const phoneRegex = /(\+?88)?01[3-9]\d{8}/g
      const phoneParts = part.split(phoneRegex)
      
      return phoneParts.map((phonePart, phoneIndex) => {
        if (phonePart.match(phoneRegex)) {
          return (
            <a
              key={`phone-${index}-${phoneIndex}`}
              href={`tel:${phonePart}`}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
            >
              {phonePart}
              <Phone className="w-3 h-3" />
            </a>
          )
        }
        
        // Then process emails
        const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g
        const emailParts = phonePart.split(emailRegex)
        
        return emailParts.map((emailPart, emailIndex) => {
          if (emailPart.match(emailRegex)) {
            return (
              <a
                key={`email-${index}-${phoneIndex}-${emailIndex}`}
                href={`mailto:${emailPart}`}
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline inline-flex items-center gap-1"
              >
                {emailPart}
                <Mail className="w-3 h-3" />
              </a>
            )
          }
          return <span key={`text-${index}-${phoneIndex}-${emailIndex}`}>{emailPart}</span>
        })
      })
    })
  }

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-32 w-full" />
              <div className="grid grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-20 w-full" />
                ))}
              </div>
              <Skeleton className="h-64 w-full" />
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
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-slate-950">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Course not found</h2>
          <p className="text-gray-600">The course you`re looking for doesn`t exist.</p>
          <Button className="mt-4" onClick={() => router.push('/courses')}>
            Browse Courses
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section - Clean without background */}
      <div className="border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left Column - Course Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Category Badge */}
              <Badge className="bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-0 px-3 py-1">
                {course.category?.name || 'Uncategorized'}
              </Badge>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                {course.title}
              </h1>

              {/* Description with clickable links */}
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed whitespace-pre-wrap">
                  {renderDescription(course.description)}
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-semibold">{course.totalStudents?.toLocaleString() || 0}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Students</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-semibold">{course.totalLessons || 0}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Lessons</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-semibold">{course.durationInHours || 0} hrs</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Duration</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center">
                    <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <div className="text-slate-900 dark:text-white font-semibold capitalize">{course.level || 'Beginner'}</div>
                    <div className="text-slate-500 dark:text-slate-400 text-sm">Level</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Course Card */}
            <div className="lg:sticky lg:top-24 h-fit">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
                {/* Thumbnail */}
                <div className="relative h-56 bg-linear-to-br from-blue-500 to-indigo-600">
                  {course.thumbnail ? (
                    <Image
                      src={course.thumbnail}
                      alt={course.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <GraduationCap className="w-16 h-16 text-white/30" />
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-4">
                  {/* Price */}
                  <div>
                    {course.isFree ? (
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">Free</div>
                    ) : (
                      <div className="flex items-baseline gap-2 flex-wrap">
                        {course.discountPrice ? (
                          <>
                            <span className="text-3xl font-bold text-slate-900 dark:text-white">
                              ৳{course.discountPrice.toLocaleString()}
                            </span>
                            <span className="text-lg text-slate-400 line-through">
                              ৳{course.price.toLocaleString()}
                            </span>
                            <Badge className="bg-green-500 text-white">
                              Save {discountPercentage}%
                            </Badge>
                          </>
                        ) : (
                          <span className="text-3xl font-bold text-slate-900 dark:text-white">
                            ৳{course.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Infinity className="w-4 h-4 text-blue-500" />
                      <span>Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    {course.enrollmentStart && (
                      <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span>Starts: {new Date(course.enrollmentStart).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-4">
                    <Button
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white h-12 text-base font-semibold"
                    >
                      {isEnrolling ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </Button>
                    
                    <div className="flex gap-3">
                      <Button 
                        onClick={handleSave} 
                        variant="outline" 
                        className={`flex-1 gap-2 ${isSaved ? 'bg-red-50 border-red-200 text-red-600 dark:bg-red-950/30 dark:border-red-800 dark:text-red-400' : ''}`}
                      >
                        <Heart className={`w-4 h-4 ${isSaved ? 'fill-red-500 text-red-500' : ''}`} />
                        {isSaved ? 'Saved' : 'Save'}
                      </Button>
                      <Button onClick={handleShare} variant="outline" className="flex-1 gap-2">
                        <Share2 className="w-4 h-4" />
                        Share
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Details Tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="instructor">Instructor</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            {/* What You'll Learn */}
            {course.whatYouWillLearn && course.whatYouWillLearn.length > 0 && (
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Target className="w-5 h-5 text-blue-600" />
                    What You`ll Learn
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {course.whatYouWillLearn.map((item, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-slate-700 dark:text-slate-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Requirements */}
            {course.requirements && course.requirements.length > 0 && (
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                    Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2">
                    {course.requirements.map((req, index) => (
                      <li key={index} className="text-slate-700 dark:text-slate-300">{req}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Course Features */}
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <Zap className="w-5 h-5 text-blue-600" />
                  Course Features
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Clock className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900 dark:text-white">{course.durationInHours} Hours</div>
                    <div className="text-sm text-slate-500">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Video className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900 dark:text-white">{course.totalLessons} Lessons</div>
                    <div className="text-sm text-slate-500">Content</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Award className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900 dark:text-white capitalize">{course.level}</div>
                    <div className="text-sm text-slate-500">Level</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-slate-900 dark:text-white">{course.totalStudents || 0}</div>
                    <div className="text-sm text-slate-500">Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact & Links Section - Only shown if there are links in description */}
            {extractLinks(course.description).length > 0 && (
              <Card className="border-slate-200 dark:border-slate-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Link2 className="w-5 h-5 text-blue-600" />
                    Important Links & Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {extractLinks(course.description).map((link, index) => (
                      <a
                        key={index}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
                      >
                        {link.includes('facebook.com') && <Facebook className="w-5 h-5 text-blue-600" />}
                        {link.includes('youtube.com') && <Youtube className="w-5 h-5 text-red-600" />}
                        {link.includes('wa.me') || link.includes('whatsapp.com') && <MessageCircle className="w-5 h-5 text-green-600" />}
                        {!link.includes('facebook.com') && !link.includes('youtube.com') && !link.includes('wa.me') && !link.includes('whatsapp.com') && (
                          <ExternalLink className="w-5 h-5 text-slate-500" />
                        )}
                        <span className="flex-1 text-slate-700 dark:text-slate-300 truncate">{link}</span>
                        <ExternalLink className="w-4 h-4 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="instructor">
            <Card className="border-slate-200 dark:border-slate-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  About the Instructor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {course.instructor?.id?.charAt(0) || 'I'}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                      Instructor {course.instructor?.id || 'N/A'}
                    </h3>
                    <p className="text-slate-500">Expert in {course.instructor?.expertise || 'Education'}</p>
                  </div>
                </div>
                
                {course.instructor?.bio && (
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white mb-2">Bio</h4>
                    <p className="text-slate-700 dark:text-slate-300">{course.instructor.bio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 pt-4">
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="font-semibold text-2xl text-slate-900 dark:text-white">{course.instructor?.totalCourses || 0}</div>
                    <div className="text-sm text-slate-500">Total Courses</div>
                  </div>
                  <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                    <div className="font-semibold text-2xl text-slate-900 dark:text-white">{course.instructor?.totalStudents?.toLocaleString() || 0}</div>
                    <div className="text-sm text-slate-500">Total Students</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}