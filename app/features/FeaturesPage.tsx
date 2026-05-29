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
    baseText: "কুরআনের আলোয় আধুনিক শিক্ষা",

    bannerText: {
      blackText: "দ্বীনি ও আধুনিক শিক্ষার",
      colorText: "পূর্ণাঙ্গ অনলাইন প্ল্যাটফর্ম"
    },

    shortDescription:
      "শিশুদের কুরআন শিক্ষা, আরবি ভাষা, ফোনিক্স ইংরেজি ও আবাকাস গণিত শেখাতে নিরাপদ, আধুনিক ও ইসলামিক পরিবেশে গড়ে উঠুক আগামী প্রজন্ম।",

    overviewTitle: "একটি পূর্ণাঙ্গ ইসলামিক লার্নিং ইকোসিস্টেম",

    overviewDescription:
      "আমাদের প্ল্যাটফর্মে রয়েছে কুরআন শিক্ষা, আধুনিক স্কিল ডেভেলপমেন্ট, লাইভ ক্লাস, প্রগ্রেস ট্র্যাকিং এবং অভিভাবকদের জন্য স্মার্ট মনিটরিং সিস্টেম।",

    platformFeatures: [
      {
        title: "শিক্ষার্থীদের জন্য",
        description: "শিশুদের সুন্দর ও কার্যকর শেখার অভিজ্ঞতার জন্য",

        features: [
          {
            icon: "TrendingUp",
            title: "ব্যক্তিগত শেখার পরিকল্পনা",
            description:
              "প্রত্যেক শিক্ষার্থীর দক্ষতা অনুযায়ী সাজানো স্মার্ট লার্নিং সিস্টেম"
          },

          {
            icon: "Brain",
            title: "ইন্টারেক্টিভ ক্লাস কনটেন্ট",
            description:
              "ভিডিও, কুইজ এবং প্র্যাকটিক্যাল এক্টিভিটির মাধ্যমে আনন্দদায়ক শিক্ষা"
          },

          {
            icon: "BarChart",
            title: "প্রগ্রেস ট্র্যাকিং",
            description:
              "শিক্ষার্থীর অগ্রগতি সহজেই পর্যবেক্ষণ ও বিশ্লেষণ করুন"
          }
        ]
      },

      {
        title: "শিক্ষকদের জন্য",
        description: "সহজে ক্লাস পরিচালনা ও কনটেন্ট ম্যানেজমেন্ট",

        features: [
          {
            icon: "Code2",
            title: "কোর্স ম্যানেজমেন্ট",
            description:
              "সহজে কোর্স তৈরি ও সাজানোর আধুনিক সিস্টেম"
          },

          {
            icon: "ClipboardCheck",
            title: "অ্যাসাইনমেন্ট ও মূল্যায়ন",
            description:
              "পরীক্ষা, কুইজ ও রেজাল্ট ম্যানেজমেন্টের স্মার্ট ব্যবস্থা"
          },

          {
            icon: "Briefcase",
            title: "লার্নিং রিসোর্স",
            description:
              "স্টাডি ম্যাটেরিয়াল ও ক্লাস ফাইল সহজে শেয়ার করুন"
          }
        ]
      },

      {
        title: "অভিভাবকদের জন্য",
        description: "সন্তানের শেখার অগ্রগতি সবসময় নজরে রাখুন",

        features: [
          {
            icon: "MessageSquare",
            title: "নোটিশ ও যোগাযোগ",
            description:
              "শিক্ষক ও প্রতিষ্ঠানের সাথে সহজ যোগাযোগ ব্যবস্থা"
          },

          {
            icon: "Users",
            title: "অগ্রগতি রিপোর্ট",
            description:
              "সন্তানের পারফরম্যান্স ও ক্লাস রিপোর্ট রিয়েল টাইমে দেখুন"
          },

          {
            icon: "FileCheck",
            title: "নিরাপদ শিক্ষা পরিবেশ",
            description:
              "বিশ্বস্ত ও সুরক্ষিত ইসলামিক লার্নিং প্ল্যাটফর্ম"
          }
        ]
      }

    ],

    statsSection: {
      title: "হাজারো পরিবারের বিশ্বস্ত প্ল্যাটফর্ম",

      description:
        "বাংলাদেশজুড়ে শিক্ষার্থী ও অভিভাবকদের আস্থার জায়গা",

      stats: [
        {
          value: "১০,০০০+",
          label: "সক্রিয় শিক্ষার্থী"
        },

        {
          value: "৫০০+",
          label: "অভিজ্ঞ শিক্ষক"
        },

        {
          value: "১,০০০+",
          label: "লাইভ ক্লাস"
        },

        {
          value: "৯৮%",
          label: "অভিভাবক সন্তুষ্টি"
        }
      ]

    },

    additionalFeatures: {
      title: "কেন আমাদের প্ল্যাটফর্ম বেছে নিবেন",

      description:
        "আধুনিক প্রযুক্তি ও ইসলামিক মূল্যবোধের সমন্বয়ে তৈরি",

      features: [
        {
          icon: "Rocket",
          title: "দ্রুত ও নির্ভরযোগ্য",
          description:
            "স্মুথ ও দ্রুতগতির অনলাইন ক্লাস অভিজ্ঞতা"
        },

        {
          icon: "Target",
          title: "লক্ষ্যভিত্তিক শিক্ষা",
          description:
            "শিক্ষার্থীর উন্নতির জন্য পরিকল্পিত কারিকুলাম"
        },

        {
          icon: "Award",
          title: "সার্টিফিকেট সুবিধা",
          description:
            "কোর্স শেষে ডিজিটাল সার্টিফিকেট প্রদান"
        },

        {
          icon: "Zap",
          title: "২৪/৭ সাপোর্ট",
          description:
            "যেকোনো সময় সহায়তার জন্য আমাদের টিম প্রস্তুত"
        }
      ]

    },

    testimonialSection: {
      title: "অভিভাবকদের মতামত",

      description:
        "আমাদের শিক্ষা ব্যবস্থার বাস্তব অভিজ্ঞতা",

      testimonials: [
        {
          name: "সুমাইয়া রহমান",
          role: "অভিভাবক",

          content:
            "আমার সন্তান খুব আগ্রহ নিয়ে ক্লাস করে। ইসলামিক পরিবেশে আধুনিক শিক্ষার এমন সুন্দর সমন্বয় সত্যিই প্রশংসনীয়।"
        },

        {
          name: "মোঃ রাকিব হাসান",
          role: "অভিভাবক",

          content:
            "লাইভ ক্লাস, প্রগ্রেস রিপোর্ট এবং শিক্ষকদের আন্তরিকতা আমাদের অনেক ভালো লেগেছে।"
        },

        {
          name: "ফারহানা ইসলাম",
          role: "অভিভাবক",

          content:
            "শিশুদের জন্য নিরাপদ ও সুন্দর একটি অনলাইন শিক্ষা প্ল্যাটফর্ম।"
        }
      ]
    }
  };
  const featuresData = {
    ...defaultData,
    ...data
  };
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
    };

    return icons[iconName] || (
      <CheckCircle2 className="w-6 h-6" />
    );
  };

  return (
    <section>
      {/* Platform Features Section */}
      <section className="relative w-full overflow-hidden bg-linear-to-b from-emerald-50 via-white to-emerald-50 dark:from-[#071E1A] dark:via-[#071E1A]/90 dark:to-[#071E1A] transition-colors duration-300 py-16">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#12372A] dark:text-white mb-4">
              আমাদের বিশেষ সুবিধাসমূহ
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              শিশুদের দ্বীনি ও আধুনিক শিক্ষার জন্য প্রয়োজনীয় সকল ফিচার এক প্ল্যাটফর্মে
            </p>
          </div>

          <div className="space-y-16">
            {featuresData.platformFeatures?.map((feature: any, idx: number) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#0D2A24] rounded-3xl p-8 shadow-lg border border-emerald-100 dark:border-emerald-900/30"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[#12372A] dark:text-white mb-2">
                    {feature.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {feature.features?.map((item: any, itemIdx: number) => (
                    <Card
                      key={itemIdx}
                      className="border-0 bg-[#F8FAF8] dark:bg-[#071E1A] hover:shadow-2xl transition-all duration-300 rounded-2xl"
                    >
                      <CardContent className="p-6 text-center">
                        <div className="w-14 h-14 rounded-full bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                          <div className="text-white">{getIcon(item.icon)}</div>
                        </div>

                        <h4 className="text-lg font-semibold text-[#12372A] dark:text-white mb-2">
                          {item.title}
                        </h4>

                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
        <section className="relative w-full overflow-hidden bg-linear-to-b from-white to-emerald-50 dark:from-[#071E1A] dark:to-[#071E1A]/80 transition-colors duration-300 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#12372A] dark:text-white mb-4">
                {featuresData.statsSection.title}
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                {featuresData.statsSection.description}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {featuresData.statsSection.stats?.map((stat: any, idx: number) => (
                <div key={idx} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-emerald-700 to-teal-600 bg-clip-text text-transparent mb-2">
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
        <section className="relative w-full overflow-hidden bg-linear-to-b from-emerald-50 via-white to-emerald-50 dark:from-[#071E1A]/90 dark:via-[#071E1A] dark:to-[#071E1A]/90 transition-colors duration-300 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#12372A] dark:text-white mb-4">
                {featuresData.additionalFeatures.title}
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                {featuresData.additionalFeatures.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuresData.additionalFeatures.features?.map((feature: any, idx: number) => (
                <Card
                  key={idx}
                  className="border-0 bg-white dark:bg-[#0D2A24] hover:shadow-2xl transition-all duration-300 rounded-2xl"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <div className="text-white">{getIcon(feature.icon)}</div>
                    </div>

                    <h3 className="text-lg font-semibold text-[#12372A] dark:text-white mb-2">
                      {feature.title}
                    </h3>

                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
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
        <section className="relative w-full overflow-hidden bg-linear-to-b from-white to-emerald-50 dark:from-[#071E1A] dark:to-[#071E1A]/80 transition-colors duration-300 py-16">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-[#12372A] dark:text-white mb-4">
                অভিভাবকদের মতামত
              </h2>

              <p className="text-lg text-gray-600 dark:text-gray-300">
                আমাদের শিক্ষাব্যবস্থা নিয়ে অভিভাবকদের অভিজ্ঞতা
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuresData.testimonialSection.testimonials?.map((testimonial: any, idx: number) => (
                <Card
                  key={idx}
                  className="border-0 bg-[#F8FAF8] dark:bg-[#0D2A24] rounded-2xl"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {testimonial.name.charAt(0)}
                      </div>

                      <div className="ml-4">
                        <div className="font-semibold text-[#12372A] dark:text-white">
                          {testimonial.name}
                        </div>

                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 italic leading-relaxed">
                      “{testimonial.content}”
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
            className="w-full relative overflow-hidden rounded-3xl bg-linear-to-r from-emerald-700 to-teal-700 dark:from-[#0D2A24] dark:to-[#12372A]"
            style={{ height: 'auto', minHeight: '220px' }}
          >
            {/* Background Blobs */}
            <div className="absolute top-0 -left-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl opacity-70"></div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center px-4 py-12">
              <div className="text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  আজই আপনার সন্তানকে যুক্ত করুন
                </h2>

                <p className="text-emerald-50 text-lg max-w-2xl mx-auto leading-relaxed">
                  কুরআনের আলোয় আধুনিক শিক্ষার নিরাপদ ও বিশ্বস্ত প্ল্যাটফর্মে শেখার যাত্রা শুরু হোক আজই।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
  )
}
