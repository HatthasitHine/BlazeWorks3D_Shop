import React from 'react';

export default function ContentContainer({ title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* หัวข้อกล่อง */}
      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      {/* เนื้อหาภายใน */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}