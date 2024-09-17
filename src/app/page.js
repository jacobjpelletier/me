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
          Student of data&apos;s full lifecycle. From full-stack engineering to data science and analytics.
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
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Clinical Experience</h3>
                  <p className="text-white">
                    Over 10 years of diverse nursing experience across various healthcare settings, primarily as a Med/Surg/Tele float and travel nurse.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Leadership & Management</h3>
                  <p className="text-white">
                    Proven ability to work in high pressure environments. Served as a charge nurse and preceptor, demonstrating strong leadership skills in coordinating patient care, mentoring new staff, and facilitating interdisciplinary communication. Actively participated in quality improvement initiatives and policy development to enhance patient outcomes and operational efficiency.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Education & Certifications</h3>
                  <ul className="list-disc list-inside text-white">
                    <li>Bachelor of Science in Nursing, University of Connecticut, Storrs, CT.</li>
                    <li>Registered Nurse (RN) License</li>
                    <li>Basic Life Support (BLS) Certification</li>
                    <li>Advanced Cardiac Life Support (ACLS) Certification</li>
                  </ul>
                </section>
              </div>

            </div>
          )}
          {activeTab === 'technology' && (
            <div>
              <div className="space-y-6">
                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Technologies</h3>
                  <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                    {['Python', 'JavaScript', 'React', 'Node.js', 'SQL', 'PostgreSQL', 'Supabase', 'Git', 'HTML/CSS', 'Tailwind CSS', 'MUI', 'Next.js', 'Anaconda', 'Docker', 'Pandas', 'NumPy', 'Jupyter', 'Microsoft Excel'].map((tech) => (
                      <li key={tech} className="bg-gray-900 rounded-lg p-2 text-center text-purple-300 hover:text-cyan-300">
                        {tech}
                      </li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Education</h3>
                  <p className="text-white">
                    Bachelor of Science in Computer Science, Central Connecticut State University, New Britain, CT.
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Certifications</h3>
                  <p className="text-white">
                    EPIC Systems Corporation - Cogito Certified
                  </p>
                  <p className="text-white">
                    EPIC Systems Corporation - Caboodle Certified
                  </p>
                </section>

                <section>
                  <h3 className="text-xl font-semibold mb-2 text-cyan-300">Favorite Projects:</h3>
                  <ul className="space-y-6">
                    <li className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-xl font-semibold mb-2 text-purple-400">Healthcare Payscale</h4>
                      <p className="text-gray-300 mb-3">Data platform for healthcare professionals to compare salaries and make informed career decisions. Built in Next.js, Supabase, and Stripe for monetization.</p>
                      <p className="text-gray-300 mb-3"><i>Role: Full-stack engineer, product manager, and marketing.</i></p>
                      <a href="https://healthcarepayscale.com" className="inline-block bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors duration-300" target="_blank" rel="noopener noreferrer">Visit Project</a>
                    </li>
                    <li className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-xl font-semibold mb-2 text-purple-400">Safe Staffing CT</h4>
                      <p className="text-gray-300 mb-3">Email platform that allows users to find and email their state representatives to advocate for legislation.</p>
                      <p className="text-gray-300 mb-3"><i>Role: Full-stack engineer.</i></p>
                      <a href="https://www.safestaffingct.com/" className="inline-block bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors duration-300" target="_blank" rel="noopener noreferrer">Visit Project</a>
                    </li>
                    <li className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-xl font-semibold mb-2 text-purple-400">Compare Me To Dinos!</h4>
                      <p className="text-gray-300 mb-3">Udacity Intermediate JavaScript Nanodegree Project.</p>
                      <p className="text-gray-300 mb-3"><i>Role: Front-end engineer.</i></p>
                      <a href="https://htmlpreview.github.io/?https://github.com/jacobjpelletier/dino/blob/main/Javascript-master/index.html" className="inline-block bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors duration-300">Visit Project</a>
                    </li>
                    <li className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-xl font-semibold mb-2 text-purple-400">Frogger Game.</h4>
                      <p className="text-gray-300 mb-3">Udacity Intermediate JavaScript Nanodegree Project.</p>
                      <p className="text-gray-300 mb-3"><i>Role: Front-end engineer.</i></p>
                      <a href="https://htmlpreview.github.io/?https://github.com/jacobjpelletier/frogger/blob/master/index.html" className="inline-block bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors duration-300">Explore</a>
                    </li>
                    <li className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow duration-300">
                      <h4 className="text-xl font-semibold mb-2 text-purple-400">Data Analysis with Python.</h4>
                      <p className="text-gray-300 mb-3">Udacity Intro to Programming Nanodegree Project.</p>
                      <p className="text-gray-300 mb-3"><i>Role: Data Analyst.</i></p>
                      <a href="https://rawcdn.githack.com/jacobjpelletier/dataanalysis/e09a7fc1a6e46a0dee772c812562ab8de0f38896/DataAnalysis.html" className="inline-block bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 transition-colors duration-300">Explore</a>
                    </li>
                  </ul>
                </section>
              </div>
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
      <footer className="text-white py-4 mt-20">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Jacob Pelletier. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="text-cyan-300 hover:text-cyan-400 mx-2">LinkedIn</a>
            <a href="#" className="text-cyan-300 hover:text-cyan-400 mx-2">GitHub</a>
          </div>
        </div>
      </footer>

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
