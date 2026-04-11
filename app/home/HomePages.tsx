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
  if (!data) return null

  return (
    <main className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30">
      
      {/* Banner Section */}
      <Banner data={data.bannerSection} />
      
      {/* Category Section */}
      <CategorySection data={data.categorySection} />
      
      {/* Course Section */}
      <CourseSection data={data.courseSection} />
      
      {/* Welcome Section */}
      <WelcomeSection data={data.welcomeSection} />
      
      {/* Feature Section */}
      <FeatureSection data={data.fetureSection} />
      
      {/* Why Choose Us Section */}
      <WhyChooseUsSection data={data.whyChooseUsSection} />
      
      {/* Instructor Section */}
      <InstructorSection data={data.instructorSection} />
      
      {/* Testimonial Section */}
      <TestimonialSection data={data.testimonialSection} />
      
    </main>
  )
}

