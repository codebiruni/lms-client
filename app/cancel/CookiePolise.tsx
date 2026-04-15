'use client'
import Link from 'next/link'
import { Cookie, Settings, Shield, AlertCircle, CheckCircle, XCircle, Info, ExternalLink } from 'lucide-react'

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm mb-6">
            <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Cookie Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Cookie Policy
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
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Understanding Our Cookie Usage
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  This Cookie Policy explains how Quranic Verse Academy (we, us, or our) uses cookies and similar technologies 
                  to recognize you when you visit our website at <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">www.quranic-verse.com</Link>. 
                  It explains what these technologies are and why we use them, as well as your rights to control our use of them.
                </p>
              </div>
            </div>
          </div>

          {/* What are Cookies */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">What Are Cookies?</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Cookies are small text files that are placed on your computer, smartphone, or other device when you visit a website. 
              They are widely used to make websites work more efficiently, provide a better user experience, and provide information 
              to the owners of the site.
            </p>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Cookies set by the website owner (in this case, Quranic Verse Academy) are called first-party cookies. 
              Cookies set by parties other than the website owner are called third-party cookies. Third-party cookies enable 
              third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics).
            </p>
          </div>

          {/* Types of Cookies */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Types of Cookies We Use</h2>
            </div>
            
            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Essential Cookies</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  These cookies are necessary for the website to function properly. They enable core functionality such as:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Page navigation and security</li>
                  <li>Accessing secure areas of the website</li>
                  <li>Remembering your login status</li>
                  <li>Maintaining your shopping cart</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  You cannot opt-out of these cookies as the website cannot function properly without them.
                </p>
              </div>

              {/* Performance Cookies */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Performance & Analytics Cookies</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They help us:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Count visits and traffic sources</li>
                  <li>Measure and improve site performance</li>
                  <li>Identify popular pages and content</li>
                  <li>Understand user behavior patterns</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  We use services like Google Analytics for this purpose.
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Functional Cookies</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  These cookies enable enhanced functionality and personalization, such as:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Remembering your preferences and settings</li>
                  <li>Remembering your language selection</li>
                  <li>Providing personalized content recommendations</li>
                  <li>Remembering your course progress</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  You can choose to disable these cookies, but some features may not work as intended.
                </p>
              </div>

              {/* Targeting Cookies */}
              <div className="p-6 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <XCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Targeting & Advertising Cookies</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  These cookies are used to deliver relevant advertisements and track campaign performance. They help us:
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 ml-4">
                  <li>Limit the number of times you see an ad</li>
                  <li>Measure the effectiveness of ad campaigns</li>
                  <li>Remember your visits to our website</li>
                  <li>Build a profile of your interests</li>
                </ul>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  These cookies may be set by our advertising partners (e.g., Google, Facebook).
                </p>
              </div>
            </div>
          </div>

          {/* Specific Cookies Table */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-600 dark:text-gray-300">
                <thead className="text-xs text-gray-700 dark:text-gray-200 uppercase bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Cookie Name</th>
                    <th scope="col" className="px-6 py-3">Purpose</th>
                    <th scope="col" className="px-6 py-3">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 py-4 font-mono text-xs">session_id</td>
                    <td className="px-6 py-4">Maintain user session and authentication</td>
                    <td className="px-6 py-4">Session</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 py-4 font-mono text-xs">user_preferences</td>
                    <td className="px-6 py-4">Store user preferences and settings</td>
                    <td className="px-6 py-4">1 year</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 py-4 font-mono text-xs">_ga</td>
                    <td className="px-6 py-4">Google Analytics - distinguish users</td>
                    <td className="px-6 py-4">2 years</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 py-4 font-mono text-xs">_gid</td>
                    <td className="px-6 py-4">Google Analytics - distinguish users</td>
                    <td className="px-6 py-4">24 hours</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="px-6 py-4 font-mono text-xs">_fbp</td>
                    <td className="px-6 py-4">Facebook - store and track visits</td>
                    <td className="px-6 py-4">3 months</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 font-mono text-xs">course_progress</td>
                    <td className="px-6 py-4">Track user course progress</td>
                    <td className="px-6 py-4">1 year</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* How to Control Cookies */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Settings className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">How to Control Cookies</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie preferences by:
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">1. Browser Settings</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Most web browsers allow you to control cookies through their settings. You can usually find these settings in the 
                  Options or Preferences menu of your browser. Here are links to instructions for popular browsers:
                </p>
                <div className="flex flex-wrap gap-3 mt-3">
                  <Link href="https://support.google.com/chrome/answer/95647" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1">
                    Chrome <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1">
                    Firefox <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1">
                    Safari <ExternalLink className="w-3 h-3" />
                  </Link>
                  <Link href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1">
                    Edge <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">2. Cookie Consent Tool</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  When you first visit our website, you will see a cookie banner that allows you to accept or reject non-essential cookies. 
                  You can change your preferences at any time by clicking the Cookie Settings link in the footer of our website.
                </p>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">3. Opting Out of Analytics</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  You can opt out of Google Analytics by installing the 
                  <Link href="https://tools.google.com/dlpage/gaoptout" target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline ml-1 inline-flex items-center gap-1">
                    Google Analytics Opt-out Browser Add-on <ExternalLink className="w-3 h-3" />
                  </Link>.
                </p>
              </div>
            </div>
          </div>

          {/* Third-Party Cookies */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Third-Party Cookies</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
              Some cookies are placed by third-party services that appear on our pages. We do not control these cookies, and you should 
              check the respective third-party`s website for more information about their cookies and how to manage them.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Google Analytics</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">For website analytics and performance tracking</p>
                <Link href="https://policies.google.com/privacy" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1 mt-2">
                  Privacy Policy <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Facebook Pixel</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">For advertising and campaign measurement</p>
                <Link href="https://www.facebook.com/policies/cookies/" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1 mt-2">
                  Cookie Policy <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">YouTube</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">For embedded video content</p>
                <Link href="https://policies.google.com/privacy" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1 mt-2">
                  Privacy Policy <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Stripe/Payment Processors</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">For payment processing and fraud prevention</p>
                <Link href="https://stripe.com/privacy" target="_blank" className="text-blue-600 dark:text-blue-400 text-sm hover:underline inline-flex items-center gap-1 mt-2">
                  Privacy Policy <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Updates to This Policy */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Updates to This Cookie Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in technology, legal requirements, or our practices. 
              When we make changes, we will update the Last updated date at the top of this policy. We encourage you to review this 
              policy periodically to stay informed about our use of cookies and related technologies.
            </p>
          </div>

          {/* Contact Us */}
          <div className="p-6 bg-linear-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p>📍 <strong>Address:</strong> Bangladesh</p>
              <p>📧 <strong>Email:</strong> <Link href="mailto:hafazrobiussani@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">hafazrobiussani@gmail.com</Link></p>
              <p>📞 <strong>Phone:</strong> <Link href="tel:01617688805" className="text-blue-600 dark:text-blue-400 hover:underline">01617688805</Link></p>
            </div>
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