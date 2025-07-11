'use client';
import { ChevronDown, ExternalLink, MoreHorizontal, Plus } from 'lucide-react';

export default function ClusterCard({ isDarkMode, themeClasses }) {
  return (
    <div className={`w-full max-w-[1150px] ${themeClasses.card} rounded-lg p-6 shadow-sm`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '18px', fontWeight: '600' }}>
          Clusters
        </h2>
        <div className="flex items-center space-x-2">
          <button
            className={
              isDarkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }
            style={{ fontSize: '13px', padding: '4px 12px', borderRadius: '4px' }}
          >
            Create cluster
          </button>
          <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} style={{ fontSize: '13px' }}>
            Status: Active
          </span>
          <button
            className={isDarkMode ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}
            style={{ fontSize: '13px' }}
          >
            Delete
          </button>
          <MoreHorizontal
            className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}
            style={{ width: '20px', height: '20px' }}
          />
        </div>
      </div>

      <div className="space-y-3">
        <div
          className={`border ${isDarkMode ? 'border-gray-600' : 'border-gray-200'} rounded-lg p-4`}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'} style={{ fontSize: '14px', fontWeight: '500' }}>
              Cluster0
            </h3>
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-500'} style={{ fontSize: '12px' }}>
              Data Size: 72.4 KB
            </span>
          </div>

          <div className="flex space-x-4 mb-3">
            <button
              className={`border ${isDarkMode ? 'text-teal-400 border-teal-400' : 'text-teal-600 border-teal-600'}`}
              style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '4px' }}
            >
              Connect
            </button>
            <button
              className={isDarkMode ? 'text-teal-400' : 'text-teal-600'}
              style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <span>Edit configuration</span>
              <ChevronDown
                className={isDarkMode ? 'text-teal-400' : 'text-teal-600'}
                style={{ width: '12px', height: '12px' }}
              />
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 items-center justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} style={{ fontSize: '12px' }}>
                Browse collections
              </span>
              <ExternalLink
                className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}
                style={{ width: '12px', height: '12px' }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
              <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'} style={{ fontSize: '12px' }}>
                View monitoring
              </span>
              <ExternalLink
                className={isDarkMode ? 'text-gray-400' : 'text-gray-400'}
                style={{ width: '12px', height: '12px' }}
              />
            </div>
          </div>

          <button
            className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
            style={{
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              marginTop: '8px',
            }}
          >
            <Plus
              className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}
              style={{ width: '12px', height: '12px' }}
            />
            <span>Add Tag</span>
          </button>
        </div>
      </div>
    </div>
  );
}
