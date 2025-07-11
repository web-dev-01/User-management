'use client';
import { X } from 'lucide-react';

export default function NotificationBanner({ showNotification, setShowNotification, isDarkMode, themeClasses }) {
  if (!showNotification) return null;

  return (
    <div className={`${themeClasses.notification} border ${isDarkMode ? 'border-yellow-800' : 'border-yellow-200'} rounded-lg p-4 mb-6 flex items-start justify-between`}>
      <div className="flex">
        <div className={`w-5 h-5 ${isDarkMode ? 'bg-yellow-800' : 'bg-yellow-400'} rounded-full flex items-center justify-center mr-3 mt-0.5`}>
          <span className="text-white text-xs">!</span>
        </div>
        <div>
          <p className={isDarkMode ? 'text-yellow-200' : 'text-yellow-800'} style={{ fontSize: '13px' }}>
            Your organization does not have a designated security contact. Add an Atlas Security Contact in{' '}
            <button className={isDarkMode ? 'text-yellow-300 underline' : 'underline font-medium'}>Organization Settings</button>{' '}
            to receive security-related notifications.
          </p>
        </div>
      </div>
      <button onClick={() => setShowNotification(false)} className={isDarkMode ? 'text-yellow-400 hover:text-yellow-300' : 'text-yellow-600 hover:text-yellow-800'}>
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

