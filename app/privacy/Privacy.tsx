'use client'
import React from 'react'
import Link from 'next/link'
import { 
  Shield, 
  Lock, 
  Eye, 
  Database, 
  Mail, 
  Phone, 
  MapPin, 
  Cookie, 
  Trash2, 
  Share2, 
  AlertCircle, 
  CheckCircle, 
  Info,
  ExternalLink,
  UserCheck,
  Server,
  Clock,
  Globe
} from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-linear-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-950 dark:to-blue-950/30 py-16 md:py-24">
        <div className="absolute inset-0 bg-grid-slate-200 dark:bg-grid-slate-800 opacity-20" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white dark:bg-gray-800 rounded-full px-4 py-2 shadow-sm mb-6">
            <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Privacy Policy</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Privacy Policy
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
                  Your Privacy Matters
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  At Quranic Verse Academy, we are committed to protecting your privacy and ensuring the security of your personal information. 
                  This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website, mobile 
                  application, and services.
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Database className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">1. Information We Collect</h2>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1.1 Personal Information You Provide</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">We may collect personal information that you voluntarily provide to us when you:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Create an account or register for our services</li>
                  <li>Enroll in courses or purchase products</li>
                  <li>Subscribe to our newsletter</li>
                  <li>Participate in discussions or forums</li>
                  <li>Contact customer support</li>
                  <li>Complete surveys or provide feedback</li>
                </ul>
                <p className="text-gray-600 dark:text-gray-300 mt-3">This information may include:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Name, email address, phone number, and mailing address</li>
                  <li>Payment information (processed securely by third-party payment processors)</li>
                  <li>Educational background and learning preferences</li>
                  <li>Profile information and profile picture</li>
                  <li>Communication preferences</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1.2 Information Automatically Collected</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-3">When you use our platform, we automatically collect certain information:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4">
                  <li>Device information (IP address, browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent, courses accessed)</li>
                  <li>Location data (approximate location based on IP address)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Course progress and completion data</li>
                </ul>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">1.3 Information from Third Parties</h3>
                <p className="text-gray-600 dark:text-gray-300">We may receive information about you from third parties, including:</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 ml-4 mt-3">
                  <li>Social media platforms (when you log in using social media accounts)</li>
                  <li>Payment processors (to verify transactions)</li>
                  <li>Marketing partners and analytics providers</li>
                  <li>Educational institutions (if you enroll through an organization)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">2. How We Use Your Information</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">We use your information for the following purposes:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Core Operations</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside ml-2">
                  <li>Create and manage your account</li>
                  <li>Provide access to courses and content</li>
                  <li>Process payments and transactions</li>
                  <li>Track course progress and issue certificates</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Communication</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside ml-2">
                  <li>Send important updates and notifications</li>
                  <li>Respond to customer support inquiries</li>
                  <li>Share course recommendations and offers</li>
                  <li>Send newsletters and marketing communications</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Improvement & Analytics</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside ml-2">
                  <li>Analyze usage patterns and improve our platform</li>
                  <li>Develop new features and content</li>
                  <li>Conduct research and surveys</li>
                  <li>Personalize user experience</li>
                </ul>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Legal & Security</h3>
                </div>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-disc list-inside ml-2">
                  <li>Detect and prevent fraud</li>
                  <li>Enforce our terms of service</li>
                  <li>Comply with legal obligations</li>
                  <li>Protect our rights and user`s safety</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Legal Basis for Processing */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">3. Legal Basis for Processing (GDPR)</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              If you are located in the European Economic Area (EEA), we process your personal information based on the following legal grounds:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-3 ml-4">
              <li><strong>Contract Performance:</strong> To provide our services and fulfill our obligations to you</li>
              <li><strong>Legitimate Interests:</strong> To improve our services, prevent fraud, and ensure security</li>
              <li><strong>Consent:</strong> For marketing communications and certain data collection</li>
              <li><strong>Legal Obligations:</strong> To comply with applicable laws and regulations</li>
            </ul>
          </div>

          {/* Sharing Your Information */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Share2 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">4. Sharing Your Information</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">We may share your information with:</p>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Service Providers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Payment processors, hosting providers, email services, analytics providers, and customer support tools</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Educational Partners</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">If you enroll through an organization, we may share your progress and completion data</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Legal Authorities</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">When required by law or to protect our legal rights</p>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white">Business Transfers</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">In connection with a merger, acquisition, or sale of assets</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Important:</strong> We do not sell your personal information to third parties. Any sharing of data is done to provide and improve our services.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Lock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">5. Data Security</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized 
              access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-3 ml-4">
              <li>SSL/TLS encryption for data transmission</li>
              <li>Secure data storage with encryption at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <strong>Our Commitment:</strong> While we strive to protect your information, no method of transmission over the internet 
                  is 100% secure. We encourage you to use strong passwords and enable two-factor authentication when available.
                </p>
              </div>
            </div>
          </div>

          {/* Data Retention */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">6. Data Retention</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law. Specifically:
            </p>
            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2 mt-3 ml-4">
              <li>Account information: Until you delete your account or it becomes inactive</li>
              <li>Course progress: For the duration of your access to the course</li>
              <li>Payment records: For as long as required by tax and accounting laws</li>
              <li>Communication history: For up to 3 years after your last interaction</li>
              <li>Analytics data: Aggregated and anonymized after 2 years</li>
            </ul>
          </div>

          {/* Your Rights */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Shield className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">7. Your Rights and Choices</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Depending on your location, you may have the following rights regarding your personal information:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Access & Portability</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Request a copy of your personal information and receive it in a structured format</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Rectification</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Correct inaccurate or incomplete information</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Erasure (Right to be Forgotten)</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Request deletion of your personal information under certain circumstances</p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Restriction & Objection</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Limit or object to certain processing activities</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                To exercise any of these rights, please contact us at <Link href="mailto:hafazrobiussani@gmail.com" className="text-blue-600 dark:text-blue-400 hover:underline">hafazrobiussani@gmail.com</Link>. 
                We will respond to your request within 30 days.
              </p>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Cookie className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">8. Cookies and Tracking Technologies</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to collect and store information about your usage of our platform. 
              You can control cookies through your browser settings and our cookie consent tool. For more information, please see our 
              <Link href="/cookies" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">Cookie Policy</Link>.
            </p>
          </div>

          {/* Children's Privacy */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <UserCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">9. Children`s Privacy</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our services are not directed to children under 13 years of age (or the age of digital consent in your country). 
              We do not knowingly collect personal information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>
          </div>

          {/* International Data Transfers */}
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">10. International Data Transfers</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards 
              are in place for such transfers, including standard contractual clauses approved by the European Commission.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">11. Third-Party Links</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Our platform may contain links to third-party websites or services. We are not responsible for the privacy practices 
              or content of these third parties. We encourage you to read their privacy policies before providing any information.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will 
              notify you of any material changes by posting the new policy on this page and updating the Last updated date. Your 
              continued use of our services after such changes constitutes your acceptance of the updated policy.
            </p>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-2xl">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="space-y-3 text-gray-600 dark:text-gray-300">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span><strong>Address:</strong> Bangladesh</span>
              </div>
              
            </div>
            
            {/* Data Protection Officer */}
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Data Protection Officer</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                For privacy-specific concerns, you may also contact our Data Protection Officer at <Link href="mailto:dpo@quranic-verse.com" className="text-blue-600 dark:text-blue-400 hover:underline">dpo@quranic-verse.com</Link>
              </p>
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