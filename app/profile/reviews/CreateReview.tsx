/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { Star, X, CheckCircle, AlertCircle, User, BookOpen, MessageSquare, Plus, UploadCloud, Loader2 } from 'lucide-react'
import { toast } from 'sonner'
import Image from 'next/image'

// UI Components imports
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import POSTDATA from '@/app/default/functions/Post'
import useContextData from '@/app/default/custom-component/useContextData'

interface ReviewData {
  _id?: string
  name: string
  courseName: string
  image: string
  description: string
  rating: number
  comment: string
  isDeleted?: boolean
  createdAt?: string
  updatedAt?: string
}

interface StoredReview extends ReviewData {
  localId: string
  synced: boolean
  createdAt: string
}

export default function CreateReview() {
  const { UserData } = useContextData()
  const [formData, setFormData] = useState<ReviewData>({
    name: UserData?.name || '',
    courseName: '',
    image: '',
    description: '',
    rating: 0,
    comment: '',
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [localReviews, setLocalReviews] = useState<StoredReview[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Load reviews from localStorage on component mount
  useEffect(() => {
    loadReviewsFromLocalStorage()
  }, [])

  // Update name when UserData changes
  useEffect(() => {
    if (UserData?.name && !formData.name) {
      setFormData(prev => ({ ...prev, name: UserData.name }))
    }
  }, [UserData, formData.name])

  const loadReviewsFromLocalStorage = () => {
    const stored = localStorage.getItem('user_reviews')
    if (stored) {
      try {
        const reviews = JSON.parse(stored)
        setLocalReviews(reviews)
      } catch (error) {
        console.error('Error loading reviews from localStorage:', error)
      }
    }
  }

  const saveReviewToLocalStorage = (review: StoredReview) => {
    const updatedReviews = [review, ...localReviews]
    localStorage.setItem('user_reviews', JSON.stringify(updatedReviews))
    setLocalReviews(updatedReviews)
  }



  const checkDuplicateReview = (courseName: string): boolean => {
    const existingReview = localReviews.find(
      review => review.courseName.toLowerCase() === courseName.toLowerCase()
    )
    if (existingReview) {
      toast.error(`You have already submitted a review for "${courseName}"`)
      return true
    }
    return false
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleRatingClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Check file size (max 2MB to avoid 413 error)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }

      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) {
      const file = e.dataTransfer.files[0]
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Image size should be less than 2MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload an image file')
        return
      }
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const removeImage = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setImageFile(null)
    setImagePreview(null)
    setFormData(prev => ({ ...prev, image: '' }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      toast.error('Please enter your name')
      return false
    }
    if (!formData.courseName.trim()) {
      toast.error('Please enter the course name')
      return false
    }
    
    // Check for duplicate review
    if (checkDuplicateReview(formData.courseName)) {
      return false
    }
    
    if (!imageFile) {
      toast.error('Please upload an image')
      return false
    }
    if (!formData.description.trim()) {
      toast.error('Please enter a description')
      return false
    }
    if (formData.rating === 0) {
      toast.error('Please select a rating')
      return false
    }
    if (formData.comment && formData.comment.length > 1000) {
      toast.error('Comment must be less than 1000 characters')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Create a temporary preview URL for localStorage
    const tempImageUrl = imagePreview || ''

    // Create local review object
    const localReview: StoredReview = {
      ...formData,
      image: tempImageUrl,
      localId: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      synced: true,
      createdAt: new Date().toISOString(),
    }

    // Save to localStorage immediately
    saveReviewToLocalStorage(localReview)
    toast.success('Review saved locally! Syncing with server...')

    try {
      // Send to server using FormData
      const formDataToSend = new FormData()
      formDataToSend.append('name', formData.name)
      formDataToSend.append('courseName', formData.courseName)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('rating', formData.rating.toString())
      formDataToSend.append('comment', formData.comment || '')
      if (imageFile) {
        formDataToSend.append('image', imageFile)
      }

      const response = await POSTDATA('/v1/review', formDataToSend)

      if (response.success && response.data) {
        // Update localStorage with server ID
        // updateReviewInLocalStorage(localReview.localId, response.data._id)
        toast.success('Review submitted successfully!')
        
        // Reset form and close dialog
        resetForm()
        setIsDialogOpen(false)
      } else {
        toast.error(response.message || 'Failed to submit review to server')
      }
    } catch (error: any) {
      console.error('Error submitting review:', error)
      if (error.message?.includes('413')) {
        toast.error('Image is too large. Please upload a smaller image (max 2MB)')
      } else {
        toast.error('Failed to sync with server. Review saved locally and will sync later.')
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
    }
    setFormData({
      name: UserData?.name || '',
      courseName: '',
      image: '',
      description: '',
      rating: 0,
      comment: '',
    })
    setImageFile(null)
    setImagePreview(null)
    setHoveredRating(0)
  }

  const deleteLocalReview = (localId: string) => {
    const updatedReviews = localReviews.filter(review => review.localId !== localId)
    localStorage.setItem('user_reviews', JSON.stringify(updatedReviews))
    setLocalReviews(updatedReviews)
    toast.success('Review removed from local storage')
  }

  const renderStars = (rating: number, interactive = false, onRatingChange?: (rating: number) => void, onHover?: (rating: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type={interactive ? 'button' : 'submit'}
            onClick={() => interactive && onRatingChange?.(star)}
            onMouseEnter={() => interactive && onHover?.(star)}
            onMouseLeave={() => interactive && onHover?.(0)}
            className={interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
            disabled={!interactive}
          >
            <Star
              className={`w-6 h-6 ${
                star <= (interactive ? (hoveredRating || rating) : rating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              } ${interactive && 'transition-colors'}`}
            />
          </button>
        ))}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header with Create Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              My Reviews
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Share your learning experience with others
            </p>
          </div>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                <Plus className="w-4 h-4" />
                Write a Review
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-2xl">Write a Review</DialogTitle>
                <DialogDescription>
                  Share your honest feedback about the course you`ve taken
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-6 py-4">
                {/* User Info Display */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <Avatar className="w-10 h-10">
                    {UserData?.image ? (
                      <AvatarImage src={UserData.image} alt={UserData?.name} />
                    ) : (
                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white">
                        {UserData?.name?.charAt(0) || 'U'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {UserData?.name || 'Guest User'}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {UserData?.email || 'Not signed in'}
                    </p>
                  </div>
                </div>

                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <User className="w-4 h-4" />
                    Your Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Course Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="courseName" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <BookOpen className="w-4 h-4" />
                    Course Name *
                  </Label>
                  <Input
                    id="courseName"
                    name="courseName"
                    value={formData.courseName}
                    onChange={handleInputChange}
                    placeholder="Enter the course name"
                    className="focus:ring-2 focus:ring-blue-500"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Image Upload with Drag & Drop */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <UploadCloud className="w-4 h-4" />
                    Your Photo *
                  </Label>

                  <div
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    className="relative flex h-52 cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 transition hover:border-blue-500 dark:hover:border-blue-400"
                  >
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      onChange={handleImageUpload}
                      disabled={isSubmitting}
                    />

                    {imagePreview ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="rounded-lg object-cover"
                        />
                        <button
                          type="button"
                          onClick={removeImage}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors z-10"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <UploadCloud className="mb-2 h-10 w-10 text-gray-400" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Drag & drop image here or click to upload
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PNG, JPG, GIF, WEBP up to 2MB
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {/* Rating Field */}
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Star className="w-4 h-4" />
                    Rating *
                  </Label>
                  <div className="flex items-center gap-4">
                    {renderStars(formData.rating, true, handleRatingClick, setHoveredRating)}
                    <span className="text-sm text-gray-500">
                      {formData.rating > 0 ? `${formData.rating} out of 5` : 'Select rating'}
                    </span>
                  </div>
                </div>

                {/* Description Field */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <MessageSquare className="w-4 h-4" />
                    Review Description *
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Share your detailed experience with this course..."
                    rows={4}
                    className="focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isSubmitting}
                  />
                </div>

                {/* Comment Field (Optional) */}
                <div className="space-y-2">
                  <Label htmlFor="comment" className="text-gray-700 dark:text-gray-300">
                    Additional Comments (Optional)
                  </Label>
                  <Textarea
                    id="comment"
                    name="comment"
                    value={formData.comment}
                    onChange={handleInputChange}
                    placeholder="Any additional thoughts or suggestions..."
                    rows={3}
                    maxLength={1000}
                    className="focus:ring-2 focus:ring-blue-500 resize-none"
                    disabled={isSubmitting}
                  />
                  <div className="text-right text-xs text-gray-500">
                    {formData.comment.length}/1000 characters
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="flex gap-3 pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-blue-600 hover:bg-blue-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Review'
                    )}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Reviews List Section */}
        {localReviews.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
              <Star className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Reviews Yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Share your learning experience by writing your first review
            </p>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700 gap-2">
                  <Plus className="w-4 h-4" />
                  Write Your First Review
                </Button>
              </DialogTrigger>
            </Dialog>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Your Submitted Reviews
              </h2>
              <Badge variant="outline" className="text-sm">
                {localReviews.length} {localReviews.length === 1 ? 'Review' : 'Reviews'}
              </Badge>
            </div>
            
            <div className="space-y-4">
              {localReviews.map((review) => (
                <Card key={review.localId} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      {/* User Image */}
                      <div className="relative w-16 h-16 rounded-full overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600 shrink-0">
                        {review.image ? (
                          <Image
                            src={review.image}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-8 h-8 text-white/50" />
                          </div>
                        )}
                      </div>
                      
                      {/* Review Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                              {review.name}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {review.courseName}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            {!review.synced && (
                              <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                <AlertCircle className="w-3 h-3 mr-1" />
                                Pending Sync
                              </Badge>
                            )}
                            {review.synced && (
                              <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Synced
                              </Badge>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => deleteLocalReview(review.localId)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        
                        {/* Rating */}
                        <div className="mb-2">
                          {renderStars(review.rating)}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                          {review.description}
                        </p>
                        
                        {/* Comment if exists */}
                        {review.comment && (
                          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
                            ``{review.comment}``
                          </p>
                        )}
                        
                        {/* Date */}
                        <p className="text-xs text-gray-400 mt-2">
                          Submitted: {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Review Guidelines Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" className="fixed bottom-4 right-4 rounded-full w-12 h-12 bg-blue-600 text-white hover:bg-blue-700 shadow-lg">
              <MessageSquare className="w-5 h-5" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Review Guidelines
              </DialogTitle>
              <DialogDescription>
                <div className="space-y-3 mt-4">
                  <p>✅ Be honest and constructive in your feedback</p>
                  <p>✅ Focus on course content and learning experience</p>
                  <p>✅ Respectful language only</p>
                  <p>✅ Avoid sharing personal contact information</p>
                  <p>✅ One review per course only</p>
                  <p>✅ Reviews help others make informed decisions</p>
                  <Separator className="my-3" />
                  <p className="text-sm text-gray-500">
                    Your review will be visible to other students after moderation.
                    Reviews are saved locally and synced with our servers.
                  </p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}