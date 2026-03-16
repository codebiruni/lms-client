/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Loader2, Lock, LogIn, Mail, Phone, Shield, Sparkles, ArrowRight, Github, Chrome, Fingerprint } from 'lucide-react'
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
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { useEffect, useState } from 'react'
import LOGINUSER from '../default/functions/LoginUser'
import { toast } from 'sonner'
import useContextData from '../default/custom-component/useContextData'
import { useRouter } from 'next/navigation'
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
  const { handleUser, handleProfile } = useContextData()
  const router = useRouter()
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
        if (user.role === 'admin') {
          router.push('/dashboard')
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
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-linear-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-linear-to-r from-pink-400 to-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="relative rounded-lg overflow-hidden border-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-2xl">
          {/* Premium linear border */}
          <div className="absolute inset-0 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-10" />
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-linear-to-br from-blue-400 to-purple-400 rounded-full blur-3xl opacity-20" />
          <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-linear-to-br from-pink-400 to-orange-400 rounded-full blur-3xl opacity-20" />

          <CardHeader className="relative space-y-4 text-center">
            {/* Animated logo */}
            <motion.div
              className="mx-auto"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
                <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-linear-to-br from-blue-500 to-purple-600 text-white shadow-lg">
                  <Lock className="h-8 w-8" />
                </div>
              </div>
            </motion.div>

            <div className="space-y-2">
              <CardTitle className="text-3xl font-bold bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
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
                  className="w-full p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-red-600 dark:text-red-400 text-sm flex items-center justify-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  {error}
                </motion.div>
              )}
            </AnimatePresence>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {/* Login method tabs */}
            <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
              <button
                type="button"
                onClick={() => setActiveTab('email')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'email'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('phone')}
                className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeTab === 'phone'
                    ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <Phone className="h-4 w-4 inline mr-2" />
                Phone
              </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email or Phone with floating label effect */}
              <div className="space-y-2">
                <Label htmlFor="identifier" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {activeTab === 'email' ? 'Email Address' : 'Phone Number'}
                </Label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    {activeTab === 'email' ? (
                      <Mail className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    ) : (
                      <Phone className="h-4 w-4 text-gray-400 group-focus-within:text-blue-500 transition-colors duration-200" />
                    )}
                  </div>
                  <Input
                    id="identifier"
                    placeholder={activeTab === 'email' ? 'you@example.com' : '+1 (555) 000-9999'}
                    className="pl-9 h-12 bg-gray-50 rounded-lg dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                    {...register('identifier', {
                      required: `${activeTab === 'email' ? 'Email' : 'Phone'} is required`,
                      pattern: activeTab === 'email' 
                        ? {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Invalid email address',
                          }
                        : {
                            value: /^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,4}[-\s\.]?[0-9]{1,9}$/,
                            message: 'Invalid phone number',
                          }
                    })}
                  />
                  {identifier && identifier.length > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                    >
                      <Sparkles className="h-4 w-4 text-green-500" />
                    </motion.div>
                  )}
                </div>
                {errors.identifier && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <Shield className="h-3 w-3" />
                    {errors.identifier.message}
                  </motion.p>
                )}
              </div>

              {/* Password with strength indicator */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </Label>
                <div className="relative group">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    className="pr-20 h-12 bg-gray-50 rounded-lg dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-200"
                    {...register('password', {
                      required: 'Password is required',
                      minLength: {
                        value: 6,
                        message: 'Password must be at least 6 characters',
                      },
                    })}
                  />

                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <motion.p
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-red-500 flex items-center gap-1"
                  >
                    <Shield className="h-3 w-3" />
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
                    className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                  />
                  <Label 
                    htmlFor="remember" 
                    className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-gray-200 transition-colors duration-200"
                  >
                    Remember me
                  </Label>
                </div>

                <Link href={'/forget-password'}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline transition-all duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button with animation */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  size="lg"
                  type="submit"
                  disabled={isLoading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="w-full h-12 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin mr-2" />
                      <span>Signing In...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="h-5 w-5 mr-2" />
                      <span>Sign In</span>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        className="inline-block ml-2"
                      >
                        <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Alternative login methods
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant="outline"
                  className="h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <Chrome className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200"
                >
                  <Fingerprint className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <Separator /> */}

            {/* Footer */}
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don`t have an account?{' '}
                <Link href={'/signup'}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline transition-all duration-200"
                >
                  Sign up now
                </Link>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 flex items-center justify-center gap-1">
                <Shield className="h-3 w-3" />
                Secure login · Protected by industry-standard encryption
              </p>
            </div>
          </CardContent>

          {/* Premium badge */}
          <div className="absolute top-3 right-3">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-r from-amber-400 to-pink-400 rounded-full blur opacity-50" />
              <div className="relative bg-linear-to-r from-amber-400 to-pink-400 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}