// app/forget-password/reset/page.tsx
'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Lock, 
  Shield, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { toast } from 'sonner'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'

import POSTDATA from '@/app/default/functions/Post'

export default function ResetPassword() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [userId, setUserId] = useState<string>('')
  const [otpCode, setOtpCode] = useState<string>('')

  useEffect(() => {
    // Verify session and check if user has valid data in localStorage
    const verifySession = () => {
      const storedUserId = localStorage.getItem('resetUserId')
      const storedOtp = localStorage.getItem('resetOtp')
      const storedTimestamp = localStorage.getItem('resetTimestamp')
      const storedOtpTimestamp = localStorage.getItem('resetOtpTimestamp')
      
      // Check if all required data exists
      if (!storedUserId || !storedOtp || !storedTimestamp || !storedOtpTimestamp) {
        toast.error('Invalid session', {
          description: 'Please start the password reset process from the beginning.',
          duration: 5000,
        })
        router.push('/forget-password')
        return
      }
      
      // Check if main session has expired (1 hour)
      const timestamp = parseInt(storedTimestamp)
      const currentTime = Date.now()
      const sessionDuration = 60 * 60 * 1000 // 1 hour
      
      if (currentTime - timestamp > sessionDuration) {
        // Clear expired session
        clearSessionData()
        toast.error('Session expired', {
          description: 'Your session has expired. Please start over.',
          duration: 5000,
        })
        router.push('/forget-password')
        return
      }
      
      // Check if OTP verification has expired (30 minutes)
      const otpTimestamp = parseInt(storedOtpTimestamp)
      const otpDuration = 30 * 60 * 1000 // 30 minutes
      
      if (currentTime - otpTimestamp > otpDuration) {
        // Clear expired session
        clearSessionData()
        toast.error('OTP verification expired', {
          description: 'Please request a new OTP and verify again.',
          duration: 5000,
        })
        router.push('/forget-password/otp')
        return
      }
      
      setUserId(storedUserId)
      setOtpCode(storedOtp)
      setIsVerifying(false)
    }
    
    const clearSessionData = () => {
      localStorage.removeItem('resetUserId')
      localStorage.removeItem('resetIdentifier')
      localStorage.removeItem('hasEmail')
      localStorage.removeItem('hasPhone')
      localStorage.removeItem('resetTimestamp')
      localStorage.removeItem('resetOtp')
      localStorage.removeItem('resetOtpTimestamp')
    }
    
    verifySession()
  }, [router])

  // Password strength calculation
  useEffect(() => {
    let strength = 0
    if (newPassword) {
      if (newPassword.length >= 8) strength += 25
      if (/[A-Z]/.test(newPassword)) strength += 25
      if (/[0-9]/.test(newPassword)) strength += 25
      if (/[^A-Za-z0-9]/.test(newPassword)) strength += 25
    }
    setPasswordStrength(strength)
  }, [newPassword])

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 25) return 'bg-red-500'
    if (passwordStrength <= 50) return 'bg-orange-500'
    if (passwordStrength <= 75) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 25) return 'Weak'
    if (passwordStrength <= 50) return 'Fair'
    if (passwordStrength <= 75) return 'Good'
    return 'Strong'
  }

  const validatePasswords = (): boolean => {
    let isValid = true
    
    // Validate new password
    if (!newPassword) {
      setPasswordError('New password is required')
      isValid = false
    } else if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      isValid = false
    } else if (!/[A-Z]/.test(newPassword)) {
      setPasswordError('Password must contain at least one uppercase letter')
      isValid = false
    } else if (!/[a-z]/.test(newPassword)) {
      setPasswordError('Password must contain at least one lowercase letter')
      isValid = false
    } else if (!/[0-9]/.test(newPassword)) {
      setPasswordError('Password must contain at least one number')
      isValid = false
    } else if (!/[^A-Za-z0-9]/.test(newPassword)) {
      setPasswordError('Password must contain at least one special character')
      isValid = false
    } else {
      setPasswordError('')
    }
    
    // Validate confirm password
    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password')
      isValid = false
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError("Passwords don't match")
      isValid = false
    } else {
      setConfirmPasswordError('')
    }
    
    return isValid
  }

  const handleResetPassword = async () => {
    if (!validatePasswords()) return
    
    setIsLoading(true)
    
    try {
      const response = await POSTDATA('/v1/auth/reset-password', {
        userId,
        newPassword
      })
      
      if (response.success) {
        // Clear all session data from localStorage
        localStorage.removeItem('resetUserId')
        localStorage.removeItem('resetIdentifier')
        localStorage.removeItem('hasEmail')
        localStorage.removeItem('hasPhone')
        localStorage.removeItem('resetTimestamp')
        localStorage.removeItem('resetOtp')
        localStorage.removeItem('resetOtpTimestamp')
        
        toast.success('Password reset successfully!', {
          description: 'Please login with your new password.',
          duration: 5000,
        })
        
        // Redirect to login after 2 seconds
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } else {
        toast.error(response.message || 'Failed to reset password', {
          description: 'Please try again or request a new OTP.',
        })
      }
    } catch (error) {
      console.error('Reset password error:', error)
      toast.error('An error occurred', {
        description: 'Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Show loading state while verifying session
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-0 dark:bg-slate-900/50 backdrop-blur-sm">
          <CardContent className="pt-12 pb-12 text-center">
            <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-600 dark:text-slate-400">Verifying session...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-2xl border-0 dark:bg-slate-900/50 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center border-b pb-6">
          <div className="mx-auto w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-3xl font-bold bg-linear-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
            Reset Password
          </CardTitle>
          <CardDescription className="text-base">
            Create a new strong password
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-sm font-semibold flex items-center gap-2">
                <Lock className="w-4 h-4" />
                New Password
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 bg-white dark:bg-slate-800"
                disabled={isLoading}
              />
              
              {/* Password Strength Indicator */}
              {newPassword && (
                <div className="space-y-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-600 dark:text-slate-400">Password strength:</span>
                    <span className={`text-xs font-semibold ${
                      passwordStrength <= 25 ? 'text-red-500' :
                      passwordStrength <= 50 ? 'text-orange-500' :
                      passwordStrength <= 75 ? 'text-yellow-500' :
                      'text-green-500'
                    }`}>
                      {getPasswordStrengthText()}
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                </div>
              )}
              
              {passwordError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {passwordError}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Confirm New Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 bg-white dark:bg-slate-800"
                disabled={isLoading}
              />
              {confirmPasswordError && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {confirmPasswordError}
                </p>
              )}
            </div>

            <Alert className="bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
              <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <AlertDescription className="text-xs text-blue-700 dark:text-blue-300">
                <p className="font-semibold mb-1">Password requirements:</p>
                <ul className="list-disc list-inside space-y-0.5">
                  <li>At least 8 characters long</li>
                  <li>Contains at least one uppercase letter (A-Z)</li>
                  <li>Contains at least one lowercase letter (a-z)</li>
                  <li>Contains at least one number (0-9)</li>
                  <li>Contains at least one special character (!@#$%^&*)</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3 pt-2 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/forget-password/otp')}
            disabled={isLoading}
            className="flex-1 h-11"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <Button
            onClick={handleResetPassword}
            disabled={isLoading}
            className="flex-1 h-11 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Resetting...
              </>
            ) : (
              'Reset Password'
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}