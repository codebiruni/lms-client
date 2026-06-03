'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { UserPlus, Loader2, Eye, EyeOff } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import POSTDATA from "@/app/default/functions/Post"

export default function CreateStudent() {
  /* -------------------- STATE -------------------- */
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [loading, setLoading] = useState(false)


  const passwordsMatch = password === confirmPassword && password !== ""
  const isFormValid = email.trim() !== "" && password !== "" && passwordsMatch

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
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

    if (!passwordsMatch) {
      toast.error("Your passwords do not match")
      return
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("email", email.trim().toLowerCase())
      formData.append("password", password)
      if (phone) formData.append("phone", phone.trim())

      const res = await POSTDATA("/v1/student", formData)

      if (!res.success) {
        throw new Error(res?.message || "Failed to create account")
      }

      toast.success("Account created successfully! 🎉 Please check your email for OTP verification")

      /* RESET FORM */
      setEmail("")
      setPhone("")
      setPassword("")
      setConfirmPassword("")
    } catch (error: any) {
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-50/80 dark:from-emerald-950 dark:via-gray-950 dark:to-emerald-950/80 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-xl">
        <Card className="shadow-lg border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-3xl">
          <CardContent className="space-y-6 pt-8">

            {/* -------- MAIN SIGN UP FIELDS -------- */}
            <div className="space-y-4">
              <div className="text-center mb-2">
                <h2 className="text-2xl font-bold text-emerald-950 dark:text-emerald-50">Create an Account</h2>
                <p className="text-sm text-emerald-900/60 dark:text-emerald-100/60 mt-1">Fill out the fields below to get started</p>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                  Email Address <span className="text-rose-600">*</span>
                </Label>
                <Input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                  Phone Number <span className="text-muted-foreground text-xs">(Optional)</span>
                </Label>
                <Input
                  placeholder="+8801XXXXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl h-11"
                />
              </div>
            </div>

            {/* -------- PASSWORD SECTION -------- */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-emerald-950 dark:text-emerald-50">
                    Password <span className="text-rose-600">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent pr-10 rounded-xl h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900/50 dark:text-emerald-100/50 hover:text-emerald-900 dark:hover:text-emerald-100"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
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
                      placeholder="Repeat password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-950 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent pr-10 rounded-xl h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-900/50 dark:text-emerald-100/50 hover:text-emerald-900 dark:hover:text-emerald-100"
                    >
                      {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* -------- SUBMIT BUTTON -------- */}
            <Button
              onClick={handleSubmit}
              disabled={loading || !isFormValid}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white transition-all duration-200 rounded-xl font-semibold h-11 mt-4"
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

          <CardFooter className="border-t border-emerald-100 dark:border-emerald-900 py-5 flex justify-center">
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