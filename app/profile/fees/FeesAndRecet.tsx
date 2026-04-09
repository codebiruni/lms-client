'use client'

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { 
  FileText, 
  Download, 
  Printer, 
  CheckCircle, 
  Clock,
  AlertCircle,
  DollarSign,
  CreditCard,
  TrendingUp,
  Wallet,
  Receipt,
  Eye,
  ChevronDown,
  ChevronUp,
} from 'lucide-react'
import { toast } from 'sonner'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

// Shadcn/ui imports
import { Button } from '@/components/ui/button'
import { Card, CardContent} from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import GETDATA from '@/app/default/functions/GetData'

interface EnrolledCourse {
  _id: string
  course: {
    _id: string
    title: string
    thumbnail: string
    price: number
    discountPrice: number
    isFree: boolean
  }
  enrollmentStatus: string
  paymentStatus: string
  totalAmount: number
  paidAmount: number
  dueAmount: number
  progress: number
  enrollmentDate: string
  createdAt: string
}

export default function FeesAndReceipt() {
  const [enrollments, setEnrollments] = useState<EnrolledCourse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEnrollment, setSelectedEnrollment] = useState<EnrolledCourse | null>(null)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [showReceiptModal, setShowReceiptModal] = useState(false)
  const receiptRef = useRef<HTMLDivElement>(null)

  const siteName = process.env.NEXT_PUBLIC_NAME || 'QURANIC BARSE ACADEMY'
  const siteAddress = process.env.NEXT_PUBLIC_ADDRESS || '123 Main Street, City, Country'
  const sitePhone = process.env.NEXT_PUBLIC_PHONE || '+1234567890'

  useEffect(() => {
    loadEnrollments()
  }, [])

  const loadEnrollments = async () => {
    setIsLoading(true)
    try {
      const response = await GETDATA('/v1/course/enrolled/courses')
      if (response.success && response.data) {
        setEnrollments(response.data)
      } else {
        toast.error(response.message || 'Failed to load enrollments')
      }
    } catch (error) {
      console.error('Error loading enrollments:', error)
      toast.error('An error occurred while loading data')
    } finally {
      setIsLoading(false)
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return (
          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        )
      case 'partial':
        return (
          <Badge className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <AlertCircle className="w-3 h-3 mr-1" />
            Partial
          </Badge>
        )
      case 'pending':
        return (
          <Badge className="bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            {status}
          </Badge>
        )
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`
  }

  const generateReceiptNumber = (enrollmentId: string) => {
    const date = new Date()
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const uniqueId = enrollmentId.slice(-6).toUpperCase()
    return `RCP/${year}/${month}/${uniqueId}`
  }

  const handlePrintReceipt = (enrollment: EnrolledCourse) => {
    setSelectedEnrollment(enrollment)
    setShowReceiptModal(true)
    setTimeout(() => {
      const printContent = document.getElementById('receipt-content')
      if (printContent) {
        const originalTitle = document.title
        document.title = `Receipt_${enrollment.course.title.replace(/\s/g, '_')}`
        const printWindow = window.open('', '_blank')
        if (printWindow) {
          printWindow.document.write(`
            <html>
              <head>
                <title>Payment Receipt</title>
                <style>
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }
                  body {
                    font-family: Arial, Helvetica, sans-serif;
                    padding: 20px;
                    background: white;
                  }
                  @media print {
                    body {
                      padding: 0;
                    }
                    .no-print {
                      display: none;
                    }
                  }
                </style>
              </head>
              <body>
                ${printContent.outerHTML}
              </body>
            </html>
          `)
          printWindow.document.close()
          printWindow.print()
          printWindow.onafterprint = () => {
            printWindow.close()
          }
        }
        document.title = originalTitle
      }
    }, 100)
  }

  const handleDownloadPDF = async (enrollment: EnrolledCourse) => {
    setSelectedEnrollment(enrollment)
    setShowReceiptModal(true)
    
    setTimeout(async () => {
      const receiptElement = document.getElementById('receipt-content')
      if (receiptElement) {
        try {
          toast.loading('Generating PDF...')
          const canvas = await html2canvas(receiptElement, {
            scale: 2,
            backgroundColor: '#ffffff',
            logging: false,
            useCORS: true
          })
          const imgData = canvas.toDataURL('image/png')
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
          })
          const imgWidth = 210
          const imgHeight = (canvas.height * imgWidth) / canvas.width
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
          pdf.save(`Receipt_${enrollment.course.title.replace(/\s/g, '_')}_${enrollment._id.slice(-6)}.pdf`)
          toast.dismiss()
          toast.success('Receipt downloaded successfully!')
        } catch (error) {
          toast.dismiss()
          console.error('Error generating PDF:', error)
          toast.error('Failed to generate PDF')
        }
      }
      setShowReceiptModal(false)
    }, 100)
  }

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

  // Calculate statistics
  const totalSpent = enrollments.reduce((sum, e) => sum + e.paidAmount, 0)
  const totalDue = enrollments.reduce((sum, e) => sum + e.dueAmount, 0)
  const completedPayments = enrollments.filter(e => e.paymentStatus === 'paid').length
  const partialPayments = enrollments.filter(e => e.paymentStatus === 'partial').length

  // Professional Receipt Component
  const ReceiptTemplate = ({ enrollment }: { enrollment: EnrolledCourse | null }) => {
    if (!enrollment) return null
    
    const receiptNumber = generateReceiptNumber(enrollment._id)
    const currentDate = formatDateTime(new Date().toISOString())
    
    return (
      <div id="receipt-content" ref={receiptRef} className="bg-white max-w-4xl mx-auto font-sans">
        {/* Receipt Container */}
        <div className="p-8">
          {/* Header with Logo and Academy Info */}
          <div className="flex justify-between items-start border-b-2 border-gray-300 pb-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 relative">
                <Image
                  src="/logo.png"
                  alt="Academy Logo"
                  width={80}
                  height={80}
                  className="object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{siteName}</h1>
                <p className="text-sm text-gray-600 mt-1">{siteAddress}</p>
                <p className="text-sm text-gray-600">Tel: {sitePhone}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-blue-600 text-white px-6 py-2 rounded-lg">
                <h2 className="text-xl font-bold">RECEIPT</h2>
              </div>
              <p className="text-sm text-gray-600 mt-2">Original Copy</p>
            </div>
          </div>

          {/* Receipt Info Grid */}
          <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg">
            <div>
              <p className="text-xs text-gray-500">Receipt Number</p>
              <p className="font-semibold text-gray-800">{receiptNumber}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Date & Time</p>
              <p className="font-semibold text-gray-800">{currentDate}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Transaction ID</p>
              <p className="font-semibold text-gray-800">{enrollment._id.slice(-12).toUpperCase()}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Payment Status</p>
              <p className={`font-semibold ${enrollment.paymentStatus === 'paid' ? 'text-green-600' : enrollment.paymentStatus === 'partial' ? 'text-yellow-600' : 'text-red-600'}`}>
                {enrollment.paymentStatus.toUpperCase()}
              </p>
            </div>
          </div>

          {/* Student & Course Info */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-4">
              Course Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Course Title</p>
                <p className="font-medium text-gray-800">{enrollment.course.title}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Enrollment Date</p>
                <p className="font-medium text-gray-800">{formatDate(enrollment.enrollmentDate)}</p>
              </div>
            </div>
          </div>

          {/* Payment Details Table */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 border-l-4 border-blue-600 pl-3 mb-4">
              Payment Details
            </h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="text-left p-3 text-sm font-semibold text-gray-700">Description</th>
                  <th className="text-right p-3 text-sm font-semibold text-gray-700">Amount (BDT)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="p-3 text-gray-700">Course Fee</td>
                  <td className="p-3 text-right text-gray-700">{formatCurrency(enrollment.totalAmount)}</td>
                </tr>
                {enrollment.course.discountPrice > 0 && enrollment.course.discountPrice < enrollment.course.price && (
                  <tr className="border-b border-gray-200 bg-green-50">
                    <td className="p-3 text-green-700">Discount Applied</td>
                    <td className="p-3 text-right text-green-700">-{formatCurrency(enrollment.course.price - enrollment.course.discountPrice)}</td>
                  </tr>
                )}
                <tr className="border-b border-gray-200">
                  <td className="p-3 font-semibold text-gray-800">Total Payable</td>
                  <td className="p-3 text-right font-semibold text-gray-800">{formatCurrency(enrollment.totalAmount)}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="p-3 text-green-700 font-semibold">Amount Paid</td>
                  <td className="p-3 text-right text-green-700 font-semibold">{formatCurrency(enrollment.paidAmount)}</td>
                </tr>
                {enrollment.dueAmount > 0 && (
                  <tr className="bg-red-50">
                    <td className="p-3 text-red-700 font-semibold">Due Amount</td>
                    <td className="p-3 text-right text-red-700 font-semibold">{formatCurrency(enrollment.dueAmount)}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Payment Summary Card */}
          <div className={`rounded-lg p-4 mb-6 ${enrollment.paymentStatus === 'paid' ? 'bg-green-50 border border-green-200' : enrollment.dueAmount > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium mb-1">Payment Summary</p>
                <p className="text-xs text-gray-600">
                  {enrollment.paymentStatus === 'paid' 
                    ? '✓ Payment completed successfully. Thank you for your enrollment!' 
                    : enrollment.dueAmount > 0 
                      ? `⚠ Pending payment: ${formatCurrency(enrollment.dueAmount)}. Please complete your payment.` 
                      : 'Payment pending'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-gray-800">{formatCurrency(enrollment.paidAmount)}</p>
                <p className="text-xs text-gray-500">Paid Amount</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t-2 border-gray-300 pt-6 mt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 mb-1">Authorized Signature</p>
                <div className="w-40 h-12 border-b-2 border-gray-400"></div>
                <p className="text-xs text-gray-500 mt-1">Authorized Signatory</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-gray-500">Thank you for choosing {siteName}</p>
                <p className="text-xs text-gray-400 mt-1">This is a computer generated receipt</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-1">Customer Support</p>
                <p className="text-xs text-gray-600">{sitePhone}</p>
                <p className="text-xs text-gray-600">{siteAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))}
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 bg-clip-text text-transparent">
              Fees & Receipts
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              Manage your payments and download receipts
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-linear-to-br from-blue-500 to-blue-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Total Spent</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                  </div>
                  <Wallet className="w-8 h-8 text-white/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-linear-to-br from-orange-500 to-orange-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Total Due</p>
                    <p className="text-2xl font-bold">{formatCurrency(totalDue)}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-white/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-linear-to-br from-green-500 to-green-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Completed</p>
                    <p className="text-2xl font-bold">{completedPayments}</p>
                  </div>
                  <CheckCircle className="w-8 h-8 text-white/50" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-linear-to-br from-yellow-500 to-yellow-600 text-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white/80 text-sm">Partial</p>
                    <p className="text-2xl font-bold">{partialPayments}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-white/50" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enrollments List */}
          {enrollments.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                No Enrollments Found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                You haven`t enrolled in any courses yet.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {enrollments.map((enrollment) => (
                <Card key={enrollment._id} className="overflow-hidden border-0 shadow-md">
                  <div className="p-4 cursor-pointer" onClick={() => toggleExpand(enrollment._id)}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-linear-to-br from-blue-500 to-indigo-600 shrink-0">
                          {enrollment.course.thumbnail ? (
                            <Image
                              src={enrollment.course.thumbnail}
                              alt={enrollment.course.title}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-6 h-6 text-white/50" />
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {enrollment.course.title}
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Enrolled: {formatDate(enrollment.enrollmentDate)}
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Total Amount</p>
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {formatCurrency(enrollment.totalAmount)}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-sm text-gray-500 dark:text-gray-400">Paid Amount</p>
                          <p className="font-semibold text-green-600 dark:text-green-400">
                            {formatCurrency(enrollment.paidAmount)}
                          </p>
                        </div>
                        
                        {enrollment.dueAmount > 0 && (
                          <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Due Amount</p>
                            <p className="font-semibold text-red-600 dark:text-red-400">
                              {formatCurrency(enrollment.dueAmount)}
                            </p>
                          </div>
                        )}
                        
                        {getPaymentStatusBadge(enrollment.paymentStatus)}
                        
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          {expandedId === enrollment._id ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedId === enrollment._id && (
                    <div className="border-t border-gray-100 dark:border-gray-800 p-4 bg-gray-50 dark:bg-gray-800/30">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Payment Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-blue-500" />
                            Payment Details
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Enrollment ID:</span>
                              <span className="text-gray-900 dark:text-white">{enrollment._id.slice(-8).toUpperCase()}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Enrollment Date:</span>
                              <span className="text-gray-900 dark:text-white">{formatDate(enrollment.enrollmentDate)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Payment Status:</span>
                              <span className="capitalize text-gray-900 dark:text-white">{enrollment.paymentStatus}</span>
                            </div>
                            <Separator className="my-2" />
                            <div className="flex justify-between text-sm font-semibold">
                              <span>Total Amount:</span>
                              <span>{formatCurrency(enrollment.totalAmount)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span>Paid Amount:</span>
                              <span className="text-green-600">{formatCurrency(enrollment.paidAmount)}</span>
                            </div>
                            {enrollment.dueAmount > 0 && (
                              <div className="flex justify-between text-sm">
                                <span>Due Amount:</span>
                                <span className="text-red-600">{formatCurrency(enrollment.dueAmount)}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Course Details */}
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                            <FileText className="w-4 h-4 text-blue-500" />
                            Course Details
                          </h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Course Name:</span>
                              <span className="text-gray-900 dark:text-white">{enrollment.course.title}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Original Price:</span>
                              <span className="text-gray-900 dark:text-white">{formatCurrency(enrollment.course.price)}</span>
                            </div>
                            {enrollment.course.discountPrice > 0 && (
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-500 dark:text-gray-400">Discounted Price:</span>
                                <span className="text-green-600">{formatCurrency(enrollment.course.discountPrice)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-500 dark:text-gray-400">Progress:</span>
                              <span className="text-gray-900 dark:text-white">{enrollment.progress}%</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => {
                            setSelectedEnrollment(enrollment)
                            setShowReceiptModal(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                          View Receipt
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handlePrintReceipt(enrollment)}
                        >
                          <Printer className="w-4 h-4" />
                          Print Receipt
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-2"
                          onClick={() => handleDownloadPDF(enrollment)}
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Receipt Modal */}
      <Dialog open={showReceiptModal} onOpenChange={setShowReceiptModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Payment Receipt</DialogTitle>
            <DialogDescription>
              {selectedEnrollment?.course.title}
            </DialogDescription>
          </DialogHeader>
          <ReceiptTemplate enrollment={selectedEnrollment} />
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowReceiptModal(false)}>
              Close
            </Button>
            <Button 
              onClick={() => selectedEnrollment && handlePrintReceipt(selectedEnrollment)}
              className="gap-2"
            >
              <Printer className="w-4 h-4" />
              Print
            </Button>
            <Button 
              onClick={() => selectedEnrollment && handleDownloadPDF(selectedEnrollment)}
              className="gap-2 bg-green-600 hover:bg-green-700"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}