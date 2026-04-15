/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { Heart, CheckCircle, XCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { toast } from 'sonner'

// POSTDATA function with better error handling
async function POSTDATA(endpoint: string, data: any) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.quranic-verse.com'
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    })
    
    const result = await response.json()
    
    if (!response.ok) {
      throw new Error(result.message || `HTTP error! status: ${response.status}`)
    }
    
    return result
  } catch (error: any) {
    console.error('API Error:', error)
    throw new Error(error.message || 'Failed to connect to server')
  }
}

export default function Subescrive() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)

  // Check if user already subscribed in this session
  useEffect(() => {
    const subscribed = localStorage.getItem('newsletter_subscribed')
    if (subscribed === 'true') {
      setIsSubscribed(true)
    }
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate name
    if (!name.trim()) {
      toast.error('Please enter your name', {
        icon: '📝',
        duration: 3000,
      })
      return
    }
    
    // Validate email
    if (!email.trim()) {
      toast.error('Please enter your email address', {
        icon: '📧',
        duration: 3000,
      })
      return
    }
    
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email address', {
        icon: '❌',
        duration: 3000,
      })
      return
    }
    
    setIsLoading(true)
    
    // Show loading toast
    const loadingToast = toast.loading('Subscribing...')
    
    try {
      // Match the backend model structure
      const response = await POSTDATA('/v1/subscribe', { 
        name: name.trim(),
        email: email.trim().toLowerCase(),
      })
      
      // Check for successful subscription
      if (response.success === true || response.status === 'success' || response.message?.includes('success')) {
        toast.success('Successfully subscribed! 🎉', {
          id: loadingToast,
          duration: 4000,
          icon: '✅',
        })
        
        // Store subscription status
        localStorage.setItem('newsletter_subscribed', 'true')
        localStorage.setItem('subscriber_email', email)
        localStorage.setItem('subscriber_name', name)
        setIsSubscribed(true)
        setName('')
        setEmail('')
        
        // Optional: Send welcome email tracking
        console.log('Subscribed:', { name, email, timestamp: new Date().toISOString() })
        
      } else if (response.message === 'Email already subscribed' || response.error === 'already_subscribed') {
        toast.error('This email is already subscribed!', {
          id: loadingToast,
          duration: 3000,
          icon: '📧',
        })
      } else {
        throw new Error(response.message || 'Subscription failed')
      }
      
    } catch (error: any) {
      console.error('Subscription error:', error)
      
      // Handle specific error cases
      const errorMessage = error.message.toLowerCase()
      
      if (errorMessage.includes('already subscribed') || errorMessage.includes('duplicate key')) {
        toast.error('This email is already in our newsletter list!', {
          id: loadingToast,
          duration: 3000,
          icon: '📧',
        })
      } else if (errorMessage.includes('network') || errorMessage.includes('fetch')) {
        toast.error('Network error. Please check your connection and try again.', {
          id: loadingToast,
          duration: 5000,
          icon: '🌐',
        })
      } else if (errorMessage.includes('timeout')) {
        toast.error('Request timed out. Please try again.', {
          id: loadingToast,
          duration: 4000,
          icon: '⏱️',
        })
      } else if (errorMessage.includes('validation') || errorMessage.includes('required')) {
        toast.error('Please provide both name and email address.', {
          id: loadingToast,
          duration: 4000,
          icon: '⚠️',
        })
      } else {
        toast.error(error.message || 'Failed to subscribe. Please try again later.', {
          id: loadingToast,
          duration: 4000,
          icon: '❌',
        })
      }
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnsubscribe = () => {
    localStorage.removeItem('newsletter_subscribed')
    localStorage.removeItem('subscriber_email')
    localStorage.removeItem('subscriber_name')
    setIsSubscribed(false)
    toast.success('You have been unsubscribed', {
      icon: '👋',
      duration: 3000,
    })
  }

  return (
    <>
      <div className="mt-12 p-6 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 rounded-2xl border border-blue-200 dark:border-blue-800 hover:shadow-lg transition-all duration-300">
        {!isSubscribed ? (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Heart className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Subscribe for updates, new courses, and exclusive offers
              </p>
            </div>
            
            <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-3 w-full">
              <input 
                type="text" 
                placeholder="Your name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isLoading}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-48 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Your name for newsletter subscription"
                autoComplete="name"
                required
              />
              <input 
                type="email" 
                placeholder="Your email *"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-64 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                aria-label="Email address for newsletter subscription"
                autoComplete="email"
                required
              />
              <button 
                type="submit"
                disabled={isLoading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 flex items-center justify-center gap-2 group"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Subscribing...
                  </>
                ) : (
                  <>
                    Subscribe
                    <Heart className="w-3 h-3 group-hover:scale-110 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You`re subscribed! Thank you for joining our community. 🎉
              </p>
            </div>
            <button
              onClick={handleUnsubscribe}
              className="text-sm text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400 transition-colors flex items-center gap-1"
            >
              <XCircle className="w-4 h-4" />
              Unsubscribe
            </button>
          </div>
        )}
        
        {/* Privacy note */}
        <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 text-center md:text-left">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </>
  )
}