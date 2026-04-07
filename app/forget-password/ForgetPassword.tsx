// app/forget-password/page.tsx
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Mail, 
  Phone, 
  Send, 
  Shield, 
  AlertCircle
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import POSTDATA from '@/app/default/functions/Post'

export default function ForgetPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email) {
      setEmailError('Email is required')
      return false
    }
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address')
      return false
    }
    setEmailError('')
    return true
  }

  const validatePhone = (phone: string): boolean => {
    if (!phone) {
      setPhoneError('Phone number is required')
      return false
    }
    if (phone.length < 10) {
      setPhoneError('Please enter a valid phone number')
      return false
    }
    setPhoneError('')
    return true
  }

  const handleSubmit = async () => {
    let isValid = false
    
    if (email) {
      isValid = validateEmail(email)
    } else if (phone) {
      isValid = validatePhone(phone)
    } else {
      toast.error('Please enter email or phone number')
      return
    }
    
    if (!isValid) return
    
    setIsLoading(true)
    
    try {
      const response = await POSTDATA('/v1/auth/forget-password', {
        email: email || undefined,
        phone: phone || undefined
      })
      
      if (response.success) {
        // Clear any existing session data
        localStorage.removeItem('resetUserId')
        localStorage.removeItem('resetIdentifier')
        localStorage.removeItem('hasEmail')
        localStorage.removeItem('hasPhone')
        localStorage.removeItem('resetTimestamp')
        localStorage.removeItem('resetOtp')
        localStorage.removeItem('resetOtpTimestamp')
        
        // Store user data in localStorage with timestamp (1 hour expiry)
        localStorage.setItem('resetUserId', response.data.userId)
        localStorage.setItem('resetIdentifier', email || phone)
        localStorage.setItem('hasEmail', response.data.hasEmail)
        localStorage.setItem('hasPhone', response.data.hasPhone)
        localStorage.setItem('resetTimestamp', Date.now().toString())
        
        toast.success('OTP sent successfully!', {
          description: 'Please check your email or phone for the OTP.',
        })
        
        // Redirect to OTP verification page
        router.push('/forget-password/otp')
      } else {
        toast.error(response.message || 'Failed to send OTP', {
          description: 'User not found or invalid credentials.',
        })
      }
    } catch (error) {
      console.error('Send OTP error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center border-b pb-6">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Forgot Password
          </CardTitle>
          <CardDescription className="text-base">
            Enter your email or phone to receive OTP
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 bg-white dark:bg-slate-800"
                disabled={isLoading}
              />
              {emailError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {emailError}
                </p>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-2 text-slate-500">OR</span>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-11 bg-white dark:bg-slate-800"
                disabled={isLoading}
              />
              {phoneError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {phoneError}
                </p>
              )}
            </div>

            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800 mt-4">
              <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-xs text-blue-700 dark:text-blue-300">
                We`ll send a 6-digit OTP to your email or phone for verification. The OTP will expire in 10 minutes.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3 pt-2 pb-6">
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full h-11 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Sending OTP...
              </>
            ) : (
              <>
                Send OTP
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>

          <div className="text-center">
            <button
              onClick={() => router.push('/login')}
              className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors"
            >
              Remember your password? Sign in
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}