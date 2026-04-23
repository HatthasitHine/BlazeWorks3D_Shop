import React, { useState } from 'react';
import ModelViewer from '../components/ModelViewer';
import PricingConfigurator from '../components/PricingConfigurator';

export default function Price() {
  const [fileUrl, setFileUrl] = useState(null);
  const [fileExt, setFileExt] = useState('');
  const [fileName, setFileName] = useState('');

  const [volume, setVolume] = useState(0);
  const [dimensions, setDimensions] = useState({ x: 0, y: 0, z: 0 });
  const [material, setMaterial] = useState('petg');
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
