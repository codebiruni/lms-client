/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { 
  Play, 
  Clock, 
  Calendar, 
  User, 
  Eye,
  Heart,
  Share2,
  ThumbsUp,
  BookOpen,
  Sparkles,
  Video,
  Filter,
  ChevronDown,
  Grid3x3,
  List,
  X
} from 'lucide-react'
import { format } from 'date-fns'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'

import GETDATA from '@/app/default/functions/GetData'

interface Recording {
  _id: string
  courseId: {
    _id: string
    title: string
    slug: string
    thumbnail: string
  }
  title: string
  description: string
  videoUrl: string
  uploadedBy: {
    _id: string
    id: string
    name: string
    email: string
    role: string
    image: string
  }
  duration: number
  size: number
  createdAt: string
  updatedAt: string
}

interface CourseGroup {
  courseId: string
  courseTitle: string
  courseThumbnail: string
  recordings: Recording[]
}

export default function RecordingClasses() {
  const router = useRouter()
  const [recordings, setRecordings] = useState<Recording[]>([])
  const [courseGroups, setCourseGroups] = useState<CourseGroup[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [selectedVideo, setSelectedVideo] = useState<Recording | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const videoRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    loadRecordings()
  }, [])

  const loadRecordings = async () => {
    // Check localStorage for cached data
    const cachedData = localStorage.getItem('recordings')
    const cachedTimestamp = localStorage.getItem('recordingsTimestamp')
    
    if (cachedData && cachedTimestamp) {
      const timestamp = parseInt(cachedTimestamp)
      const now = Date.now()
      const cacheAge = now - timestamp
      
      // Use cached data if less than 10 minutes old
      if (cacheAge < 10 * 60 * 1000) {
        const parsedData = JSON.parse(cachedData)
        setRecordings(parsedData)
        groupRecordingsByCourse(parsedData)
        setIsLoading(false)
      }
    }

    try {
      const response = await GETDATA('/v1/recording/student/classes')
      
      if (response.success && response.data) {
        setRecordings(response.data)
        groupRecordingsByCourse(response.data)
        // Store in localStorage
        localStorage.setItem('recordings', JSON.stringify(response.data))
        localStorage.setItem('recordingsTimestamp', Date.now().toString())
      } else {
        toast.error(response.message || 'Failed to load recordings')
      }
    } catch (error) {
      console.error('Error loading recordings:', error)
      toast.error('An error occurred while loading recordings')
    } finally {
      setIsLoading(false)
    }
  }

  const groupRecordingsByCourse = (data: Recording[]) => {
    const groups: { [key: string]: CourseGroup } = {}
    
    data.forEach(recording => {
      const courseId = recording.courseId._id
      if (!groups[courseId]) {
        groups[courseId] = {
          courseId: courseId,
          courseTitle: recording.courseId.title,
          courseThumbnail: recording.courseId.thumbnail,
          recordings: []
        }
      }
      groups[courseId].recordings.push(recording)
    })
    
    const groupedArray = Object.values(groups)
    setCourseGroups(groupedArray)
    
    // Auto-select first course if none selected
    if (!selectedCourse && groupedArray.length > 0) {
      setSelectedCourse(groupedArray[0].courseId)
      setSelectedVideo(groupedArray[0].recordings[0])
    }
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    const course = courseGroups.find(c => c.courseId === courseId)
    if (course && course.recordings.length > 0) {
      setSelectedVideo(course.recordings[0])
    }
  }

  const handleVideoSelect = (recording: Recording) => {
    setSelectedVideo(recording)
    
    // Save watch history
    const watchHistory = localStorage.getItem('watchHistory')
    let history = watchHistory ? JSON.parse(watchHistory) : []
    history = history.filter((item: any) => item.videoId !== recording._id)
    history.unshift({
      videoId: recording._id,
      title: recording.title,
      courseId: recording.courseId._id,
      watchedAt: new Date().toISOString()
    })
    // Keep only last 20 items
    if (history.length > 20) history.pop()
    localStorage.setItem('watchHistory', JSON.stringify(history))
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}m`
    }
    return `${mins}m`
  }

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM dd, yyyy')
  }

  const getYouTubeEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0]
      return `https://www.youtube.com/embed/${videoId}`
    }
    return url
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    toast.success(isLiked ? 'Removed like' : 'Liked!')
  }

  const handleSave = () => {
    setIsSaved(!isSaved)
    
    if (!isSaved && selectedVideo) {
      const savedVideos = localStorage.getItem('savedVideos')
      const saved = savedVideos ? JSON.parse(savedVideos) : []
      if (!saved.includes(selectedVideo._id)) {
        saved.push(selectedVideo._id)
        localStorage.setItem('savedVideos', JSON.stringify(saved))
      }
      toast.success('Saved to playlist')
    } else {
      toast.info('Removed from playlist')
    }
  }

  const handleShare = async () => {
    if (selectedVideo) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
      } catch (error) {
        toast.error('Failed to copy link')
      }
    }
  }

  const getSelectedCourseData = () => {
    return courseGroups.find(c => c.courseId === selectedCourse)
  }

  const selectedCourseData = getSelectedCourseData()
  const currentVideos = selectedCourseData?.recordings || []

  // Loading Skeleton
  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-6">
          {/* Course Filters Skeleton */}
          <div className="mb-6">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-10 w-28 rounded-full shrink-0" />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Player Skeleton */}
            <div className="lg:col-span-2">
              <Skeleton className="aspect-video w-full rounded-xl" />
              <div className="mt-4 space-y-3">
                <Skeleton className="h-8 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-10 w-20 rounded-full" />
                  <Skeleton className="h-10 w-20 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Playlist Skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-10 w-32" />
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex gap-3">
                  <Skeleton className="w-32 h-20 rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (recordings.length === 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Video className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            No Recordings Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for recorded classes.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-6">
        {/* Course Filter Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Course
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                className="text-gray-500"
              >
                {viewMode === 'grid' ? 
                  <List className="w-4 h-4" /> : 
                  <Grid3x3 className="w-4 h-4" />
                }
              </Button>
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {courseGroups.map((course) => (
              <Button
                key={course.courseId}
                variant={selectedCourse === course.courseId ? "default" : "outline"}
                onClick={() => handleCourseSelect(course.courseId)}
                className="shrink-0 gap-2 rounded-full"
              >
                {course.courseThumbnail ? (
                  <div className="w-5 h-5 rounded-full overflow-hidden relative">
                    <Image
                      src={course.courseThumbnail}
                      alt={course.courseTitle}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <BookOpen className="w-4 h-4" />
                )}
                <span className="text-sm">{course.courseTitle}</span>
                <Badge variant="secondary" className="ml-1">
                  {course.recordings.length}
                </Badge>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Video Player Section - Left/Top */}
          <div className="lg:col-span-2 space-y-4">
            {/* Video Player */}
            <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
              <div className="aspect-video relative">
                {selectedVideo ? (
                  <iframe
                    ref={videoRef}
                    src={getYouTubeEmbedUrl(selectedVideo.videoUrl)}
                    title={selectedVideo.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Play className="w-16 h-16 text-gray-600" />
                  </div>
                )}
              </div>
            </div>

            {/* Video Info */}
            {selectedVideo && (
              <div className="space-y-4">
                <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
                  {selectedVideo.title}
                </h1>
                
                {/* Channel Info & Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      {selectedVideo.uploadedBy.image ? (
                        <AvatarImage src={selectedVideo.uploadedBy.image} alt={selectedVideo.uploadedBy.name} />
                      ) : (
                        <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white">
                          {selectedVideo.uploadedBy.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedVideo.uploadedBy.name}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Instructor
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant={isLiked ? "default" : "outline"}
                      onClick={handleLike}
                      className="gap-2"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      {isLiked ? 'Liked' : 'Like'}
                    </Button>
                    <Button
                      variant={isSaved ? "default" : "outline"}
                      onClick={handleSave}
                      className="gap-2"
                    >
                      <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                      {isSaved ? 'Saved' : 'Save'}
                    </Button>
                    <Button variant="outline" onClick={handleShare} className="gap-2">
                      <Share2 className="w-4 h-4" />
                      Share
                    </Button>
                  </div>
                </div>

                {/* Video Stats */}
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    <span>1.2K views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(selectedVideo.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{formatDuration(selectedVideo.duration)}</span>
                  </div>
                </div>

                {/* Description */}
                {selectedVideo.description && (
                  <Card className="bg-gray-50 dark:bg-gray-800/50">
                    <CardContent className="p-4">
                      <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                        {selectedVideo.description}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Course Info */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {selectedVideo.courseId.title}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Course Recording
                        </p>
                      </div>
                      <Button 
                        variant="outline"
                        onClick={() => router.push(`/profile/courses/${selectedVideo.courseId._id}`)}
                      >
                        View Course
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Playlist Section - Right/Bottom */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {selectedCourseData?.courseTitle}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {currentVideos.length} recordings
                </p>
              </div>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="w-3 h-3" />
                Playlist
              </Badge>
            </div>

            <Separator />

            <ScrollArea className="h-[calc(100vh-300px)] lg:h-[calc(100vh-280px)]">
              <div className="space-y-3 pr-4">
                {currentVideos.map((recording, index) => (
                  <div
                    key={recording._id}
                    onClick={() => handleVideoSelect(recording)}
                    className={`flex gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                      selectedVideo?._id === recording._id
                        ? 'bg-blue-50 dark:bg-blue-950/30 ring-1 ring-blue-200 dark:ring-blue-800'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {/* Thumbnail */}
                    <div className="relative w-32 h-20 shrink-0 rounded-lg overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600">
                      {recording.courseId.thumbnail ? (
                        <Image
                          src={recording.courseId.thumbnail}
                          alt={recording.title}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white/50" />
                        </div>
                      )}
                      <div className="absolute bottom-1 right-1 bg-black/70 text-white text-xs px-1 rounded">
                        {formatDuration(recording.duration)}
                      </div>
                      {selectedVideo?._id === recording._id && (
                        <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                          <Play className="w-8 h-8 text-white" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                        {recording.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
                        <span>{formatDate(recording.createdAt)}</span>
                        <span>•</span>
                        <span>{formatDuration(recording.duration)}</span>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <Badge variant="outline" className="text-xs">
                          {index + 1} of {currentVideos.length}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Watch History */}
            <Card className="mt-4">
              <CardContent className="p-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <Eye className="w-4 h-4" />
                  <span>Continue watching from where you left off</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Import missing icons
