import React from 'react'
import CategorieBanner from './CategorieBanner'
import AllCategories from './AllCategories'
import ButtonCategoryBanner from './ButtonCategoryBanner'

export default async function page() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/category?limit=300`)
    const categories = await res.json()
    

  return (
    <div>
        <CategorieBanner />
        <AllCategories categories={categories.data.data} />
        <ButtonCategoryBanner />
    </div>
  )
}
