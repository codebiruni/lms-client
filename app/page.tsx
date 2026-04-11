import React from 'react'
import HomePages from './home/HomePages'

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/home-page`)
  const data = await res.json()
  return (
    <div>
      <HomePages data={data.data} />
    </div>
  )
}
