'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-red-900 to-gray-900">
      {/* Header with Back Button */}
      <div className="bg-black/50 backdrop-blur-sm border-b border-red-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back to Home Button */}
          <div className="flex justify-start mb-6">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              ← Back to Home
            </Link>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6 leading-tight">
              Privacy <span className="text-red-500">Policy</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Your privacy is important to us. Learn how we collect, use, and protect your information.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Privacy Policy Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
        >
          <div className="prose prose-lg prose-invert max-w-none">
            <p className="text-gray-300 mb-6">
              <strong>Effective Date:</strong> December 16, 2024
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300 mb-6">
              SmashTech ("we," "our," or "us") respects your privacy and is committed to protecting your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our 
              website, use our services, or engage with us in any way.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-white mb-3">2.1 Personal Information</h3>
            <p className="text-gray-300 mb-4">We may collect the following personal information from you:</p>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Name and contact information (email address, phone number)</li>
              <li>Booking and reservation details</li>
              <li>Payment information (processed securely by third-party payment processors)</li>
              <li>Emergency contact information</li>
              <li>Health information relevant to safety requirements</li>
              <li>Company information for corporate bookings</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">2.2 Automatically Collected Information</h3>
            <p className="text-gray-300 mb-4">When you visit our website, we may automatically collect:</p>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-gray-300 mb-4">We use your information for the following purposes:</p>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Processing and managing your bookings and reservations</li>
              <li>Providing customer support and responding to inquiries</li>
              <li>Ensuring safety and security during your visit</li>
              <li>Processing payments and managing billing</li>
              <li>Sending booking confirmations and important updates</li>
              <li>Improving our services and website functionality</li>
              <li>Complying with legal requirements and safety regulations</li>
              <li>Marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">4. Information Sharing and Disclosure</h2>
            <p className="text-gray-300 mb-4">We may share your information in the following circumstances:</p>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li><strong>Service Providers:</strong> With third-party vendors who help us operate our business</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Emergency Situations:</strong> To protect health and safety</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or transfer of assets</li>
              <li><strong>With Your Consent:</strong> When you explicitly agree to sharing</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">5. Data Security</h2>
            <p className="text-gray-300 mb-6">
              We implement appropriate technical and organizational security measures to protect your personal information 
              against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over 
              the internet or electronic storage is 100% secure.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-300 mb-4">You have the following rights regarding your personal information:</p>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li><strong>Access:</strong> Request access to your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information</li>
              <li><strong>Opt-out:</strong> Unsubscribe from marketing communications</li>
              <li><strong>Data Portability:</strong> Request a copy of your data in a portable format</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-300 mb-6">
              We use cookies and similar tracking technologies to enhance your experience on our website. You can control 
              cookie preferences through your browser settings. Some features of our website may not function properly 
              if cookies are disabled.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">8. Third-Party Links</h2>
            <p className="text-gray-300 mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices 
              or content of these external sites. We encourage you to review the privacy policies of any third-party 
              sites you visit.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">9. Children's Privacy</h2>
            <p className="text-gray-300 mb-6">
              Our services are not directed to children under 13 years of age. We do not knowingly collect personal 
              information from children under 13. If you are a parent or guardian and believe your child has provided 
              us with personal information, please contact us.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
            <p className="text-gray-300 mb-6">
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate 
              safeguards are in place to protect your information in accordance with applicable data protection laws.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">11. Data Retention</h2>
            <p className="text-gray-300 mb-6">
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this 
              Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">12. Changes to This Privacy Policy</h2>
            <p className="text-gray-300 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new 
              Privacy Policy on this page and updating the "Effective Date" at the top. We encourage you to review this 
              Privacy Policy periodically.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">13. Contact Us</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="text-gray-300 mb-6">
              <p><strong>Email:</strong> <a href="mailto:drupad999@gmail.com" className="text-red-400 hover:text-red-300">drupad999@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919998944920" className="text-red-400 hover:text-red-300">+91 9998944920</a></p>
              <p><strong>Address:</strong> To be Declared</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                This Privacy Policy was last updated on December 16, 2024. By using our services, you acknowledge 
                that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 