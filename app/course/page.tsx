import React from 'react'
import CoursesBanner from './CoursesBanner'
import AllCourses from './AllCourses'
import CourseBottomBanner from './CourseBottomBanner'

export default function page() {
  return (
    <div> 
      <AllCourses />
      <CourseBottomBanner />
    </div>
  )
}
