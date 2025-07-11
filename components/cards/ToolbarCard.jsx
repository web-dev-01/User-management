'use client';
import { MoreHorizontal } from 'lucide-react';
import { useState } from 'react';

export default function ToolbarCard({ isDarkMode }) {
  const [activeTab, setActiveTab] = useState('Resources');

  const tabButtonStyle = (tab) =>
    `${activeTab === tab
      ? isDarkMode
        ? 'bg-gray-700 text-white'
        : 'bg-gray-900 text-white'
      : isDarkMode
      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
    } px-3 py-1 rounded text-sm`;

  return (
    <div className={`rounded-lg p-6 ${isDarkMode ? 'bg-[#2D3E50] border-gray-700' : 'bg-white shadow-md border border-gray-200'}`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '18px', fontWeight: '600' }}>Toolbar</h2>
        <MoreHorizontal className={isDarkMode ? 'text-gray-400' : 'text-gray-400'} />
      </div>

      <div className="space-y-4">
        <div className="flex space-x-2">
          {['Resources', 'Tips', 'Guides'].map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={tabButtonStyle(tab)}>
              {tab} {tab === 'Resources' ? '(6)' : tab === 'Guides' ? '(2)' : '(0)'}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '14px', fontWeight: '500' }}>Featured Resources</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} style={{ fontSize: '11px' }}>NODEJS</p>
            <p className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} style={{ fontSize: '13px' }}>Aggregations in Node.js</p>
          </div>

          <div>
            <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '14px', fontWeight: '500' }}>Sample Apps</h3>
            <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} style={{ fontSize: '11px' }}>NODEJS</p>
            <p className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} style={{ fontSize: '13px' }}>MERN Stack</p>
            <p className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} style={{ fontSize: '13px' }}>MEAN Stack</p>
          </div>

          <div>
            <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '14px', fontWeight: '500' }}>New on Atlas</h3>
            <span className="bg-gray-800 text-white text-xs px-2 py-1 rounded">6 NEW</span>
          </div>
        </div>
      </div>
    </div>
  );
}
