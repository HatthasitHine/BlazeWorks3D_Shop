import React from 'react';
import { UploadCloud, Settings, Calculator, CheckCircle } from 'lucide-react';
import Footer from '../components/layout/Footer';

export default function Service() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 relative z-10 flex flex-col justify-between">
      <div className="pt-16 pb-20 px-4 md:px-8 w-full flex flex-col items-center flex-1">
        <div className="w-full max-w-5xl">
          <h1 className="text-4xl font-black text-gray-900 text-center mb-12">ขั้นตอนการใช้บริการ <span className="text-[#72D1B7]">ง่ายๆ ใน 4 ขั้นตอน</span></h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#72D1B7]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-6 mb-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#72D1B7] text-white flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <UploadCloud size={32} />
                </div>
                <h3 className="font-bold text-2xl text-gray-800">1. อัปโหลดไฟล์ 3D</h3>
              </div>
              <p className="text-gray-500 text-lg relative z-10">เข้าไปที่เมนู Price ลากและวางไฟล์ .stl หรือ .obj ของคุณลงในระบบ เครื่องมือ 3D Viewer จะพรีวิวโมเดลให้คุณเห็นรอบด้านอัตโนมัติ</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#72D1B7]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-6 mb-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#72D1B7] text-white flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <Settings size={32} />
                </div>
                <h3 className="font-bold text-2xl text-gray-800">2. เลือกวัสดุและสี</h3>
              </div>
              <p className="text-gray-500 text-lg relative z-10">เลือกประเภทพลาสติกที่เหมาะกับงาน (เช่น PLA, ABS, PETG) พร้อมปรับแต่งสี เพื่อตรงตามความต้องการที่สุด</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#72D1B7]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-6 mb-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#72D1B7] text-white flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <Calculator size={32} />
                </div>
                <h3 className="font-bold text-2xl text-gray-800">3. ตรวจสอบราคาอัตโนมัติ</h3>
              </div>
              <p className="text-gray-500 text-lg relative z-10">ระบบจะนำความหนาแน่นและปริมาตรมาคำนวณราคาและเวลาให้อัตโนมัติ พร้อมแสดงเงื่อนไขเรตราคาแบบเรียลไทม์</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#72D1B7]/10 rounded-bl-full -z-0 transition-transform group-hover:scale-110"></div>
              <div className="flex items-center gap-6 mb-4 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#72D1B7] text-white flex items-center justify-center shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                  <CheckCircle size={32} />
                </div>
                <h3 className="font-bold text-2xl text-gray-800">4. สั่งทำ</h3>
              </div>
              <p className="text-gray-500 text-lg relative z-10">กดปุ่มพิมพ์ใบเสนอราคาเพื่อใช้เป็นหลักฐาน จากนั้นกดปุ่ม <span className="font-bold">สอบถาม/สั่งทำ</span> เพื่อลิงก์ไปยังเพจร้านโดยตรง</p>
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
