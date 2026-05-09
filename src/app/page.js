'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const Hero = dynamic(() => import('../components/Hero'), { ssr: false });

const tabs = [
  { id: 'nursing', title: 'Clinical Practice' },
  { id: 'technology', title: 'Technical Architecture' },
  { id: 'business', title: 'Operational Analytics' },
];

const infinity_stones = ['Analyst', 'Database', 'General AI', 'Clinician', 'Operations', 'Engineering'];

export default function Home() {
  const [activeTab, setActiveTab] = useState('nursing');
  const [isConstructionModalOpen, setIsConstructionModalOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

  const techtags = ["Python", "Javascript", "Front-end", "Back-end", "Data Analysis", "Postgres", "MariaDB", "Cloud", "AI"];

  const techprojects = [
    {
      name: 'Healthcare Payscale',
      description: 'SaaS data dashboard for healthcare professionals to compare salaries and make informed career decisions. Built in Next.js, Supabase, and Stripe for monetization.',
      role: 'Full-stack engineer, product manager, and marketing.',
      link: 'https://healthcarepayscale.com',
      tags: ['Javascript', 'Front-end', 'Back-end', 'Postgres', 'Cloud', 'Data Analysis'],
    },
    {
      name: 'Compare Me To Dinos!',
      description: 'Udacity Intermediate JavaScript Nanodegree Project. Written in functional JavaScript.',
      role: 'Front-end engineer.',
      link: 'https://htmlpreview.github.io/?https://github.com/jacobjpelletier/dino/blob/main/Javascript-master/index.html',
      tags: ['Javascript', 'Front-end'],
    },
    {
      name: 'Frogger Game',
      description: 'Udacity Intermediate JavaScript Nanodegree Project.',
      role: 'Front-end engineer.',
      link: 'https://htmlpreview.github.io/?https://github.com/jacobjpelletier/frogger/blob/master/index.html',
      tags: ['Javascript', 'Front-end'],
    },
    {
      name: 'Data Analysis with Python',
      description: 'Udacity Intro to Programming Nanodegree Project.',
      role: 'Data Analyst.',
      link: 'https://rawcdn.githack.com/jacobjpelletier/dataanalysis/e09a7fc1a6e46a0dee772c812562ab8de0f38896/DataAnalysis.html',
      tags: ['Python', 'Data Analysis'],
    },
    {
      name: 'Data Management and Business Process Modeling',
      description: 'A project which models a business need, creates a database in EC2 and DDL, populates database, and writes reports from database.',
      role: 'Data modeler, cloud set up, report writer',
      link: 'https://github.com/jacobjpelletier/DatabaseManagement',
      tags: ['Cloud', 'Back-end', 'MariaDB'],
    },
  ];

  const mbatags = ["Operations", "Finance"];

  const mbaprojects = [
    {
      name: 'Littlefield Simulation',
      description: "Managing a digital satellite system receiver assembly line. Optimized cash balance through mathematical modeling and resource allocation.",
      role: 'Team Lead, Math modeler, and Data analyst',
      link: 'https://github.com/jacobjpelletier/Littlefield',
      tags: ['Operations'],
    },
    {
      name: 'LLBean Case Study',
      description: "Analysis of item forecasting and inventory management challenges using Harvard Business School frameworks.",
      role: 'Math modeler, and Data analyst',
      link: 'https://github.com/jacobjpelletier/LLBean',
      tags: ['Operations'],
    },
  ];

  function handleTagClick(tag) {
    setSelectedTags((prev) => 
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  const filteredTechProjects = techprojects.filter((p) => 
    selectedTags.length === 0 || selectedTags.every((t) => p.tags.includes(t))
  );

  const filteredMbaProjects = mbaprojects.filter((p) => 
    selectedTags.length === 0 || selectedTags.every((t) => p.tags.includes(t))
  );

  useEffect(() => {
    setIsConstructionModalOpen(true);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setSelectedTags([]);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="p-6 flex justify-end items-center max-w-7xl mx-auto">
        <a 
          href="https://dev.to/jacobjpelletier"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-all text-sm font-medium"
        >
          Blog
        </a>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pb-20">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 
                         bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 
                         text-transparent bg-clip-text drop-shadow-sm">
            Jacob Pelletier
          </h1>
          <h2 className="text-xl text-slate-400 font-light tracking-[0.2em] uppercase">
            Clinician // Data Analyst // Strategist
          </h2>
        </div>

        {/* Hero Orbital Visual */}
        <div className="relative w-80 h-80 mx-auto mb-20">
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.2" className="text-cyan-400" />
          </svg>
          
          {infinity_stones.map((stone, index) => (
            <div
              key={stone}
              className="absolute z-20 group cursor-default"
              style={{
                top: `${50 + 55 * Math.sin((index / infinity_stones.length) * 2 * Math.PI)}%`,
                left: `${50 + 55 * Math.cos((index / infinity_stones.length) * 2 * Math.PI)}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              {/* Subtle connector line toward the center */}
              <div className="absolute top-1/2 left-1/2 w-8 h-[1px] bg-cyan-500/20 origin-left -translate-x-full" 
                  style={{ transform: `rotate(${index * 60}deg) translateX(-100%)` }} />
              
              <div className="text-[14px] font-mono font-bold tracking-[0.3em] uppercase text-slate-400 group-hover:text-cyan-400 transition-colors">
                {stone}
              </div>
            </div>
          ))}

          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40">
            <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-slate-800 shadow-2xl">
              <Image
                src="/assets/media/network.jpg"
                alt="Systems Convergence"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700 opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
            </div>
          </div>
        </div>

        {/* Thesis Statement */}
        <div className="max-w-4xl mx-auto mb-20 p-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent">
          <div className="bg-black/40 backdrop-blur-sm py-12 px-6">
            <p className="text-xl md:text-2xl text-center leading-relaxed font-light text-slate-300">
              Exploring the <span className="text-cyan-400 font-medium">convergence</span> of data, technology, and clinical operations.
            </p>
          </div>
        </div>

        {/* Professional Timeline Summary */}
        <div className="flex flex-col md:flex-row justify-center gap-8 mb-16 text-sm text-slate-500 uppercase tracking-widest">
            <span>RN Since 2013</span>
            <span className="hidden md:block opacity-30">|</span>
            <span>CS Since 2018</span>
            <span className="hidden md:block opacity-30">|</span>
            <span>MBA Candidate</span>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 p-1 bg-slate-900/50 rounded-full border border-slate-800 backdrop-blur-sm max-w-fit mx-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                activeTab === tab.id 
                  ? 'bg-gradient-to-r from-cyan-600 to-blue-700 text-white shadow-lg shadow-cyan-900/20' 
                  : 'text-slate-500 hover:text-cyan-400'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="min-h-[400px]">
          {activeTab === 'nursing' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="md:col-span-1 space-y-8">
                  <section>
                    <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4">Credentials</h3>
                    <ul className="space-y-2 text-slate-300 text-sm">
                      <li>BS in Nursing, UConn</li>
                      <li>Registered Nurse (RN)</li>
                      <li>ACLS / BLS Certified</li>
                    </ul>
                  </section>
                </div>
                <div className="md:col-span-2 space-y-8">
                  <section>
                    <h3 className="text-xs font-bold text-cyan-500 uppercase tracking-widest mb-4">Focus</h3>
                    <p className="text-slate-300 leading-relaxed">
                      13 years of clinical experience, currently leveraging informatics at UConn Health to streamline high-acuity patient care and interdisciplinary workflows.
                    </p>
                  </section>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'technology' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex flex-wrap gap-2 justify-center mb-10">
                {techtags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleTagClick(tag)}
                    className={`px-3 py-1 rounded text-[12px] font-bold uppercase tracking-tighter transition-all ${
                      selectedTags.includes(tag)
                        ? 'bg-cyan-500 text-black' 
                        : 'bg-slate-900 text-slate-500 border border-slate-800 hover:border-cyan-500/50'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTechProjects.map((project) => (
                  <li key={project.name} className="group bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:border-cyan-500/30 transition-all">
                    <div className="flex justify-between mb-4">
                      <h4 className="font-bold text-white group-hover:text-cyan-400 transition-colors">{project.name}</h4>
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-white">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                      </a>
                    </div>
                    <p className="text-xs text-slate-400 mb-4 h-12 overflow-hidden">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(t => (
                        <span key={t} className="text-[9px] font-bold text-cyan-500/60 uppercase">{t}</span>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === 'business' && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
               <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredMbaProjects.map((project) => (
                  <li key={project.name} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
                    <h4 className="font-bold text-white mb-2">{project.name}</h4>
                    <p className="text-xs text-slate-400 mb-4 italic">MBA Concentration: Data Analytics</p>
                    <p className="text-sm text-slate-300 mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex gap-4">
                      <a href={project.link} className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest border-b border-cyan-400/30 pb-1">View Repository</a>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-900 py-12 mt-20">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-xs text-slate-600 font-mono">
            &copy; 2026 Jacob John Pelletier // BSN, BSCS, MBA Candidate
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
            <a href="#" className="text-xs uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>

      {/* Modal remains largely same with updated styling */}
      <Modal isOpen={isConstructionModalOpen} onClose={() => setIsConstructionModalOpen(false)}>
        <div className="text-center">
          <div className="inline-block p-3 rounded-full bg-cyan-500/10 mb-4">
            <svg className="w-6 h-6 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Systems Deployment in Progress</h2>
          <p className="text-sm text-slate-400 mb-6">
            Portfolio logic is currently being optimized for 2026.
          </p>
        </div>
      </Modal>
    </div>
  );
}

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-6">
      <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full">
        {children}
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-cyan-600 text-white font-bold text-xs uppercase tracking-widest hover:bg-cyan-500 transition-colors"
        >
          Enter Environment
        </button>
      </div>
    </div>
  );
}