import React from 'react';
import { UploadCloud, File, Layers, Droplet, MessageCircle, Info, AlertCircle } from 'lucide-react';

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
  { id: 'pa12cf_3dxtech', name: 'PA12-CF (3DXTech)', density: 1.16, pricePerMin: 15, pricePerG: 9 },
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

const FILL_FACTOR = 0.45;
const SUPPORT_FACTOR = 0.18;
const SHIPPING = 50;
const FLOW_CM3_MIN = (0.2 * 0.42) * (373.7 * 0.42) * 60 / 1000;

const fmt = p => p.toLocaleString('th-TH', { style: 'currency', currency: 'THB' });

function tetraVol(ax, ay, az, bx, by, bz, cx, cy, cz) {
  return (ax * (by * cz - bz * cy) + ay * (bz * cx - bx * cz) + az * (bx * cy - by * cx)) / 6;
}

function parseBinarySTL(buf) {
  const v = new DataView(buf);
  const n = v.getUint32(80, true);
  if (buf.byteLength < 84 + n * 50) return null;
  let vol = 0;
  for (let i = 0; i < n; i++) {
    const b = 84 + i * 50 + 12;
    vol += tetraVol(
      v.getFloat32(b, true), v.getFloat32(b + 4, true), v.getFloat32(b + 8, true),
      v.getFloat32(b + 12, true), v.getFloat32(b + 16, true), v.getFloat32(b + 20, true),
      v.getFloat32(b + 24, true), v.getFloat32(b + 28, true), v.getFloat32(b + 32, true),
    );
  }
  return Math.abs(vol) / 1000;
}

function parseASCIISTL(text) {
  const re = /vertex\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)\s+([\d.eE+\-]+)/g;
  const verts = [];
  let r;
  while ((r = re.exec(text))) verts.push([+r[1], +r[2], +r[3]]);
  if (verts.length % 3) return null;
  let vol = 0;
  for (let i = 0; i < verts.length; i += 3)
    vol += tetraVol(...verts[i], ...verts[i + 1], ...verts[i + 2]);
  return Math.abs(vol) / 1000;
}

async function getVolume(file) {
  const buf = await file.arrayBuffer();
  if (file.name.endsWith('.obj')) {
    const lines = new TextDecoder().decode(buf).split('\n');
    const verts = [];
    let vol = 0;
    for (const line of lines) {
      const p = line.trim().split(/\s+/);
      if (p[0] === 'v') verts.push([+p[1], +p[2], +p[3]]);
      else if (p[0] === 'f') {
        const idx = p.slice(1).map(x => parseInt(x) - 1);
        for (let i = 1; i < idx.length - 1; i++) {
          const [a, b, c] = [verts[idx[0]], verts[idx[i]], verts[idx[i + 1]]];
          if (a && b && c) vol += tetraVol(...a, ...b, ...c);
        }
      }
    }
    return Math.abs(vol) / 1000;
  }
  const header = String.fromCharCode(...new Uint8Array(buf, 0, 5)).toLowerCase();
  if (header.startsWith('solid')) {
    const n = new DataView(buf).getUint32(80, true);
    if (84 + n * 50 === buf.byteLength) return parseBinarySTL(buf);
    return parseASCIISTL(new TextDecoder().decode(buf));
  }
  return parseBinarySTL(buf);
}

