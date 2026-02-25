import React, { useState } from 'react';
import { PhoneCall, Printer, Search, Menu, X } from 'lucide-react';

export default function Topbar({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'Home', label: 'Home' },
    { id: 'Service', label: 'Service' },
    { id: 'Price', label: 'Price' },
    { id: 'Queue', label: 'Queue' },
    { id: 'About', label: 'About' },
  ];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="bg-white h-20 shadow-sm flex items-center justify-between px-4 md:px-8 sticky top-0 z-40">

        {/* 1. Logo (Left) */}
        <div className="flex items-center font-bold text-xl md:text-2xl tracking-wider cursor-pointer" onClick={() => setActiveTab('Home')}>
          <Printer className="mr-2 text-[#72D1B7]" size={28} />
          <span className="text-gray-900">BLAZE</span>
          <span className="text-[#72D1B7]">WORKS</span>
          <span className="text-gray-900">3D</span>
        </div>

        {/* 2. Navigation List (Center Desktop) */}
        <nav className="hidden md:flex items-center gap-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-base md:text-lg font-medium transition-colors ${activeTab === tab.id
                ? 'text-[#72D1B7] border-b-2 border-[#72D1B7]'
                : 'text-gray-600 hover:text-[#72D1B7]'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* 3. Actions & Hamburger (Right) */}
        <div className="flex items-center gap-3 md:gap-4">
          <a
            href="https://m.me/IceBlazeLAB"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-2 bg-[#42CA88] hover:bg-[#3ebc7e] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>ติดต่อเรา</span>
          </a>

          <button className="md:hidden text-gray-700 p-2" onClick={() => setIsOpen(true)}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 md:hidden" onClick={() => setIsOpen(false)}></div>
      )}

      {/* Sidebar Panel */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden flex flex-col shadow-2xl`}>
        <div className="p-6 flex justify-between items-center border-b border-gray-100">
          <div className="flex items-center font-bold text-lg tracking-wider">
            <Printer className="mr-2 text-[#72D1B7]" size={24} />
            <span className="text-gray-900">BLAZE</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:bg-gray-100 p-2 rounded-lg transition-colors"><X size={24} /></button>
        </div>
        <nav className="flex flex-col p-4 gap-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setIsOpen(false); }}
              className={`p-4 text-left rounded-xl text-lg font-bold transition-colors ${activeTab === tab.id ? 'bg-[#72D1B7]/10 text-[#72D1B7]' : 'text-gray-600 hover:bg-gray-50'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto p-4">
          <a
            href="https://m.me/IceBlazeLAB"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-[#42CA88] hover:bg-[#3ebc7e] text-white w-full py-3 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            <span>ติดต่อสอบถาม</span>
          </a>
        </div>
      </div>
    </>
  );
}