import React from 'react'
import StudentHeader from './main/StudentHeader'
import StudentFooter from './main/student-footer'

export default function Studentlayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <StudentHeader />
        { children }
        <StudentFooter />
    </div>
  )
}
