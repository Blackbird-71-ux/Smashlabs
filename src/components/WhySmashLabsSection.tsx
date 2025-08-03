import { FaHeart, FaUsers, FaShieldAlt, FaBriefcase } from 'react-icons/fa';

export default function WhySmashTechSection() {
  return (
    <section className="py-16 bg-black text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-white mb-12">Why SmashTech?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
            <FaHeart className="text-4xl text-red-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-red-400">Effective Stress Release</h3>
            <p className="text-gray-300">
              Interactive learning combined with gamified education provides unparalleled skill development.
            </p>
          </div>
          {/* Card 2 */}
          <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
            <FaUsers className="text-4xl text-red-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-red-400">Unique Team Building</h3>
            <p className="text-gray-300">
              Bond with colleagues through shared cathartic experiences that traditional team building can't match.
            </p>
          </div>
          {/* Card 3 */}
          <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
            <FaShieldAlt className="text-4xl text-red-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-red-400">Safe & Professional</h3>
            <p className="text-gray-300">
              All activities are conducted under professional supervision with top-tier safety equipment.
            </p>
          </div>
          {/* Card 4 */}
          <div className="bg-dark-800 p-8 rounded-lg shadow-lg">
            <FaBriefcase className="text-4xl text-red-400 mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold mb-4 text-red-400">Tailored for Corporate</h3>
            <p className="text-gray-300">
              Customized packages designed specifically for corporate teams and professional environments.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 