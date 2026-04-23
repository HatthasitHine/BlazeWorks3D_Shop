import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/layout/Footer';
import { User, Mail, Shield, LogOut, Eye, EyeOff, Lock } from 'lucide-react';

export default function Settings({ setActiveTab }) {
  const { user, logout } = useContext(AuthContext);
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    setActiveTab('Home');
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (newPassword !== confirmPassword) {
      setError('รหัสผ่านใหม่ไม่ตรงกัน');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/auth/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to change password');
      
      setMessage(data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-[calc(100vh-80px)] w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-500 mb-4">กรุณาเข้าสู่ระบบเพื่อดูการตั้งค่าบัญชี</p>
          <button onClick={() => setActiveTab('Login')} className="bg-[#72D1B7] text-white px-6 py-2 rounded-xl font-bold">
            ไปหน้าเข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between">
      <div className="max-w-4xl w-full mx-auto p-6 md:p-12">
        <h1 className="text-3xl font-black text-gray-800 mb-8">ตั้งค่าบัญชี (Account Settings)</h1>
        
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            
            <div>
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">โปรไฟล์ผู้ใช้</h3>
              <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{user.username}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1"><Mail size={14}/> {user.email}</p>
                </div>
              </div>
            </div>

            {user.role !== 'USER' && (
              <div>
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">สถานะบัญชี</h3>
                <div className="flex items-center gap-4 bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                    <Shield size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-800 text-lg">{user.role}</p>
                    <p className="text-sm text-emerald-600">สิทธิ์การใช้งานปัจจุบัน</p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              className="mt-6 flex items-center justify-center gap-2 px-6 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors w-full"
            >
              <LogOut size={18} /> ออกจากระบบ
            </button>

          </div>
          
          <div className="flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">เปลี่ยนรหัสผ่าน</h3>
            
            {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4">{error}</div>}
            {message && <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl text-sm mb-4">{message}</div>}

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">รหัสผ่านปัจจุบัน</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">รหัสผ่านใหม่</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Lock size={18} />
                  </div>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    required
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
                    className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
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
                className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 rounded-xl transition-all mt-4 disabled:opacity-50"
              >
                {isLoading ? 'กำลังบันทึก...' : 'บันทึกรหัสผ่านใหม่'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
