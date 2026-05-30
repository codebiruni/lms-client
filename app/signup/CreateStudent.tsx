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
    if (!name.trim()) {
      toast.error("Please enter your full name")
      return
    }

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

    if (!agreeTerms) {
      toast.error("Please agree to the Terms of Service and Privacy Policy")
      return
    }

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-lg mb-4">
            <UserPlus className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Student Account
          </h1>
          <p className="text-muted-foreground mt-2">
            Join our learning community and start your educational journey
          </p>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="border-b pb-6">
            <CardTitle className="text-2xl">Sign Up</CardTitle>
            <CardDescription>
              Fill in your details to create your account. All fields marked with * are required.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* -------- PROFILE IMAGE -------- */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Profile Picture</Label>
              <Label className="text-sm font-normal text-muted-foreground block -mt-1">
                Optional - Upload a profile photo (Max 5MB)
              </Label>

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="relative flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 transition-all hover:border-blue-400 hover:bg-blue-50/30"
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
                        className="rounded-xl object-cover"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          removeImage()
                        }}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <UploadCloud className="mb-3 h-10 w-10 text-gray-400" />
                    <p className="text-sm text-gray-500 text-center px-4">
                      Drag & drop an image here or click to browse
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      Supports: JPG, PNG, WEBP, GIF (Max 5MB)
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* -------- PERSONAL INFORMATION -------- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-l-4 border-blue-500 pl-3">
                Personal Information
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">Phone Number</Label>
                  <Input
                    placeholder="+8801XXXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label className="text-sm font-medium">Bio</Label>
                  <Textarea
                    placeholder="Tell us a little about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={3}
                    className="focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* -------- PASSWORD SECTION -------- */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-l-4 border-blue-500 pl-3">
                Security
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Confirm Password <span className="text-red-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="focus:ring-2 focus:ring-blue-500 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Requirements */}
              {password && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <p className="text-sm font-medium text-gray-700">Password Requirements:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {req.check ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-gray-400" />
                        )}
                        <span className={req.check ? "text-gray-700" : "text-gray-500"}>
                          {req.label}
                        </span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-sm">
                      {passwordsMatch && confirmPassword ? (
                        <Check className="h-4 w-4 text-green-500" />
                      ) : confirmPassword ? (
                        <X className="h-4 w-4 text-red-500" />
                      ) : (
                        <X className="h-4 w-4 text-gray-400" />
                      )}
                      <span className={passwordsMatch && confirmPassword ? "text-gray-700" : "text-gray-500"}>
                        Passwords match
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* -------- TERMS AND CONDITIONS -------- */}
            <div className="flex items-start space-x-3 space-y-0">
              <Checkbox
                id="terms"
                checked={agreeTerms}
                onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                className="mt-1"
              />
              <Label
                htmlFor="terms"
                className="text-sm font-normal leading-tight cursor-pointer"
              >
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:underline font-medium">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:underline font-medium">
                  Privacy Policy
                </Link>{" "}
                <span className="text-red-500">*</span>
              </Label>
            </div>

            {/* -------- SUBMIT BUTTON -------- */}
            <Button
              onClick={handleSubmit}
              disabled={loading || !name || !email || !isPasswordValid || !agreeTerms}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
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

          <CardFooter className="border-t pt-6 flex justify-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link href="/login" className="text-blue-600 hover:underline font-medium">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}