import React, { useState, useEffect, useRef } from 'react';
import { Cpu, Clock, ThumbsUp, Box, UploadCloud, Settings, Calculator, CheckCircle, Activity, Loader } from 'lucide-react';
// Import Components ที่เราสร้างไว้
import Topbar from './components/Topbar';
import ModelViewer from './components/ModelViewer';
import PricingConfigurator from './components/PricingConfigurator';
import FacebookChat from './components/FacebookChat';
import Footer from './components/Footer';

import img1 from './Pic/1.jpg';
import img2 from './Pic/2.jpg';
import img3 from './Pic/3.jpg';
import img4 from './Pic/4.jpg';
import img5 from './Pic/5.jpg';
import img6 from './Pic/6.jpg';
import img7 from './Pic/7.jpg';
import img8 from './Pic/8.jpg';
import img9 from './Pic/17.jpg';
import img10 from './Pic/15.jpg';
import img11 from './Pic/19.jpg';
import img12 from './Pic/10.jpg';
import img13 from './Pic/11.jpg';
import img14 from './Pic/20.jpg';
import img15 from './Pic/18.jpg';
import img16 from './Pic/16.jpg';

// ค่าเริ่มต้น position คือ 'center' (ตรงกลาง)
// ถ้าภาพถูกตัดขอบ สามารถแก้ position เป็น 'top', 'bottom', 'left', 'right'
// หรือใช้ % เช่น '50% 20%' (แกน X แกน Y ห่างจากมุมบนซ้าย) ได้เลยครับ
const localGalleryItems = [
  { src: img1, position: 'center' },
  { src: img2, position: '60%' },
  { src: img3, position: '75%' },
  { src: img4, position: '10%' },
  { src: img5, position: 'center' },
  { src: img6, position: 'center' },
  { src: img7, position: 'center' },
  { src: img8, position: 'center' },
  { src: img9, position: '70%' },
  { src: img10, position: 'center' },
  { src: img11, position: 'center' },
  { src: img12, position: 'center' },
  { src: img13, position: '70%' },
  { src: img14, position: '10%' },
  { src: img15, position: 'center' },
  { src: img16, position: 'center' },
];

