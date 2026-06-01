/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import Banner from './banner'
import CategorySection from './CategorySection'
import CourseSection from './CourseSection'
import WelcomeSection from './WelcomeSection'
import FeatureSection from './features-section'
import WhyChooseUsSection from './WhyChooseUsSection'
import InstructorSection from './InstructorSection'
import TestimonialSection from './TestimonialSection'

interface HomePageProps {
  data: any
}

export default function HomePages({ data }: HomePageProps) {

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      
      {/* Banner Section */}
      <Banner data={data?.bannerSection} />

      {/* Course Section */}
      <CourseSection data={data?.courseSection} />
      
      {/* Category Section */}
      {/* <CategorySection data={data?.categorySection} /> */}

      {/* Why Choose Us Section */}
      <WhyChooseUsSection data={data?.whyChooseUsSection} />
      
      {/* Testimonial Section */}
      <TestimonialSection data={data?.testimonialSection} />
      
    </main>
  )
}

