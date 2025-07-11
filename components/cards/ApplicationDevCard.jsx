'use client';
import { MoreHorizontal, X } from 'lucide-react';

export default function ApplicationDevCard({ isDarkMode }) {
  return (
    <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-[#2D3E50] border-gray-700' : 'bg-white shadow-md border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '18px', fontWeight: '600' }}>Application Development</h2>
        <div className="flex items-center space-x-2">
          <button className={isDarkMode ? 'bg-gray-700 text-gray-200 hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} style={{ padding: '4px 12px', fontSize: '13px' }}>
            Connect new
          </button>
          <MoreHorizontal className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
          <X className={isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'} />
        </div>
      </div>

      <div className="space-y-2">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} style={{ fontSize: '11px' }}>OPTIMIZE YOUR CONNECTION POOL</p>
        <p className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} style={{ fontSize: '13px' }}>Use one MongoClient instance per application.</p>
      </div>
    </div>
  );
}
