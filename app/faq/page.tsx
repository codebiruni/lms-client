import React from 'react'
import SupportHubPage from './SupportHubPage'

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/support-hub-page`)
  const data = await res.json()
  return (
    <div> 
      <SupportHubPage data={data.data} />
    </div>
  )
}
