/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { 
  MessageCircle, 
  Send, 
  Paperclip, 
  X, 
  CheckCircle, 
  Clock,
  HelpCircle,
  Image as ImageIcon,
  Loader2,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

import POSTDATA from '@/app/default/functions/Post'
import GETDATA from '@/app/default/functions/GetData'
import useContextData from '@/app/default/custom-component/useContextData'

interface SupportMessage {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    image?: string
  }
  text: string
  isResolved: boolean
  image?: string
  createdAt: string
  updatedAt: string
}

export default function SupportPage() {
  const { UserData } = useContextData()
  const [messages, setMessages] = useState<SupportMessage[]>([])
  const [text, setText] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [activeTab, setActiveTab] = useState<'all' | 'open' | 'resolved'>('all')

  useEffect(() => {
    loadMessages()
  }, [])

  const loadMessages = async () => {
    setIsLoading(true)
    try {
      const response = await GETDATA('/v1/support/my')
      if (response.success && response.data) {
        setMessages(response.data)
      } else {
        toast.error(response.message || 'Failed to load messages')
      }
    } catch (error) {
      console.error('Error loading messages:', error)
      toast.error('An error occurred while loading messages')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadMessages()
    setIsRefreshing(false)
    toast.success('Messages refreshed')
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB')
        return
      }
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file')
        return
      }
      setImage(file)
      const preview = URL.createObjectURL(file)
      setImagePreview(preview)
    }
  }

  const removeImage = () => {
    setImage(null)
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview)
      setImagePreview(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!text.trim()) {
      toast.error('Please enter your message')
      return
    }

    setIsSubmitting(true)

    try {
      let response;
      
      if (image) {
        // Send as FormData for image upload
        const formData = new FormData()
        formData.append('text', text)
        formData.append('image', image)
        
        response = await POSTDATA('/v1/support', formData)
      } else {
        // Send as JSON without image
        response = await POSTDATA('/v1/support', { text })
      }
      
      if (response.success) {
        toast.success('Message sent successfully!')
        setText('')
        removeImage()
        await loadMessages()
      } else {
        toast.error(response.message || 'Failed to send message')
      }
    } catch (error: any) {
      console.error('Error sending message:', error)
      toast.error(error.message || 'An error occurred while sending message')
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusBadge = (isResolved: boolean) => {
    if (isResolved) {
      return (
        <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
          <CheckCircle className="w-3 h-3 mr-1" />
          Resolved
        </Badge>
      )
    }
    return (
      <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
        <Clock className="w-3 h-3 mr-1" />
        Open
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  const filteredMessages = messages.filter(msg => {
    if (activeTab === 'open') return !msg.isResolved
    if (activeTab === 'resolved') return msg.isResolved
    return true
  })

  const openCount = messages.filter(m => !m.isResolved).length
  const resolvedCount = messages.filter(m => m.isResolved).length

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Support Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-0 shadow-xl bg-linear-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Support Center</CardTitle>
                    <CardDescription>We`re here to help you</CardDescription>
                  </div>
                </div>
              </CardHeader>
              
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  {/* User Info */}
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
                        {UserData?.name || 'Student'}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {UserData?.email || 'student@example.com'}
                      </p>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Describe your issue or question in detail..."
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      rows={5}
                      className="resize-none"
                      disabled={isSubmitting}
                    />
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-2">
                    <Label>Attach Screenshot (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="image-upload"
                        disabled={isSubmitting}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => document.getElementById('image-upload')?.click()}
                        disabled={isSubmitting}
                        className="w-full"
                      >
                        <Paperclip className="w-4 h-4 mr-2" />
                        Choose Image
                      </Button>
                    </div>
                    
                    {imagePreview && (
                      <div className="relative mt-2">
                        <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <Image
                            src={imagePreview}
                            alt="Preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Tips */}
                  <div className="p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                      <div className="text-xs text-blue-700 dark:text-blue-300">
                        <p className="font-semibold mb-1">Tips for faster resolution:</p>
                        <ul className="list-disc list-inside space-y-0.5">
                          <li>Be specific about your issue</li>
                          <li>Include screenshots if possible</li>
                          <li>Mention your course name if related</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    disabled={isSubmitting || !text.trim()}
                    className="w-full bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* Right Column - Support History */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <CardTitle>Support History</CardTitle>
                    <CardDescription>Track your support requests</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="gap-1"
                    >
                      <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
                      Refresh
                    </Button>
                    <Badge variant="secondary" className="gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {messages.length} Total
                    </Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <Tabs defaultValue="all" className="w-full" onValueChange={(v) => setActiveTab(v as any)}>
                  <TabsList className="grid w-full grid-cols-3 mb-6">
                    <TabsTrigger value="all">
                      All ({messages.length})
                    </TabsTrigger>
                    <TabsTrigger value="open">
                      Open ({openCount})
                    </TabsTrigger>
                    <TabsTrigger value="resolved">
                      Resolved ({resolvedCount})
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value={activeTab}>
                    <ScrollArea className="h-125 pr-4">
                      {isLoading ? (
                        <div className="space-y-4">
                          {[...Array(3)].map((_, i) => (
                            <div key={i} className="flex gap-3 animate-pulse">
                              <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full" />
                              <div className="flex-1">
                                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-2" />
                                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24 mb-2" />
                                <div className="h-16 bg-gray-200 dark:bg-gray-700 rounded" />
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : filteredMessages.length === 0 ? (
                        <div className="text-center py-12">
                          <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageCircle className="w-10 h-10 text-gray-400" />
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No Support Messages
                          </h3>
                          <p className="text-gray-500 dark:text-gray-400">
                            {activeTab === 'open' 
                              ? 'You have no open support requests' 
                              : activeTab === 'resolved'
                              ? 'You have no resolved support requests'
                              : 'Send your first support message above'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {filteredMessages.map((message) => (
                            <div
                              key={message._id}
                              className="p-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors"
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-start gap-3 flex-1">
                                  <Avatar className="w-10 h-10 shrink-0">
                                    {message.user?.image ? (
                                      <AvatarImage src={message.user.image} alt={message.user.name} />
                                    ) : (
                                      <AvatarFallback className="bg-linear-to-br from-blue-500 to-indigo-600 text-white">
                                        {message.user?.name?.charAt(0) || 'U'}
                                      </AvatarFallback>
                                    )}
                                  </Avatar>
                                  
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2 mb-1">
                                      <span className="font-semibold text-gray-900 dark:text-white">
                                        {message.user?.name || 'User'}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {formatDate(message.createdAt)}
                                      </span>
                                      {getStatusBadge(message.isResolved)}
                                    </div>
                                    
                                    <p className="text-gray-700 dark:text-gray-300 text-sm whitespace-pre-wrap">
                                      {message.text}
                                    </p>
                                    
                                    {message.image && (
                                      <div className="mt-2">
                                        <button
                                          onClick={() => window.open(message.image, '_blank')}
                                          className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 dark:text-blue-400"
                                        >
                                          <ImageIcon className="w-3 h-3" />
                                          View Attachment
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}