import Image from 'next/image'
import { FaHammer, FaUsers, FaShieldAlt, FaCoffee } from 'react-icons/fa'

export default function TheExperienceSection() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-white mb-12">The SmashTech Experience</h2>
        <div className="flex flex-col lg:flex-row items-center lg:items-start gap-12">
          {/* Image Column */}
          <div className="lg:w-1/2 flex justify-center">
            <Image 
                      src="/smashtech-learning-platform.png"
        alt="SmashTech Learning Platform" 
              width={500} 
              height={500} 
              className="rounded-lg shadow-xl"
            />
          </div>

          {/* Content Column */}
          <div className="lg:w-1/2 text-left">
            <div className="space-y-8">
              {/* What to Expect */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">&#128172;</span> 
                  What to Expect
                </h3>
                <p className="text-gray-300">
                  A guided journey through our gamified learning platform, designed specifically for career advancement and skill mastery.
                </p>
              </div>

              {/* The Process */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">&#9889;</span>
                  The Process
                </h3>
                <p className="text-gray-300">
                  Professional guidance through safe, controlled stress release activities, tailored to your team's needs.
                </p>
              </div>

              {/* Team Building Elements */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">&#128101;</span>
                  Team Building Elements
                </h3>
                <p className="text-gray-300">
                  Strengthen team bonds through shared experiences and collaborative activities.
                </p>
              </div>

              {/* Therapeutic Benefits */}
              <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-300">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  {/* Placeholder Icon */}
                  <span className="mr-3 text-3xl">&#129504;</span>
                  Therapeutic Benefits
                </h3>
                <p className="text-gray-300">
                  Experience immediate skill gains and long-term career advancement.
                </p>
              </div>

              <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  <FaHammer className="mr-3" />
                  Smash & Release
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Choose your weapon and target. From electronics to furniture, unleash your stress on objects designed to break safely.
                </p>
              </div>

              <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  <FaUsers className="mr-3" />
                  Team Challenges
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Participate in collaborative projects that build professional networks and technical expertise while advancing careers.
                </p>
              </div>

              <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  <FaShieldAlt className="mr-3" />
                  Safety First
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Professional-grade safety equipment and trained supervisors ensure a secure environment for all participants.
                </p>
              </div>

              <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-semibold mb-2 text-red-400 flex items-center">
                  <FaCoffee className="mr-3" />
                  Chill Zone
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Relax and reflect in our comfortable lounge area with refreshments and comfortable seating.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 