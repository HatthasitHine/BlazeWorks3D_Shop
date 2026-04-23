import React from 'react';
import Footer from '../components/layout/Footer';

export default function About() {
  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-teal-100 via-white to-emerald-100 relative z-10 flex flex-col justify-between">
      <div className="pt-16 pb-20 px-4 md:px-8 w-full flex flex-col items-center flex-1">
        <div className="w-full max-w-4xl p-8 md:p-12 bg-white/80 backdrop-blur-md rounded-3xl shadow-xl border border-white/50">
          <h1 className="text-4xl font-black text-[#72D1B7] mb-8 text-center bg-[#72D1B7]/10 py-4 rounded-xl">เกี่ยวกับเรา (About Us)</h1>

          <div className="prose prose-lg text-gray-600 max-w-none space-y-6">
            <p className="text-xl font-bold text-center text-[#5bb89e]">ยินดีต้อนรับสู่ BlazeWorks3D – พาร์ทเนอร์ด้านงานพิมพ์ 3 มิติของคุณ</p>
            <p>ที่ <strong>BlazeWorks3D</strong> เราเชื่อว่าไอเดียที่ดีสมควรได้รับการจับต้องได้จริง ไม่ว่าคุณจะเป็นนักศึกษาที่กำลังทำโปรเจกต์จบ นักวิจัยที่ต้องการชิ้นงานทดสอบ หรือผู้ประกอบการที่กำลังสร้างต้นแบบสินค้า เราพร้อมเปลี่ยนแบบร่างในจอคอมพิวเตอร์ของคุณให้กลายเป็นชิ้นงานจริงด้วยเทคโนโลยี 3D Printing (FDM) ที่แม่นยำและได้มาตรฐาน</p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-[#72D1B7] pl-4">จุดเริ่มต้นของเรา</h3>
            <p>BlazeWorks3D เริ่มต้นจากความหลงใหลในเทคโนโลยี 3D Printing และความตั้งใจที่จะทำให้บริการผลิตชิ้นงาน 3 มิติเป็นเรื่องที่เข้าถึงง่าย โปร่งใส และมีคุณภาพสูง โดยเฉพาะสำหรับผู้ใช้งานในพื้นที่มหาวิทยาลัยนเรศวร จังหวัดพิษณุโลก และพื้นที่ใกล้เคียง เราเข้าใจดีว่างานทุกชิ้นมีความสำคัญ เราจึงใส่ใจตั้งแต่การให้คำปรึกษาเรื่องวัสดุ ไปจนถึงการตั้งค่าการพิมพ์ที่เหมาะสมที่สุดสำหรับแต่ละชิ้นงาน</p>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-[#72D1B7] pl-4">สิ่งที่เรายึดมั่น (Our Core Values)</h3>
            <ul className="list-disc pl-6 space-y-3">
              <li><strong>โปร่งใสและยุติธรรม:</strong> เราคิดราคาประเมินตาม "เวลาที่ใช้พิมพ์จริง" อย่างตรงไปตรงมา เพื่อให้คุณได้ชิ้นงานคุณภาพในราคาที่คุ้มค่าที่สุด</li>
              <li><strong>คุณภาพต้องมาก่อน:</strong> ชิ้นงานทุกชิ้นผ่านการตรวจสอบความแข็งแรงของผนัง (Wall Thickness) และความสมบูรณ์ของรูปทรงก่อนส่งมอบเสมอ</li>
              <li><strong>เป็นมากกว่าแค่ร้านรับปริ้น:</strong> เราคือที่ปรึกษาของคุณ หากคุณไม่แน่ใจว่าต้องใช้วัสดุแบบไหน (PLA, PETG, ABS, ASA หรือเกรดวิศวกรรม) เราพร้อมให้คำแนะนำฟรีเพื่อให้ตรงกับโจทย์การใช้งานของคุณมากที่สุด</li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-[#72D1B7] pl-4">ขอบเขตการให้บริการของเรา</h3>
            <p>เพื่อให้เราส่งมอบงานพิมพ์พลาสติก (FDM) ที่ดีที่สุดให้กับคุณได้อย่างรวดเร็ว เรามีแนวทางที่ชัดเจนดังนี้:</p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</div> <span>รับพิมพ์งานระบบ FDM ด้วยวัสดุที่หลากหลาย ตั้งแต่งานทั่วไปจนถึงงานวิศวกรรม</span></li>
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✓</div> <span>รองรับไฟล์มาตรฐาน .stl, .obj, .3mf, .stp, .step</span></li>
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✕</div> <span className="text-gray-500">ไม่ได้รับออกแบบ หรือขึ้นโมเดล 3D (รับเฉพาะไฟล์ที่พร้อมพิมพ์)</span></li>
              <li className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">✕</div> <span className="text-gray-500">ไม่มีบริการพิมพ์ระบบ Resin</span></li>
            </ul>

            <h3 className="text-2xl font-bold text-gray-800 mt-8 mb-4 border-l-4 border-[#72D1B7] pl-4">วิสัยทัศน์ของเรา (Our Vision)</h3>
            <p>เรามุ่งมั่นที่จะพัฒนา BlazeWorks3D ให้เป็นศูนย์กลางการผลิตชิ้นงาน 3 มิติที่ผู้ใช้งานไว้วางใจ ด้วยระบบการจัดการที่รวดเร็ว (Web App) และมาตรฐานการพิมพ์ที่สม่ำเสมอ เพื่อผลักดันทุกจินตนาการให้กลายเป็นความจริง</p>

            <div className="bg-[#72D1B7]/5 p-8 rounded-2xl mt-10 text-center border border-[#72D1B7]/20 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#72D1B7]/10 rounded-bl-full -z-0"></div>
              <h3 className="text-2xl font-black text-[#5bb89e] mb-2 relative z-10">ติดต่อและส่งงานประเมินราคา</h3>
              <p className="text-gray-600 mb-6 relative z-10">เราพร้อมดูแลทุกโปรเจกต์ของคุณ ส่งไฟล์มาให้เราประเมินราคาฟรีได้เลย!</p>
              <a href="https://m.me/IceBlazeLAB" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-block bg-[#42CA88] hover:bg-[#3ebc7e] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-md hover:shadow-lg hover:-translate-y-1">
                ไปที่ Messenger
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
