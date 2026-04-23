import React, { useState, useContext, useRef, useEffect } from 'react';
import { PhoneCall, Printer, Search, Menu, X, User, LogOut, Settings as SettingsIcon } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';

export default function Topbar({ activeTab, setActiveTab }) {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const tabs = [
    { id: 'Home', label: 'Home' },
    { id: 'Portfolio', label: 'ผลงาน' },
    { id: 'Service', label: 'Service' },
    { id: 'Price', label: 'Price' },
    { id: 'Queue', label: 'Queue' },
    { id: 'Articles', label: 'บทความ' },
    { id: 'About', label: 'About' },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setActiveTab('Home');
  };

  return (
    <>
      <div className="h-20 w-full shrink-0 block"></div>
      <header className="bg-white h-20 shadow-sm flex items-center justify-between px-4 md:px-8 fixed w-full top-0 left-0 z-40">

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

          {/* User Auth Section */}
          <div className="hidden sm:block relative" ref={dropdownRef}>
            {user ? (
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 bg-gray-50 border border-gray-200 hover:bg-gray-100 text-gray-800 px-4 py-2.5 rounded-xl text-sm font-bold transition-all"
                >
                  <User size={18} className="text-[#72D1B7]" />
                  <span>{user.username}</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-sm font-bold text-gray-800 truncate">{user.email}</p>
                      {user.role !== 'USER' && (
                        <p className="text-xs text-gray-500 mt-1 capitalize">Role: {user.role}</p>
                      )}
                    </div>
                    <div className="p-2">
                      <button
                        onClick={() => { setActiveTab('Settings'); setDropdownOpen(false); }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                      >
                        <SettingsIcon size={16} /> ตั้งค่าบัญชี
                      </button>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <LogOut size={16} /> ออกจากระบบ
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setActiveTab('Login')}
                className="flex items-center gap-2 bg-white border-2 border-[#72D1B7] text-[#72D1B7] hover:bg-[#72D1B7] hover:text-white px-6 py-2 rounded-xl text-sm font-bold transition-all"
              >
                เข้าสู่ระบบ
              </button>
            )}
          </div>

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
        
        {/* Mobile Auth Status */}
        <div className="p-4 border-b border-gray-100">
          {user ? (
             <div className="flex flex-col gap-2">
               <div className="flex items-center gap-3 mb-2">
                 <div className="w-10 h-10 bg-[#72D1B7]/20 text-[#72D1B7] rounded-full flex items-center justify-center">
                    <User size={20} />
                 </div>
                 <div>
                    <p className="font-bold text-gray-800 leading-none">{user.username}</p>
                    {user.role !== 'USER' && (
                      <p className="text-xs text-gray-500 mt-1">{user.role}</p>
                    )}
                 </div>
               </div>
               <button onClick={() => { setActiveTab('Settings'); setIsOpen(false); }} className="w-full text-left p-2 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg flex items-center gap-2">
                 <SettingsIcon size={16} /> ตั้งค่าบัญชี
               </button>
               <button onClick={handleLogout} className="w-full text-left p-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2">
                 <LogOut size={16} /> ออกจากระบบ
               </button>
             </div>
          ) : (
            <button
                onClick={() => { setActiveTab('Login'); setIsOpen(false); }}
                className="w-full flex justify-center items-center gap-2 bg-[#72D1B7] text-white py-3 rounded-xl text-sm font-bold shadow-md"
              >
                เข้าสู่ระบบ / สมัครสมาชิก
            </button>
          )}
        </div>

        <nav className="flex flex-col p-4 gap-2 overflow-y-auto">
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
        <div className="mt-auto p-4 border-t border-gray-100">
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