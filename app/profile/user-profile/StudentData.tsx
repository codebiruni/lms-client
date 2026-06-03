'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react"
import { Save, Loader2, AlertCircle, CheckCircle2, X, UploadCloud } from "lucide-react"
import { toast } from "sonner"
import Image from "next/image"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

import PUTDATA from "@/app/default/functions/put"

const BLOOD_GROUPS = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
const COUNTRIES = ["Bangladesh", "USA", "UK", "Canada", "Australia", "Saudi Arabia", "UAE", "Malaysia", "Singapore"]

export default function StudentProfilePage() {
  const [activeTab, setActiveTab] = useState("profile-picture")
  const [isSaving, setIsSaving] = useState(false)

  /* ================== PROFILE PICTURE ================== */
  const [profileImage, setProfileImage] = useState<File | null>(null)
  const [profilePreview, setProfilePreview] = useState<string | null>(null)

  /* ================== TAB 1: STUDENT INFORMATION ================== */
  const [studentInfo, setStudentInfo] = useState({
    fullNameBn: "",
    fullNameEn: "",
    dateOfBirth: "",
    nidNumber: "",
    gender: "",
    bloodGroup: "",
    isExpatriate: "",
    expatriateCountry: "",
    whatsappNumber: "",
    email: "",
    previousSchool: "",
  })

  /* ================== TAB 2: PARENTS & CONTACT ================== */
  const [parentInfo, setParentInfo] = useState({
    fatherName: "",
    fatherOccupation: "",
    fatherPhone: "",
    motherName: "",
    motherPhone: "",
    parentIsExpatriate: "",
    parentExpatriateCountry: "",
    parentWhatsappNumber: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    currentAddress: "",
    permanentAddress: "",
  })

  /* ================== IMAGE HANDLERS ================== */
  const handleProfileImageFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB")
      return
    }
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file")
      return
    }
    setProfileImage(file)
    setProfilePreview(URL.createObjectURL(file))
    toast.success("Image selected successfully!")
  }

  const handleProfileImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (e.dataTransfer.files?.[0]) {
      handleProfileImageFile(e.dataTransfer.files[0])
    }
  }

  const removeProfileImage = () => {
    setProfileImage(null)
    if (profilePreview) {
      URL.revokeObjectURL(profilePreview)
      setProfilePreview(null)
    }
    toast.success("Image removed")
  }

  /* ================== FORM HANDLERS ================== */
  const handleStudentChange = (field: string, value: string) => {
    if (field === "fullNameEn") {
      value = value.toUpperCase()
    }
    setStudentInfo(prev => ({ ...prev, [field]: value }))
  }

  const handleParentChange = (field: string, value: string) => {
    setParentInfo(prev => ({ ...prev, [field]: value }))
  }

  /* ================== SAVE PROFILE ================== */
  const handleSaveProfile = async () => {
    try {
      setIsSaving(true)

      const formData = new FormData()

      // Add profile image if selected
      if (profileImage) {
        formData.append("profileImage", profileImage)
      }

      // Add student info as JSON string
      formData.append("student", JSON.stringify(studentInfo))

      // Add parent info as JSON string
      formData.append("parent", JSON.stringify(parentInfo))

      const res = await PUTDATA("/v1/student/profile", formData)

      if (!res.success) {
        throw new Error(res?.message || "Failed to update profile")
      }

      toast.success("Profile updated successfully! ✅")
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  /* ================== UI ================== */
  return (
    <div className="min-h-screen bg-linear-to-b   dark:from-white-950 dark:via-gray-950 dark:to-white-950/80">
      <div className="mx-auto max-w-4xl">
        {/* Tabs Card */}
        <Card className="shadow-lg mt-10 border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-3xl overflow-hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab List */}
            <TabsList className="grid w-full grid-cols-3 bg-emerald-50/50 dark:bg-emerald-900/20 border-b border-emerald-100 dark:border-emerald-900 rounded-none">
              <TabsTrigger
                value="profile-picture"
                className="rounded-none text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-emerald-950 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-300 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700"
              >
                প্রোফাইল ছবি
              </TabsTrigger>
              <TabsTrigger
                value="student"
                className="rounded-none text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-emerald-950 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-300 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700"
              >
                শিক্ষার্থীর তথ্য
              </TabsTrigger>
              <TabsTrigger
                value="parent"
                className="rounded-none text-xs sm:text-sm font-medium data-[state=active]:bg-white dark:data-[state=active]:bg-emerald-950 data-[state=active]:text-emerald-700 dark:data-[state=active]:text-emerald-300 data-[state=active]:border-b-2 data-[state=active]:border-emerald-700"
              >
                অভিভাবক ও যোগাযোগ
              </TabsTrigger>
            </TabsList>

            {/* ==================== PROFILE PICTURE TAB ==================== */}
            <TabsContent value="profile-picture" className="space-y-6 p-6 sm:p-8">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-emerald-950 dark:text-emerald-50 border-l-4 border-emerald-700 pl-3">
                  প্রোফাইল ছবি আপলোড করুন
                </h3>
                <p className="text-emerald-900/70 dark:text-emerald-100/70 text-sm">
                  সর্বোচ্চ ৫ এমবি আকারের ছবি আপলোড করুন (JPG, PNG, WEBP, GIF)
                </p>

                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleProfileImageDrop}
                  className="relative flex h-64 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-900/10 transition-all hover:border-emerald-400 dark:hover:border-emerald-700 hover:bg-emerald-100/30 dark:hover:bg-emerald-900/20"
                >
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp,.gif"
                    className="absolute inset-0 cursor-pointer opacity-0"
                    onChange={(e) => e.target.files && handleProfileImageFile(e.target.files[0])}
                  />

                  {profilePreview ? (
                    <>
                      <div className="relative w-full h-full">
                        <Image
                          src={profilePreview}
                          alt="Profile preview"
                          fill
                          className="rounded-2xl object-cover"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            removeProfileImage()
                          }}
                          className="absolute top-3 right-3 p-2 bg-rose-600 hover:bg-rose-700 text-white rounded-full transition shadow-lg"
                        >
                          <X className="h-5 w-5" />
                        </button>
                        <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-emerald-950/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                            ছবি নির্বাচিত ✓
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <UploadCloud className="mb-3 h-12 w-12 text-emerald-700/60 dark:text-emerald-300/60" />
                      <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70 text-center px-4 font-medium">
                        ছবি এখানে টেনে আনুন অথবা ক্লিক করুন
                      </p>
                      <p className="text-xs text-emerald-900/50 dark:text-emerald-100/50 mt-2">
                        JPG, PNG, WEBP, GIF - সর্বোচ্চ ৫ এমবি
                      </p>
                    </>
                  )}
                </div>

                {/* Image Info */}
                {profileImage && (
                  <div className="bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-900 rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                      <p className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                        ছবির তথ্য
                      </p>
                    </div>
                    <p className="text-xs text-emerald-900/70 dark:text-emerald-100/70">
                      <span className="font-medium">নাম:</span> {profileImage.name}
                    </p>
                    <p className="text-xs text-emerald-900/70 dark:text-emerald-100/70">
                      <span className="font-medium">আকার:</span> {(profileImage.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* ==================== TAB 2: STUDENT INFORMATION ==================== */}
            <TabsContent value="student" className="space-y-6 p-6 sm:p-8">
              <div className="space-y-6">
                {/* Row 1: Full Name (Bangla & English) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      শিক্ষার্থীর পূর্ণ নাম (বাংলায়)
                    </Label>
                    <Input
                      type="text"
                      placeholder="যেমন: আবদুল করিম"
                      value={studentInfo.fullNameBn}
                      onChange={(e) => handleStudentChange("fullNameBn", e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      Full Name (ENGLISH CAPITAL) <span className="text-rose-600">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="E.g: ABDUL KARIM"
                      value={studentInfo.fullNameEn}
                      onChange={(e) => handleStudentChange("fullNameEn", e.target.value.toUpperCase())}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl uppercase"
                    />
                  </div>
                </div>

                {/* Row 2: Date of Birth & Gender */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      জন্ম তারিখ (DD/MM/YYYY) <span className="text-rose-600">*</span>
                    </Label>
                    <Input
                      type="date"
                      value={studentInfo.dateOfBirth}
                      onChange={(e) => handleStudentChange("dateOfBirth", e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      জেন্ডার (Gender) <span className="text-rose-600">*</span>
                    </Label>
                    <RadioGroup value={studentInfo.gender} onValueChange={(val) => handleStudentChange("gender", val)}>
                      <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male" />
                          <Label htmlFor="male" className="cursor-pointer text-emerald-950 dark:text-emerald-50">
                            ছাত্র
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female" />
                          <Label htmlFor="female" className="cursor-pointer text-emerald-950 dark:text-emerald-50">
                            ছাত্রী
                          </Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </div>

                {/* Row 3: NID & Blood Group */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      এনআইডি/পাসপোর্ট/জন্ম নিবন্ধন নম্বর
                    </Label>
                    <Input
                      type="text"
                      placeholder="যেমন: 1234567890123"
                      value={studentInfo.nidNumber}
                      onChange={(e) => handleStudentChange("nidNumber", e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      রক্তের গ্রুপ (Blood Group)
                    </Label>
                    <Select value={studentInfo.bloodGroup} onValueChange={(val) => handleStudentChange("bloodGroup", val)}>
                      <SelectTrigger className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 rounded-xl">
                        <SelectValue placeholder="নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {BLOOD_GROUPS.map(bg => (
                          <SelectItem key={bg} value={bg}>{bg}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Row 4: Expatriate Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                    আপনি কি প্রবাসী? (Are you an Expatriate?) <span className="text-rose-600">*</span>
                  </Label>
                  <RadioGroup value={studentInfo.isExpatriate} onValueChange={(val) => handleStudentChange("isExpatriate", val)}>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="exp-yes" />
                        <Label htmlFor="exp-yes" className="cursor-pointer text-emerald-950 dark:text-emerald-50">
                          হ্যাঁ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="exp-no" />
                        <Label htmlFor="exp-no" className="cursor-pointer text-emerald-950 dark:text-emerald-50">
                          না
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Conditional: Expatriate Country */}
                {studentInfo.isExpatriate === "yes" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      বর্তমান অবস্থানরত দেশ <span className="text-rose-600">*</span>
                    </Label>
                    <Select value={studentInfo.expatriateCountry} onValueChange={(val) => handleStudentChange("expatriateCountry", val)}>
                      <SelectTrigger className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 rounded-xl">
                        <SelectValue placeholder="দেশ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Conditional: WhatsApp Number */}
                {studentInfo.isExpatriate === "yes" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      হোয়াটসঅ্যাপ নম্বর (Country Code সহ) <span className="text-rose-600">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="যেমন: +1234567890"
                      value={studentInfo.whatsappNumber}
                      onChange={(e) => handleStudentChange("whatsappNumber", e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                    />
                  </div>
                )}

                {/* Email & Previous School */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      ইমেইল
                    </Label>
                    <Input
                      type="email"
                      placeholder="student@example.com"
                      value={studentInfo.email}
                      onChange={(e) => handleStudentChange("email", e.target.value)}
                      disabled
                      className="border-emerald-200 dark:border-emerald-900 bg-emerald-100/50 dark:bg-emerald-900/10 text-emerald-950 dark:text-emerald-50 rounded-xl opacity-60 cursor-not-allowed"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      পূর্ববর্তী শিক্ষাপ্রতিষ্ঠানের নাম
                    </Label>
                    <Input
                      type="text"
                      placeholder="যেমন: ঢাকা পাবলিক স্কুল"
                      value={studentInfo.previousSchool}
                      onChange={(e) => handleStudentChange("previousSchool", e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* ==================== TAB 3: PARENTS & CONTACT ==================== */}
            <TabsContent value="parent" className="space-y-6 p-6 sm:p-8">
              <div className="space-y-6">
                {/* Section: Father's Information */}
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900">
                  <h3 className="font-bold text-emerald-950 dark:text-emerald-50 mb-4 text-lg">পিতার তথ্য</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                        পিতার নাম <span className="text-rose-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="যেমন: করিম আহমেদ"
                        value={parentInfo.fatherName}
                        onChange={(e) => handleParentChange("fatherName", e.target.value)}
                        className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                        পিতার পেশা
                      </Label>
                      <Input
                        type="text"
                        placeholder="যেমন: ইঞ্জিনিয়ার"
                        value={parentInfo.fatherOccupation}
                        onChange={(e) => handleParentChange("fatherOccupation", e.target.value)}
                        className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                        পিতার মোবাইল নম্বর
                      </Label>
                      <Input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={parentInfo.fatherPhone}
                        onChange={(e) => handleParentChange("fatherPhone", e.target.value)}
                        className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Mother's Information */}
                <div className="bg-emerald-50/50 dark:bg-emerald-900/10 rounded-xl p-4 border border-emerald-100 dark:border-emerald-900">
                  <h3 className="font-bold text-emerald-950 dark:text-emerald-50 mb-4 text-lg">মাতার তথ্য</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                        মাতার নাম <span className="text-rose-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="যেমন: ফাতিমা বেগম"
                        value={parentInfo.motherName}
                        onChange={(e) => handleParentChange("motherName", e.target.value)}
                        className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                        মাতার মোবাইল নম্বর
                      </Label>
                      <Input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={parentInfo.motherPhone}
                        onChange={(e) => handleParentChange("motherPhone", e.target.value)}
                        className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Parents Expatriate Status */}
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                    অভিভাবক কি প্রবাসী? (Are you an Expatriate?) <span className="text-rose-600">*</span>
                  </Label>
                  <RadioGroup value={parentInfo.parentIsExpatriate} onValueChange={(val) => handleParentChange("parentIsExpatriate", val)}>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="parent-exp-yes" />
                        <Label htmlFor="parent-exp-yes" className="cursor-pointer text-emerald-950 dark:text-emerald-50">
                          হ্যাঁ
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="parent-exp-no" />
                        <Label htmlFor="parent-exp-no" className="cursor-pointer text-emerald-950 dark:text-emerald-50">
                          না
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                {/* Conditional: Parents Expatriate Country */}
                {parentInfo.parentIsExpatriate === "yes" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      বর্তমান অবস্থানরত দেশ <span className="text-rose-600">*</span>
                    </Label>
                    <Select value={parentInfo.parentExpatriateCountry} onValueChange={(val) => handleParentChange("parentExpatriateCountry", val)}>
                      <SelectTrigger className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 rounded-xl">
                        <SelectValue placeholder="দেশ নির্বাচন করুন" />
                      </SelectTrigger>
                      <SelectContent>
                        {COUNTRIES.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Conditional: Parents WhatsApp Number */}
                {parentInfo.parentIsExpatriate === "yes" && (
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      হোয়াটসঅ্যাপ নম্বর (Country Code সহ) <span className="text-rose-600">*</span>
                    </Label>
                    <Input
                      type="text"
                      placeholder="যেমন: +1234567890"
                      value={parentInfo.parentWhatsappNumber}
                      onChange={(e) => handleParentChange("parentWhatsappNumber", e.target.value)}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl"
                    />
                  </div>
                )}

                {/* Section: Emergency Contact */}
                <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-900">
                  <h3 className="font-bold text-amber-950 dark:text-amber-50 mb-4 text-lg">জরুরি যোগাযোগ</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-amber-950 dark:text-amber-50">
                        নাম ও সম্পর্ক <span className="text-rose-600">*</span>
                      </Label>
                      <Input
                        type="text"
                        placeholder="যেমন: আলী (চাচা)"
                        value={parentInfo.emergencyContactName}
                        onChange={(e) => handleParentChange("emergencyContactName", e.target.value)}
                        className="border-amber-200 dark:border-amber-900 bg-white dark:bg-amber-900/20 text-amber-950 dark:text-amber-50 focus:ring-2 focus:ring-amber-600 focus:border-transparent rounded-xl"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-amber-950 dark:text-amber-50">
                        মোবাইল নম্বর <span className="text-rose-600">*</span>
                      </Label>
                      <Input
                        type="tel"
                        placeholder="01XXXXXXXXX"
                        value={parentInfo.emergencyContactPhone}
                        onChange={(e) => handleParentChange("emergencyContactPhone", e.target.value)}
                        className="border-amber-200 dark:border-amber-900 bg-white dark:bg-amber-900/20 text-amber-950 dark:text-amber-50 focus:ring-2 focus:ring-amber-600 focus:border-transparent rounded-xl"
                      />
                    </div>
                  </div>
                </div>

                {/* Section: Addresses */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      বর্তমান ঠিকানা <span className="text-rose-600">*</span>
                    </Label>
                    <Textarea
                      placeholder="বাড়ি, রোড, এলাকা - যেমন: বাড়ি ৫, রোড ১০, বাদ্দা, ঢাকা"
                      value={parentInfo.currentAddress}
                      onChange={(e) => handleParentChange("currentAddress", e.target.value)}
                      rows={3}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl resize-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-emerald-950 dark:text-emerald-50">
                      স্থায়ী ঠিকানা <span className="text-rose-600">*</span>
                    </Label>
                    <Textarea
                      placeholder="গ্রাম, পোস্ট অফিস, উপজেলা, জেলা - যেমন: ইউনিয়ন, নারসিংদী"
                      value={parentInfo.permanentAddress}
                      onChange={(e) => handleParentChange("permanentAddress", e.target.value)}
                      rows={3}
                      className="border-emerald-200 dark:border-emerald-900 bg-white dark:bg-emerald-900/20 text-emerald-950 dark:text-emerald-50 focus:ring-2 focus:ring-emerald-600 focus:border-transparent rounded-xl resize-none"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Save Button */}
          <div className="border-t border-emerald-100 dark:border-emerald-900 p-6 sm:p-8 flex justify-end gap-3">
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-semibold transition-all px-8"
              size="lg"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  সংরক্ষণ হচ্ছে...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  সংরক্ষণ করুন
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Info Message */}
        <div className="mt-6 bg-blue-50 dark:bg-blue-900/15 border border-blue-200 dark:border-blue-900/40 rounded-2xl p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 shrink-0" />
          <div>
            <p className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-1">
              গুরুত্বপূর্ণ তথ্য
            </p>
            <p className="text-sm text-blue-900/70 dark:text-blue-100/70">
              আপনার তথ্য নিরাপদ এবং গোপনীয় থাকবে। শুধুমাত্র প্রয়োজনীয় যোগাযোগের জন্য ব্যবহার করা হবে।
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}