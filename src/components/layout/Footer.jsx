import React from 'react';
import { Mail, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="pt-8 pb-4 px-4 md:px-8 mt-auto relative z-20 w-full bg-gray-800 text-white">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-8">
                {/* Brand & Description */}
                <div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-wider">
                        BLAZE<span className="text-[#72D1B7]">WORKS</span><span className="text-white">3D</span>
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        บริการรับพิมพ์ชิ้นงาน 3 มิติ (3D Printing FDM) รวดเร็ว แม่นยำ และได้มาตรฐาน
                        พร้อมให้คำปรึกษาด้านวัสดุเพื่อตอบโจทย์ทุกการใช้งานของคุณ สร้างจินตนาการของคุณให้เป็นจริง
                    </p>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="font-bold text-gray-100 mb-3 text-lg">Contact</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li className="flex items-center gap-3">
                            <Mail size={18} className="text-[#72D1B7]" />
                            <a href="mailto:blazelabshop@gmail.com" className="hover:text-[#72D1B7] transition-colors font-medium">blazelabshop@gmail.com</a>
                        </li>
                    </ul>
                </div>

                {/* Social Links */}
                <div>
                    <h4 className="font-bold text-gray-100 mb-3 text-lg">Follow us</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                        <li>
                            <a href="https://www.facebook.com/IceBlazeLAB" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#72D1B7] transition-colors font-medium">
                                <Facebook size={18} className="text-[#72D1B7]" />
                                BlazeWorks 3D
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/blazeworks3d" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-[#72D1B7] transition-colors font-medium">
                                <Instagram size={18} className="text-[#72D1B7]" />
                                @blazeworks3d
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright */}
            <div className="max-w-6xl mx-auto pt-4 border-t border-gray-700 text-center text-xs text-gray-400 font-medium">
                © 2026 - All Rights Reserved | Created By TJ3D
            </div>
        </footer>
    );
}
