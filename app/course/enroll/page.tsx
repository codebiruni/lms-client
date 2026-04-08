import React from 'react'
import CourseEnrollmentBanner from './CourseEnrollmentBanner'
import NoCourseSelected from '../details/NoCourseSelected'

export default function page() {
  return (
    <div>
        <CourseEnrollmentBanner />
        <NoCourseSelected />
    </div>
  )
}
