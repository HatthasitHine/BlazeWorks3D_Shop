import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/layout/Footer';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';

export default function ForgotPassword({ setActiveTab }) {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsLoading(true);

    try {
      const res = await axios.post((import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/auth/forgot-password', { email });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
          <button 
            onClick={() => setActiveTab('Login')}
            className="flex items-center gap-1 text-gray-500 hover:text-gray-800 transition-colors mb-6 font-bold text-sm"
          >
            <ArrowLeft size={16} /> กลับไปหน้าเข้าสู่ระบบ
          </button>
          
          <h2 className="text-3xl font-black text-gray-800 text-center mb-2">ลืมรหัสผ่าน</h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            กรุณากรอกอีเมลที่ใช้สมัครสมาชิก เราจะส่งลิงก์สำหรับตั้งรหัสผ่านใหม่ไปให้คุณ
          </p>
          
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4">{error}</div>}
          {message && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-sm mb-4 font-bold">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !!message}
              className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
            >
              {isLoading ? 'กำลังส่ง...' : 'ส่งลิงก์กู้คืน'} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