function App() {
  // -- Cursor Glow Effect --
  const cursorRef = useRef(null);
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [activeTab, setActiveTab] = useState(() => {
    return sessionStorage.getItem('activeTab') || 'Home';
  });

  useEffect(() => {
    sessionStorage.setItem('activeTab', activeTab);
  }, [activeTab]);

  // -- Queue State --
  const [queues, setQueues] = useState([
    { id: 'Q-001', initialTime: 38420, timeRemaining: 38420, isPrinting: true },
    { id: 'Q-002', initialTime: 86450, timeRemaining: 86450, isPrinting: false },
    { id: 'Q-003', initialTime: 365, timeRemaining: 365, isPrinting: false },
  ]);

  // -- Home Gallery State --
  const [galleryPage, setGalleryPage] = useState(0);
  const galleryItems = localGalleryItems;

  useEffect(() => {
    // F5 Refresh Listener
    const handleKeyDown = (e) => {
      if (e.key === 'F5') {
        e.preventDefault();
        window.location.reload();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Queue Countdown Interval
    const queueInterval = setInterval(() => {
      setQueues(prev => {
        if (prev.length === 0) return prev;

        const newQueues = [...prev];
        const printingIndex = newQueues.findIndex(q => q.isPrinting);

        if (printingIndex !== -1) {
          const currentJob = newQueues[printingIndex];
          if (currentJob.timeRemaining > 0) {
            currentJob.timeRemaining -= 1;
          } else {
            // Remove the finished job. Next job will wait for manual confirm.
            newQueues.splice(printingIndex, 1);
          }
        }
        return newQueues;
      });
    }, 1000);

    // Gallery Swap Interval
    const galleryInterval = setInterval(() => {
      setGalleryPage(p => (p === 0 ? 1 : 0));
    }, 5000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearInterval(queueInterval);
      clearInterval(galleryInterval);
    };
  }, []);

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
    return `${h}h ${m}m ${s}s`;
  };

  // -- Queue Actions --
  const handleConfirmPrint = (index) => {
    setQueues(prev => {
      const newQ = [...prev];
      newQ[index].isPrinting = true;
      return newQ;
    });
  };

  const handleCancelPrint = (index) => {
    setQueues(prev => {
      const newQ = [...prev];
      newQ[index].isPrinting = false;
      newQ[index].timeRemaining = newQ[index].initialTime;
      return newQ;
    });
  };

  const handleDeleteQueue = (index) => {
    setQueues(prev => {
      const newQ = [...prev];
      newQ.splice(index, 1);
      return newQ;
    });
  };

  const [newQDays, setNewQDays] = useState('');
  const [newQHours, setNewQHours] = useState('');
  const [newQMins, setNewQMins] = useState('');
  const [newQSecs, setNewQSecs] = useState('');

  const handleAddQueue = (e) => {
    e.preventDefault();
    const d = Math.max(0, parseInt(newQDays) || 0);
    const h = Math.min(24, Math.max(0, parseInt(newQHours) || 0));
    const m = Math.min(60, Math.max(0, parseInt(newQMins) || 0));
    const s = Math.min(60, Math.max(0, parseInt(newQSecs) || 0));

    const totalSeconds = (d * 86400) + (h * 3600) + (m * 60) + s;
    if (totalSeconds <= 0) return;

    setQueues(prev => [
      ...prev,
      {
        id: `Q-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`,
        initialTime: totalSeconds,
        timeRemaining: totalSeconds,
        isPrinting: false
      }
    ]);
    setNewQDays('');
    setNewQHours('');
    setNewQMins('');
    setNewQSecs('');
  };

  // State for 3D Viewer & Pricing
  const [fileUrl, setFileUrl] = useState(null);
  const [fileExt, setFileExt] = useState('');
  const [fileName, setFileName] = useState('');

  const [volume, setVolume] = useState(0); // cm^3
  const [material, setMaterial] = useState('pla');
  const [color, setColor] = useState('#1e90ff');
  const [scale, setScale] = useState(100);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(true);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (fileUrl) URL.revokeObjectURL(fileUrl);

    const url = URL.createObjectURL(file);
    const ext = file.name.split('.').pop().toLowerCase();

    setFileUrl(url);
    setFileExt(ext);
    setFileName(file.name);
    setVolume(0);
  };

  return (
    <div className="flex flex-col bg-white min-h-screen font-sans relative overflow-x-hidden">
      {/* Background Glow */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 w-[800px] h-[800px] -ml-[400px] -mt-[400px] rounded-full mix-blend-multiply opacity-50 z-0 transition-opacity duration-300"
        style={{
          background: 'radial-gradient(circle, rgba(114, 209, 183, 0.4) 0%, rgba(255, 255, 255, 0) 60%)',
          willChange: 'transform'
        }}
      />

      {/* TOP NAVBAR (New Layout) */}
      <Topbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto">

        {/* --- PAGE COMPONENT ROUTING --- */}
        {activeTab === 'Home' && (
          <div className="mt-0 overflow-hidden relative min-h-[calc(100vh-80px)] bg-gradient-to-r from-purple-100 via-white to-emerald-100 flex flex-col justify-between">
            <div className="pt-12 pb-20 px-4 sm:px-8 relative z-10 flex-1 flex flex-col justify-center">
              <div className="text-center mb-8 relative z-10" style={{ fontFamily: "'Inter', sans-serif" }}>
                <p className="text-sm sm:text-base font-medium text-gray-600 mb-4">Fused Deposition Modeling</p>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-gray-900 tracking-tight leading-[1.15]">
                  3D Printing Services
                </h1>
              </div>

              {/* Animated Staggered Gallery (Minimal Parallelogram) */}
              <div className="flex flex-nowrap md:justify-center items-center gap-4 sm:gap-6 md:gap-8 w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] pt-16 pb-20 px-8 relative z-10 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {/* สร้างรูปภาพ 8 กรอบ */}
                {Array.from({ length: 8 }).map((_, idx) => {
                  const itemPage0 = galleryItems[idx];
                  const itemPage1 = galleryItems[idx + 8];
                  const isEven = idx % 2 === 0;
                  const translateY = isEven ? 'translate-y-6 md:translate-y-12' : '-translate-y-6 md:-translate-y-12';

                  // ทิศทางการแอนิเมชันสำหรับ 4 ทิศทาง
                  const dirs = ['-translate-y-full', 'translate-y-full', '-translate-x-full', 'translate-x-full'];
                  const dirClass = dirs[idx % 4];

                  return (
                    <div key={idx} className={`relative w-40 h-64 md:w-64 md:h-96 -skew-x-[15deg] ${translateY} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group bg-white shrink-0`}>

                      {/* หน้า 0 */}
                      <div className={`absolute inset-[-15%] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
                        ${galleryPage === 0 ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${dirClass} scale-90`}`}
                      >
                        {/* ภาพสลับให้ตรงตามระนาบเดิม skew-x กลับ */}
                        <div className="w-full h-full skew-x-[15deg] scale-100"
                          style={{
                            backgroundImage: `url(${itemPage0.src})`,
                            backgroundSize: 'cover', backgroundPosition: itemPage0.position || 'center'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-500 skew-x-[15deg] scale-100"></div>
                      </div>

                      {/* หน้า 1 */}
                      <div className={`absolute inset-[-15%] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
                        ${galleryPage === 1 ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${dirClass} scale-90`}`}
                      >
                        <div className="w-full h-full skew-x-[15deg] scale-100"
                          style={{
                            backgroundImage: `url(${itemPage1.src})`,
                            backgroundSize: 'cover', backgroundPosition: itemPage1.position || 'center'
                          }}
                        />
                        <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-500 skew-x-[15deg] scale-100"></div>
                      </div>

                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <Footer />

          </div>
        )}

        {activeTab === 'Service' && (
          <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-100 via-white to-purple-100 relative z-10 flex flex-col justify-between">
            <div className="pt-16 pb-20 px-4 md:px-8 w-full flex flex-col items-center flex-1">
              <div className="w-full max-w-5xl">
                <h1 className="text-4xl font-black text-gray-900 text-center mb-12">ขั้นตอนการใช้บริการ <span className="text-[#72D1B7]">ง่ายๆ ใน 4 สเตป</span></h1>
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
                    <p className="text-gray-500 text-lg relative z-10">เลือกประเภทพลาสติกที่เหมาะกับงาน (เช่น PLA, ABS, PETG) พร้อมปรับแต่งสีและขนาด (Scale) เพื่อตรงตามความต้องการที่สุด</p>
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

            {/* Footer */}
            <Footer />
          </div>
        )}

        {activeTab === 'Queue' && (
          <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-bl from-rose-100 via-rose-50 to-orange-100 relative z-10 flex flex-col justify-between">
            <div className="pt-16 pb-20 px-4 md:px-8 w-full flex flex-col items-center flex-1">
              <div className="w-full max-w-5xl">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">คิวงานปัจจุบัน (Live Queue)</h1>
                    <form onSubmit={handleAddQueue} className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 shadow-sm">
                      <span className="text-sm font-bold text-gray-700 mr-1">+ เพิ่มคิว:</span>
                      <input type="number" min="0" placeholder="วัน" value={newQDays} onChange={(e) => setNewQDays(e.target.value)} className="w-[50px] sm:w-[60px] border border-gray-300 rounded-lg p-1.5 text-xs sm:text-sm text-center" />
                      <span className="text-gray-500 text-xs">วัน</span>
                      <input type="number" min="0" max="24" placeholder="ชม." value={newQHours} onChange={(e) => setNewQHours(e.target.value)} className="w-[50px] sm:w-[60px] border border-gray-300 rounded-lg p-1.5 text-xs sm:text-sm text-center" />
                      <span className="text-gray-500 text-xs">ชม.</span>
                      <input type="number" min="0" max="60" placeholder="นาที" value={newQMins} onChange={(e) => setNewQMins(e.target.value)} className="w-[50px] sm:w-[60px] border border-gray-300 rounded-lg p-1.5 text-xs sm:text-sm text-center" />
                      <span className="text-gray-500 text-xs">นาที</span>
                      <input type="number" min="0" max="60" placeholder="วิฯ" value={newQSecs} onChange={(e) => setNewQSecs(e.target.value)} className="w-[50px] sm:w-[60px] border border-gray-300 rounded-lg p-1.5 text-xs sm:text-sm text-center" />
                      <span className="text-gray-500 text-xs">วิฯ</span>
                      <button type="submit" disabled={!newQDays && !newQHours && !newQMins && !newQSecs} className="bg-[#72D1B7] hover:bg-[#5bb89e] text-white px-3 sm:px-4 py-1.5 rounded-lg text-xs sm:text-sm font-bold transition disabled:opacity-50 ml-1">Add</button>
                    </form>
                  </div>

                  <div className="bg-[#72D1B7]/10 text-[#72D1B7] font-bold px-4 py-2 rounded-full flex items-center gap-2 shrink-0">
                    <Activity size={20} className="animate-pulse" />
                    Total Queue: {queues.length}
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 font-semibold text-center text-sm md:text-base">
                        <th className="p-4 md:p-5 w-16 md:w-24">#</th>
                        <th className="p-4 md:p-5">สถานะ</th>
                        <th className="p-4 md:p-5 w-1/4">เวลาเหลือ</th>
                        <th className="p-4 md:p-5 w-1/4">จัดการคิว</th>
                      </tr>
                    </thead>
                    <tbody>
                      {queues.length === 0 ? (
                        <tr><td colSpan="4" className="p-8 text-center text-gray-400">ตอนนี้ไม่มีคิวงาน ว่างพิมพ์ได้ทันที!</td></tr>
                      ) : (
                        queues.map((q, index) => {
                          const currentStatus = q.isPrinting ? 'PRINTING' : 'WAIT FOR PRINT';
                          return (
                            <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-center text-sm md:text-base">
                              <td className="p-4 md:p-5 font-bold text-gray-500 text-lg">{index + 1}</td>
                              <td className="p-4 md:p-5">
                                <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-bold ${q.isPrinting ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                                  }`}>
                                  {q.isPrinting && <Loader size={14} className="animate-spin" />}
                                  {currentStatus}
                                </span>
                              </td>
                              <td className="p-4 md:p-5 font-mono text-lg md:text-xl font-bold text-gray-700">
                                {formatTime(q.timeRemaining)}
                              </td>
                              <td className="p-4 md:p-5 flex flex-col sm:flex-row gap-2 justify-center items-center">
                                {q.isPrinting ? (
                                  <button onClick={() => handleCancelPrint(index)} className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap">ยกเลิก / รีเซ็ต</button>
                                ) : (
                                  <>
                                    {index === 0 && !queues.some(item => item.isPrinting) && (
                                      <button onClick={() => handleConfirmPrint(index)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap">Confirm Print</button>
                                    )}
                                    <button onClick={() => handleDeleteQueue(index)} className="bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition whitespace-nowrap">ลบคิว</button>
                                  </>
                                )}
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Footer */}
            <Footer />
          </div>
        )}

        {activeTab === 'About' && (
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

            {/* Footer */}
            <Footer />
          </div>
        )}

        {activeTab === 'Price' && (
          <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-gray-100">

            {/* กล่องรับไฟล์และ 3D Viewer (Full Screen) */}
            <div className="absolute inset-0 z-0">
              <ModelViewer
                fileUrl={fileUrl}
                fileExt={fileExt}
                color={color}
                onVolumeCalculated={setVolume}
              />
            </div>

            {/* ปุ่มเปิด/ปิด แผงคำนวณราคา */}
            <button
              onClick={() => setIsConfiguratorOpen(!isConfiguratorOpen)}
              className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-white/40 text-gray-700 hover:text-[#72D1B7] hover:bg-white transition-all flex items-center justify-center"
              title={isConfiguratorOpen ? "ซ่อนแผงคำนวณ" : "แสดงแผงคำนวณ"}
            >
              {isConfiguratorOpen ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg> : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>}
            </button>

            {/* กล่องคำนวณราคาและปรับแต่ง (Overlay มุมซ้ายบน) */}
            <div className={`absolute top-16 left-4 z-10 w-[calc(100vw-32px)] sm:w-full max-w-[450px] max-h-[calc(100vh-160px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-2xl rounded-2xl border border-white/40 transition-all duration-300 origin-top-left ${isConfiguratorOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <div className="bg-white/90 backdrop-blur-xl p-5 lg:p-6 w-full min-h-full flex flex-col">

                <PricingConfigurator
                  volume={volume}
                  material={material} setMaterial={setMaterial}
                  color={color} setColor={setColor}
                  scale={scale} setScale={setScale}
                  onFileChange={handleFileChange}
                  fileName={fileName}
                />
              </div>
            </div>

          </div>
        )}

      </main>

      {/* Messenger Chat */}
      <FacebookChat pageId="123456789012345" />

    </div>
  );
}

export default App;