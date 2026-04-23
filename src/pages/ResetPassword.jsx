import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from '../components/layout/Footer';
import { Lock, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';

export default function ResetPassword({ setActiveTab, initialToken }) {
  const [token, setToken] = useState(initialToken || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (initialToken) {
      setToken(initialToken);
    }
  }, [initialToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (!token) {
      setError('ไม่พบ Token สำหรับรีเซ็ตรหัสผ่าน กรุณากดลิงก์จากอีเมลอีกครั้ง');
      return;
    }

    if (password !== confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน');
      return;
    }

    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/auth/reset-password', { token, newPassword: password });
      setMessage(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || 'เกิดข้อผิดพลาด หรือลิงก์หมดอายุแล้ว');
    } finally {
      setIsLoading(false);
    }
  };

  if (message) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col justify-between">
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md text-center">
            <CheckCircle className="mx-auto text-emerald-500 mb-4" size={48} />
            <h2 className="text-2xl font-black text-gray-800 mb-2">สำเร็จ!</h2>
            <p className="text-gray-600 mb-6">{message}</p>
            <button
              onClick={() => setActiveTab('Login')}
              className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 rounded-xl transition-all"
            >
              ไปหน้าเข้าสู่ระบบ
            </button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-2">ตั้งรหัสผ่านใหม่</h2>
          <p className="text-gray-500 text-center text-sm mb-6">
            กรุณากรอกรหัสผ่านใหม่ที่คุณต้องการ
          </p>
          
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">รหัสผ่านใหม่</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">ยืนยันรหัสผ่านใหม่</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  className="w-full pl-10 pr-10 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
            >
              {isLoading ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่'} <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
