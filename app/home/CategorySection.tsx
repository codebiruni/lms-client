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
          <Badge
            variant="outline"
            className="mb-4 rounded-full border-emerald-200 text-emerald-800 dark:border-emerald-900 dark:text-emerald-200"
          >
            ক্যাটাগরি
          </Badge>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="text-emerald-800 dark:text-emerald-200">
              {data?.title?.highlightText || "জনপ্রিয়"}
            </span>
            <span className="text-emerald-950 dark:text-emerald-50">
              {" "}
              {data?.title?.blackText || "লার্নিং ক্যাটাগরি"}
            </span>
          </h2>

          <p className="text-emerald-900/70 dark:text-emerald-100/70">
            {data?.description || "বিভিন্ন ক্যাটাগরি থেকে আপনার পছন্দের কোর্স খুঁজে নিন"}
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
              <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-emerald-100 dark:border-emerald-900 bg-white dark:bg-emerald-950 rounded-2xl">
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                    {item.categoryId?.image ? (
                      <Image
                        src={item.categoryId.image}
                        alt={item.categoryId.name}
                        width={50}
                        height={50}
                        className="w-12 h-12 object-contain"
                      />
                    ) : (
                      <BookOpen className="w-8 h-8 text-emerald-700 dark:text-emerald-300" />
                    )}
                  </div>

                  <h3 className="font-semibold text-emerald-950 dark:text-emerald-50 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors">
                    {item.categoryId?.name || "ক্যাটাগরি"}
                  </h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <Link href="/categories" className="mt-8 inline-block">
            <Button className="hover:underline bg-emerald-700 hover:bg-emerald-800 text-white rounded-full">
              সব ক্যাটাগরি দেখুন &rarr;
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
