import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, GizmoHelper, GizmoViewport, GizmoViewcube } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default function ModelViewer({ fileUrl, fileExt, color, onVolumeCalculated }) {
  const [geometry, setGeometry] = useState(null);
  const [modelHeight, setModelHeight] = useState(0);

  useEffect(() => {
    if (!fileUrl) {
      setGeometry(null);
      setModelHeight(0);
      return;
    }
    
    let loader;
    if (fileExt === 'stl') loader = new STLLoader();
    else if (fileExt === 'obj') loader = new OBJLoader();
    else return;

    loader.load(fileUrl, (loadedData) => {
      let geo;
      if (fileExt === 'stl') {
        geo = loadedData;
      } else {
        let firstMesh = null;
        loadedData.traverse((child) => {
          if (child.isMesh && !firstMesh) firstMesh = child;
        });
        if (firstMesh) geo = firstMesh.geometry;
      }
      
      if (geo) {
        geo.computeBoundingBox();
        const bbox = geo.boundingBox;
        const width = bbox.max.x - bbox.min.x;
        const height = bbox.max.y - bbox.min.y;
        const depth = bbox.max.z - bbox.min.z;
        // Assume unit is mm, calculate volume in cm^3  (1 cm^3 = 1000 mm^3)
        const boundingVolumeStr = ((width * height * depth) / 1000).toFixed(2);
        const calcVolume = parseFloat(boundingVolumeStr);
        
        // Use a rough estimate of actual volume vs bbox volume (e.g. 50% for complex shapes)
        // This is a simplification. For accurate pricing we would use a library to compute volume.
        const estimatedVolume = calcVolume * 0.5; 
        
        geo.center();
        setGeometry(geo);
        setModelHeight(height);
        
        if (onVolumeCalculated) {
          onVolumeCalculated(estimatedVolume);
        }
      }
    }, undefined, (error) => {
      console.error('Error loading 3D model:', error);
    });
  }, [fileUrl, fileExt]);

  return (
    <div className="w-full h-full relative">
      {geometry ? (
        <>
        <div className="absolute top-2 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
           <div className="bg-gray-800/80 text-white backdrop-blur text-xs font-bold px-3 py-2 rounded-lg shadow border border-gray-700 select-none w-max">
              คลิกมุมต่างๆ บนลูกบาศก์ด้านล่างเพื่อปรับมุมมอง
           </div>
        </div>
        <Canvas shadows camera={{ position: [0, 200, 300], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[100, 200, 100]} intensity={1.5} castShadow />
          <directionalLight position={[-100, 200, -100]} intensity={0.5} />
          
          <mesh geometry={geometry}>
            <meshStandardMaterial color={color || '#1e90ff'} roughness={0.3} metalness={0.1} />
          </mesh>
          
          {/* Base plate (ฐานพิมพ์) 350x350 */}
          <mesh position={[0, -modelHeight / 2 - 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[350, 350]} />
            <meshStandardMaterial color="#f0f0f0" side={THREE.DoubleSide} />
          </mesh>
          
          {/* Main Grid: 350x350, 7 divisions (50mm blocks) */}
          <gridHelper args={[350, 7, '#000000', '#aaaaaa']} position={[0, -modelHeight / 2 - 0.1, 0]} />
          
          {/* Sub Grid: 350x350, 35 divisions (10mm blocks) */}
          <gridHelper args={[350, 35, '#cccccc', '#e0e0e0']} position={[0, -modelHeight / 2 - 0.15, 0]} />
          
          <GizmoHelper alignment="top-right" margin={[60, 60]}>
            <GizmoViewcube />
          </GizmoHelper>
          
          <OrbitControls makeDefault enablePan={true} enableZoom={true} enableRotate={true} maxDistance={800} minDistance={10} />
        </Canvas>
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 bg-gray-50/50">
          <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
          </svg>
           {fileUrl ? <p className="font-medium animate-pulse">กำลังโหลดโมเดล...</p> : <p className="font-medium">อัปโหลดไฟล์ 3D (.stl, .obj) เพื่อดูตัวอย่างที่นี่</p>}
        </div>
      )}
    </div>
  );
}
