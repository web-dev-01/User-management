// /app/api/portal/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    id: 'p1',
    portalName: 'Your Portal',
    description: 'A modern SaaS platform for asset management and analytics.',
    domain: 'assetpro.com',
    allowedSubdomains: ['app.assetpro.com', 'dashboard.assetpro.com'],
    logoUrl: '/logos/assetpro-logo.svg',
    faviconUrl: '/logos/favicon.ico',
    title: 'AssetPro – Smart Asset Management',
    primaryColor: '#01170eff',
    secondaryColor: '#27b04eff',
    accentColor: '#ff000dff',
    themeMode: 'light', // 'light' or 'dark'
    createdAt: '2025-07-01T10:00:00.000Z',
    updatedAt: '2025-07-23T18:00:00.000Z',

    owner: {
      id: 'o1',
      name: 'Rahul Kumar',
      email: 'rahul@assetpro.com',
      profilePic: '/avatars/rahul.png',
      isVerified: true,
      status: 'active',
      lastLoginAt: '2025-07-20T08:45:00.000Z',
      contactNumber: '+91-9876543210',
      designation: 'Founder & CEO'
    },

    features: [
      {
        title: 'User Management',
        description: 'Manage employee accounts, roles, and access.',
        icon: 'Group'
      },
      {
        title: 'Analytics Dashboard',
        description: 'Real-time monitoring and analytics for your assets.',
        icon: 'BarChart'
      },
      {
        title: 'Secure Control',
        description: 'End-to-end encrypted control system for your infrastructure.',
        icon: 'Security'
      },
      {
        title: 'Audit Logs',
        description: 'Track user actions and changes for compliance.',
        icon: 'History'
      },
      {
        title: 'Custom Branding',
        description: 'Set your own colors, logo, and themes.',
        icon: 'Brush'
      }
    ],

    stats: {
      totalUsers: 128,
      activeUsers: 94,
      verifiedUsers: 120,
      totalAdmins: 5,
      pendingInvites: 9
    }
  });
}
