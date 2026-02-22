import React from 'react';
import { UploadCloud, File, Layers, Droplet, MessageCircle } from 'lucide-react';

export const MATERIALS = [
  { id: 'pla_3bees', name: 'PLA', density: 1.24, pricePerMin: 1.3, pricePerG: 2 },
  { id: 'petg_3bees', name: 'PETG', density: 1.29, pricePerMin: 1.25, pricePerG: 2 },
  { id: 'abs_3bees', name: 'ABS', density: 1.08, pricePerMin: 1.5, pricePerG: 3 },
  { id: 'placf_barefoot', name: 'PLA-CF', density: 1.24, pricePerMin: 1.75, pricePerG: 3 },
  { id: 'petgcf_barefoot', name: 'PETG-CF', density: 1.2, pricePerMin: 1.75, pricePerG: 3 },
  { id: 'htpla_polymaker', name: 'HT-PLA', density: 1.2, pricePerMin: 1.76, pricePerG: 3.2 },
  { id: 'absfr_sunlu', name: 'ABS-FR', density: 1.27, pricePerMin: 1.78, pricePerG: 3.4 },
  { id: 'pcpbt_threebees', name: 'PC-PBT', density: 1.24, pricePerMin: 1.78, pricePerG: 3.5 },
  { id: 'asa_polymaker', name: 'ASA', density: 1.27, pricePerMin: 1.8, pricePerG: 4 },
  { id: 'tpu95a_3bees', name: 'TPU 95A', density: 1.1, pricePerMin: 1.85, pricePerG: 4 },
  { id: 'pcabs_polymaker', name: 'PC-ABS', density: 1.1, pricePerMin: 4, pricePerG: 4 },
  { id: 'petcf17_fiberon', name: 'PET-CF17', density: 1.34, pricePerMin: 4, pricePerG: 4 },
  { id: 'pcpbtgf_polymaker', name: 'PC-PBT-GF', density: 1.04, pricePerMin: 4.5, pricePerG: 4.5 },
  { id: 'copa_polymaker', name: 'CoPA', density: 1.12, pricePerMin: 4.5, pricePerG: 4.5 },
  { id: 'pa6gf_polymaker', name: 'PA6-GF', density: 1.2, pricePerMin: 5.6, pricePerG: 5 },
  { id: 'pa6cf_polymaker', name: 'PA6-CF', density: 1.17, pricePerMin: 8, pricePerG: 7 },
  { id: 'pa12cf_polymaker', name: 'PA12-CF', density: 1.16, pricePerMin: 12.5, pricePerG: 9 },
  { id: 'pa12cf_3dxtech', name: 'PA12-CF', density: 1.16, pricePerMin: 15, pricePerG: 9 },
];

export const COLORS = [
  { id: 'yellow', name: 'เหลือง', hex: '#FFD700' },
  { id: 'cream', name: 'ครีม', hex: '#FFFDD0' },
  { id: 'darkpink', name: 'ชมพูเข้ม', hex: '#FF1493' },
  { id: 'lightgray', name: 'เทาอ่อน', hex: '#D3D3D3' },
  { id: 'skyblue', name: 'ฟ้า', hex: '#87CEEB' },
  { id: 'mint', name: 'มิ้นต์', hex: '#98FF98' },
  { id: 'neongreen', name: 'เขียวนีออน', hex: '#39FF14' },
  { id: 'blue', name: 'น้ำเงิน', hex: '#0000FF' },
  { id: 'lightpink', name: 'ชมพูอ่อน', hex: '#FFB6C1' },
  { id: 'red', name: 'แดง', hex: '#FF0000' },
  { id: 'green', name: 'เขียว', hex: '#008000' },
  { id: 'lightblue', name: 'น้ำเงินอ่อน', hex: '#ADD8E6' },
  { id: 'orange', name: 'ส้ม', hex: '#FFA500' },
  { id: 'white', name: 'ขาว', hex: '#FFFFFF' },
  { id: 'black', name: 'ดำ', hex: '#222222' },
  { id: 'brown', name: 'น้ำตาล', hex: '#8B4513' },
  { id: 'yellowgreen', name: 'เขียวตองอ่อน', hex: '#ADFF2F' },
  { id: 'lightbrown', name: 'น้ำตาลอ่อน', hex: '#D2B48C' },
  { id: 'gold', name: 'ทอง', hex: '#FFD700' },
  { id: 'darkbrown', name: 'น้ำตาลเข้ม', hex: '#654321' },
  { id: 'darkgray', name: 'เทาเข้ม', hex: '#A9A9A9' },
];

