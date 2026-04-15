'use client'
import Link from 'next/link'
import { 
  FileText, 
  Shield, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Info, 
  ExternalLink, 
  Users, 
  CreditCard, 
  Lock, 
  Globe,
  BookOpen,
  MessageSquare,
  Clock,
  Award
} from 'lucide-react'

export default function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm mb-6">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Terms of Service</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 md:py-16 bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Introduction */}
          <div className="mb-10 p-6 bg-blue-50 dark:bg-blue-950/20 rounded-2xl border border-blue-100 dark:border-blue-900">
            <div className="flex items-start gap-4">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Welcome to Quranic Verse Academy
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  These Terms of Service govern your use of our website, courses, and services. By accessing or using our platform, 
                  you agree to be bound by these terms. Please read them carefully before using our services.
                </p>
              </div>
            </div>
          </div>

          {/* Agreement to Terms */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing or using Quranic Verse Academy`s website, mobile application, or any of our services, you acknowledge 
              that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree with any part 
              of these terms, you may not access or use our services.
            </p>
          </div>

          {/* Eligibility */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. Eligibility</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              To use our services, you must:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
              <li>Be at least 13 years of age (or the age of digital consent in your country)</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Provide accurate and complete registration information</li>
              <li>Not be located in a country subject to U.S. trade sanctions</li>
              <li>Not have been previously suspended or removed from our services</li>
            </ul>
            <p className="text-gray-600 dark:text-gray-300 mt-4 leading-relaxed">
              If you are using our services on behalf of an organization, you represent that you have the authority to bind that 
              organization to these terms.
            </p>
          </div>

          {/* User Accounts */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. User Accounts</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                To access certain features of our platform, you may need to create an account. You are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
                <li>Providing accurate and up-to-date information</li>
              </ul>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Important:</strong> You are solely responsible for all activities that occur under your account. 
                    We recommend using a strong, unique password and enabling two-factor authentication if available.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Courses and Content */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <BookOpen className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Courses and Content</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">4.1 Course Access</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Upon successful enrollment or purchase, you will be granted access to the course materials for the specified duration. 
                Access may be limited to a certain period (e.g., lifetime access, monthly subscription, or specific course duration).
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">4.2 License to Use</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We grant you a non-exclusive, non-transferable, revocable license to access and use the course materials for your 
                personal, non-commercial educational purposes. You may not:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Share your account credentials with others</li>
                <li>Download, copy, or distribute course materials without permission</li>
                <li>Sublicense, resell, or rent access to courses</li>
                <li>Use course materials for commercial training purposes</li>
                <li>Reverse engineer or modify our platform or content</li>
              </ul>
            </div>
          </div>

          {/* Payments and Refunds */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CreditCard className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Payments and Refunds</h2>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">5.1 Pricing</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                All prices are displayed in your local currency and include applicable taxes unless otherwise stated. We reserve the 
                right to change our prices at any time, but such changes will not affect existing enrollments.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">5.2 Payment Methods</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We accept various payment methods including credit/debit cards, digital wallets, and bank transfers. By providing 
                payment information, you authorize us to charge the applicable fees to your chosen payment method.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mt-4">5.3 Refund Policy</h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                We offer a 14-day money-back guarantee for most courses. To request a refund, contact us within 14 days of purchase. 
                Refunds are not available for:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                <li>Courses that have been completed more than 50%</li>
                <li>Subscription fees after the first billing cycle</li>
                <li>One-time consultation services</li>
                <li>Downloadable digital products</li>
              </ul>
              
              <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800 mt-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Our Guarantee:</strong> If you`re not satisfied with your course within the first 14 days, we`ll refund your 
                    payment in full - no questions asked.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Conduct */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. User Conduct</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              You agree to use our platform responsibly and not to:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Prohibited Actions</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside ml-2">
                  <li>Harass, abuse, or harm others</li>
                  <li>Post spam or unauthorized advertising</li>
                  <li>Share inappropriate or offensive content</li>
                  <li>Impersonate others or provide false information</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-4 h-4 text-red-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Technical Misuse</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside ml-2">
                  <li>Attempt to hack or breach security</li>
                  <li>Upload malware or viruses</li>
                  <li>Scrape or mine data without permission</li>
                  <li>Interfere with platform operations</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Intellectual Property */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Award className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">7. Intellectual Property</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              All content on our platform, including but not limited to text, graphics, logos, images, course materials, videos, 
              and software, is the property of Quranic Verse Academy or our content providers and is protected by copyright, 
              trademark, and other intellectual property laws.
            </p>
            <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Note:</strong> Unauthorized use, reproduction, or distribution of our intellectual property may result in 
                legal action and immediate termination of your account.
              </p>
            </div>
          </div>

          {/* Termination */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <XCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">8. Termination</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              We reserve the right to suspend or terminate your account and access to our services at our sole discretion, without 
              notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, 
              or for any other reason.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Upon termination, your right to use our services will immediately cease, and we may delete your account and associated 
              data. Any outstanding payments will become immediately due.
            </p>
          </div>

          {/* Disclaimer of Warranties */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">9. Disclaimer of Warranties</h2>
            </div>
            <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                Our services are provided as is and as available without any warranties, express or implied. We do not warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-3 ml-4">
                <li>The service will be uninterrupted, secure, or error-free</li>
                <li>Results obtained from using the service will be accurate or reliable</li>
                <li>Any errors in the service will be corrected</li>
                <li>The service will meet your specific requirements</li>
              </ul>
            </div>
          </div>

          {/* Limitation of Liability */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">10. Limitation of Liability</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              To the maximum extent permitted by law, Quranic Verse Academy and its affiliates, instructors, and partners shall not 
              be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, 
              loss of profits, data, use, goodwill, or other intangible losses, resulting from:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-3 ml-4">
              <li>Your use or inability to use our services</li>
              <li>Any conduct or content of any third party on our platform</li>
              <li>Unauthorized access, use, or alteration of your content</li>
              <li>Any other matter relating to our services</li>
            </ul>
          </div>

          {/* Governing Law */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">11. Governing Law</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of Bangladesh, without regard to its conflict 
              of law provisions. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts 
              located in Bangladesh.
            </p>
          </div>

          {/* Changes to Terms */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Changes to Terms</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify these Terms of Service at any time. We will notify you of any material changes by posting 
              the new terms on this page and updating the Last updated date. Your continued use of our services after any such changes 
              constitutes your acceptance of the new terms.
            </p>
          </div>

          

          {/* Back to Top */}
          <div className="mt-10 text-center">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
            >
              ↑ Back to Top
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}