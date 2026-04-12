import React from 'react'
import FeaturesPage from './FeaturesPage'

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/featres-page`)
  const data = await res.json()
  return (
    <div> 
      <FeaturesPage data={data.data} />
    </div>
  )
}
