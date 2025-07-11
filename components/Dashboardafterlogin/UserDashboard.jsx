'use client';

import ApplicationDevCard from '@/components/cards/Dashboardafterprofile/ApplicationDevCard';
import ClusterCard from '@/components/cards/Dashboardafterprofile/ClusterCard';
import PendingTasksCard from '@/components/cards/Dashboardafterprofile/PendingTasksCard';
import ToolbarCard from '@/components/cards/Dashboardafterprofile/ToolbarCard';

export default function UserDashboard() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ApplicationDevCard />
        <ClusterCard />
        <PendingTasksCard />
        <ToolbarCard />
      </div>
    </div>
  );
}
