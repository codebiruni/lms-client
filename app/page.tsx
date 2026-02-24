import React from 'react'
import Banner from './home/banner'
import FeaturesSection from './home/features-section'
import IntroductionSection from './home/Introduction'

export default function page() {
  return (
    <div>
      <Banner />
      <IntroductionSection />
      <FeaturesSection />
    </div>
  )
}
