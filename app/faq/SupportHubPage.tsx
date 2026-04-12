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
      <section className="relative w-full overflow-hidden bg-linear-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200 dark:bg-sky-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          
          <div 
            className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 10c-8.3 0-15 5.4-15 12 0 4.2 2.7 7.9 6.8 10.2L18 40l8.2-4.8c1.2.3 2.5.5 3.8.5 8.3 0 15-5.4 15-12s-6.7-12-15-12zm0 2c7.2 0 13 4.5 13 10s-5.8 10-13 10c-1.1 0-2.2-.1-3.2-.4l-1.1-.3-5.7 3.4 1.7-5.3-.5-.4C18.8 27.6 17 25 17 22c0-5.5 5.8-10 13-10z' fill='%234B5563' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}
          ></div>

          <svg className="absolute inset-0 w-full h-full opacity-10 dark:opacity-20" xmlns="http://www.w3.org/2000/svg">
            <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="1" fill="#4B5563" />
              <line x1="20" y1="20" x2="40" y2="20" stroke="#4B5563" strokeWidth="0.5" strokeDasharray="2,2" />
            </pattern>
            <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-linear-to-r from-sky-500 to-indigo-500 dark:from-sky-600 dark:to-indigo-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-sky-900/30 transition-all duration-300">
                <Headphones className="w-4 h-4 mr-1" />
                {supportData.baseText || "24/7 Support Hub"}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
              {supportData.bannerText?.blackText || "We're Here to Help You"}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-sky-600 via-blue-500 to-indigo-600 dark:from-sky-500 dark:via-blue-400 dark:to-indigo-500 bg-clip-text text-transparent">
                  {supportData.bannerText?.colorText || "Succeed Every Step of the Way"}
                </span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {supportData.shortDescription || "Get the support you need, when you need it. Our dedicated team is available around the clock to answer questions, solve problems, and ensure your success."}
            </p>
          </div>
        </div>
      </section>

      {/* Help Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {supportData.helpSectionTitle || "How Can We Help You Today?"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {supportData.helpSectionDescription || "Choose from a variety of support options to get the assistance you need quickly and efficiently."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {supportData.supportCategories?.map((category: any, idx: number) => (
              <Card key={idx} className="border-0 bg-linear-to-br from-sky-50 to-indigo-50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className="w-14 h-14 rounded-full bg-linear-to-br from-sky-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {getIcon(category.icon)}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-sky-600 group-hover:to-indigo-600 group-hover:bg-clip-text transition-all">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Badge className="bg-linear-to-r from-sky-500 to-indigo-500 text-white rounded-full border-0 px-4 py-1 text-sm">
                <Headphones className="w-3 h-3 mr-1" />
                Contact Us
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {supportData.contactSectionTitle || "Still Need Help? Contact Us Directly"}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportData.contactOptions?.map((option: any, idx: number) => (
              <a key={idx} href={option.link} target={option.link?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer">
                <Card className="border-0 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-sky-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-white">
                        {getContactIcon(option.icon)}
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
                      {option.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {option.description}
                    </p>
                    <p className="text-sm font-semibold text-sky-600 dark:text-sky-400">
                      {option.value}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>

          {/* Support Hours Note */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Support available 24/7, including holidays</span>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <Badge className="bg-linear-to-r from-sky-500 to-indigo-500 text-white rounded-full border-0 px-4 py-1 text-sm">
                <HelpCircle className="w-3 h-3 mr-1" />
                FAQ
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {supportData.faqSectionTitle || "Frequently Asked Questions"}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Find quick answers to common questions
            </p>
          </div>

          <div className="space-y-4">
            {supportData.faq?.map((faq: any, idx: number) => (
              <Card key={idx} className="border-0 bg-gray-50 dark:bg-gray-800/50 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full px-6 py-4 flex justify-between items-center text-left"
                  >
                    <span className="font-semibold text-gray-800 dark:text-white">
                      {faq.question}
                    </span>
                    {openFaqs.includes(idx) ? (
                      <ChevronUp className="w-5 h-5 text-sky-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {openFaqs.includes(idx) && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                      {faq.link && (
                        <a 
                          href={faq.link} 
                          className="inline-block mt-3 text-sm text-sky-600 dark:text-sky-400 hover:underline"
                        >
                          Learn more →
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
          className="w-full relative overflow-hidden rounded-2xl bg-blue-50 dark:bg-gray-800"
          style={{ height: '220px' }}
        >
          {/* Background Blobs */}
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-200 dark:bg-blue-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          
          {/* Content */}
          <div className="relative z-10 h-full flex items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
              {/* Badge */}
              <div className="flex justify-center mb-3">
                <Badge className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-0 rounded-full px-3 py-1 text-xs font-medium">
                  <Sparkles className="w-3 h-3 mr-1 inline" />
                  Start Your Journey Today
                </Badge>
              </div>

              {/* Heading */}
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Ready to Begin Your Learning Journey?
              </h2>
              
              {/* Description */}
              <p className="text-sm md:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-4 leading-relaxed">
                Join thousands of learners worldwide and expand your knowledge with our comprehensive courses
              </p>

              {/* Stats Row */}
              <div className="flex flex-wrap justify-center gap-4 mb-4">
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Award className="w-3 h-3" />
                  <span className="text-xs">Expert Instructors</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <TrendingUp className="w-3 h-3" />
                  <span className="text-xs">Lifetime Access</span>
                </div>
                <div className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                  <Clock className="w-3 h-3" />
                  <span className="text-xs">Learn at Your Pace</span>
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