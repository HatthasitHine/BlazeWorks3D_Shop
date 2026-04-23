import React, { useState, useEffect } from 'react';
import Footer from '../components/layout/Footer';

// Images
import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';
import img6 from '../assets/images/6.jpg';
import img7 from '../assets/images/7.jpg';
import img8 from '../assets/images/8.jpg';
import img9 from '../assets/images/17.jpg';
import img10 from '../assets/images/15.jpg';
import img11 from '../assets/images/19.jpg';
import img12 from '../assets/images/10.jpg';
import img13 from '../assets/images/11.jpg';
import img14 from '../assets/images/20.jpg';
import img15 from '../assets/images/18.jpg';
import img16 from '../assets/images/16.jpg';

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

export default function Home() {
  const [galleryPage, setGalleryPage] = useState(0);
  const galleryItems = localGalleryItems;

  useEffect(() => {
    const galleryInterval = setInterval(() => {
      setGalleryPage(p => (p === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(galleryInterval);
  }, []);

  return (
    <div className="mt-0 overflow-hidden relative min-h-[calc(100vh-80px)] bg-gradient-to-r from-purple-100 via-white to-emerald-100 flex flex-col justify-between">
      <div className="pt-12 pb-20 px-4 sm:px-8 relative z-10 flex-1 flex flex-col justify-center">
        <div className="text-center mb-8 relative z-10">
          <p className="text-sm sm:text-base font-medium text-gray-600 mb-4">Fused Deposition Modeling</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold text-gray-900 tracking-tight leading-[1.15]">
            3D Printing Services
          </h1>
        </div>

        <div className="flex flex-nowrap md:justify-center items-center gap-4 sm:gap-6 md:gap-8 w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] pt-16 pb-20 px-8 relative z-10 overflow-x-auto snap-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {Array.from({ length: 8 }).map((_, idx) => {
            const itemPage0 = galleryItems[idx];
            const itemPage1 = galleryItems[idx + 8];
            const isEven = idx % 2 === 0;
            const translateY = isEven ? 'translate-y-6 md:translate-y-12' : '-translate-y-6 md:-translate-y-12';
            const dirs = ['-translate-y-full', 'translate-y-full', '-translate-x-full', 'translate-x-full'];
            const dirClass = dirs[idx % 4];

            return (
              <div key={idx} className={`relative w-40 h-64 md:w-64 md:h-96 -skew-x-[15deg] ${translateY} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group bg-white shrink-0`}>
                {/* Page 0 */}
                <div className={`absolute inset-[-15%] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
                  ${galleryPage === 0 ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${dirClass} scale-90`}`}>
                  <div className="w-full h-full skew-x-[15deg] scale-100"
                    style={{ backgroundImage: `url(${itemPage0.src})`, backgroundSize: 'cover', backgroundPosition: itemPage0.position || 'center' }} />
                  <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-500 skew-x-[15deg] scale-100"></div>
                </div>

                {/* Page 1 */}
                <div className={`absolute inset-[-15%] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] flex items-center justify-center
                  ${galleryPage === 1 ? 'opacity-100 translate-x-0 translate-y-0 scale-100' : `opacity-0 ${dirClass} scale-90`}`}>
                  <div className="w-full h-full skew-x-[15deg] scale-100"
                    style={{ backgroundImage: `url(${itemPage1.src})`, backgroundSize: 'cover', backgroundPosition: itemPage1.position || 'center' }} />
                  <div className="absolute inset-0 bg-black/5 hover:bg-transparent transition-colors duration-500 skew-x-[15deg] scale-100"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
}
