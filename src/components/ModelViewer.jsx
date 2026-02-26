import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Center, GizmoHelper, GizmoViewport, GizmoViewcube } from '@react-three/drei';
import * as THREE from 'three';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export default function ModelViewer({ fileUrl, fileExt, color, dimensions, onVolumeCalculated }) {
  const [geometry, setGeometry] = useState(null);
  const [modelHeight, setModelHeight] = useState(0);

  // Oversized checking
  const isOversized = dimensions && (dimensions.x > 350 || dimensions.y > 350 || dimensions.z > 350);
  const [showOversizeError, setShowOversizeError] = useState(false);

  useEffect(() => {
    if (isOversized) {
      setShowOversizeError(true);
    } else {
      setShowOversizeError(false);
    }
  }, [isOversized]);

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
        const calculateRealVolume = (geometry) => {
          const position = geometry.attributes.position;
          if (!position) return 0;

          let vol = 0;
          const p1 = new THREE.Vector3(), p2 = new THREE.Vector3(), p3 = new THREE.Vector3();

          const getSignedTriangleVolume = (Ax, Ay, Az, Bx, By, Bz, Cx, Cy, Cz) => {
            return (Ax * (By * Cz - Bz * Cy) + Ay * (Bz * Cx - Bx * Cz) + Az * (Bx * Cy - By * Cx)) / 6.0;
          };

          if (geometry.index) {
            const indices = geometry.index.array;
            for (let i = 0; i < indices.length; i += 3) {
              p1.fromBufferAttribute(position, indices[i]);
              p2.fromBufferAttribute(position, indices[i + 1]);
              p3.fromBufferAttribute(position, indices[i + 2]);
              vol += getSignedTriangleVolume(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
            }
          } else {
            for (let i = 0; i < position.count; i += 3) {
              p1.fromBufferAttribute(position, i);
              p2.fromBufferAttribute(position, i + 1);
              p3.fromBufferAttribute(position, i + 2);
              vol += getSignedTriangleVolume(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z, p3.x, p3.y, p3.z);
            }
          }
          return Math.abs(vol) / 1000; // แปลง mm³ เป็น cm³
        };

        const estimatedVolume = calculateRealVolume(geo);

        // Fix Orientation: Rotate geometry by -90 degrees on the X-axis so it stands upright
        geo.rotateX(-Math.PI / 2);

        // Center geometry first
        geo.center();

        // Compute bounding box after rotation
        geo.computeBoundingBox();
        const bbox = geo.boundingBox;
        const sizeX = bbox.max.x - bbox.min.x;
        const sizeY = bbox.max.y - bbox.min.y;
        const sizeZ = bbox.max.z - bbox.min.z;
        const height = sizeY;

        setGeometry(geo);
        setModelHeight(height);

        if (onVolumeCalculated) {
          onVolumeCalculated(estimatedVolume, { x: sizeX, y: sizeY, z: sizeZ });
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
              คลิกมุมต่างๆ บนลูกบาศก์ด้านขวาเพื่อปรับมุมมอง
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

      {/* Oversize Error Toast */}
      {showOversizeError && (
        <div className="absolute bottom-6 right-6 z-50 bg-[#E54D4D] text-white p-4 rounded-sm shadow-xl flex items-start w-[380px] max-w-[90vw]">
          <div className="mr-3 mt-0.5 shrink-0 relative">
            <div className="bg-[#E7E7E7] rounded-full w-8 h-8 flex items-center justify-center text-[#E54D4D] font-bold text-xl">
              !
            </div>
            <div className="absolute -bottom-1 -right-2 text-black">
              <svg width="24" height="10" viewBox="0 0 24 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 6 Q 6 2 10 6 T 18 6" stroke="#000" strokeWidth="1.5" fill="none" />
                <circle cx="18" cy="6" r="2" fill="#000" />
                <circle cx="19" cy="6" r="1" fill="#FFF" />
              </svg>
            </div>
          </div>
          <div className="flex-1 pr-6 font-sans text-[13.5px] leading-[1.4] tracking-wide text-[#fafafa]">
            <p className="mb-0">Error:</p>
            <p className="mb-0">An object is laid over the plate boundaries or exceeds the height limit.</p>
            <p className="mt-0.5">Please solve the problem by moving it totally on or off the plate, and confirming that the height is within the build volume.</p>
          </div>
          <button
            onClick={() => setShowOversizeError(false)}
            className="text-white hover:text-gray-200 shrink-0 absolute top-4 right-4"
            aria-label="Close"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
