'use client'

import React, { useState } from 'react'
import { Tabs,  TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { User, GraduationCap } from 'lucide-react'
import UserProfileUpdate from './UserProfileUpdate'
import StudentProfileUpdate from './StudentProfileUpdate'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('student')

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Manage your account and student profile settings
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Navigation - Desktop */}
        <div className="hidden lg:block w-64 shrink-0">
          <div className="sticky top-24">
            <div className="space-y-1">
              <button
                onClick={() => setActiveTab('student')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'student'
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap className="w-5 h-5" />
                Student Profile
              </button>
              
              <button
                onClick={() => setActiveTab('user')}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                  activeTab === 'user'
                    ? 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600 dark:border-blue-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                <User className="w-5 h-5" />
                User Profile
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Tabs */}
          <div className="lg:hidden mb-6">
            <Tabs defaultValue="student" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="student" className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4" />
                  <span>Student</span>
                </TabsTrigger>
                <TabsTrigger value="user" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>User</span>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Content Panels */}
          <div className="space-y-6">
            {/* Student Profile Tab */}
            {activeTab === 'student' && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      Student Profile
                    </CardTitle>
                    <CardDescription>
                      Manage your student information, academic records, and learning preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StudentProfileUpdate />
                  </CardContent>
                </Card>
              </div>
            )}

            {/* User Profile Tab */}
            {activeTab === 'user' && (
              <div className="animate-in fade-in-50 slide-in-from-bottom-5 duration-300">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      User Profile
                    </CardTitle>
                    <CardDescription>
                      Manage your account information, email, and contact details
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <UserProfileUpdate />
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}