/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Sparkles, 
  TrendingUp, 
  Brain, 
  BarChart, 
  Code2, 
  ClipboardCheck, 
  Briefcase, 
  MessageSquare, 
  Users, 
  FileCheck,
  CheckCircle2,
  Rocket,
  Target,
  Award,
  Zap
} from 'lucide-react'

export default function FeaturesPage({ data }: any) {
  // Default data structure
  const defaultData = {
    baseText: "Discover Features",
    bannerText: {
      blackText: "Everything You Need to",
      colorText: "Illuminate Learning"
    },
    shortDescription: "Empower educators, engage students, and streamline administration with our comprehensive Learning Management System.",
    overviewTitle: "A Complete Learning Ecosystem",
    overviewDescription: "Our platform brings together cutting-edge technology, expert instruction, and engaging content to create an unparalleled learning experience for everyone.",
    platformFeatures: [
      {
        title: "For Students",
        description: "Tools designed to enhance your learning journey",
        features: [
          {
            icon: "TrendingUp",
            title: "Personalized Learning Paths",
            description: "AI-driven recommendations tailored to your pace and style"
          },
          {
            icon: "Brain",
            title: "Interactive Content",
            description: "Engaging videos, quizzes, and hands-on projects"
          },
          {
            icon: "BarChart",
            title: "Progress Tracking",
            description: "Visual insights into your learning achievements"
          }
        ]
      },
      {
        title: "For Educators",
        description: "Comprehensive tools to create and manage courses",
        features: [
          {
            icon: "Code2",
            title: "Course Builder",
            description: "Intuitive drag-and-drop course creation tools"
          },
          {
            icon: "ClipboardCheck",
            title: "Assessment Tools",
            description: "Automated grading and detailed analytics"
          },
          {
            icon: "Briefcase",
            title: "Resource Management",
            description: "Organize and share learning materials efficiently"
          }
        ]
      },
      {
        title: "For Administrators",
        description: "Enterprise-grade management capabilities",
        features: [
          {
            icon: "MessageSquare",
            title: "Communication Hub",
            description: "Seamless messaging and announcement system"
          },
          {
            icon: "Users",
            title: "User Analytics",
            description: "Comprehensive reports and engagement metrics"
          },
          {
            icon: "FileCheck",
            title: "Compliance & Security",
            description: "Enterprise-grade security and data protection"
          }
        ]
      }
    ],
    statsSection: {
      title: "Trusted by Leading Organizations",
      description: "Join thousands of satisfied users worldwide",
      stats: [
        { value: "500K+", label: "Active Students" },
        { value: "10K+", label: "Expert Instructors" },
        { value: "50K+", label: "Courses Available" },
        { value: "98%", label: "Satisfaction Rate" }
      ]
    },
    additionalFeatures: {
      title: "Why Choose Our Platform",
      description: "Setting new standards in digital education",
      features: [
        {
          icon: "Rocket",
          title: "Lightning Fast Performance",
          description: "Optimized for speed and reliability"
        },
        {
          icon: "Target",
          title: "Goal-Oriented Learning",
          description: "Clear objectives and measurable outcomes"
        },
        {
          icon: "Award",
          title: "Certification Ready",
          description: "Industry-recognized certificates upon completion"
        },
        {
          icon: "Zap",
          title: "24/7 Support",
          description: "Round-the-clock assistance when you need it"
        }
      ]
    },
    testimonialSection: {
      title: "What Our Users Say",
      description: "Real stories from real learners",
      testimonials: [
        {
          name: "Sarah Johnson",
          role: "Software Engineer",
          content: "This platform transformed my career. The personalized learning paths helped me master new skills quickly."
        },
        {
          name: "Dr. Michael Chen",
          role: "University Professor",
          content: "The analytics and assessment tools have revolutionized how I teach and track student progress."
        },
        {
          name: "Emily Rodriguez",
          role: "HR Director",
          content: "Excellent platform for corporate training. Our team's productivity has increased significantly."
        }
      ]
    },
    ctaTitle: "Ready to Transform Your Future?",
    ctaDescription: "Join millions of learners already advancing their careers with our platform. Start your free trial today!",
    ctaButtonText: "Start Learning Now"
  }

  // Merge provided data with defaults
  const featuresData = { ...defaultData, ...data }
  
  const getIcon = (iconName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      TrendingUp: <TrendingUp className="w-6 h-6" />,
      Brain: <Brain className="w-6 h-6" />,
      BarChart: <BarChart className="w-6 h-6" />,
      Code2: <Code2 className="w-6 h-6" />,
      ClipboardCheck: <ClipboardCheck className="w-6 h-6" />,
      Briefcase: <Briefcase className="w-6 h-6" />,
      MessageSquare: <MessageSquare className="w-6 h-6" />,
      Users: <Users className="w-6 h-6" />,
      FileCheck: <FileCheck className="w-6 h-6" />,
      Rocket: <Rocket className="w-6 h-6" />,
      Target: <Target className="w-6 h-6" />,
      Award: <Award className="w-6 h-6" />,
      Zap: <Zap className="w-6 h-6" />
    }
    return icons[iconName] || <CheckCircle2 className="w-6 h-6" />
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Banner Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
        {/* Static background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-yellow-300 dark:bg-yellow-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-900 rounded-full mix-blend-multiply filter blur-xl opacity-70 dark:opacity-30"></div>
          
          <div 
            className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20 dark:opacity-10 dark:invert"
          ></div>
          
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-white/50 dark:to-gray-950/50 pointer-events-none"></div>
        </div>

        {/* Banner Content */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <Badge className="bg-linear-to-r from-purple-500 to-pink-500 dark:from-purple-600 dark:to-pink-600 text-white rounded-full border-0 px-4 py-1 text-sm font-medium shadow-lg dark:shadow-purple-900/30">
                <Sparkles className="w-4 h-4 mr-1" />
                {featuresData.baseText}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 dark:text-gray-100 mb-6 transition-colors duration-300">
              {featuresData.bannerText?.blackText || "Everything You Need to"}
              <span className="block mt-2">
                <span className="bg-linear-to-r from-yellow-600 via-pink-500 to-purple-500 dark:from-yellow-500 dark:via-pink-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {featuresData.bannerText?.colorText || "Illuminate Learning"}
                </span>
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed transition-colors duration-300">
              {featuresData.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              {featuresData.overviewTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {featuresData.overviewDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features Section */}
      <section className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
              Platform Features
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Everything you need to succeed in one powerful platform
            </p>
          </div>

          <div className="space-y-16">
            {featuresData.platformFeatures?.map((feature: any, idx: number) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {feature.features?.map((item: any, itemIdx: number) => (
                    <Card key={itemIdx} className="border-0 bg-gray-50 dark:bg-gray-900/50 hover:shadow-xl transition-all duration-300">
                      <CardContent className="p-6 text-center">
                        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                          <div className="text-white">
                            {getIcon(item.icon)}
                          </div>
                        </div>
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {featuresData.statsSection && (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {featuresData.statsSection.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {featuresData.statsSection.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {featuresData.statsSection.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Additional Features Section */}
      {featuresData.additionalFeatures && (
        <section className="relative w-full overflow-hidden bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {featuresData.additionalFeatures.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {featuresData.additionalFeatures.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuresData.additionalFeatures.features?.map((feature: any, idx: number) => (
                <Card key={idx} className="border-0 bg-white dark:bg-gray-800 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center mx-auto mb-4">
                      <div className="text-white">
                        {getIcon(feature.icon)}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {featuresData.testimonialSection && (
        <section className="relative w-full overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                {featuresData.testimonialSection.title}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {featuresData.testimonialSection.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresData.testimonialSection.testimonials?.map((testimonial: any, idx: number) => (
                <Card key={idx} className="border-0 bg-gray-50 dark:bg-gray-800/50">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </div>
                      <div className="ml-4">
                        <div className="font-semibold text-gray-800 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 italic">
                      ``{testimonial.content}``
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Banner */}
      <section className="w-full py-5">
        <div className="container mx-auto p-4">
          <div 
            className="w-full relative overflow-hidden rounded-2xl bg-linear-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800"
            style={{ height: 'auto', minHeight: '220px' }}
          >
            {/* Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            
            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4 py-12">
              <div className="max-w-4xl mx-auto text-center">
                {/* Badge */}
                <div className="flex justify-center mb-3">
                  <Badge className="bg-white/20 text-white border-0 rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm">
                    <Sparkles className="w-3 h-3 mr-1 inline" />
                    Get Started Today
                  </Badge>
                </div>

                {/* Heading */}
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                  {featuresData.ctaTitle}
                </h2>
                
                {/* Description */}
                <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto mb-6 leading-relaxed">
                  {featuresData.ctaDescription}
                </p>

                {/* Button */}
                <button className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {featuresData.ctaButtonText}
                  <Rocket className="w-4 h-4 ml-2 inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}