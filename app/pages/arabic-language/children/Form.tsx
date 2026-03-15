'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Loader2, Send, MapPin, MessageCircle, Users } from "lucide-react"
import { toast } from "sonner"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import POSTDATA from "@/app/default/functions/Post"

export default function Form() {
  const pathname = usePathname()
  const lastPath = pathname.split('/').filter(Boolean).pop() || "general"

  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    email: "",
    address: ""
  })

  // ১. হোয়াটসঅ্যাপ নম্বর ফরম্যাটিং ফাংশন
  const formatWhatsapp = (val: string) => {
    if (!val) return ""
    return val.startsWith('+88') ? val : `+88${val}`
  }

  // ২. অটো-সাবমিট ফাংশন (Debounced)
  const autoSubmit = useCallback(async (data: typeof formData) => {
    // অন্তত নাম এবং ফোন নম্বর না থাকলে অটো-সাবমিট করবে না
    if (!data.name || !data.phone) return;

    try {
      await POSTDATA('/v1/landing-page-data', {
        ...data,
        whatsapp: formatWhatsapp(data.whatsapp),
        type: `${lastPath}-draft`, // ড্রাফট হিসেবে চিহ্নিত করতে
        email: data.email || undefined
      })
      console.log("Draft saved automatically...")
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      // সাইলেন্ট এরর (ইউজারকে বিরক্ত করবে না)
    }
  }, [lastPath])

  // ৩. ইউজারের টাইপিং ট্র্যাক করে ৩ সেকেন্ড পর অটো সাবমিট করবে
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      autoSubmit(formData)
    }, 5000) // ৩ সেকেন্ড পজ থাকলে সাবমিট হবে

    return () => clearTimeout(delayDebounceFn)
  }, [formData, autoSubmit])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.phone || !formData.whatsapp || !formData.address) {
      toast.error("সব প্রয়োজনীয় তথ্য প্রদান করুন")
      return
    }

    try {
      setLoading(true)
      const res = await POSTDATA('/v1/landing-page-data', {
        ...formData,
        whatsapp: formatWhatsapp(formData.whatsapp),
        type: lastPath,
        email: formData.email || undefined
      })

      if (!res.success) throw new Error(res?.message || "ব্যর্থ হয়েছে")

      toast.success("তথ্য সফলভাবে জমা হয়েছে 🎉")
      setFormData({ name: "", phone: "", whatsapp: "", email: "", address: "" })
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id='apply' className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        
        {/* FORM PART - No Header, rounded-md */}
        <Card className="rounded-md shadow-sm border border-gray-100 overflow-hidden bg-white">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-[#0A1E5E] mb-6">আবেদন ফরম</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase text-gray-500">নাম *</Label>
                  <Input name="name" value={formData.name} onChange={handleChange} className="rounded-md border-gray-200" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase text-gray-500">ফোন নম্বর *</Label>
                  <Input name="phone" value={formData.phone} onChange={handleChange} className="rounded-md border-gray-200" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase text-gray-500">হোয়াটসঅ্যাপ নম্বর *</Label>
                  <Input name="whatsapp" placeholder="০১XXXXXXXX" value={formData.whatsapp} onChange={handleChange} className="rounded-md border-gray-200" />
                </div>
                <div className="space-y-1">
                  <Label className="text-xs font-bold uppercase text-gray-500">ইমেইল (ঐচ্ছিক)</Label>
                  <Input name="email" type="email" value={formData.email} onChange={handleChange} className="rounded-md border-gray-200" />
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase text-gray-500">বর্তমান ঠিকানা *</Label>
                <Textarea name="address" value={formData.address} onChange={handleChange} className="rounded-md border-gray-200 min-h-[80px]" />
              </div>

              <Button type="submit" disabled={loading} className="w-full rounded-md bg-[#0A1E5E] hover:bg-[#1a2d6d] text-white h-12 font-bold transition-all">
                {loading ? <Loader2 className="animate-spin" /> : "জমা দিন"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* CONTACT PART - Compact, rounded-md */}
        <div className="flex flex-col justify-between space-y-4">
          <div className="bg-gray-50 p-6 rounded-md border border-gray-100 h-full">
            <h3 className="text-lg font-bold text-[#0A1E5E] mb-4">যোগাযোগ</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-green-600 w-5 h-5 shrink-0" />
                <p className="text-sm text-gray-600">
                  <span className="font-bold text-gray-800">কোরআনিক ভার্স বাংলাদেশ</span><br />
                  বাসা #৭০, রোড #০৪, ডি.আই.টি প্রজেক্ট, মেরুল বাড্ডা, ঢাকা।
                </p>
              </div>

              <div className="flex items-start gap-3">
                <MessageCircle className="text-green-600 w-5 h-5 shrink-0" />
                <div className="text-sm">
                  <p className="font-bold text-gray-800">ভর্তি ও তথ্য</p>
                  <a href="tel:01835411107" className="text-lg font-black text-[#0A1E5E]">01835-411107</a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <a 
                href="https://chat.whatsapp.com/Beiwxy0IdBIHjPErXhXqeT" 
                target="_blank"
                className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-md font-bold text-sm hover:bg-green-700 transition-all"
              >
                <Users className="w-4 h-4" /> হোয়াটসঅ্যাপ গ্রুপে যুক্ত হোন
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}