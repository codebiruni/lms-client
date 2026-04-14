/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  MessageSquare,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  MessageCircle,
  User,
  Briefcase,
  Clock
} from 'lucide-react'

// Default data structure
const defaultData = {
  baseText: "Get in Touch",
  bannerText: {
    blackText: "Let's Start a",
    colorText: "Conversation"
  },
  marqueeText: "Have questions about Bright Path Academy? We're here to help. Reach out to us through any of our channels and we'll respond as soon as possible.",
  number: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
  email: ["info@brightpathacademy.edu", "support@brightpathacademy.edu"],
  address: ["123 Education Lane, Suite 100", "Knowledge City, KC 12345"],
  facebookLink: "https://facebook.com/brightpathacademy",
  twitterLink: "https://twitter.com/brightpathacademy",
  linkedinLink: "https://linkedin.com/company/brightpathacademy",
  instagramLink: "https://instagram.com/brightpathacademy",
  whatsappNumber: "https://wa.me/15551234567",
  contactMembers: [
    {
      name: "Sarah Johnson",
      position: "Admissions Coordinator",
      number: "+1 (555) 123-4567"
    },
    {
      name: "Michael Chen",
      position: "Student Support Specialist",
      number: "+1 (555) 234-5678"
    },
    {
      name: "Emily Rodriguez",
      position: "Academic Advisor",
      number: "+1 (555) 345-6789"
    }
  ]
}

export default function ContactPage({ data }: any) {
  // Merge provided data with default data
  const contactData = {
    ...defaultData,
    ...(data || {}),
    bannerText: {
      ...defaultData.bannerText,
      ...(data?.bannerText || {})
    },
    contactMembers: data?.contactMembers?.length > 0 ? data.contactMembers : defaultData.contactMembers
  }

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, link: contactData.facebookLink, color: 'bg-blue-600' },
    { name: 'Twitter', icon: Twitter, link: contactData.twitterLink, color: 'bg-sky-500' },
    { name: 'LinkedIn', icon: Linkedin, link: contactData.linkedinLink, color: 'bg-blue-700' },
    { name: 'Instagram', icon: Instagram, link: contactData.instagramLink, color: 'bg-pink-600' },
    { name: 'WhatsApp', icon: MessageCircle, link: contactData.whatsappNumber, color: 'bg-green-500' },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
        {/* Background decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-violet-200 dark:bg-violet-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-fuchsia-200 dark:bg-fuchsia-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30"></div>
          
          <div 
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 10c-4.4 0-8 3.1-8 7 0 2.4 1.2 4.5 3.2 5.9L12 28l6.3-3.7c.5.1 1.1.2 1.7.2 4.4 0 8-3.1 8-7s-3.6-7-8-7z' fill='%236b21ce' fill-opacity='0.2' fill-rule='evenodd'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}
          ></div>

          <div className="absolute inset-0 opacity-5 dark:opacity-10">
            <svg className="w-full h-full" viewBox="0 0 800 400" preserveAspectRatio="none">
              <path 
                d="M400,50 C250,50 120,150 120,200 C120,250 250,350 400,350 C550,350 680,250 680,200 C680,150 550,50 400,50 Z" 
                fill="none" 
                stroke="currentColor" 
                className="text-gray-400 dark:text-gray-600"
                strokeWidth="0.5"
              />
              <circle cx="400" cy="200" r="3" fill="currentColor" className="text-violet-400 dark:text-violet-600" />
            </svg>
          </div>
        </div>

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-linear-to-r from-violet-500 to-fuchsia-500 dark:from-violet-600 dark:to-fuchsia-600 text-white rounded-full border-0 px-4 py-1.5 text-sm font-medium shadow-lg dark:shadow-violet-900/30 transition-all duration-300">
                <MessageSquare className="w-4 h-4 mr-1" />
                {contactData.baseText}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
              {contactData.bannerText.blackText}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-violet-600 via-fuchsia-500 to-pink-600 dark:from-violet-500 dark:via-fuchsia-400 dark:to-pink-500 bg-clip-text text-transparent">
                  {contactData.bannerText.colorText}
                </span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
              {contactData.marqueeText}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <Card className="border-0 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Phone</h3>
                {contactData.number && contactData.number.length > 0 ? (
                  contactData.number.map((num: string, idx: number) => (
                    <a key={idx} href={`tel:${num}`} className="block text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-1">
                      {num}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No phone numbers available</p>
                )}
              </CardContent>
            </Card>

            {/* Email Card */}
            <Card className="border-0 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Email</h3>
                {contactData.email && contactData.email.length > 0 ? (
                  contactData.email.map((email: string, idx: number) => (
                    <a key={idx} href={`mailto:${email}`} className="block text-gray-600 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors mb-1">
                      {email}
                    </a>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No email addresses available</p>
                )}
              </CardContent>
            </Card>

            {/* Address Card */}
            <Card className="border-0 bg-linear-to-br from-violet-50 to-fuchsia-50 dark:from-gray-800/50 dark:to-gray-800/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3">Address</h3>
                {contactData.address && contactData.address.length > 0 ? (
                  contactData.address.map((addr: string, idx: number) => (
                    <p key={idx} className="text-gray-600 dark:text-gray-300">
                      {addr}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-600 dark:text-gray-300">No address available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Find Us Here
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Visit our office location
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d233668.38709614185!2d90.279237601771!3d23.78057343719299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b087026b81%3A0x8fa563bbdd5904c2!2sDhaka!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Office Location"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Connect With Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Follow us on social media for updates and news
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {socialLinks.map((social, idx) => {
              const Icon = social.icon
              // Only show social link if it exists
              if (!social.link) return null
              return (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} p-3 rounded-full hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </a>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Members Section */}
      {contactData.contactMembers && contactData.contactMembers.length > 0 && (
        <section className="relative w-full overflow-hidden bg-linear-to-b from-violet-50 to-white dark:from-gray-900 dark:to-gray-950 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-2">
                Our Support Team
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Get in touch with our dedicated team members
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contactData.contactMembers.map((member: any, idx: number) => (
                <Card key={idx} className="border-0 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-20 h-20 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center mx-auto mb-4">
                      <User className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-1">
                      {member.name || "Team Member"}
                    </h3>
                    <p className="text-sm text-violet-600 dark:text-violet-400 mb-3">
                      <Briefcase className="w-3 h-3 inline mr-1" />
                      {member.position || "Staff"}
                    </p>
                    {member.number && (
                      <a href={`tel:${member.number}`} className="text-gray-600 dark:text-gray-300 hover:text-violet-600 transition-colors">
                        <Phone className="w-4 h-4 inline mr-1" />
                        {member.number}
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Working Hours Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 py-12">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <Clock className="w-5 h-5 text-violet-500" />
            <span>Support Hours: Monday - Friday, 9:00 AM - 6:00 PM (GMT+6)</span>
          </div>
        </div>
      </section>
    </div>
  )
}