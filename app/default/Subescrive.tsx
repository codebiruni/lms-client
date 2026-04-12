import { Heart } from 'lucide-react'
import React from 'react'

export default function Subescrive() {
  return (
    <div className="mt-12 p-6 bg-linear-to-r from-blue-500/5 via-purple-500/5 to-orange-500/5 rounded-2xl border border-blue-200 dark:border-blue-800">
            <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-blue-500" />
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Subscribe for updates, new courses, and exclusive offers
                </p>
              </div>
              <div className="flex w-full md:w-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm w-full md:w-64"
                />
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r-lg transition text-sm">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
  )
}
