import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import Footer from '../components/layout/Footer';
import { Activity, Clock, Users, BarChart2, Trash2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6', '#F97316'];

export default function Dashboard({ setActiveTab }) {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({ pageStats: [], totalViews: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get((import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/analytics/stats', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setStats(res.data);
    } catch (error) {
      console.error('Error fetching analytics stats', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'ADMIN') {
      setActiveTab('Home');
      return;
    }

    fetchStats();
    
    // Auto refresh every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [user, setActiveTab]);

  const handleReset = async () => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตสถิติทั้งหมด? การกระทำนี้ไม่สามารถกู้คืนได้')) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete((import.meta.env.VITE_API_URL || 'http://localhost:3001') + '/api/analytics/reset', {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('รีเซ็ตข้อมูลสถิติเรียบร้อยแล้ว');
        fetchStats(); // Refresh data
      } catch (error) {
        console.error('Error resetting analytics', error);
        alert('เกิดข้อผิดพลาดในการรีเซ็ตข้อมูล');
      }
    }
  };

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">กำลังโหลดข้อมูล...</div>;
  }

  // Calculate highest viewed page and longest duration page
  let topPage = { page: '-', views: 0 };
  let longestPage = { page: '-', avgDuration: 0 };

  stats.pageStats.forEach(stat => {
    if (stat.views > topPage.views) topPage = stat;
    if (stat.avgDuration > longestPage.avgDuration) longestPage = stat;
  });

  return (
    <div className="min-h-[calc(100vh-80px)] w-full bg-gray-50 flex flex-col justify-between">
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="text-3xl font-black text-gray-800 flex items-center gap-3">
            <BarChart2 className="text-[#72D1B7]" size={32} />
            ภาพรวมระบบ (Analytics)
          </h1>
          <button 
            onClick={handleReset}
            className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-xl font-bold transition-all border border-red-200 shadow-sm"
          >
            <Trash2 size={18} /> ล้างสถิติใหม่
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-500 uppercase">ยอดเข้าชมรวมทั้งหมด</p>
              <p className="text-3xl font-black text-gray-800">{stats.totalViews} <span className="text-lg font-medium text-gray-500">ครั้ง</span></p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0">
              <Activity size={28} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-500 uppercase truncate">หน้าที่มีคนเข้าเยอะสุด</p>
              <p className="text-2xl font-black text-gray-800 truncate">{topPage.page}</p>
              <p className="text-sm text-gray-500">{topPage.views} ครั้ง</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center shrink-0">
              <Clock size={28} />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-gray-500 uppercase truncate">หน้าที่คนใช้นานที่สุด</p>
              <p className="text-2xl font-black text-gray-800 truncate">{longestPage.page}</p>
              <p className="text-sm text-gray-500">เฉลี่ย {longestPage.avgDuration} วินาที</p>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          
          {/* Bar Chart: Views per Page */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">ยอดเข้าชมแยกตามหน้า (Views)</h2>
            <div className="h-72 w-full">
              {stats.pageStats.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.pageStats} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="page" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                    <RechartsTooltip 
                      cursor={{fill: '#f3f4f6'}}
                      contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                    />
                    <Bar dataKey="views" name="ยอดเข้าชม (ครั้ง)" radius={[6, 6, 0, 0]}>
                      {stats.pageStats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">ยังไม่มีข้อมูลสถิติ</div>
              )}
            </div>
          </div>

          {/* Pie Chart: Time Spent per Page */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">เวลาใช้งานเฉลี่ย (Avg. Duration)</h2>
            <div className="h-72 w-full">
              {stats.pageStats.length > 0 ? (
                stats.pageStats.some(stat => stat.avgDuration > 0) ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stats.pageStats}
                        dataKey="avgDuration"
                        nameKey="page"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {stats.pageStats.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <RechartsTooltip 
                        contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        formatter={(value) => [`${value} วินาที`, 'เวลาเฉลี่ย']}
                      />
                      <Legend verticalAlign="bottom" height={36} iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                    <Clock size={40} className="mb-2 text-gray-300" />
                    <p>ระบบกำลังเก็บรวบรวมเวลาการใช้งาน...</p>
                    <p className="text-sm mt-1">(ข้อมูลจะขึ้นเมื่อมีคนใช้งานนานเกิน 10 วินาที)</p>
                  </div>
                )
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">ยังไม่มีข้อมูลสถิติ</div>
              )}
            </div>
          </div>

        </div>

      </div>
      <Footer />
    </div>
  );
}
