import React from 'react';
import { UploadCloud, File, Layers, Droplet, MessageCircle, Info, AlertCircle } from 'lucide-react';

export const QUALITY_PRESETS = [
  { id: 'basic', name: 'ความละเอียดพื้นฐาน (Layer 0.2mm)', layerHeight: 0.2 },
  { id: 'low', name: 'ละเอียดน้อย (Layer 0.24mm)', layerHeight: 0.24 },
  { id: 'high', name: 'ละเอียดมาก (Layer 0.16mm)', layerHeight: 0.16 },
];

export const STRENGTH_PRESETS = [
  { id: 'low', name: 'ความแข็งแรงน้อย (15% Infill, 2 Walls)', walls: 2, infill: 15, volumeFactor: 0.35 },
  { id: 'medium', name: 'ความแข็งแรงปานกลาง (40% Infill, 3 Walls)', walls: 3, infill: 40, volumeFactor: 0.60 },
  { id: 'high', name: 'ความแข็งแรงสูง (60% Infill, 6 Walls)', walls: 6, infill: 60, volumeFactor: 0.85 },
];

export const MATERIALS = [
  { id: 'pla_3bees', name: 'PLA', density: 1.24, pricePerMin: 1.3, pricePerG: 2, vfrFactor: 1.0 },
  { id: 'petg_3bees', name: 'PETG', density: 1.29, pricePerMin: 1.25, pricePerG: 2, vfrFactor: 0.6 },
  { id: 'abs_3bees', name: 'ABS', density: 1.08, pricePerMin: 1.5, pricePerG: 3, vfrFactor: 0.6 },
  { id: 'placf_barefoot', name: 'PLA-CF', density: 1.24, pricePerMin: 1.75, pricePerG: 3, hidden: true, vfrFactor: 1.0 },
  { id: 'petgcf_barefoot', name: 'PETG-CF', density: 1.2, pricePerMin: 1.75, pricePerG: 3, hidden: true, vfrFactor: 0.6 },
  { id: 'htpla_polymaker', name: 'HT-PLA', density: 1.2, pricePerMin: 1.76, pricePerG: 3.2, vfrFactor: 1.0 },
  { id: 'absfr_sunlu', name: 'ABS-FR', density: 1.27, pricePerMin: 1.78, pricePerG: 3.4, vfrFactor: 0.6 },
  { id: 'pcpbt_threebees', name: 'PC-PBT', density: 1.24, pricePerMin: 1.78, pricePerG: 3.5, vfrFactor: 0.6 },
  { id: 'asa_polymaker', name: 'ASA', density: 1.27, pricePerMin: 1.8, pricePerG: 4, vfrFactor: 0.6 },
  { id: 'tpu95a_3bees', name: 'TPU 95A', density: 1.1, pricePerMin: 1.85, pricePerG: 4, hidden: true, vfrFactor: 0.3 },
  { id: 'pcabs_polymaker', name: 'PC-ABS', density: 1.1, pricePerMin: 4, pricePerG: 4, hidden: true, vfrFactor: 0.6 },
  { id: 'petcf17_fiberon', name: 'PET-CF17', density: 1.34, pricePerMin: 4, pricePerG: 4, hidden: true, vfrFactor: 0.6 },
  { id: 'pcpbtgf_polymaker', name: 'PC-PBT-GF', density: 1.04, pricePerMin: 4.5, pricePerG: 4.5, vfrFactor: 0.6 },
  { id: 'copa_polymaker', name: 'CoPA', density: 1.12, pricePerMin: 4.5, pricePerG: 4.5, hidden: true, vfrFactor: 0.6 },
  { id: 'pa6gf_polymaker', name: 'PA6-GF', density: 1.2, pricePerMin: 5.6, pricePerG: 5, hidden: true, vfrFactor: 0.6 },
  { id: 'pa6cf_polymaker', name: 'PA6-CF', density: 1.17, pricePerMin: 8, pricePerG: 7, hidden: true, vfrFactor: 0.6 },
  { id: 'pa12cf_polymaker', name: 'PA12-CF', density: 1.16, pricePerMin: 12.5, pricePerG: 9, hidden: true, vfrFactor: 0.6 },
  { id: 'pa12cf_3dxtech', name: 'PA12-CF (3DXTech)', density: 1.16, pricePerMin: 15, pricePerG: 9, hidden: true, vfrFactor: 0.6 },
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
  dimensions = { x: 0, y: 0, z: 0 },
  material, setMaterial,
  color, setColor,
  onFileChange,
  fileName
}) {
  const selectedMaterial = MATERIALS.find(m => m.id === material) || MATERIALS[0];
  const isPETG = selectedMaterial.id === 'petg_3bees';

  const [quality, setQuality] = React.useState('basic');
  const [strength, setStrength] = React.useState('medium');
  const [isColorDropdownOpen, setIsColorDropdownOpen] = React.useState(false);

  React.useEffect(() => {
    if (!isPETG && color !== '#222222') {
      setColor('#222222');
    }
  }, [isPETG, color, setColor]);

  const availableColors = isPETG ? COLORS : COLORS.filter(c => c.id === 'black');

  // Custom states added by user that were missing definitions
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [dropOpen, setDropOpen] = React.useState(false);

  // Oversized checking
  const isOversized = dimensions.x > 350 || dimensions.y > 350 || dimensions.z > 350;

  // Use props as defined previously
  const activeMat = material;
  const setActiveMat = setMaterial;
  const activeCol = color;
  const setActiveCol = setColor;

  const handleFile = (e) => {
    // Basic wrap to pass to App.jsx
    if (onFileChange) {
      onFileChange(e);
    }
  };

  const selectedQuality = QUALITY_PRESETS.find(q => q.id === quality) || QUALITY_PRESETS[0];
  const selectedStrength = STRENGTH_PRESETS.find(s => s.id === strength) || STRENGTH_PRESETS[1];

  // 1. ปริมาตรจริงจาก STL Mesh
  const finalVolume = volume;

  // 2. น้ำหนักชิ้นงาน = volume * density (ปรับตามความแข็งแรง)
  const objectVolume = finalVolume * selectedStrength.volumeFactor;
  const weightGrams = objectVolume * selectedMaterial.density;

  // 3. น้ำหนัก Support (18% ของปริมาตรเริ่มต้น)
  const supportVolume = finalVolume * 0.18;
  const supportGrams = supportVolume * selectedMaterial.density;
  const totalGrams = weightGrams + supportGrams;

  // 4. คำนวณเวลาพิมพ์
  const nominalSpeed = (0.35 * 310) + (0.42 * 500) + (0.23 * 240); // 373.7 mm/s
  const vfrFactor = selectedMaterial.vfrFactor || 1.0;
  const effectiveSpeed = nominalSpeed * 0.42 * vfrFactor;
  const flowCm3Min = (selectedQuality.layerHeight * 0.42) * effectiveSpeed * 60 / 1000;

  // เวลาพิมพ์ชิ้นงานและ support + 5 นาที (prep time)
  const objectTimeMins = finalVolume > 0 ? (objectVolume / flowCm3Min) : 0;
  const supportTimeMins = finalVolume > 0 ? (supportVolume / flowCm3Min) : 0;

  const estimatedMins = finalVolume > 0 ? (objectTimeMins + supportTimeMins) + 5 : 0;
  const estimatedHours = estimatedMins / 60;

  // 5. คำนวณราคา
  let printPrice = 0;
  let calculationMode = "";
  let modeLabel = "";

  if (finalVolume > 0) {
    if (estimatedHours < 24) {
      printPrice = estimatedMins * selectedMaterial.pricePerMin;
      calculationMode = "คิดตามเวลา (น้อยกว่า 24 ชม.)";
      modeLabel = "เวลา";
    } else {
      printPrice = totalGrams * selectedMaterial.pricePerG;
      calculationMode = "คิดตามน้ำหนัก (มากกว่า 24 ชม.)";
      modeLabel = "น้ำหนัก";
    }
  }

  // ราคาขั้นต่ำ 50 บาท (เฉพาะค่าพิมพ์)
  if (printPrice > 0 && printPrice < 50) {
    printPrice = 50;
  }

  // ราคารวม = ค่าพิมพ์ + ค่าจัดส่ง 50 บาท
  const rawBasePrice = finalVolume > 0 ? printPrice + 50 : 0;
  const basePrice = Math.ceil(rawBasePrice / 10) * 10;

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
    text += `- ความละเอียด: ${selectedQuality.name}\n`;
    text += `- ความแข็งแรง: ${selectedStrength.name}\n`;
    text += `- วัสดุ: ${selectedMaterial.name}\n`;
    text += `- สี: ${COLORS.find(c => c.hex === color)?.name || color}\n`;
    text += `- ปริมาตรเริ่มต้น: ${finalVolume.toFixed(2)} cm³\n`;
    text += `- น้ำหนักรวม (ชิ้นงาน + Support): ${totalGrams.toFixed(2)} g\n`;
    text += `- เวลาพิมพ์โดยประมาณ: ${Math.floor(estimatedHours)} ชม. ${Math.round(estimatedMins % 60)} นาที\n`;
    text += `- ราคาประเมินแอป: ${formatPrice(basePrice)} (รวมค่าส่ง 50฿)\n\n`;
    text += `รบกวนประเมินราคาจริงให้หน่อยจ้า\n\n`;
    text += `*(กรุณากดแนบไฟล์ 3D ให้ร้านอีกครั้งในแชทนี้ครับ)*`;

    const encodedText = encodeURIComponent(text);
    window.open(`https://m.me/IceBlazeLAB?text=${encodedText}`, '_blank');
  };

  const statRows = [
    ['ปริมาตร mesh จริง', volume > 0 ? `${volume.toFixed(3)} cm³` : '—'],
    ['น้ำหนักชิ้นงาน', volume > 0 ? `${weightGrams.toFixed(2)} g` : '—'],
    ['น้ำหนัก support', volume > 0 ? `+${supportGrams.toFixed(2)} g` : '—'],
    ['ความหนาแน่น', `${selectedMaterial.density} g/cm³`],
    ['เวลาพิมพ์ประมาณ', estimatedMins > 0 ? `${Math.floor(estimatedHours)} ชม. ${Math.round(estimatedMins % 60)} นาที` : '—'],
    ['Infill / Walls', `${selectedStrength.infill}% / ${selectedStrength.walls} walls`],
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-5 flex flex-col">
      <h3 className="text-xl font-bold border-b pb-4 flex items-center gap-2">
        <UploadCloud className="text-[#72D1B7]" /> อัปโหลดไฟล์ & คำนวณราคา
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">ไฟล์โมเดล 3D (.stl, .obj)</label>
        <div className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition-colors flex flex-col items-center justify-center cursor-pointer">
          <input type="file" accept=".stl,.obj" onChange={handleFile} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          {loading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-[#72D1B7] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">กำลังคำนวณปริมาตร…</p>
            </div>
          ) : (
            <>
              <File className="w-8 h-8 text-gray-400 mb-2" />
              <p className="text-sm font-medium text-gray-800 text-center">{fileName || 'คลิกหรือลากไฟล์มาวางที่นี่'}</p>
              {!fileName && <p className="text-xs text-gray-500 mt-1">รองรับ STL และ OBJ</p>}
              {volume > 0 && <p className="text-xs text-[#5bb89e] mt-1 font-semibold">✓ ปริมาตร: {volume.toFixed(3)} cm³</p>}
            </>
          )}
        </div>
        {error && <p className="mt-2 text-xs text-red-500 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1"><Layers className="w-4 h-4" />วัสดุ (Material)</label>
          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#72D1B7] focus:border-[#72D1B7] p-2.5 bg-gray-50 border" value={activeMat} onChange={e => setActiveMat(e.target.value)}>
            {MATERIALS.filter(m => !m.hidden).map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
            <Droplet className="w-4 h-4" />สี (Color)
            {!isPETG && <span className="text-xs text-red-500 ml-1">(มีเฉพาะสีดำ)</span>}
          </label>
          <div className="relative">
            <button type="button" disabled={!isPETG} onClick={() => setDropOpen(!dropOpen)}
              className="w-full border border-gray-300 rounded-lg shadow-sm p-2.5 bg-gray-50 flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full border border-gray-300 shadow-sm" style={{ backgroundColor: activeCol }} />
                <span className="font-medium text-gray-700">{COLORS.find(c => c.hex === activeCol)?.name || 'เลือกสี'}</span>
              </div>
              <svg className={`w-5 h-5 text-gray-400 transition-transform ${dropOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {dropOpen && isPETG && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setDropOpen(false)} />
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-60 overflow-y-auto">
                  {COLORS.map(c => (
                    <button key={c.id} type="button" onClick={() => { setActiveCol(c.hex); setDropOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 ${activeCol === c.hex ? 'bg-[#72D1B7]/10 text-[#5bb89e] font-bold' : 'text-gray-700'}`}>
                      <div className="w-6 h-6 rounded-full border border-gray-300 shadow-sm shrink-0" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                      {activeCol === c.hex && (
                        <svg className="w-4 h-4 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">ความละเอียด (Quality)</label>
          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#72D1B7] focus:border-[#72D1B7] p-2.5 bg-gray-50 border" value={quality} onChange={e => setQuality(e.target.value)}>
            {QUALITY_PRESETS.map(q => <option key={q.id} value={q.id}>{q.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">ความแข็งแรง (Strength)</label>
          <select className="w-full border-gray-300 rounded-lg shadow-sm focus:ring-[#72D1B7] focus:border-[#72D1B7] p-2.5 bg-gray-50 border" value={strength} onChange={e => setStrength(e.target.value)}>
            {STRENGTH_PRESETS.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
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
            <span className="text-gray-500 block mb-1">น้ำหนักชิ้นงาน / Support:</span>
            <span className="font-semibold text-gray-800">{weightGrams.toFixed(2)} g / {supportGrams.toFixed(2)} g</span>
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

        {volume > 0 && (
          <div className="flex items-center gap-1 text-xs text-[#5bb89e] mb-3">
            <Info className="w-3 h-3" /> คิดตาม{modeLabel}
          </div>
        )}

        <div className="flex justify-between items-center pt-2 pb-4">
          <span className="text-lg font-bold text-gray-800">ราคารวม (รวมค่าส่ง 50฿):</span>
          <span className="text-2xl font-black text-[#72D1B7]">{formatPrice(basePrice)}</span>
        </div>

        <button onClick={handleOrder} disabled={!fileName || !volume || isOversized}
          className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          <MessageCircle className="w-5 h-5" /> ส่งข้อมูลการสั่งทำ
        </button>
      </div>
    </div>
  );
}