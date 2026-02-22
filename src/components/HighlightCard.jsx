import React from 'react';

export default function HighlightCard({ title, value, subtitle, icon: Icon, color }) {
  // Map สีขอบซ้ายตามที่ส่งเข้ามา
  const colorClasses = {
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    orange: 'border-orange-500',
  };

  return (
    <div className={`bg-white p-6 rounded-xl shadow-sm border-l-4 ${colorClasses[color]} flex items-start justify-between hover:shadow-md transition-shadow`}>
      <div>
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{title}</h3>
        <p className="text-2xl font-extrabold text-gray-800 mt-2">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{subtitle}</p>
      </div>
      <div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}>
        <Icon size={24} />
      </div>
    </div>
  );
}