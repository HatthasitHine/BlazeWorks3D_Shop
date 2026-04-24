import React, { useState, useEffect, useContext } from 'react';
import { Activity, Loader, Trash2, Play, RotateCcw } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/queue';

export default function Queue() {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const isAdmin = user && user.role === 'ADMIN';

  const fetchQueue = async () => {
    try {
      const res = await axios.get(API_BASE_URL);
      // Map and calculate initial timeRemaining
      const now = new Date().getTime();
      const updated = res.data.map(q => {
        let timeRemaining = q.estimatedSeconds;
        if (q.status === 'PRINTING' && q.startTime) {
          const elapsed = Math.floor((now - new Date(q.startTime).getTime()) / 1000);
          timeRemaining = Math.max(0, q.estimatedSeconds - elapsed);
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
      setQueues(prev => {
        const next = prev.map(q => {
          if (q.status === 'PRINTING' && q.timeRemaining > 0) {
            const newTime = q.timeRemaining - 1;
            // If just finished, we can trigger completion or just wait for next fetch
            if (newTime === 0) {
              handleAutoComplete(q.id);
            }
            return { ...q, timeRemaining: newTime };
          }
          return q;
        });
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAutoComplete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/${id}/complete`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Optionally re-fetch
    } catch (err) {
      console.error('Error completing job:', err);
    }
  };

  const formatTime = (seconds) => {
    const d = Math.floor(seconds / 86400);
    const h = Math.floor((seconds % 86400) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (d > 0) return `${d}d ${h}h ${m}m ${s}s`;
    return `${h}h ${m}m ${s}s`;
  };

  const handleConfirmPrint = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/${id}/start`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQueue();
    } catch (err) {
      alert(err.response?.data?.message || 'Error starting print');
    }
  };

  const handleCancelPrint = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/${id}/reset`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteQueue = async (id) => {
    if (!window.confirm('ยืนยันการลบคิวนี้?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_BASE_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

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
      const token = localStorage.getItem('token');
      await axios.post(API_BASE_URL, {
        orderId: newQOrderId,
        estimatedSeconds: totalSeconds
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setNewQOrderId('');
      setNewQDays('');
      setNewQHours('');
      setNewQMins('');
      setNewQSecs('');
      fetchQueue();
    } catch (err) {
      console.error(err);
    }
  };

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
                  {isAdmin && <th className="p-4 md:p-5 w-1/4">จัดการคิว</th>}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={isAdmin ? "5" : "4"} className="p-8 text-center text-gray-400">กำลังโหลด...</td></tr>
                ) : queues.length === 0 ? (
                  <tr><td colSpan={isAdmin ? "5" : "4"} className="p-8 text-center text-gray-400">ตอนนี้ไม่มีคิวงาน ว่างพิมพ์ได้ทันที!</td></tr>
                ) : (
                  queues.map((q, index) => {
                    return (
                      <tr key={q.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors text-center text-sm md:text-base">
                        <td className="p-4 md:p-5 font-bold text-gray-500 text-lg">{index + 1}</td>
                        <td className="p-4 md:p-5 font-medium text-gray-800">{q.orderId || '-'}</td>
                        <td className="p-4 md:p-5">
                          <span className={`inline-flex items-center justify-center gap-1.5 px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs font-bold ${q.status === 'PRINTING' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'}`}>
                            {q.status === 'PRINTING' && <Loader size={14} className="animate-spin" />}
                            {q.status}
                          </span>
                        </td>
                        <td className="p-4 md:p-5 font-mono text-lg md:text-xl font-bold text-gray-700">
                          {formatTime(q.timeRemaining)}
                        </td>
                        {isAdmin && (
                          <td className="p-4 md:p-5 flex flex-col sm:flex-row gap-2 justify-center items-center">
                            {q.status === 'PRINTING' ? (
                              <button onClick={() => handleCancelPrint(q.id)} className="bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition flex items-center gap-1">
                                <RotateCcw size={14} /> รีเซ็ต
                              </button>
                            ) : (
                              <>
                                {index === 0 && !queues.some(item => item.status === 'PRINTING') && (
                                  <button onClick={() => handleConfirmPrint(q.id)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition flex items-center gap-1">
                                    <Play size={14} /> เริ่มพิมพ์
                                  </button>
                                )}
                                <button onClick={() => handleDeleteQueue(q.id)} className="bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 px-3 py-1.5 rounded-lg text-xs md:text-sm font-bold transition flex items-center gap-1">
                                  <Trash2 size={14} /> ลบ
                                </button>
                              </>
                            )}
                          </td>
                        )}
                      </tr>
                    );
                  })
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
