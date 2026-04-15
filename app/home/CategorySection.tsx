/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { BookOpen } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function CategorySection({ data }: any) {

  if (!data) {
    return null
  }
  const categories = data?.categoryList || []
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 rounded-full border-blue-200 text-blue-600 dark:border-blue-800 dark:text-blue-400">
            Categories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-purple-600">
              {data?.title?.highlightText || "Popular"}
            </span>
            <span className="text-gray-800 dark:text-white"> {data?.title?.blackText || "Learning Categories"}</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {data?.description || "Browse through our diverse range of categories and find the perfect course"}
          </p>
        </div>
        
        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {categories.map((item: any, idx: number) => (
            <Link 
              key={item._id || idx}
              href={`/categories/${item.categoryId?._id}`}
              className="group"
            >
              <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-linear-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-900">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center shadow-md group-hover:shadow-xl transition-all">
                    {item.categoryId?.image ? (
                      <Image 
                        src={item.categoryId.image} 
                        alt={item.categoryId.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-blue-600" />
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">
                    {item.categoryId?.name || "Category"}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center">
          <Link href="/categories" className="mt-8  inline-block ">
          <Button className='hover:underline bg-blue-600 rounded-full'>View All Categories &rarr;</Button>
        </Link>
        </div>
      </div>
    </section>
  )
}
