import React, { useState, useEffect, useContext } from 'react';
import { Activity, Loader, Trash2, Play, RotateCcw, CheckCircle, Pause } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/queue';

const authHeader = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export default function Queue() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'ADMIN';

  // Calculate timeRemaining from DB data
  const calcTimeRemaining = (q) => {
    if (q.status === 'PRINTING' && q.startTime) {
      const elapsed = Math.floor((Date.now() - new Date(q.startTime).getTime()) / 1000);
      return Math.max(0, q.estimatedSeconds - elapsed);
    }
    if (q.status === 'PAUSED') {
      return Math.max(0, q.estimatedSeconds - (q.elapsedSeconds || 0));
    }
    if (q.status === 'DONE') return 0;
    return q.estimatedSeconds;
  };

  const fetchQueue = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      const now = Date.now();
      const updated = res.data.map(q => {
        const timeRemaining = calcTimeRemaining(q);
        // If time ran out but DB still says PRINTING, auto-complete silently
        if (q.status === 'PRINTING' && timeRemaining === 0) {
          axios.patch(`${API_BASE_URL}/${q.id}/complete`, {}, authHeader()).catch(() => {});
          return { ...q, timeRemaining: 0, status: 'DONE' };
        }
        return { ...q, timeRemaining };
      });
      setQueues(updated);
    } catch (error) {
      console.error('Error fetching queue:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const timer = setInterval(() => {
      setQueues(prev =>
        prev.map(q => {
          if (q.status === 'PRINTING' && q.timeRemaining > 0) {
            const newTime = q.timeRemaining - 1;
            if (newTime === 0) {
              // Mark DONE locally and call API
              axios.patch(`${API_BASE_URL}/${q.id}/complete`, {}, authHeader()).catch(() => {});
              return { ...q, timeRemaining: 0, status: 'DONE' };
            }
            return { ...q, timeRemaining: newTime };
          }
          return q;
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const s = Math.max(0, Math.floor(seconds));
    const d = Math.floor(s / 86400);
    const h = Math.floor((s % 86400) / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    if (d > 0) return `${d}d ${h}h ${m}m ${sec}s`;
    return `${h}h ${m}m ${sec}s`;
  };

  // --- Admin Actions ---
  const handleStart = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/${id}/start`, {}, authHeader());
      fetchQueue();
    } catch (err) {
      alert(err.response?.data?.message || 'Error starting print');
    }
  };

  const handleStop = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/${id}/stop`, {}, authHeader());
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComplete = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/${id}/complete`, {}, authHeader());
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleReset = async (id) => {
    if (!window.confirm('รีเซ็ตคิวนี้กลับเป็น "รอพิมพ์" ใช่หรือไม่?')) return;
    try {
      await axios.patch(`${API_BASE_URL}/${id}/reset`, {}, authHeader());
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('ยืนยันการลบคิวนี้?')) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`, authHeader());
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  // --- Add Queue Form ---
  const [newQOrderId, setNewQOrderId] = useState('');
  const [newQDays, setNewQDays] = useState('');
  const [newQHours, setNewQHours] = useState('');
  const [newQMins, setNewQMins] = useState('');
  const [newQSecs, setNewQSecs] = useState('');

  const handleAddQueue = async (e) => {
    e.preventDefault();
    const d = Math.max(0, parseInt(newQDays) || 0);
    const h = Math.min(24, Math.max(0, parseInt(newQHours) || 0));
    const m = Math.min(60, Math.max(0, parseInt(newQMins) || 0));
    const s = Math.min(60, Math.max(0, parseInt(newQSecs) || 0));
    const totalSeconds = (d * 86400) + (h * 3600) + (m * 60) + s;
    if (totalSeconds <= 0) return;
    try {
      await axios.post(API_BASE_URL, { orderId: newQOrderId, estimatedSeconds: totalSeconds }, authHeader());
      setNewQOrderId(''); setNewQDays(''); setNewQHours(''); setNewQMins(''); setNewQSecs('');
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case 'PRINTING': return 'bg-blue-100 text-blue-700';
      case 'PAUSED': return 'bg-yellow-100 text-yellow-700';
      case 'DONE': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-orange-100 text-orange-700';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'PRINTING': return 'PRINTING';
      case 'PAUSED': return 'PAUSED';
      case 'DONE': return 'Complete';
      default: return 'WAIT FOR PRINT';
    }
  };

  const isAnyPrinting = queues.some(q => q.status === 'PRINTING');
  const firstWaiting = queues.find(q => q.status === 'WAIT FOR PRINT');

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-bl from-rose-100 via-rose-50 to-orange-100 relative z-10 flex flex-col justify-between">
      <div className="pt-16 pb-20 px-4 md:px-8 w-full flex flex-col items-center flex-1">
        <div className="w-full max-w-5xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">คิวงานปัจจุบัน (Live Queue)</h1>
              {isAdmin && (
                <form onSubmit={handleAddQueue} className="flex flex-wrap items-center gap-1.5 sm:gap-2 bg-white p-2.5 sm:p-3 rounded-xl border border-gray-200 shadow-sm">
                  <span className="text-sm font-bold text-gray-700 mr-1">+ เพิ่มคิว:</span>
                  <input type="text" placeholder="ชื่อ/รหัสออเดอร์" value={newQOrderId} onChange={(e) => setNewQOrderId(e.target.value)} className="w-[100px] sm:w-[140px] border border-gray-300 rounded-lg p-1.5 text-xs sm:text-sm" />
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
              )}
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
                  <th className="p-4 md:p-5">ชื่อ/รหัสออเดอร์</th>
                  <th className="p-4 md:p-5">สถานะ</th>
                  <th className="p-4 md:p-5 w-1/4">เวลาเหลือ</th>
                  {isAdmin && <th className="p-4 md:p-5 w-1/3">จัดการคิว</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={isAdmin ? '5' : '4'} className="p-8 text-center text-gray-400">กำลังโหลด...</td></tr>
                ) : queues.length === 0 ? (
                  <tr><td colSpan={isAdmin ? '5' : '4'} className="p-8 text-center text-gray-400">ตอนนี้ไม่มีคิวงาน ว่างพิมพ์ได้ทันที!</td></tr>
                ) : (
                  queues.map((q, index) => (
                    <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-center text-sm md:text-base">
                      <td className="p-4 md:p-5 font-bold text-gray-500 text-lg">{index + 1}</td>
                      <td className="p-4 md:p-5 font-medium text-gray-800">{q.orderId || '-'}</td>
                      <td className="p-4 md:p-5">
                        <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-bold ${getStatusStyle(q.status)}`}>
                          {q.status === 'PRINTING' && <Loader size={14} className="animate-spin" />}
                          {getStatusLabel(q.status)}
                        </span>
                      </td>
                      <td className={`p-4 md:p-5 font-mono text-lg md:text-xl font-bold ${q.status === 'DONE' ? 'text-emerald-500' : 'text-gray-700'}`}>
                        {formatTime(q.timeRemaining)}
                      </td>
                      {isAdmin && (
                        <td className="p-3 md:p-4">
                          <div className="flex flex-wrap gap-1.5 justify-center items-center">
                            {/* Complete Button */}
                            {(q.status === 'PRINTING' || q.status === 'PAUSED') && (
                              <button onClick={() => handleComplete(q.id)}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                                <CheckCircle size={13} /> Complete
                              </button>
                            )}
                            {/* Stop / Continue Button */}
                            {q.status === 'PRINTING' && (
                              <button onClick={() => handleStop(q.id)}
                                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                                <Pause size={13} /> Stop
                              </button>
                            )}
                            {q.status === 'PAUSED' && (
                              <button onClick={() => handleStart(q.id)} disabled={isAnyPrinting}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 disabled:opacity-40">
                                <Play size={13} /> Continue
                              </button>
                            )}
                            {/* Start Print Button (WAIT FOR PRINT only, no active printing) */}
                            {q.status === 'WAIT FOR PRINT' && !isAnyPrinting && (
                              <button onClick={() => handleStart(q.id)}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                                <Play size={13} /> เริ่มพิมพ์
                              </button>
                            )}
                            {/* Reset Button */}
                            {(q.status === 'PRINTING' || q.status === 'PAUSED' || q.status === 'WAIT FOR PRINT') && (
                              <button onClick={() => handleReset(q.id)}
                                className="bg-gray-100 text-gray-600 hover:bg-orange-100 hover:text-orange-600 px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                                <RotateCcw size={13} /> Reset
                              </button>
                            )}
                            {/* Delete Button */}
                            <button onClick={() => handleDelete(q.id)}
                              className="bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-600 px-2.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1">
                              <Trash2 size={13} /> ลบ
                            </button>
                          </div>
                        </td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
