import React, { useState, useContext } from 'react';
import ModelViewer from '../components/ModelViewer';
import PricingConfigurator from '../components/PricingConfigurator';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/layout/Footer';

export default function Price({ setActiveTab }) {
  const { user } = useContext(AuthContext);

  const [fileUrl, setFileUrl] = useState(null);
  const [fileExt, setFileExt] = useState('');
  const [fileName, setFileName] = useState('');

  const [volume, setVolume] = useState(0);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0, z: 0 });
  const [material, setMaterial] = useState('petg');
  const [color, setColor] = useState('#1e90ff');
  const [scale, setScale] = useState(100);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(true);

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex flex-col justify-between bg-gray-50">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-3xl shadow-xl border border-gray-100 max-w-md w-full mx-4">
            <h2 className="text-2xl font-black text-gray-800 mb-4">เข้าสู่ระบบเพื่อใช้งาน</h2>
            <p className="text-gray-500 mb-8">คุณจำเป็นต้องเข้าสู่ระบบก่อน เพื่อใช้งานระบบประเมินราคาและสั่งพิมพ์ 3D ของเรา</p>
            <button onClick={() => setActiveTab('Login')} className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white py-3 rounded-xl font-bold transition-all shadow-md">
              ไปหน้าเข้าสู่ระบบ / สมัครสมาชิก
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

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
    setDimensions({ x: 0, y: 0, z: 0 });
  };

  const handleVolumeCalculated = (vol, dims) => {
    setVolume(vol);
    if (dims) setDimensions(dims);
  };

  return (
    <div className="relative w-full h-[calc(100vh-80px)] overflow-hidden bg-gray-100">
      {/* 3D Viewer */}
      <div className="absolute inset-0 z-0">
        <ModelViewer
          fileUrl={fileUrl}
          fileExt={fileExt}
          color={color}
          dimensions={dimensions}
          onVolumeCalculated={handleVolumeCalculated}
        />
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsConfiguratorOpen(!isConfiguratorOpen)}
        className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-xl p-3 rounded-xl shadow-lg border border-white/40 text-gray-700 hover:text-[#72D1B7] hover:bg-white transition-all flex items-center justify-center"
        title={isConfiguratorOpen ? "ซ่อนแผงคำนวณ" : "แสดงแผงคำนวณ"}
      >
        {isConfiguratorOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6" /></svg>
        )}
      </button>

      {/* Configurator */}
      <div className={`absolute top-16 left-4 z-10 w-[calc(100vw-32px)] sm:w-full max-w-[450px] max-h-[calc(100vh-160px)] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] shadow-2xl rounded-2xl border border-white/40 transition-all duration-300 origin-top-left ${isConfiguratorOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
        <div className="bg-white/90 backdrop-blur-xl p-5 lg:p-6 w-full min-h-full flex flex-col">
          <PricingConfigurator
            volume={volume}
            dimensions={dimensions}
            material={material} setMaterial={setMaterial}
            color={color} setColor={setColor}
            scale={scale} setScale={setScale}
            onFileChange={handleFileChange}
            fileName={fileName}
          />
        </div>
      </div>
    </div>
  );
}
