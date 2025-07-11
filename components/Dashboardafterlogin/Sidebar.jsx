'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import {
  Database,
  Package,
  Lock,
  Settings,
  ChevronUp,
  ChevronDown,
  BarChart3,
  X,
  Menu,
  Grid3X3,
  List,
} from 'lucide-react';

export default function Sidebar({ themeClasses = {}, navLinks = [] }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({
    DATABASE: true,
    DATA: true,
    SERVICES: true,
    SECURITY: true,
  });

  const navRef = useRef(null);
  const sidebarRef = useRef(null);
  const [scrollThumbPosition, setScrollThumbPosition] = useState(0);
  const [scrollThumbHeight, setScrollThumbHeight] = useState(0);

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  // Toggle function - switches between expand all and collapse all
  const toggleAll = () => {
    const allExpanded = Object.values(expandedCategories).every(Boolean);
    
    if (allExpanded) {
      // Collapse all categories
      setExpandedCategories({
        DATABASE: false,
        DATA: false,
        SERVICES: false,
        SECURITY: false,
      });
    } else {
      // Expand all categories
      setExpandedCategories({
        DATABASE: true,
        DATA: true,
        SERVICES: true,
        SECURITY: true,
      });
    }
  };

  // Check if all categories are expanded
  const allExpanded = Object.values(expandedCategories).every(Boolean);

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current && sidebarRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = navRef.current;
        const sidebarHeight = sidebarRef.current.offsetHeight;
        const scrollableHeight = scrollHeight - clientHeight;

        const thumbHeight = Math.max((clientHeight / scrollHeight) * sidebarHeight, 30);
        const thumbPosition = scrollableHeight > 0
          ? (scrollTop / scrollableHeight) * (sidebarHeight - thumbHeight)
          : 0;

        setScrollThumbHeight(thumbHeight);
        setScrollThumbPosition(thumbPosition);
      }
    };

    const navElement = navRef.current;
    if (navElement) {
      navElement.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => navElement.removeEventListener('scroll', handleScroll);
    }
  }, [expandedCategories]);

  const sidebarData = [
    {
      type: 'single',
      icon: <Settings className="w-4 h-4" />,
      label: 'Project Overview',
      href: '/project-overview',
      color: 'text-teal-600',
    },
    {
      type: 'category',
      category: 'DATABASE',
      icon: <Database className="w-4 h-4" />,
      label: 'DATABASE',
      color: 'text-teal-600',
      items: [
        { label: 'Clusters', href: '/clusters', color: 'text-blue-600' },
        { label: 'Backup', href: '/backup', color: 'text-blue-600' },
        { label: 'Online Archive', href: '/online-archive', color: 'text-gray-600' },
      ],
    },
    {
      type: 'category',
      category: 'DATA',
      icon: <BarChart3 className="w-4 h-4" />,
      label: 'DATA',
      color: 'text-teal-600',
      items: [
        { label: 'Search & Vector Search', href: '/search', color: 'text-gray-700' },
        { label: 'Data Federation', href: '/data-federation', color: 'text-blue-600' },
        { label: 'Visualization', href: '/visualization', color: 'text-gray-700' },
      ],
    },
    {
      type: 'category',
      category: 'SERVICES',
      icon: <Package className="w-4 h-4" />,
      label: 'SERVICES',
      color: 'text-teal-600',
      items: [
        { label: 'Stream Processing', href: '/stream-processing', color: 'text-gray-700' },
        { label: 'Triggers', href: '/triggers', color: 'text-blue-600' },
        { label: 'Migration', href: '/migration', color: 'text-blue-600' },
      ],
    },
    {
      type: 'category',
      category: 'SECURITY',
      icon: <Lock className="w-4 h-4" />,
      label: 'SECURITY',
      color: 'text-teal-600',
      items: [
        { label: 'Security Quickstart', href: '/security-quickstart', color: 'text-gray-700' },
        { label: 'Project Identity & Access', href: '/project-identity', color: 'text-gray-700' },
        { label: 'Database Access', href: '/database-access', color: 'text-blue-600' },
      ],
    },
  ];

  // Render single navigation item
  const renderSingleItem = (item) => (
    <div key={item.label} className="flex items-center justify-between">
      <Link
        href={item.href || '#'}
        className="flex items-center space-x-3 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors flex-1"
      >
        <span className={item.color}>{item.icon}</span>
        <span className={`font-medium ${item.color}`}>{item.label}</span>
      </Link>
      {/* Toggle button for Project Overview */}
      {item.label === 'Project Overview' && (
        <button
          onClick={toggleAll}
          className={`mr-4 p-1.5 rounded-md transition-all duration-200 ${
            allExpanded 
              ? 'text-teal-600 bg-teal-50 hover:bg-teal-100' 
              : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
          }`}
        >
          {allExpanded ? (
            <Grid3X3 className="w-4 h-4" />
          ) : (
            <List className="w-4 h-4" />
          )}
        </button>
      )}
    </div>
  );

  const renderCategorySection = (categoryData) => {
    if (!categoryData) return null;

    const isExpanded = expandedCategories[categoryData.category] ?? true;

    return (
      <div key={categoryData.category}>
        <button
          onClick={() => toggleCategory(categoryData.category)}
          className="w-full flex items-center justify-between px-4 py-2.5 text-left hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-center space-x-3">
            <span className={categoryData.color}>{categoryData.icon}</span>
            <span className={`text-sm font-semibold ${categoryData.color}`}>
              {categoryData.label}
            </span>
          </div>
          <span className={`${categoryData.color} transition-transform duration-200`}>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </span>
        </button>
        {isExpanded && categoryData.items && (
          <div className="bg-gray-50">
            {categoryData.items.map((item, itemIndex) => (
              <Link
                key={itemIndex}
                href={item.href || '#'}
                className="flex items-center px-12 py-2.5 text-sm hover:bg-gray-100 transition-colors"
              >
                <span className={`${item.color} font-medium`}>{item.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg border"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      <div
        ref={sidebarRef}
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:static md:inset-0 flex h-screen`}
      >
        <div className="flex flex-col h-full flex-1 relative">
          <nav
            ref={navRef}
            className="flex-1 overflow-y-auto scrollbar-custom pr-1"
          >
            <div className="py-2">
              {sidebarData.map((item, index) => {
                if (item.type === 'single') return renderSingleItem(item);
                if (item.type === 'category') return renderCategorySection(item);
                return null;
              })}
            </div>
          </nav>

          {/* Divider Line on Right */}
          <div className="w-[1px] bg-black/10 dark:bg-white/10 absolute top-0 right-0 h-full" />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
}