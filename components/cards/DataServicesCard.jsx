'use client';
import { MoreHorizontal } from 'lucide-react';

export default function DataServicesCard({ isDarkMode }) {
  return (
    <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-[#2D3E50] border-gray-700' : 'bg-white shadow-md border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '18px', fontWeight: '600' }}>Data Services</h2>
        <MoreHorizontal className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
      </div>

      <div className="space-y-4">
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} style={{ fontSize: '13px' }}>Data Size: 72.4 KB</p>
        <button className={isDarkMode ? 'text-teal-400 hover:text-teal-300' : 'text-teal-600 hover:text-teal-700'} style={{ fontSize: '12px' }}>
          View monitoring
        </button>
      </div>
    </div>
  );
}
