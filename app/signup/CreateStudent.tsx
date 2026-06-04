'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { UploadCloud, UserPlus, Loader2, Eye, EyeOff, Check, X } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

import POSTDATA from "@/app/default/functions/Post"

export default function CreateStudent() {
  /* -------------------- STATE -------------------- */
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [bio, setBio] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)

  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  /* -------------------- PASSWORD VALIDATION -------------------- */
  const passwordRequirements = [
    { label: "At least 8 characters", check: password.length >= 8 },
    { label: "At least 1 uppercase letter", check: /[A-Z]/.test(password) },
    { label: "At least 1 lowercase letter", check: /[a-z]/.test(password) },
    { label: "At least 1 number", check: /[0-9]/.test(password) },
  ]

  const passwordsMatch = password === confirmPassword && password !== ""
  const isPasswordValid = passwordRequirements.every(req => req.check) && passwordsMatch

  /* -------------------- IMAGE HANDLERS -------------------- */
  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const removeImage = () => {
    setImage(null)
    if (preview) {
      URL.revokeObjectURL(preview)
      setPreview(null)
    }
  }

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
    // if (!name.trim()) {
    //   toast.error("Please enter your full name")
    //   return
    // }

    if (!email.trim()) {
      toast.error("Please enter your email address")
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email address")
      return
    }

    if (!password) {
      toast.error("Please create a password")
      return
    }

    if (!isPasswordValid) {
      toast.error("Please meet all password requirements")
      return
    }

    // if (!agreeTerms) {
    //   toast.error("Please agree to the Terms of Service and Privacy Policy")
    //   return
    // }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name.trim())
      formData.append("email", email.trim().toLowerCase())
      formData.append("password", password)

      if (phone) formData.append("phone", phone.trim())
      if (bio) formData.append("bio", bio.trim())
      if (image) formData.append("image", image)

      const res = await POSTDATA("/v1/student", formData)

      if (!res.success) {
        throw new Error(res?.message || "Failed to create account")
      }

      toast.success("Account created successfully! 🎉 Please check your email for OTP verification")
      
      // Optional: Redirect to verification page
      // router.push("/verify-email")

      /* RESET FORM */
      setName("")
      setEmail("")
      setPhone("")
      setPassword("")
      setConfirmPassword("")
      setBio("")
      setAgreeTerms(false)
      removeImage()
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-emerald-50/80 dark:from-emerald-950 dark:via-gray-950 dark:to-emerald-950/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <Card className="shadow-lg border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-3xl">
          <CardContent className="space-y-6 pt-6">
            {/* -------- PROFILE IMAGE -------- */}
            {/* <div className="space-y-3">
              <Label className="text-base font-semibold text-emerald-950 dark:text-emerald-50">
                Profile Picture
              </Label>
              <Label className="text-sm font-normal text-emerald-900/60 dark:text-emerald-100/60 block -mt-1">
                Optional - Upload a profile photo (Max 5MB)
              </Label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10 transition-all hover:border-emerald-400 dark:hover:border-emerald-700 hover:bg-emerald-100/30 dark:hover:bg-emerald-900/20"
              >
                <input
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,.gif"
                  className="absolute inset-0 cursor-pointer opacity-0"
                  onChange={(e) => e.target.files && handleFile(e.target.files[0])}
                />

                {preview ? (
                  <>
                    <div className="relative w-full h-full">
                      <Image
                        src={preview}
                        alt="Profile preview"
                        fill
                        className="rounded-2xl object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage()
                        }}
                        className="absolute top-2 right-2 p-1 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="mb-3 h-10 w-10 text-emerald-700/60 dark:text-emerald-300/60" />
                    <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70 text-center px-4">
                      Drag & drop an image here or click to browse
                    </p>
                    <p className="text-xs text-emerald-900/50 dark:text-emerald-100/50 mt-2">
                      Supports: JPG, PNG, WEBP, GIF (Max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div> */}

            {/* -------- PERSONAL INFORMATION -------- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-emerald-950 dark:text-emerald-50 border-l-4 border-emerald-700 pl-3">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="space-y-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Full Name <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                  />
                </div> */}

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Email Address <span className="text-rose-600">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Phone Number
                  </Label>
                  <Input
                    placeholder="+8801XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                  />
                </div>

                {/* <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Bio
                  </Label>
                  <Textarea
                    placeholder="Tell us a little about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl resize-none"
                  />
                </div> */}
              </div>
            </div>

            {/* -------- PASSWORD SECTION -------- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg text-emerald-950 dark:text-emerald-50 border-l-4 border-emerald-700 pl-3">
                Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Password <span className="text-rose-600">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent pr-10 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900/50 dark:text-emerald-100/50 hover:text-emerald-900 dark:hover:text-emerald-100"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Confirm Password <span className="text-rose-600">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent pr-10 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900/50 dark:text-emerald-100/50 hover:text-emerald-900 dark:hover:text-emerald-100"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-xl p-4 space-y-2 border border-emerald-100 dark:border-emerald-900">
                  <p className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Password Requirements:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {req.check ? (
                          <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                        ) : (
                          <X className="h-4 w-4 text-emerald-900/30 dark:text-emerald-100/30" />
                        )}
                        <span
                          className={
                            req.check
                              ? "text-emerald-950 dark:text-emerald-50"
                              : "text-emerald-900/60 dark:text-emerald-100/60"
                          }
                        >
                          {req.label}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm">
                      {passwordsMatch && confirmPassword ? (
                        <Check className="h-4 w-4 text-emerald-700 dark:text-emerald-300" />
                      ) : confirmPassword ? (
                        <X className="h-4 w-4 text-rose-600" />
                      ) : (
                        <X className="h-4 w-4 text-emerald-900/30 dark:text-emerald-100/30" />
                      )}
                      <span
                        className={
                          passwordsMatch && confirmPassword
                            ? "text-emerald-950 dark:text-emerald-50"
                            : "text-emerald-900/60 dark:text-emerald-100/60"
                        }
                      >
                        Passwords match
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* -------- TERMS AND CONDITIONS -------- */}
            {/* <div className="flex items-start space-x-3 space-y-0 bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1 border-emerald-300 dark:border-emerald-700 accent-emerald-700"
              />
              <Label
                htmlFor="terms"
                className="text-sm font-normal leading-tight cursor-pointer text-emerald-950 dark:text-emerald-50"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-emerald-700 dark:text-emerald-300 hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-emerald-700 dark:text-emerald-300 hover:underline font-medium"
                >
                  Privacy Policy
                </Link>{" "}
                <span className="text-rose-600">*</span>
              </Label>
            </div> */}

            {/* -------- SUBMIT BUTTON -------- */}
            <Button
              onClick={handleSubmit}
              disabled={loading || !email || !isPasswordValid }
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 rounded-xl font-semibold"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </>
              )}
            </Button>
          </CardContent>

          <CardFooter className="border-t border-emerald-100 dark:border-emerald-900 pt-6 flex justify-center">
            <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
              Already have an account?{" "}
              <Link href="/login" className="text-emerald-700 dark:text-emerald-300 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}