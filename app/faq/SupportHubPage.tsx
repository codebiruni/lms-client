/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React, { useState } from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Headphones,
  Monitor,
  CreditCard,
  BookOpen,
  Smartphone,
  Eye,
  MessageSquare,
  Phone,
  Mail,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  MessageCircle,
  Users,
  Clock,
  TrendingUp,
  Award,
  Sparkles
} from 'lucide-react'

export default function SupportHubPage({ data }: any) {
  const supportData = data || {}
  const [openFaqs, setOpenFaqs] = useState<number[]>([])

  const toggleFaq = (index: number) => {
    if (openFaqs.includes(index)) {
      setOpenFaqs(openFaqs.filter(i => i !== index))
    } else {
      setOpenFaqs([...openFaqs, index])
    }
  }

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      Monitor: <Monitor className="w-6 h-6" />,
      CreditCard: <CreditCard className="w-6 h-6" />,
      BookOpen: <BookOpen className="w-6 h-6" />,
      Smartphone: <Smartphone className="w-6 h-6" />,
      Eye: <Eye className="w-6 h-6" />,
      MessageSquare: <MessageSquare className="w-6 h-6" />,
      Phone: <Phone className="w-6 h-6" />,
      Mail: <Mail className="w-6 h-6" />,
    }
    return icons[iconName] || <HelpCircle className="w-6 h-6" />
  }

  const getContactIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      MessageSquare: <MessageSquare className="w-5 h-5" />,
      Phone: <Phone className="w-5 h-5" />,
      Mail: <Mail className="w-5 h-5" />,
      MessageCircle: <MessageCircle className="w-5 h-5" />,
      Video: <Monitor className="w-5 h-5" />,
      Users: <Users className="w-5 h-5" />,
    }
    return icons[iconName] || <Headphones className="w-5 h-5" />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden bg-emerald-50 dark:bg-emerald-950 transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-200/60 dark:bg-emerald-900/20 rounded-full filter blur-3xl opacity-40"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/60 dark:bg-amber-900/15 rounded-full filter blur-3xl opacity-40"></div>

          <div
            className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-8.3 0-15 5.4-15 12 0 4.2 2.7 7.9 6.8 10.2L18 40l8.2-4.8c1.2.3 2.5.5 3.8.5 8.3 0 15-5.4 15-12s-6.7-12-15-12zm0 2c7.2 0 13 4.5 13 10s-5.8 10-13 10c-1.1 0-2.2-.1-3.2-.4l-1.1-.3-5.7 3.4 1.7-5.3-.5-.4C18.8 27.6 17 25 17 22c0-5.5 5.8-10 13-10z' fill='%23059669' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px',
            }}
          ></div>

          {/* dotted + line pattern (no gradient colors) */}
          <svg
            className="absolute inset-0 w-full h-full opacity-[0.07] dark:opacity-[0.12]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#065F46" />
              <line
                x1="20"
                y1="20"
                x2="40"
                y2="20"
                stroke="#065F46"
                strokeWidth="0.5"
                strokeDasharray="2,2"
              />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-emerald-950/30 transition-all duration-300">
                <Headphones className="w-4 h-4 mr-1" />
                {supportData.baseText || "সাপোর্ট হাব (২৪/৭)"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-emerald-950 dark:text-emerald-50 mb-6 transition-colors duration-300">
              {supportData.bannerText?.blackText || "আমরা আছি আপনার পাশে"}
              <span className="block mt-2 text-emerald-800 dark:text-emerald-200">
                {supportData.bannerText?.colorText || "প্রতিটি ধাপে সহায়তা নিশ্চিত"}
              </span>
            </h1>

            <p className="text-lg md:text-xl text-emerald-900/70 dark:text-emerald-100/70 max-w-3xl mx-auto mb-10 leading-relaxed">
              {supportData.shortDescription ||
                "যখনই প্রয়োজন—ঠিক তখনই সহায়তা। প্রশ্ন, সমস্যা বা গাইডলাইনের জন্য আমাদের টিম সবসময় প্রস্তুত, যাতে আপনার শেখার পথ হয় সহজ ও নিশ্চিন্ত।"}
            </p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
              {supportData.helpSectionTitle || "আজ আমরা কীভাবে সাহায্য করতে পারি?"}
            </h2>
            <p className="text-base md:text-lg text-emerald-900/70 dark:text-emerald-100/70 max-w-2xl mx-auto">
              {supportData.helpSectionDescription ||
                "দ্রুত সহায়তার জন্য নিচের অপশনগুলো থেকে নির্বাচন করুন।"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportData.supportCategories?.map((category: any, idx: number) => (
              <Card
                key={idx}
                className="border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer rounded-2xl"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-emerald-700 dark:text-emerald-300">
                      {getIcon(category.icon)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50 mb-2 transition-all">
                    {category.title}
                  </h3>
                  <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full overflow-hidden bg-emerald-50 dark:bg-emerald-950 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Badge className="bg-emerald-700 text-white rounded-full border-0 px-4 py-1 text-sm">
                <Headphones className="w-3 h-3 mr-1" />
                যোগাযোগ
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
              {supportData.contactSectionTitle || "আরও সহায়তা লাগলে সরাসরি যোগাযোগ করুন"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportData.contactOptions?.map((option: any, idx: number) => (
              <a
                key={idx}
                href={option.link}
                target={option.link?.startsWith('http') ? '_blank' : '_self'}
                rel="noopener noreferrer"
              >
                <Card className="border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-emerald-700 dark:text-emerald-300">
                        {getContactIcon(option.icon) || ''}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-emerald-950 dark:text-emerald-50 mb-2">
                      {option.title || ''}
                    </h3>
                    <p className="text-sm text-emerald-900/70 dark:text-emerald-100/70 mb-2">
                      {option.description || ''}
                    </p>
                    <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">
                      {option.value || ''}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Support Hours Note */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-emerald-900/60 dark:text-emerald-100/60">
              <Clock className="w-4 h-4" />
              <span>সাপোর্ট ২৪/৭ (ছুটির দিনসহ)</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Badge className="bg-emerald-700 text-white rounded-full border-0 px-4 py-1 text-sm">
                <HelpCircle className="w-3 h-3 mr-1" />
                সাধারণ প্রশ্ন
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-emerald-950 dark:text-emerald-50 mb-4">
              {supportData.faqSectionTitle || "প্রায়শ জিজ্ঞাসিত প্রশ্নাবলী"}
            </h2>
            <p className="text-base md:text-lg text-emerald-900/70 dark:text-emerald-100/70">
              দ্রুত উত্তর খুঁজে নিন
            </p>
          </div>

          <div className="space-y-4">
            {supportData.faq?.map((faq: any, idx: number) => (
              <Card
                key={idx}
                className="border border-emerald-100 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950 hover:shadow-lg transition-all duration-300 rounded-2xl"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left"
                  >
                    <span className="font-semibold text-emerald-950 dark:text-emerald-50">
                      {faq.question}
                    </span>
                    {openFaqs.includes(idx) ? (
                      <ChevronUp className="w-5 h-5 text-emerald-700 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-emerald-900/40 dark:text-emerald-100/40 shrink-0" />
                    )}
                  </button>
                  {openFaqs.includes(idx) && (
                    <div className="px-6 pb-4">
                      <p className="text-emerald-900/70 dark:text-emerald-100/70 leading-relaxed">
                        {faq.answer}
                      </p>
                      {faq.link && (
                        <a
                          href={faq.link}
                          className="inline-block mt-3 text-sm text-emerald-700 dark:text-emerald-300 hover:underline"
                        >
                          আরও জানুন →
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-5">
        <div className="container mx-auto p-4">
          <div
            className="w-full relative overflow-hidden rounded-2xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-100 dark:border-emerald-900"
            style={{ height: '220px' }}
          >
            {/* Background Blobs (no gradient, no blue/purple) */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-amber-200/60 dark:bg-amber-900/15 rounded-full filter blur-xl opacity-70 dark:opacity-30"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-200/60 dark:bg-emerald-900/20 rounded-full filter blur-xl opacity-70 dark:opacity-30"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-100/70 dark:bg-emerald-900/15 rounded-full filter blur-xl opacity-70 dark:opacity-30"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <Badge className="bg-white dark:bg-emerald-950 text-emerald-800 dark:text-emerald-200 border border-emerald-100 dark:border-emerald-900 rounded-full px-3 py-1 text-xs font-medium">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    আজই শুরু করুন
                  </Badge>
                </div>

                {/* Heading */}
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-emerald-950 dark:text-emerald-50 mb-2">
                  শেখার যাত্রা শুরু করতে প্রস্তুত?
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-emerald-900/70 dark:text-emerald-100/70 max-w-2xl mx-auto mb-4 leading-relaxed">
                  দ্রুত সাপোর্ট, পরিষ্কার নির্দেশনা এবং নিরাপদ পরিবেশ—সবকিছু একসাথে। আপনার প্রশ্ন থাকলে আমরা আছি আপনার পাশে।
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center gap-4 mb-4">
                  <div className="flex items-center gap-1 text-emerald-900/70 dark:text-emerald-100/70">
                    <Award className="w-3 h-3" />
                    <span className="text-xs">বিশ্বস্ত সাপোর্ট</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-900/70 dark:text-emerald-100/70">
                    <TrendingUp className="w-3 h-3" />
                    <span className="text-xs">দ্রুত সমাধান</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-900/70 dark:text-emerald-100/70">
                    <Clock className="w-3 h-3" />
                    <span className="text-xs">২৪/৭ সহায়তা</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}