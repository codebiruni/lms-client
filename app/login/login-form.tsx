/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, Phone, Shield, Sparkles, ArrowRight, Github, Chrome, Fingerprint, CheckCircle2, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import LOGINUSER from '../default/functions/LoginUser'
import { toast } from 'sonner'
import useContextData from '../default/custom-component/useContextData'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

type LoginFormValues = {
  identifier: string
  password: string
  remember: boolean
}

const saveLoginCreditional = (data: LoginFormValues) => {
  if (data.remember) {
    localStorage.setItem(
      'loginCredentials',
      JSON.stringify({
        identifier: data.identifier,
        password: data.password,
      }),
    )
  } else {
    localStorage.removeItem('loginCredentials')
  }
}

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email')
  const { UserData , handleUser, handleProfile } = useContextData()
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<any>(null)



  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginFormValues>()

  const identifier = watch('identifier')

  useEffect(() => {
  if (!UserData) return

  if (callbackUrl) {
    router.replace(callbackUrl)
  } else {
    router.replace(
      UserData.role === 'student'
        ? '/profile'
        : '/dashboard'
    )
  }
}, [UserData, callbackUrl, router])

  /* ---------------- Load saved credentials ---------------- */
  useEffect(() => {
    const saved = localStorage.getItem('loginCredentials')
    if (saved) {
      const parsed = JSON.parse(saved)
      setValue('identifier', parsed.identifier)
      setValue('password', parsed.password)
      setValue('remember', true)
      
      // Detect if identifier is email or phone
      if (parsed.identifier.includes('@')) {
        setActiveTab('email')
      } else {
        setActiveTab('phone')
      }
    }
  }, [setValue])



  /* ---------------- Submit ---------------- */
  const onSubmit = async (data: LoginFormValues) => {
    saveLoginCreditional(data)
    setIsLoading(true)
    setError(null)

    try {
      const res = await LOGINUSER('/v1/auth/login', data)
      if (!res.success) {
        setError(res.message || 'Invalid credentials')
        toast.error(res.message || 'Invalid credentials')
      } else {
        const user = res.data.user
        handleProfile(res.data.Profile)
        handleUser({
          _id: user._id,
          id: user.id,
          role: user.role,
          name: user.name,
          image: user.image,
        })
        toast.success('You have been logged in successfully')
        reset()

        if (callbackUrl) {
          router.push(callbackUrl)
        } else if (!callbackUrl && user.role === 'student') {
          router.push('/profile')
        }
      }
    } catch (err: any) {
      console.log(err)
      setError('An unexpected error occurred')
      toast.error(err.message || 'An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }


  return (
    <div className="relative w-full max-w-md my-10">
      {/* Animated background elements */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-emerald-400/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-300/20 rounded-full blur-3xl opacity-40 animate-pulse delay-1000" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative rounded-2xl overflow-hidden border border-emerald-100 dark:border-emerald-900 bg-white/90 dark:bg-emerald-950/90 backdrop-blur-xl shadow-xl">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-amber-300/20 rounded-full blur-3xl opacity-30" />

          <CardHeader className="relative space-y-4 text-center">
            {/* Animated logo */}
            <motion.div
              className="mx-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-emerald-700 rounded-2xl blur-lg opacity-40" />
                <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-lg">
                  <Lock className="h-8 w-8" />
                </div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold text-emerald-950 dark:text-emerald-50">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-emerald-900/70 dark:text-emerald-100/70">
                Sign in to continue your learning journey
              </CardDescription>
            </div>

            {/* Error message with animation */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="w-full p-3 bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-600 dark:text-rose-400 text-sm flex items-center justify-center gap-2"
                >
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {/* Login method tabs */}
            <div className="flex p-1 bg-emerald-100/50 dark:bg-emerald-900/30 rounded-xl border border-emerald-100 dark:border-emerald-900">
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'email'
                    ? 'bg-white dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-emerald-900/60 dark:text-emerald-100/60 hover:text-emerald-900 dark:hover:text-emerald-100'
                  }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('phone')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === 'phone'
                    ? 'bg-white dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 shadow-sm'
                    : 'text-emerald-900/60 dark:text-emerald-100/60 hover:text-emerald-900 dark:hover:text-emerald-100'
                  }`}
              >
                <Phone className="h-4 w-4 inline mr-2" />
                Phone
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email or Phone */}
              <div className="space-y-2">
                <Label
                  htmlFor="identifier"
                  className="text-sm font-medium text-emerald-950 dark:text-emerald-50"
                >
                  {activeTab === 'email' ? 'Email Address' : 'Phone Number'}
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {activeTab === 'email' ? (
                      <Mail className="h-4 w-4 text-emerald-900/50 dark:text-emerald-100/50 group-focus-within:text-emerald-700 dark:group-focus-within:text-emerald-300 transition-colors duration-200" />
                    ) : (
                      <Phone className="h-4 w-4 text-emerald-900/50 dark:text-emerald-100/50 group-focus-within:text-emerald-700 dark:group-focus-within:text-emerald-300 transition-colors duration-200" />
                    )}
                  </div>
                  <Input
                    id="identifier"
                    placeholder={activeTab === 'email' ? 'you@example.com' : '+8801XXXXXXXXX'}
                    className="pl-9 h-12 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900 text-emerald-950 dark:text-emerald-50 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 transition-all duration-200"
                    {...register('identifier', {
                      required: `${activeTab === 'email' ? 'Email' : 'Phone'} is required`,
                      pattern:
                        activeTab === 'email'
                          ? {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          }
                          : {
                            value: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
                            message: 'Invalid phone number',
                          },
                    })}
                  />
                  {identifier && identifier.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    </motion.div>
                  )}
                </div>
                {errors.identifier && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.identifier.message}
                  </motion.p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label
                  htmlFor="password"
                  className="text-sm font-medium text-emerald-950 dark:text-emerald-50"
                >
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pr-10 h-12 bg-emerald-50/50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-900 text-emerald-950 dark:text-emerald-50 rounded-xl focus:border-emerald-600 focus:ring-2 focus:ring-emerald-200 dark:focus:ring-emerald-900 transition-all duration-200"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900/50 dark:text-emerald-100/50 hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-1"
                  >
                    <AlertCircle className="h-3 w-3" />
                    {errors.password.message}
                  </motion.p>
                )}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    {...register('remember')}
                    className="border-emerald-300 dark:border-emerald-700 data-[state=checked]:bg-emerald-700 data-[state=checked]:border-emerald-700"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-emerald-900/70 dark:text-emerald-100/70 cursor-pointer hover:text-emerald-900 dark:hover:text-emerald-100 transition-colors duration-200"
                  >
                    Remember me
                  </Label>
                </div>

                <Link
                  href="/forget-password"
                  className="text-sm text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 hover:underline transition-all duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 mr-2" />
                      <span>Sign In</span>
                      <motion.div animate={{ x: isHovered ? 5 : 0 }} className="inline-block ml-2">
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Footer */}
            <div className="text-center space-y-2 pt-2">
              <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
                Don&apos;t have an account?{' '}
                <Link
                  href="/signup"
                  className="text-emerald-700 dark:text-emerald-300 hover:text-emerald-800 dark:hover:text-emerald-200 font-medium hover:underline transition-all duration-200"
                >
                  Sign up now
                </Link>
              </p>
              <p className="text-xs text-emerald-900/50 dark:text-emerald-100/50 flex items-center justify-center gap-1">
                <Lock className="h-3 w-3" />
                Secure login · Protected by encryption
              </p>
            </div>
          </CardContent>

          {/* Premium badge */}
          <div className="absolute top-4 right-4">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/50 rounded-full blur opacity-60" />
              <div className="relative bg-amber-400 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                SECURE
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}