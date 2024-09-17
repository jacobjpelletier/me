'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

const tabs = [
  { id: 'nursing', title: 'Nursing' },
  { id: 'technology', title: 'Technology' },
  { id: 'business', title: 'Business Analytics' },
];

const infinity_stones = ['collection', 'storage', 'processing', 'analysis', 'visualization', 'storytelling'];

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        {children}
        <button
          onClick={onClose}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors w-full"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState('nursing');
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(true);

  useEffect(() => {
    setIsConstructionModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center">
      <nav className="bg-black p-4 w-full text-right">
        <a 
          href="https://dev.to/jacobjpelletier"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors inline-block"
        >
          Blog
        </a>
      </nav>

      <Hero />

      <main className="p-4 max-w-3xl w-full">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text text-center">
          Jacob Pelletier
        </h1>
        <h2 className="mb-6 text-2xl white text-center italic animate-slow-pulse">
          Endeavoring to learn, create, and grow.
        </h2>
        <p className="text-cyan-100 mb-24 text-2xl text-center">
          I&apos;m on a quest to collect all the data infinity stones.
        </p>

        <div className="relative w-64 h-64 mx-auto mb-6">
          {/* Infinity Stones Floating Around */}
          {infinity_stones.map((stone, index) => (
            <div
              key={stone}
              className={`absolute stone-container`}
              style={{
                top: `${Math.sin((index / infinity_stones.length) * 2 * Math.PI) * 56 + 46}%`,
                left: `${Math.cos((index / infinity_stones.length) * 2 * Math.PI) * 48 + 34}%`,
                animationDelay: `${index * 0.5}s`,
              }}
            >
              <div className="rounded-full p-2 shadow-lg transform hover:scale-110 transition-transform">
                <span className="text-sm font-bold text-white">{stone}</span>
              </div>
            </div>
          ))}

          {/* Circle Image with Black Overlay */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full image-overlay" style={{ width: '50%', height: '50%' }}>
            <Image
              src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2018/04/infinity-gauntlet-display.jpg?q=50&fit=crop&w=1100&h=618&dpr=1.5"
              alt="Infinity Gauntlet"
              layout="fill"
              objectFit="cover"
              className="rounded-full border-4 border-purple-600 shadow-lg"
            />
          </div>
        </div>

        <style jsx>{`
          .relative {
            position: relative;
          }

          .image-overlay {
            position: relative;
            overflow: hidden;
            z-index: 1;
          }

          .image-overlay::before {
            content: '';
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.4); /* 40% black opacity */
            border-radius: 50%;
            z-index: 2;
          }

          .stone-container {
            position: absolute;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3; /* Keep stones above the image */
            animation: float 5s ease-in-out infinite;
          }

          @keyframes float {
            0% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0);
            }
          }
        `}</style>

         <p className="text-cyan-300 text-2xl mt-12 text-center mb-12 p-20">
          Student of the data&apos;s full lifecycle. From full-stack engineering to data science and analytics.
         </p>
        <p className="text-cyan-100 text-center text-xl mb-6">
              Nurse since 2013. Tech enthusiast since 2018. MBA student since 2024.
          </p>
        <div className="flex justify-center mb-4 space-x-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded transition-colors ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' 
                  : 'bg-gray-800 text-cyan-300 hover:bg-gray-700'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="mt-12">
          {activeTab === 'nursing' && (
            <div>
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-transparent bg-clip-text text-center">
                Nursing Experience
              </h2>
              <p className="text-cyan-300">
                Registered Nurse with experience in critical care and emergency departments. Skilled in patient assessment, medication administration, and care coordination.
              </p>
            </div>
          )}
          {activeTab === 'technology' && (
            <div>
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500 text-transparent bg-clip-text text-center">
                Technologies:
              </h2>
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                {['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'PostgreSQL', 'Supabase', 'Git', 'HTML/CSS', 'Tailwind CSS', 'MUI', 'Next.js', 'Anaconda', 'Docker', 'Pandas', 'NumPy', 'Jupyter', 'Microsoft Excel'].map((tech) => (
                  <li key={tech} className="bg-gray-800 rounded-lg p-2 text-center text-cyan-300">
                    {tech}
                  </li>
                ))}
              </ul>
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-pink-400 via-purple-500 to-cyan-500 text-transparent bg-clip-text text-center">
                Education:
              </h2>
              <h3 className="text-xl font-semibold mb-2 text-cyan-300">
                Education:
              </h3>
              <p>
                Bachelor of Science in Nursing, University of California, San Francisco
              </p>
            </div>
          )}
          {activeTab === 'business' && (
            <div>
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-yellow-400 via-orange-500 to-pink-500 text-transparent bg-clip-text text-center">
                Business Analytics
              </h2>
              <p className="text-cyan-300">
                Experienced in data analysis, visualization, and interpretation. Skilled in using tools like Excel, Tableau, and SQL for business intelligence and decision-making.
              </p>
            </div>
          )}
        </div>
      </main>

      <Modal isOpen={isBlogModalOpen} onClose={() => setIsBlogModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Coming Soon</h2>
        <p className="text-white">The blog feature is currently under development.</p>
      </Modal>

      <Modal isOpen={isConstructionModalOpen} onClose={() => setIsConstructionModalOpen(false)}>
        <h2 className="text-2xl font-bold mb-4 text-cyan-300">Under Construction</h2>
        <p className="text-white">
          Welcome! This site is currently under construction. We&apos;re working hard to bring you an amazing experience. Please check back soon for updates.
        </p>
      </Modal>
    </div>
  );
}
