import React from 'react'
import ContactPage from './ContactPage'

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/contact-page`)
  const data = await res.json()
  return (
    <div> 
      <ContactPage data={data.data} />
    </div>
  )
}
