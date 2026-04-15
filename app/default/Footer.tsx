import React from 'react'
import HomeFooter from './home-footer'

export default  async function Footer() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/home-page`)
  const data = await res.json()
  return (
    <HomeFooter data={data.data} />
  )
}
