import React from 'react';
import { Box, Layers, Image, FileText, Printer } from 'lucide-react';

export default function Sidebar({ isOpen }) {
  // ถ้าปิด Sidebar ให้ซ่อน (สำหรับมือถือ)
  const sidebarClass = isOpen ? 'translate-x-0' : '-translate-x-full';

  return (
    <aside className={`bg-slate-900 text-white w-64 min-h-screen fixed md:static z-20 transition-transform duration-300 ease-in-out ${sidebarClass} md:translate-x-0 flex flex-col`}>
      
      {/* ส่วนหัวโลโก้ */}
      <div className="h-16 flex items-center px-6 bg-slate-800 border-b border-slate-700 font-bold text-xl tracking-wider">
        <Printer className="mr-3 text-blue-500" /> IceBlaze LAB
      </div>

      {/* ลิงก์เมนู */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {/* เมนูที่ Active อยู่จะใส่สีพื้นหลัง */}
        <MenuItem icon={<Box size={20} />} label="ภาพรวมบริการ" active />
        <MenuItem icon={<Layers size={20} />} label="วัสดุ (Materials)" />
        <MenuItem icon={<Image size={20} />} label="แกลเลอรีผลงาน" />
        <MenuItem 
          icon={<FileText size={20} />} 
          label="ติดต่อสอบถาม / สั่งทำ" 
          href="https://m.me/IceBlazeLAB" 
          target="_blank" 
        />
      </nav>

      {/* ส่วนท้าย Sidebar */}
      <div className="p-4 bg-slate-950 text-slate-500 text-xs text-center">
        © 2024 3D Pro Lab Service
      </div>
    </aside>
  );
}

// Component ย่อยสำหรับลิงก์ในเมนู
function MenuItem({ icon, label, active, href = "#", target }) {
  return (
    <a href={href} target={target} rel={target === "_blank" ? "noopener noreferrer" : undefined} className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${active ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'}`}>
      <span className="mr-4">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}