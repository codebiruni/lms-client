import React from 'react'
import ScholarsPages from './ScholarsPages'

export default async function page() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/scholars-page`)
  const data = await res.json()

  return (
    <div>
        <ScholarsPages data={data.data} />
    </div>
  )
}
