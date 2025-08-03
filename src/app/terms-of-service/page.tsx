'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TermsOfServicePage() {
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
              Terms of <span className="text-red-500">Service</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed px-4">
              Please read these terms and conditions carefully before using our services.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Terms of Service Content */}
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

            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-300 mb-6">
              By accessing and using SmashTech services, including our website, platform, and any related services 
              (collectively, the "Services"), you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Services</h2>
            <p className="text-gray-300 mb-6">
                  SmashTech provides educational fintech learning services, including but not limited to interactive courses,
    gamified learning experiences, career development programs, and professional certification tracks. Our services are designed
    for education, skill development, and career advancement purposes.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">3. Age Requirements and Restrictions</h2>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Participants must be at least 16 years old</li>
              <li>Participants aged 16-17 must have parental consent and adult supervision</li>
              <li>Adults must supervise any minors throughout the entire experience</li>
              <li>We reserve the right to refuse service to anyone under the influence of alcohol or drugs</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">4. Safety Requirements and Conduct</h2>
            <h3 className="text-xl font-semibold text-white mb-3">4.1 Safety Gear</h3>
            <ul className="text-gray-300 mb-4 list-disc list-inside space-y-2">
              <li>All participants must wear provided safety equipment at all times</li>
              <li>Closed-toe shoes are mandatory (no sandals or open-toe footwear)</li>
              <li>Long pants are required</li>
              <li>Participants must follow all safety instructions provided by staff</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">4.2 Prohibited Conduct</h3>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Violence or aggression toward other participants or staff</li>
              <li>Bringing outside objects or weapons</li>
              <li>Consuming alcohol or illegal substances on premises</li>
              <li>Damaging facility property beyond designated items</li>
              <li>Recording or photographing without explicit permission</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">5. Booking and Payment Terms</h2>
            <h3 className="text-xl font-semibold text-white mb-3">5.1 Reservations</h3>
            <ul className="text-gray-300 mb-4 list-disc list-inside space-y-2">
              <li>Bookings are subject to availability</li>
              <li>We reserve the right to confirm or decline any booking</li>
              <li>Group bookings may require advance payment</li>
              <li>Special events and corporate bookings have separate terms</li>
            </ul>

            <h3 className="text-xl font-semibold text-white mb-3">5.2 Cancellation Policy</h3>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Cancellations made 24+ hours in advance: Full refund</li>
              <li>Cancellations made 12-24 hours in advance: 50% refund</li>
              <li>Cancellations made less than 12 hours in advance: No refund</li>
              <li>No-shows will be charged the full amount</li>
              <li>Corporate events may have different cancellation terms</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">6. Liability and Risk Assumption</h2>
            <h3 className="text-xl font-semibold text-white mb-3">6.1 Assumption of Risk</h3>
            <p className="text-gray-300 mb-4">
              By participating in SmashTech learning programs, you acknowledge and accept that these programs involve inherent 
              risks, including but not limited to physical injury, property damage, and emotional distress. You voluntarily 
              assume all such risks.
            </p>

            <h3 className="text-xl font-semibold text-white mb-3">6.2 Limitation of Liability</h3>
            <p className="text-gray-300 mb-6">
              To the maximum extent permitted by law, SmashTech, its owners, employees, and affiliates shall not be liable 
              for any direct, indirect, incidental, special, or consequential damages arising from your use of our services, 
              except in cases of gross negligence or willful misconduct.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">7. Health and Medical Considerations</h2>
            <ul className="text-gray-300 mb-6 list-disc list-inside space-y-2">
              <li>Participants with heart conditions, pregnancy, or serious medical conditions should consult a physician</li>
              <li>Inform staff of any medical conditions that may affect participation</li>
              <li>We are not responsible for pre-existing medical conditions</li>
              <li>Participants participate at their own risk regarding health and fitness</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mb-4">8. Photography and Media</h2>
            <p className="text-gray-300 mb-6">
              By participating in our activities, you consent to being photographed or recorded for promotional purposes. 
              You grant SmashTech the right to use your likeness in marketing materials unless you specifically opt out 
              in writing.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">9. Intellectual Property</h2>
            <p className="text-gray-300 mb-6">
              All content, trademarks, logos, and intellectual property associated with SmashTech are owned by us or our 
              licensors. You may not use, reproduce, or distribute any of our intellectual property without written permission.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">10. Privacy and Data Protection</h2>
            <p className="text-gray-300 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which governs how we collect, use, and 
              protect your personal information. By using our services, you consent to our privacy practices.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
            <p className="text-gray-300 mb-6">
              You agree to indemnify and hold harmless SmashTech from any claims, damages, losses, or expenses arising 
              from your use of our services, violation of these terms, or violation of any rights of another party.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">12. Force Majeure</h2>
            <p className="text-gray-300 mb-6">
              SmashTech is not liable for any failure or delay in performance due to circumstances beyond our reasonable 
              control, including natural disasters, government actions, pandemics, or other unforeseen events.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">13. Governing Law and Disputes</h2>
            <p className="text-gray-300 mb-6">
              These terms shall be governed by the laws of India. Any disputes arising from these terms or your use of 
              our services shall be resolved through binding arbitration in accordance with local arbitration rules.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">14. Modifications to Terms</h2>
            <p className="text-gray-300 mb-6">
              We reserve the right to modify these terms at any time. Changes will be posted on our website with an 
              updated effective date. Your continued use of our services after changes constitutes acceptance of the 
              new terms.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">15. Severability</h2>
            <p className="text-gray-300 mb-6">
              If any provision of these terms is found to be unenforceable, the remaining provisions will continue to 
              be valid and enforceable to the fullest extent permitted by law.
            </p>

            <h2 className="text-2xl font-bold text-white mb-4">16. Contact Information</h2>
            <p className="text-gray-300 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="text-gray-300 mb-6">
              <p><strong>Email:</strong> <a href="mailto:drupad999@gmail.com" className="text-red-400 hover:text-red-300">drupad999@gmail.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+919998944920" className="text-red-400 hover:text-red-300">+91 9998944920</a></p>
              <p><strong>Address:</strong> To be Declared</p>
            </div>

            <div className="border-t border-white/20 pt-6 mt-8">
              <p className="text-sm text-gray-400">
                These Terms of Service were last updated on December 16, 2024. By using our services, you acknowledge 
                that you have read, understood, and agree to be bound by these terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 