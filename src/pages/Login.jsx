import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/layout/Footer';
import { User, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

export default function Login({ setActiveTab }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/api/auth/login', { username, password });
      login(res.data.token, res.data.user);
      setActiveTab('Home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gradient-to-br from-blue-50 to-emerald-50 flex flex-col justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 w-full max-w-md">
          <h2 className="text-3xl font-black text-gray-800 text-center mb-6">เข้าสู่ระบบ</h2>
          
          {error && <div className="bg-red-50 text-red-500 p-3 rounded-xl text-sm mb-4">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#72D1B7] focus:border-[#72D1B7] transition-all"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
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

            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={() => setActiveTab('ForgotPassword')}
                className="text-sm font-bold text-[#72D1B7] hover:underline"
              >
                ลืมรหัสผ่าน?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#72D1B7] hover:bg-[#5bb89e] text-white font-bold py-3 rounded-xl transition-all flex justify-center items-center gap-2 mt-4 disabled:opacity-50"
            >
              {isLoading ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'} <ArrowRight size={18} />
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            ยังไม่มีบัญชีใช่ไหม?{' '}
            <button onClick={() => setActiveTab('Register')} className="text-[#72D1B7] font-bold hover:underline">
              สมัครสมาชิกเลย
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
