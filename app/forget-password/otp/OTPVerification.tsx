// app/forget-password/otp/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  KeyRound, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  Send
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import POSTDATA from '@/app/default/functions/Post'

export default function OTPVerification() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [otpCode, setOtpCode] = useState('')
  const [otpError, setOtpError] = useState('')
  const [userId, setUserId] = useState<string>('')
  const [identifier, setIdentifier] = useState<string>('')
  const [hasEmail, setHasEmail] = useState(false)
  const [hasPhone, setHasPhone] = useState(false)
  
  // Countdown timer for OTP
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Retrieve data from localStorage (1 hour expiry)
    const storedUserId = localStorage.getItem('resetUserId')
    const storedIdentifier = localStorage.getItem('resetIdentifier')
    const storedHasEmail = localStorage.getItem('hasEmail')
    const storedHasPhone = localStorage.getItem('hasPhone')
    const storedTimestamp = localStorage.getItem('resetTimestamp')
    
    if (!storedUserId || !storedTimestamp) {
      toast.error('Session expired', {
        description: 'Please start over.',
      })
      router.push('/forget-password')
      return
    }
    
    // Check if session has expired (1 hour)
    const timestamp = parseInt(storedTimestamp)
    const currentTime = Date.now()
    const sessionDuration = 60 * 60 * 1000 // 1 hour
    
    if (currentTime - timestamp > sessionDuration) {
      // Clear expired session
      localStorage.removeItem('resetUserId')
      localStorage.removeItem('resetIdentifier')
      localStorage.removeItem('hasEmail')
      localStorage.removeItem('hasPhone')
      localStorage.removeItem('resetTimestamp')
      localStorage.removeItem('resetOtp')
      
      toast.error('Session expired', {
        description: 'Your session has expired. Please start over.',
      })
      router.push('/forget-password')
      return
    }
    
    setUserId(storedUserId)
    setIdentifier(storedIdentifier || '')
    setHasEmail(storedHasEmail === 'true')
    setHasPhone(storedHasPhone === 'true')
  }, [router])

  // Countdown timer effect
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [countdown])

  const validateOtp = (otp: string): boolean => {
    if (!otp) {
      setOtpError('OTP is required')
      return false
    }
    if (!/^\d{6}$/.test(otp)) {
      setOtpError('OTP must be 6 digits')
      return false
    }
    setOtpError('')
    return true
  }

  const handleVerifyOtp = async () => {
    if (!validateOtp(otpCode)) return
    
    setIsLoading(true)
    
    try {
      const response = await POSTDATA('/v1/auth/verify-otp', {
        userId,
        otpCode
      })
      
      if (response.success && response.data.verified) {
        // Store verified OTP in localStorage
        localStorage.setItem('resetOtp', otpCode)
        localStorage.setItem('resetOtpTimestamp', Date.now().toString())
        
        toast.success('OTP verified successfully!', {
          description: 'Please enter your new password.',
        })
        
        // Redirect to reset password page
        router.push('/forget-password/reset')
      } else {
        toast.error('Invalid OTP', {
          description: response.data.message || 'Please check your OTP and try again.',
        })
      }
    } catch (error) {
      console.error('Verify OTP error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendOtp = async () => {
    if (!canResend) return
    
    setIsLoading(true)
    
    try {
      const response = await POSTDATA('/v1/auth/resend-otp', {
        userId
      })
      
      if (response.success) {
        setCountdown(60)
        setCanResend(false)
        // Update timestamp for session
        localStorage.setItem('resetTimestamp', Date.now().toString())
        toast.success('OTP resent successfully!')
      } else {
        toast.error('Failed to resend OTP')
      }
    } catch (error) {
      console.error('Resend OTP error:', error)
      toast.error('An error occurred')
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
            Verify OTP
          </CardTitle>
          <CardDescription className="text-base">
            Enter the 6-digit code sent to you
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp" className="text-sm font-semibold flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                OTP Code
              </Label>
              <Input
                id="otp"
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                className="h-12 text-center text-2xl tracking-widest font-mono bg-white dark:bg-slate-800"
                disabled={isLoading}
                autoFocus
              />
              {otpError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {otpError}
                </p>
              )}
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={!canResend || isLoading}
                className={`text-sm ${
                  canResend && !isLoading
                    ? 'text-blue-600 hover:text-blue-700 dark:text-blue-400'
                    : 'text-slate-400 cursor-not-allowed'
                }`}
              >
                {countdown > 0 ? `Resend OTP in ${countdown}s` : 'Resend OTP'}
              </button>
            </div>

            <Alert className={`${
              hasEmail 
                ? 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-800'
                : 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800'
            }`}>
              <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
              <AlertDescription className="text-xs text-green-700 dark:text-green-300">
                OTP sent to {hasEmail ? `📧 ${identifier}` : hasPhone ? `📱 ${identifier}` : 'your contact'}
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-2 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/forget-password')}
            disabled={isLoading}
            className="flex-1 h-11"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleVerifyOtp}
            disabled={isLoading}
            className="flex-1 h-11 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Verifying...
              </>
            ) : (
              <>
                Verify OTP
                <Send className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}