export default function PricingConfigurator({ material, setMaterial, color, setColor }) {
  const [mat, setMat] = React.useState('pla_3bees');
  const [col, setCol] = React.useState('#222222');
  const [fileName, setFileName] = React.useState('');
  const [volume, setVolume] = React.useState(0);
  const [error, setError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [dropOpen, setDropOpen] = React.useState(false);

  const activeMat = material ?? mat;
  const setActiveMat = setMaterial ?? setMat;
  const activeCol = color ?? col;
  const setActiveCol = setColor ?? setCol;

  const sel = MATERIALS.find(m => m.id === activeMat) || MATERIALS[0];
  const isPETG = sel.id === 'petg_3bees';

  React.useEffect(() => { if (!isPETG) setActiveCol('#222222'); }, [isPETG]);

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name); setVolume(0); setError(''); setLoading(true);
    try {
      const vol = await getVolume(file);
      if (!vol || vol < 0.001) throw new Error('ปริมาตรน้อยเกินไป – ไฟล์อาจไม่ถูกต้อง');
      setVolume(vol);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const weightG = volume * sel.density;
  const supportG = volume * SUPPORT_FACTOR * 1.24;
  const totalG = weightG + supportG;
  const mins = volume > 0 ? (volume * (FILL_FACTOR + SUPPORT_FACTOR)) / FLOW_CM3_MIN + 5 : 0;
  const hrs = mins / 60;

  let printPrice = 0, modeLabel = '';
  if (volume > 0) {
    if (hrs < 24) { printPrice = mins * sel.pricePerMin; modeLabel = `เวลา @ ${sel.pricePerMin} ฿/นาที`; }
    else { printPrice = totalG * sel.pricePerG; modeLabel = `น้ำหนัก @ ${sel.pricePerG} ฿/กรัม`; }
  }
  if (printPrice > 0 && printPrice < 50) printPrice = 50;
  const total = printPrice > 0 ? printPrice + SHIPPING : 0;

  const handleOrder = () => {
    if (!fileName || !volume) return alert('กรุณาอัปโหลดไฟล์ 3D ก่อน');
    const text = [
      'สนใจสั่งพิมพ์ 3D',
      `- ไฟล์: ${fileName}`,
      `- วัสดุ: ${sel.name}`,
      `- สี: ${COLORS.find(c => c.hex === activeCol)?.name || activeCol}`,
      `- ปริมาตร: ${volume.toFixed(3)} cm³`,
      `- น้ำหนัก: ${totalG.toFixed(2)} g (รวม support)`,
      `- ราคาประเมิน: ${fmt(total)} (รวมค่าส่ง ${fmt(SHIPPING)})`,
      '', 'รบกวนประเมินราคาจริงให้หน่อยจ้า',
      '*(กรุณาแนบไฟล์ 3D ในแชทนี้ด้วยครับ)*',
    ].join('\n');
    window.open(`https://m.me/IceBlazeLAB?text=${encodeURIComponent(text)}`, '_blank');
  };

  const statRows = [
    ['ปริมาตร mesh จริง', volume > 0 ? `${volume.toFixed(3)} cm³` : '—'],
    ['น้ำหนักชิ้นงาน', volume > 0 ? `${weightG.toFixed(2)} g` : '—'],
    ['น้ำหนัก support', volume > 0 ? `+${supportG.toFixed(2)} g` : '—'],
    ['ความหนาแน่น', `${sel.density} g/cm³`],
    ['เวลาพิมพ์ประมาณ', mins > 0 ? `${Math.floor(hrs)} ชม. ${Math.round(mins % 60)} นาที` : '—'],
    ['Infill / Walls', '20% / 2 walls'],
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
            {MATERIALS.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
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

      <div className="bg-[#72D1B7]/10 rounded-lg p-5 border border-[#72D1B7]/20">
        <div className="grid grid-cols-2 gap-3 mb-3 text-sm border-b border-[#72D1B7]/30 pb-3">
          {statRows.map(([label, val]) => (
            <div key={label}>
              <span className="text-gray-500 block mb-0.5">{label}:</span>
              <span className="font-semibold text-gray-800">{val}</span>
            </div>
          ))}
        </div>

        {volume > 0 && (
          <div className="flex items-center gap-1 text-xs text-[#5bb89e] mb-3">
            <Info className="w-3 h-3" /> คิดตาม{modeLabel}
          </div>
        )}

        <div className="space-y-1 mb-3 text-sm text-gray-600">
          <div className="flex justify-between"><span>ค่าพิมพ์</span><span className="font-semibold text-gray-800">{fmt(printPrice)}</span></div>
          <div className="flex justify-between"><span>ค่าจัดส่ง</span><span className="font-semibold text-gray-800">{fmt(SHIPPING)}</span></div>
        </div>

        <div className="flex justify-between items-center pt-2 pb-3 border-t border-[#72D1B7]/30">
          <span className="text-lg font-bold text-gray-800">ราคารวม (เริ่มต้น):</span>
          <span className="text-2xl font-black text-[#72D1B7]">{fmt(total)}</span>
        </div>

        <button onClick={handleOrder} disabled={!fileName || !volume}
          className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
          <MessageCircle className="w-5 h-5" /> ส่งข้อมูลการสั่งทำ
        </button>
      </div>
    </div>
  );
}