export default function PricingConfigurator({ 
  volume, 
  material, setMaterial, 
  color, setColor, 
  onFileChange,
  fileName
}) {
  const selectedMaterial = MATERIALS.find(m => m.id === material) || MATERIALS[0];
  const isPETG = selectedMaterial.id === 'petg_3bees';
  const [isColorDropdownOpen, setIsColorDropdownOpen] = React.useState(false);

  React.useEffect(() => {
     if (!isPETG && color !== '#222222') {
        setColor('#222222');
     }
  }, [isPETG, color, setColor]);

  const availableColors = isPETG ? COLORS : COLORS.filter(c => c.id === 'black');
  
  // Volume is used directly since scale feature is removed
  const finalVolume = volume;
  
  // Calculate weight: Volume (cm^3) * Density (g/cm^3)
  const weightGrams = finalVolume * selectedMaterial.density;
  
  // Estimate print time: Roughly assume 6 minutes per gram for standard infill/quality
  // In a real application, this should be sent to a slicer engine.
  const estimatedMins = weightGrams * 6;
  const estimatedHours = estimatedMins / 60;

  // Calculate Price
  let basePrice = 0;
  let calculationMode = "";
  
  if (finalVolume > 0) {
    if (estimatedHours < 24) {
      basePrice = estimatedMins * selectedMaterial.pricePerMin;
      calculationMode = "คิดตามเวลา (น้อยกว่า 24 ชม.)";
    } else {
      basePrice = weightGrams * selectedMaterial.pricePerG;
      calculationMode = "คิดตามน้ำหนัก (มากกว่า 24 ชม.)";
    }
  }

  // Minimum price 50 THB
  if (basePrice > 0 && basePrice < 50) basePrice = 50;

  const formatPrice = (price) => {
    return price.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });
  };

  // Send Order info to Messenger
  const handleOrder = () => {
    if (!fileName || finalVolume === 0) {
      alert("กรุณาอัปโหลดไฟล์ 3D ก่อนทำการสั่งทำ");
      return;
    }

    let text = `สนใจสั่งพิมพ์ 3D\n`;
    text += `- ไฟล์: ${fileName}\n`;
    text += `- วัสดุ: ${selectedMaterial.name}\n`;
    text += `- สี: ${COLORS.find(c => c.hex === color)?.name || color}\n`;
    text += `- ปริมาตร: ${finalVolume.toFixed(2)} cm³\n`;
    text += `- ราคาประเมินแอป: ${formatPrice(basePrice)}\n\n`;
    text += `รบกวนประเมินราคาจริงให้หน่อยจ้า\n\n`;
    text += `*(กรุณากดแนบไฟล์ 3D ให้ร้านอีกครั้งในแชทนี้ครับ)*`;
    
    const encodedText = encodeURIComponent(text);
    window.open(`https://m.me/IceBlazeLAB?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6 flex flex-col h-[775px]">
      <h3 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
        <UploadCloud className="text-[#72D1B7]" />
        อัปโหลดไฟล์ & คำนวณราคา
      </h3>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ไฟล์โมเดล 3D (.stl, .obj)</label>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
          <input 
            type="file" 
            accept=".stl,.obj" 
            onChange={onFileChange} 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <File className="w-8 h-8 text-gray-400 mb-2" />
          <p className="text-sm font-medium text-gray-800 text-center">
            {fileName ? fileName : 'คลิกหรือลากไฟล์มาวางที่นี่'}
          </p>
          {!fileName && <p className="text-xs text-gray-500 mt-1">รองรับ STL และ OBJ</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Material */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Layers className="w-4 h-4"/> วัสดุ (Material)</label>
          <select 
            className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#72D1B7] focus:border-[#72D1B7] p-2.5 bg-gray-50 border"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
          >
            {MATERIALS.map(m => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </div>

        {/* Color */}
        <div>
           <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
             <Droplet className="w-4 h-4"/> สี (Color) 
             {!isPETG && <span className="text-xs text-red-500 ml-1">(วัสดุนี้มีเฉพาะสีดำ)</span>}
           </label>
           
           <div className="relative">
             {/* ปุ่ม Dropdown ปัจจุบัน */}
             <button 
               type="button"
               disabled={!isPETG}
               onClick={() => setIsColorDropdownOpen(!isColorDropdownOpen)}
               className="w-full border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] p-2.5 bg-gray-50 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed transition-all"
             >
               <div className="flex items-center gap-3">
                 <div className="w-6 h-6 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: color }}></div>
                 <span className="font-medium text-gray-700">{COLORS.find(c => c.hex === color)?.name || 'เลือกสี'}</span>
               </div>
               <svg className={`w-5 h-5 text-gray-400 transition-transform ${isColorDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
               </svg>
             </button>

             {/* รายการสี Dropdown */}
             {isColorDropdownOpen && isPETG && (
               <>
                 {/* Backdrop ใสๆ สำหรับคลิกเพื่อปิด */}
                 <div className="fixed inset-0 z-10" onClick={() => setIsColorDropdownOpen(false)}></div>
                 
                 <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto no-scrollbar">
                   {availableColors.map(c => (
                     <button
                       key={c.id}
                       type="button"
                       onClick={() => {
                         setColor(c.hex);
                         setIsColorDropdownOpen(false);
                       }}
                       className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors ${color === c.hex ? 'bg-[#72D1B7]/10 text-[#5bb89e] font-bold' : 'text-gray-700'}`}
                     >
                       <div className="w-6 h-6 rounded-full border border-gray-300 shadow-sm shrink-0" style={{ backgroundColor: c.hex }}></div>
                       <span>{c.name}</span>
                       {color === c.hex && (
                         <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/>
                         </svg>
                       )}
                     </button>
                   ))}
                 </div>
               </>
             )}
           </div>
        </div>
      </div>

      {/* Price Summary */}
      <div className="mt-8 bg-[#72D1B7]/10 rounded-lg p-5 border border-[#72D1B7]/20">
        <div className="grid grid-cols-2 gap-4 mb-3 text-sm border-b border-[#72D1B7]/30 pb-3">
          <div>
             <span className="text-gray-500 block mb-1">ปริมาตร:</span>
             <span className="font-semibold text-gray-800">{finalVolume.toFixed(2)} cm³</span>
          </div>
          <div>
             <span className="text-gray-500 block mb-1">น้ำหนักชิ้นงาน:</span>
             <span className="font-semibold text-gray-800">{weightGrams.toFixed(2)} g</span>
          </div>
          <div>
             <span className="text-gray-500 block mb-1">ความหนาแน่น:</span>
             <span className="font-semibold text-gray-800">{selectedMaterial.density} g/cm³</span>
          </div>
          <div>
             <span className="text-gray-500 block mb-1">เวลาพิมพ์โดยประมาณ:</span>
             <span className="font-semibold text-gray-800">
               {estimatedHours > 0 ? `${Math.floor(estimatedHours)} ชม. ${Math.round(estimatedMins % 60)} นาที` : '-'}
             </span>
          </div>
        </div>
        
        {finalVolume > 0 && (
          <div className="text-right mb-2 flex justify-between items-center text-xs text-[#5bb89e]">
            <span>เงื่อนไขราคา: {calculationMode}</span>
            <span>เรตราคา: {estimatedHours < 24 ? `${selectedMaterial.pricePerMin} ฿/นาที` : `${selectedMaterial.pricePerG} ฿/กรัม`}</span>
          </div>
        )}

        <div className="flex justify-between items-center pt-2 pb-4">
          <span className="text-lg font-bold text-gray-800">ราคารวม (เริ่มต้น):</span>
          <span className="text-2xl font-black text-[#72D1B7]">{formatPrice(basePrice)}</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
           <button 
             onClick={handleOrder}
             disabled={!fileName || finalVolume === 0}
             className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
           >
              <MessageCircle className="w-5 h-5" />
              ส่งข้อมูลการสั่งทำ
           </button>
        </div>
      </div>
      
    </div>
  );
}
